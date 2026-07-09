import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { PortfolioImageUpdateSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const images = await query(
      "SELECT * FROM portfolio_images WHERE id = ?",
      [parseInt(id)]
    );

    if (!images || images.length === 0) {
      return NextResponse.json(
        { success: false, error: "Portfolio image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: images[0] });
  } catch (error) {
    console.error("GET /api/portfolio/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio image" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = PortfolioImageUpdateSchema.parse(body);

    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(validatedData).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      );
    }

    values.push(parseInt(id));

    await query(
      `UPDATE portfolio_images SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true, message: "Portfolio image updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("PATCH /api/portfolio/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update portfolio image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM portfolio_images WHERE id = ?", [parseInt(id)]);
    return NextResponse.json({ success: true, message: "Portfolio image deleted" });
  } catch (error) {
    console.error("DELETE /api/portfolio/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete portfolio image" },
      { status: 500 }
    );
  }
}
