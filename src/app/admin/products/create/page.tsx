"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api-client";
import ImageUpload from "@/components/ImageUpload";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    type: "lightroom-preset",
    category: "Presets",
    price: "",
    rating: 4.0,
    description: "",
    short_description: "",
    link: "",
    main_image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await createProduct(formData);

    if (result.success) {
      router.push("/admin/products");
    } else {
      setError(result.error || "Failed to create product");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Add Product</h1>
        <p className="text-accent/60">Create a new product listing</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-accent/10 rounded-lg p-8 max-w-2xl">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded px-4 py-3 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
                placeholder="product-name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Price *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
                placeholder="IDR 25K"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
              >
                <option value="lightroom-preset">Lightroom Preset</option>
                <option value="lut">LUT</option>
              </select>
            </div>

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
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Purchase Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Short Description
            </label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <ImageUpload
              value={formData.main_image}
              onChange={(url) => setFormData((prev) => ({ ...prev, main_image: url }))}
              label="Main Image"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? "Creating..." : "Create Product"}
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
