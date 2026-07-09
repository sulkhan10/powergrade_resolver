"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProduct, updateProduct } from "@/lib/api-client";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    const initParams = async () => {
      const { id: paramId } = await params;
      setId(paramId);
    };
    initParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const result = await getProduct(parseInt(id));
      if (result.success && result.data) {
        setFormData(result.data);
      } else {
        setError("Product not found");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

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
    setSaving(true);

    const result = await updateProduct(parseInt(id), formData);

    if (result.success) {
      router.push("/admin/products");
    } else {
      setError(result.error || "Failed to update product");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="text-accent/60">Loading product...</div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Edit Product</h1>
        <p className="text-accent/60">Update product information</p>
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
            <label className="block text-sm font-semibold text-accent mb-2">
              Main Image URL
            </label>
            <input
              type="url"
              name="main_image"
              value={formData.main_image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
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
