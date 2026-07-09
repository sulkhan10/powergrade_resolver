"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPortfolioImages, deletePortfolioImage } from "@/lib/api-client";

export default function AdminPortfolioPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const result = await getPortfolioImages();
    if (result.success) {
      setImages(result.data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    setDeleting(id);
    const result = await deletePortfolioImage(id);
    if (result.success) {
      setImages(images.filter((img) => img.id !== id));
    } else {
      alert(result.error || "Failed to delete");
    }
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-accent mb-2">Portfolio</h1>
          <p className="text-accent/60">Manage portfolio gallery images</p>
        </div>
        <Link
          href="/admin/portfolio/create"
          className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 transition"
        >
          Add Image
        </Link>
      </div>

      {loading ? (
        <p className="text-accent/60">Loading...</p>
      ) : images.length === 0 ? (
        <div className="bg-card border border-accent/10 rounded-lg p-8 text-center">
          <p className="text-accent/60 mb-4">No portfolio images yet</p>
          <Link
            href="/admin/portfolio/create"
            className="inline-block px-6 py-2 bg-accent text-background rounded font-medium hover:opacity-90 transition"
          >
            Add First Image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((img: any) => (
            <div key={img.id} className="bg-card border border-accent/10 rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3] bg-accent/5">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-accent font-semibold text-sm mb-1 truncate">{img.alt}</h3>
                {img.category && (
                  <p className="text-accent/50 text-xs mb-2">{img.category}</p>
                )}
                <p className="text-accent/40 text-xs mb-3">Order: {img.display_order}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/portfolio/${img.id}`}
                    className="flex-1 text-center px-3 py-1.5 text-sm bg-accent/20 text-accent rounded hover:bg-accent/30 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deleting === img.id}
                    className="px-3 py-1.5 text-sm bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 disabled:opacity-50 transition"
                  >
                    {deleting === img.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
