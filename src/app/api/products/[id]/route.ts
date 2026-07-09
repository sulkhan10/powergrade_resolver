import { NextRequest, NextResponse } from "next/server";
import { query, insert } from "@/lib/db";
import { ProductUpdateSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const product = await query(
      `SELECT p.*, 
              GROUP_CONCAT(CASE WHEN pi.image_type = 'gallery' THEN pi.image_path END) as gallery,
              GROUP_CONCAT(CASE WHEN pi.image_type = 'before_after' THEN pi.image_path END) as before_after
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id
       WHERE p.id = ?
       GROUP BY p.id`,
      [id]
    );

    if (!product || product.length === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Get software compatibility
    const software = await query(
      `SELECT software_name, software_image FROM product_software WHERE product_id = ?`,
      [id]
    );

    const result = {
      ...product[0],
      gallery: product[0].gallery ? product[0].gallery.split(",") : [],
      before_after: product[0].before_after
        ? product[0].before_after.split(",")
        : [],
      software_compatibility: software,
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    // Validate input
    const validatedData = ProductUpdateSchema.parse(body);

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(validatedData).forEach(([key, value]) => {
      updates.push(`${key} = ?`);
      values.push(value);
    });

    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    await query(
      `UPDATE products SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true, message: "Product updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    await query(`DELETE FROM products WHERE id = ?`, [id]);

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
