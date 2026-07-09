import { NextRequest, NextResponse } from "next/server";
import { exportDatabaseSQL } from "@/lib/backup";
import { mkdir } from "fs/promises";
import path from "path";
import os from "os";

export async function GET(request: NextRequest) {
  try {
    // Generate SQL export
    const sqlExport = await exportDatabaseSQL();

    // Create response with SQL file
    const fileName = `backup-${new Date().toISOString().split("T")[0]}.sql`;

    return new NextResponse(sqlExport, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("GET /api/backup/export error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to export database" },
      { status: 500 }
    );
  }
}
