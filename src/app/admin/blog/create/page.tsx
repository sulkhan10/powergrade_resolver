"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/api-client";
import ImageUpload from "@/components/ImageUpload";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    published: false,
  });

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
    setLoading(true);

    const result = await createBlogPost(formData);

    if (result.success) {
      router.push("/admin/blog");
    } else {
      setError(result.error || "Failed to create blog post");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">New Blog Post</h1>
        <p className="text-accent/60">Create a new blog post</p>
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
                placeholder="blog-post-title"
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
              placeholder="Short summary of the post"
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
              Publish immediately
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? "Creating..." : "Create Post"}
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
