import { NextRequest, NextResponse } from "next/server";
import { query, insert } from "@/lib/db";
import { ProductSchema, ProductInsertSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let sql = "SELECT * FROM products";
    const params: any[] = [];

    if (category) {
      sql += " WHERE category = ?";
      params.push(category);
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const products = await query(sql, params);

    // Get total count
    let countSql = "SELECT COUNT(*) as count FROM products";
    if (category) {
      countSql += " WHERE category = ?";
    }
    const countResult = await query<{ count: number }>(
      countSql,
      category ? [category] : []
    );
    const total = countResult[0]?.count || 0;

    return NextResponse.json({
      success: true,
      data: products,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication (will be implemented with middleware)
    const body = await request.json();

    // Validate input
    const validatedData = ProductInsertSchema.parse(body);

    const id = await insert(
      `INSERT INTO products (slug, name, type, category, price, rating, description, short_description, link, main_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validatedData.slug,
        validatedData.name,
        validatedData.type,
        validatedData.category,
        validatedData.price,
        validatedData.rating || null,
        validatedData.description || "",
        validatedData.short_description || "",
        validatedData.link || "",
        validatedData.main_image || "",
      ]
    );

    return NextResponse.json(
      {
        success: true,
        data: { id, ...validatedData },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
