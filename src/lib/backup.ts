// eslint-disable-next-line @typescript-eslint/no-var-requires
const archiver = require("archiver");
import { db, query } from "./db";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";

export async function exportDatabaseSQL(): Promise<string> {
  try {
    const tables = await query<{ name: string }>(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
    );

    let sqlExport = `-- Database Export Generated at ${new Date().toISOString()}\n\n`;

    for (const table of tables) {
      const createStmt = await query<{ sql: string }>(
        `SELECT sql FROM sqlite_master WHERE type='table' AND name = ?`,
        [table.name]
      );

      if (createStmt.length > 0 && createStmt[0].sql) {
        sqlExport += `${createStmt[0].sql};\n\n`;
      }

      const rows = await query(`SELECT * FROM ${table.name}`);

      for (const row of rows) {
        const columns = Object.keys(row);
        const values = columns.map((col) => {
          const val = row[col];
          if (val === null) return "NULL";
          if (typeof val === "string") return `'${val.replace(/'/g, "''")}'`;
          return val;
        });

        sqlExport += `INSERT INTO ${table.name} (${columns.join(
          ", "
        )}) VALUES (${values.join(", ")});\n`;
      }

      sqlExport += "\n";
    }

    return sqlExport;
  } catch (error) {
    console.error("Failed to export database:", error);
    throw error;
  }
}

export async function generateImageManifest(): Promise<object> {
  try {
    const manifest: Record<string, any> = {
      generated_at: new Date().toISOString(),
      products: [],
      blog: [],
    };

    const products = await query(
      `SELECT p.id, p.name, p.slug, 
              GROUP_CONCAT(CASE WHEN pi.image_type = 'gallery' THEN pi.image_path END, '|') as gallery,
              GROUP_CONCAT(CASE WHEN pi.image_type = 'before_after' THEN pi.image_path END, '|') as before_after,
              p.main_image
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id
       GROUP BY p.id`
    );

    for (const product of products) {
      const productEntry: Record<string, any> = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        images: {
          main: product.main_image,
          gallery: product.gallery ? product.gallery.split("|") : [],
          before_after: product.before_after
            ? product.before_after.split("|")
            : [],
        },
      };
      manifest.products.push(productEntry);
    }

    const blogPosts = await query(
      `SELECT id, title, slug, featured_image FROM blog_posts WHERE featured_image IS NOT NULL`
    );

    for (const post of blogPosts) {
      manifest.blog.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
        featured_image: post.featured_image,
      });
    }

    return manifest;
  } catch (error) {
    console.error("Failed to generate image manifest:", error);
    throw error;
  }
}

export async function createBackupZip(outputPath: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await mkdir(path.dirname(outputPath), { recursive: true });

      const output = createWriteStream(outputPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        console.log(`Backup created: ${outputPath} (${archive.pointer()} bytes)`);
        resolve(outputPath);
      });

      archive.on("error", (err: Error) => {
        reject(err);
      });

      archive.pipe(output);

      const sqlExport = await exportDatabaseSQL();
      archive.append(sqlExport, {
        name: `backup-${new Date().toISOString().split("T")[0]}.sql`,
      });

      const manifest = await generateImageManifest();
      archive.append(JSON.stringify(manifest, null, 2), {
        name: "image-manifest.json",
      });

      archive.append(
        JSON.stringify(
          {
            generated_at: new Date().toISOString(),
            version: "1.0",
            database: "Turso (SQLite)",
          },
          null,
          2
        ),
        {
          name: "metadata.json",
        }
      );

      archive.finalize();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getAllImagePaths(): Promise<string[]> {
  try {
    const images: string[] = [];

    const productImages = await query<{ image_path: string }>(
      `SELECT DISTINCT image_path FROM product_images`
    );
    images.push(
      ...productImages.map((img) => img.image_path).filter(Boolean)
    );

    const mainImages = await query<{ main_image: string }>(
      `SELECT DISTINCT main_image FROM products WHERE main_image IS NOT NULL AND main_image != ''`
    );
    images.push(...mainImages.map((img) => img.main_image).filter(Boolean));

    const blogImages = await query<{ featured_image: string }>(
      `SELECT DISTINCT featured_image FROM blog_posts WHERE featured_image IS NOT NULL AND featured_image != ''`
    );
    images.push(...blogImages.map((img) => img.featured_image).filter(Boolean));

    const softwareImages = await query<{ software_image: string }>(
      `SELECT DISTINCT software_image FROM product_software WHERE software_image IS NOT NULL AND software_image != ''`
    );
    images.push(
      ...softwareImages.map((img) => img.software_image).filter(Boolean)
    );

    return [...new Set(images)];
  } catch (error) {
    console.error("Failed to get all image paths:", error);
    throw error;
  }
}
