"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolioImage } from "@/lib/api-client";
import ImageUpload from "@/components/ImageUpload";

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    src: "",
    alt: "",
    category: "",
    display_order: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "display_order" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await createPortfolioImage(formData);

    if (result.success) {
      router.push("/admin/portfolio");
    } else {
      setError(result.error || "Failed to create portfolio image");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Add Portfolio Image</h1>
        <p className="text-accent/60">Add a new image to the gallery</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-accent/10 rounded-lg p-8 max-w-2xl">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded px-4 py-3 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <ImageUpload
            value={formData.src}
            onChange={(url) => setFormData((prev) => ({ ...prev, src: url }))}
            label="Image"
          />

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Title / Alt Text *
            </label>
            <input
              type="text"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
                placeholder="e.g. Street, Cinema, Travel"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? "Creating..." : "Create Image"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-accent/20 text-accent rounded font-semibold hover:bg-accent/5 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
