import "dotenv/config";
import { insert } from "../src/lib/db";
import bcryptjs from "bcryptjs";

async function createAdminUser() {
  try {
    console.log("Creating admin user...");

    // Hash the password
    const password = "admin123";
    const hashedPassword = await bcryptjs.hash(password, 10);

    const userId = await insert(
      `INSERT INTO admin_users (username, password_hash, email)
       VALUES (?, ?, ?)`,
      ["admin", hashedPassword, "admin@example.com"]
    );

    console.log(`✅ Admin user created successfully!`);
    console.log(`Username: admin`);
    console.log(`Password: ${password}`);
    console.log(`User ID: ${userId}`);
  } catch (error) {
    console.error("❌ Failed to create admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
