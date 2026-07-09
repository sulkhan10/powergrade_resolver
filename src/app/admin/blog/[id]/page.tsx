"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBlogPost, updateBlogPost } from "@/lib/api-client";
import ImageUpload from "@/components/ImageUpload";

export default function EditBlogPage({
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
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    published: false,
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
    const fetchPost = async () => {
      // Try to fetch by slug
      const result = await getBlogPost(id);
      if (result.success && result.data) {
        setFormData(result.data);
      } else {
        setError("Blog post not found");
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const result = await updateBlogPost(formData.slug, formData);

    if (result.success) {
      router.push("/admin/blog");
    } else {
      setError(result.error || "Failed to update blog post");
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="text-accent/60">Loading post...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Edit Blog Post</h1>
        <p className="text-accent/60">Update blog post content</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-accent/10 rounded-lg p-8 max-w-3xl">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded px-4 py-3 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              <ImageUpload
                value={formData.featured_image}
                onChange={(url) => setFormData((prev) => ({ ...prev, featured_image: url }))}
                label="Featured Image"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50 font-mono text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              id="published"
              className="w-4 h-4 rounded"
            />
            <label htmlFor="published" className="text-sm font-medium text-accent">
              Published
            </label>
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
