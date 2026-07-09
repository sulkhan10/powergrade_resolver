import { NextRequest, NextResponse } from "next/server";
import { query, insert } from "@/lib/db";
import { SiteContentInsertSchema, SiteContentUpdateSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const content = await query(
      `SELECT * FROM site_content WHERE section_key = ?`,
      [section]
    );

    if (!content || content.length === 0) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    const result = {
      ...content[0],
      content_data: JSON.parse(content[0].content_data),
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("GET /api/content/[section] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const body = await request.json();
    const validatedData = SiteContentUpdateSchema.parse(body);

    const existing = await query(
      `SELECT id FROM site_content WHERE section_key = ?`,
      [section]
    );

    if (existing.length === 0) {
      await insert(
        `INSERT INTO site_content (section_key, content_data)
         VALUES (?, ?)`,
        [section, validatedData.content_data]
      );
    } else {
      await query(
        `UPDATE site_content 
         SET content_data = ?, updated_at = CURRENT_TIMESTAMP
         WHERE section_key = ?`,
        [validatedData.content_data, section]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Content updated",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("PATCH /api/content/[section] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update content" },
      { status: 500 }
    );
  }
}
