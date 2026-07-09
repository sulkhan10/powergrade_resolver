import "dotenv/config";
import { db, insert, batch } from "../src/lib/db";
import fs from "fs/promises";
import path from "path";

interface OldProduct {
  id: number;
  type: string;
  main_image: string;
  link: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  categorySlug: string;
  short_description: string;
  description: string;
  rating: number;
  gallery: string[];
  beforeAfterOneImage: string[];
  image: string[];
  software_compatibility: Array<{
    name: string;
    image: string;
  }>;
  reviews: number;
}

async function migrateProducts() {
  try {
    console.log("Starting migration...");

    // Read the products.json file
    const dataPath = path.join(process.cwd(), "src", "data", "products.json");
    const jsonData = await fs.readFile(dataPath, "utf-8");
    const products: OldProduct[] = JSON.parse(jsonData);

    console.log(`Found ${products.length} products to migrate`);

    for (const product of products) {
      // Insert main product
      const productId = await insert(
        `INSERT INTO products (slug, name, type, category, price, rating, description, short_description, link, main_image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.slug,
          product.name,
          product.type,
          product.category,
          product.price,
          product.rating || null,
          product.description || "",
          product.short_description || "",
          product.link || "",
          product.main_image || "",
        ]
      );

      console.log(`✓ Inserted product: ${product.name} (ID: ${productId})`);

      // Insert gallery images
      if (product.gallery && product.gallery.length > 0) {
        for (let i = 0; i < product.gallery.length; i++) {
          await insert(
            `INSERT INTO product_images (product_id, image_path, image_type, display_order)
             VALUES (?, ?, ?, ?)`,
            [productId, product.gallery[i], "gallery", i]
          );
        }
        console.log(
          `  - Added ${product.gallery.length} gallery images`
        );
      }

      // Insert before/after images
      if (product.beforeAfterOneImage && product.beforeAfterOneImage.length > 0) {
        for (let i = 0; i < product.beforeAfterOneImage.length; i++) {
          await insert(
            `INSERT INTO product_images (product_id, image_path, image_type, display_order)
             VALUES (?, ?, ?, ?)`,
            [productId, product.beforeAfterOneImage[i], "before_after", i]
          );
        }
        console.log(
          `  - Added ${product.beforeAfterOneImage.length} before/after images`
        );
      }

      // Insert software compatibility
      if (
        product.software_compatibility &&
        product.software_compatibility.length > 0
      ) {
        for (const software of product.software_compatibility) {
          await insert(
            `INSERT INTO product_software (product_id, software_name, software_image)
             VALUES (?, ?, ?)`,
            [productId, software.name, software.image || ""]
          );
        }
        console.log(
          `  - Added ${product.software_compatibility.length} software entries`
        );
      }
    }

    console.log("\n✅ Migration completed successfully!");
    console.log(`Migrated ${products.length} products with all their images and data`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run the migration
migrateProducts();
