import { NextRequest, NextResponse } from "next/server";
import { query, insert } from "@/lib/db";
import { PortfolioImageInsertSchema } from "@/lib/db-schema";
import { z } from "zod";

export async function GET() {
  try {
    const images = await query(
      "SELECT * FROM portfolio_images ORDER BY display_order ASC, id ASC"
    );
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = PortfolioImageInsertSchema.parse(body);

    const id = await insert(
      `INSERT INTO portfolio_images (src, alt, category, display_order) VALUES (?, ?, ?, ?)`,
      [
        validatedData.src,
        validatedData.alt,
        validatedData.category || "",
        validatedData.display_order ?? 0,
      ]
    );

    return NextResponse.json(
      { success: true, data: { id, ...validatedData } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("POST /api/portfolio error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create portfolio image" },
      { status: 500 }
    );
  }
}
