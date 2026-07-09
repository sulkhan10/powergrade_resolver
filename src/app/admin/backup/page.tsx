"use client";

import { useState } from "react";
import { exportDatabase, downloadImagesBackup } from "@/lib/api-client";

export default function BackupPage() {
  const [exporting, setExporting] = useState(false);
  const [downloadingImages, setDownloadingImages] = useState(false);

  const handleExportSQL = async () => {
    setExporting(true);
    const blob = await exportDatabase();

    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${new Date().toISOString().split("T")[0]}.sql`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }

    setExporting(false);
  };

  const handleDownloadImages = async () => {
    setDownloadingImages(true);
    const blob = await downloadImagesBackup();

    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `images-backup-${new Date().toISOString().split("T")[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }

    setDownloadingImages(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Backup & Export</h1>
        <p className="text-accent/60">Download your data and images</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Database Export */}
        <div className="bg-card border border-accent/10 rounded-lg p-8">
          <h2 className="text-xl font-bold text-accent mb-4">Database Export</h2>
          <p className="text-accent/60 mb-6">
            Export your complete database as SQL file. This includes all products, blog posts, and content.
          </p>

          <div className="space-y-3 mb-6 text-sm text-accent/70">
            <p>✓ All products with metadata</p>
            <p>✓ Product images and software info</p>
            <p>✓ Blog posts and content</p>
            <p>✓ Admin users and settings</p>
          </div>

          <button
            onClick={handleExportSQL}
            disabled={exporting}
            className="w-full px-4 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {exporting ? "Exporting..." : "Export Database (SQL)"}
          </button>
        </div>

        {/* Images Download */}
        <div className="bg-card border border-accent/10 rounded-lg p-8">
          <h2 className="text-xl font-bold text-accent mb-4">Images Backup</h2>
          <p className="text-accent/60 mb-6">
            Download a ZIP file containing the image manifest and metadata for all images stored in your database.
          </p>

          <div className="space-y-3 mb-6 text-sm text-accent/70">
            <p>✓ Image manifest with metadata</p>
            <p>✓ Product image references</p>
            <p>✓ Blog image links</p>
            <p>✓ Software compatibility images</p>
          </div>

          <button
            onClick={handleDownloadImages}
            disabled={downloadingImages}
            className="w-full px-4 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {downloadingImages ? "Downloading..." : "Download Images Manifest"}
          </button>
        </div>
      </div>

      <div className="mt-8 bg-accent/5 border border-accent/10 rounded-lg p-6">
        <h3 className="font-semibold text-accent mb-3">Backup Information</h3>
        <ul className="space-y-2 text-sm text-accent/70">
          <li>
            • <strong>SQL Export:</strong> Contains the complete database schema and data. You can import this into any SQLite-compatible database.
          </li>
          <li>
            • <strong>Images Backup:</strong> Contains a manifest file (JSON) listing all images and their associations. Images are stored in CDN/S3.
          </li>
          <li>
            • <strong>Frequency:</strong> We recommend backing up regularly, especially before making major changes.
          </li>
          <li>
            • <strong>Storage:</strong> Keep backups in a safe location, preferably in cloud storage or external drive.
          </li>
        </ul>
      </div>
    </div>
  );
}
