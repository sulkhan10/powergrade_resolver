import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";

function makeClient(): S3Client {
  return new S3Client({
    endpoint: process.env.AWS_ENDPOINT || "https://is3.cloudhost.id",
    region: process.env.AWS_DEFAULT_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 5000,
      socketTimeout: 5000,
    }),
  });
}

export const uploadToS3 = async (file: Buffer, fileName: string, contentType: string): Promise<string> => {
  const saveLocally = async () => {
    const { writeFile, mkdir } = await import("fs/promises");
    const { join } = await import("path");
    const baseName = fileName.replace(/\//g, "-");
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, baseName), file);
    return `/uploads/${baseName}`;
  };

  // Dev fallback: no S3 credentials → save to public/uploads/
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_BUCKET) {
    return saveLocally();
  }

  try {
    const bucket = process.env.AWS_BUCKET!;
    await makeClient().send(new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ContentType: contentType,
      ACL: "public-read",
    }));

    const baseUrl = process.env.AWS_URL || `${process.env.AWS_ENDPOINT || "https://is3.cloudhost.id"}/${bucket}`;
    return `${baseUrl}/${fileName}`;
  } catch (error) {
    console.warn("S3 upload failed, falling back to local file storage:", error);
    return saveLocally();
  }
};

export const deleteFromS3 = async (fileName: string) => {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_BUCKET) return;

  try {
    await makeClient().send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
    }));
  } catch (error) {
    console.warn("S3 delete failed:", error);
  }
};

// Legacy compat
export default { uploadToS3, deleteFromS3 };
