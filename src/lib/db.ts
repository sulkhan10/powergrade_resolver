import { createClient } from "@libsql/client";

if (!process.env.SQLITE_URL) {
  throw new Error("SQLITE_URL environment variable is required");
}

if (!process.env.SQLITE_TOKEN) {
  throw new Error("SQLITE_TOKEN environment variable is required");
}

export const db = createClient({
  url: process.env.SQLITE_URL,
  authToken: process.env.SQLITE_TOKEN,
});

/**
 * Execute a query and return all rows
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const result = await db.execute({
      sql,
      args: params,
    });
    return (result.rows as T[]) || [];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Execute a single row query
 */
export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Execute an insert and return the last inserted ID
 */
export async function insert(sql: string, params: any[] = []): Promise<number> {
  try {
    const result = await db.execute({
      sql,
      args: params,
    });
    return Number(result.lastInsertRowid);
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
}

/**
 * Execute a batch of statements
 */
export async function batch(statements: Array<{ sql: string; args?: any[] }>) {
  try {
    return await db.batch(
      statements.map((stmt) => ({
        sql: stmt.sql,
        args: stmt.args || [],
      }))
    );
  } catch (error) {
    console.error("Database batch error:", error);
    throw error;
  }
}

/**
 * Initialize database schema
 */
export async function initializeSchema() {
  const schema = `
    -- Products table
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      price TEXT NOT NULL,
      rating REAL,
      description TEXT,
      short_description TEXT,
      link TEXT,
      main_image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Product gallery images
    CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      image_type TEXT CHECK (image_type IN ('gallery', 'before_after')),
      display_order INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    -- Product software compatibility
    CREATE TABLE IF NOT EXISTS product_software (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      software_name TEXT NOT NULL,
      software_image TEXT,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    -- Blog posts
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      featured_image TEXT,
      published BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Site content (hero, about, footer sections)
    CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_key TEXT UNIQUE NOT NULL,
      content_data TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Admin users
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create indexes for better query performance
    CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
    CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
    CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
    CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(section_key);
  `;

  // Split by semicolon and execute each statement
  const statements = schema
    .split(";")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  for (const stmt of statements) {
    await db.execute(stmt);
  }

  console.log("Database schema initialized successfully");
}
