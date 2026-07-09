import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { BlogPostUpdateSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await query(
      `SELECT * FROM blog_posts WHERE slug = ?`,
      [slug]
    );

    if (!post || post.length === 0) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post[0] });
  } catch (error) {
    console.error("GET /api/blog/[slug] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const validatedData = BlogPostUpdateSchema.parse(body);

    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(validatedData).forEach(([key, value]) => {
      updates.push(`${key} = ?`);
      values.push(value);
    });

    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(slug);

    await query(
      `UPDATE blog_posts SET ${updates.join(", ")} WHERE slug = ?`,
      values
    );

    return NextResponse.json({ success: true, message: "Blog post updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("PATCH /api/blog/[slug] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await query(`DELETE FROM blog_posts WHERE slug = ?`, [slug]);

    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (error) {
    console.error("DELETE /api/blog/[slug] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
