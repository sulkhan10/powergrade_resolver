import { NextRequest, NextResponse } from "next/server";
import { getAllImagePaths, generateImageManifest } from "@/lib/backup";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const archiver = require("archiver");

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const imagePaths = await getAllImagePaths();

    const archive = archiver("zip", { zlib: { level: 9 } });

    const response = new NextResponse(archive as any, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="images-backup-${new Date().toISOString().split("T")[0]}.zip"`,
      },
    });

    const manifest = await generateImageManifest();
    archive.append(JSON.stringify(manifest, null, 2), {
      name: "image-manifest.json",
    });

    archive.append(
      "Images referenced in manifest.json:\n" +
        imagePaths.map((img) => `- ${img}`).join("\n"),
      { name: "IMAGES_LIST.txt" }
    );

    archive.append(
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
          total_images: imagePaths.length,
          note: "Images are stored in CDN/S3. This backup contains the manifest and metadata. To restore images, download them from their original URLs listed in the manifest.",
        },
        null,
        2
      ),
      { name: "README.txt" }
    );

    archive.finalize();
    return response;
  } catch (error) {
    console.error("GET /api/backup/download-images error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download images" },
      { status: 500 }
    );
  }
}
