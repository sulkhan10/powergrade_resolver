#!/bin/bash
# Test all CRUD operations via admin UI API
BASE="http://localhost:3000"
COOKIE_JAR="/tmp/test-cookies.txt"
PASS=0
FAIL=0

check() {
  local label="$1" expected="$2" actual="$3"
  if echo "$actual" | grep -q "$expected"; then
    echo "  ✅ $label"
    PASS=$((PASS+1))
  else
    echo "  ❌ $label (expected '$expected', got: $actual)"
    FAIL=$((FAIL+1))
  fi
}

echo "========================================"
echo "  POWERGRADE RESOLVER - CRUD TEST SUITE"
echo "========================================"

# ── 1. AUTH ──
echo ""
echo "=== 1. AUTH ==="
LOGIN=$(curl -s -c "$COOKIE_JAR" -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')
check "Login" '"success":true' "$LOGIN"

VERIFY=$(curl -s -b "$COOKIE_JAR" "$BASE/api/auth/verify")
check "Verify session" '"success":true' "$VERIFY"
check "Verify username" '"username":"admin"' "$VERIFY"

# ── 2. PRODUCTS CRUD ──
echo ""
echo "=== 2. PRODUCTS CRUD ==="

# CREATE
CREATE=$(curl -s -b "$COOKIE_JAR" -X POST "$BASE/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-product-crud-001",
    "name": "Test Product CRUD",
    "type": "lightroom-preset",
    "category": "Presets",
    "price": "IDR 25K",
    "rating": 4.5,
    "description": "A test product created by CRUD test suite",
    "short_description": "Test product short desc",
    "link": "https://example.com/buy"
  }')
check "Create product" '"success":true' "$CREATE"
PRODUCT_ID=$(echo "$CREATE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('id',''))" 2>/dev/null)
echo "  -> Product ID: $PRODUCT_ID"

# Read single
READ=$(curl -s -b "$COOKIE_JAR" "$BASE/api/products/$PRODUCT_ID")
check "Read product by ID" '"success":true' "$READ"

# Update
UPDATE=$(curl -s -b "$COOKIE_JAR" -X PATCH "$BASE/api/products/$PRODUCT_ID" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Product CRUD - UPDATED", "price": "IDR 50K"}')
check "Update product" '"success":true' "$UPDATE"

# List
LIST=$(curl -s -b "$COOKIE_JAR" "$BASE/api/products?limit=10")
check "List products" '"success":true' "$LIST"

# Delete
DELETE=$(curl -s -b "$COOKIE_JAR" -X DELETE "$BASE/api/products/$PRODUCT_ID")
check "Delete product" '"success":true' "$DELETE"

# Verify deleted
READ2=$(curl -s -b "$COOKIE_JAR" "$BASE/api/products/$PRODUCT_ID")
check "Product deleted (404)" '"error"' "$READ2"

# ── 3. BLOG CRUD ──
echo ""
echo "=== 3. BLOG CRUD ==="

# Create blog
BLOG_CREATE=$(curl -s -b "$COOKIE_JAR" -X POST "$BASE/api/blog" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-blog-crud-001",
    "title": "Test Blog CRUD",
    "excerpt": "A test blog post excerpt",
    "content": "<p>This is test content for the CRUD test suite.</p>",
    "published": false
  }')
check "Create blog" '"success":true' "$BLOG_CREATE"

# Read blog
BLOG_READ=$(curl -s -b "$COOKIE_JAR" "$BASE/api/blog/test-blog-crud-001")
check "Read blog by slug" '"success":true' "$BLOG_READ"

# Update blog
BLOG_UPDATE=$(curl -s -b "$COOKIE_JAR" -X PATCH "$BASE/api/blog/test-blog-crud-001" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog CRUD - UPDATED", "published": true}')
check "Update blog" '"success":true' "$BLOG_UPDATE"

# List blog
BLOG_LIST=$(curl -s -b "$COOKIE_JAR" "$BASE/api/blog?published=true")
check "List published blogs" '"test-blog-crud-001"' "$BLOG_LIST"

# Delete blog
BLOG_DELETE=$(curl -s -b "$COOKIE_JAR" -X DELETE "$BASE/api/blog/test-blog-crud-001")
check "Delete blog" '"success":true' "$BLOG_DELETE"

# ── 4. CONTENT CRUD ──
echo ""
echo "=== 4. CONTENT CRUD ==="

# Seed content first so read works
CONTENT_SEED=$(curl -s -b "$COOKIE_JAR" -X PATCH "$BASE/api/content/hero" \
  -H "Content-Type: application/json" \
  -d '{"content_data": "{\"title\": \"Test Hero Title\", \"subtitle\": \"Tested via CRUD suite\"}"}')
check "Seed/Update content (hero)" '"success":true' "$CONTENT_SEED"

# Read content back
CONTENT_READ=$(curl -s -b "$COOKIE_JAR" "$BASE/api/content/hero")
check "Read content (hero)" '"success":true' "$CONTENT_READ"
check "Content has title" 'Test Hero Title' "$CONTENT_READ"

# ── 5. IMAGE UPLOAD ──
echo ""
echo "=== 5. IMAGE UPLOAD ==="

# flower.jpeg
FLOWER=$(curl -s -b "$COOKIE_JAR" -X POST "$BASE/api/upload" \
  -F "file=@flower.jpeg" 2>&1)
check "Upload flower.jpeg" '"success":true' "$FLOWER"
echo "  -> $FLOWER"

# test.jpg
TESTJPG=$(curl -s -b "$COOKIE_JAR" -X POST "$BASE/api/upload" \
  -F "file=@test.jpg" 2>&1)
check "Upload test.jpg" '"success":true' "$TESTJPG"
echo "  -> $TESTJPG"

echo ""
echo "========================================"
echo "  RESULTS: $PASS passed, $FAIL failed"
echo "========================================"
exit $FAIL