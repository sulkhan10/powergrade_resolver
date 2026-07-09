import { NextRequest, NextResponse } from "next/server";
import { query, insert } from "@/lib/db";
import { BlogPostInsertSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let sql = "SELECT * FROM blog_posts";
    const params: any[] = [];

    if (published) {
      sql += " WHERE published = 1";
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const posts = await query(sql, params);

    // Get total count
    let countSql = "SELECT COUNT(*) as count FROM blog_posts";
    if (published) {
      countSql += " WHERE published = 1";
    }
    const countResult = await query<{ count: number }>(
      countSql,
      published ? [] : []
    );
    const total = countResult[0]?.count || 0;

    return NextResponse.json({
      success: true,
      data: posts,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BlogPostInsertSchema.parse(body);

    const id = await insert(
      `INSERT INTO blog_posts (slug, title, excerpt, content, featured_image, published)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        validatedData.slug,
        validatedData.title,
        validatedData.excerpt || "",
        validatedData.content,
        validatedData.featured_image || "",
        validatedData.published ? 1 : 0,
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

    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
