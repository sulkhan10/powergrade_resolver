"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogPosts, deleteBlogPost } from "@/lib/api-client";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getBlogPosts();
    if (result.success) {
      setPosts(result.data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(posts.find((p) => p.slug === slug)?.id);
    const result = await deleteBlogPost(slug);

    if (result.success) {
      setPosts(posts.filter((p) => p.slug !== slug));
    } else {
      alert(result.error || "Failed to delete post");
    }

    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-accent mb-2">Blog Posts</h1>
          <p className="text-accent/60">Manage your blog content</p>
        </div>
        <Link
          href="/admin/blog/create"
          className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 transition"
        >
          New Post
        </Link>
      </div>

      {loading ? (
        <p className="text-accent/60">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="bg-card border border-accent/10 rounded-lg p-8 text-center">
          <p className="text-accent/60 mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/create"
            className="inline-block px-6 py-2 bg-accent text-background rounded font-medium hover:opacity-90 transition"
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-accent/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-accent/5 border-b border-accent/10">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-accent">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Slug</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Created</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post.id} className="border-b border-accent/5 hover:bg-accent/5 transition">
                  <td className="px-6 py-4 text-accent font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-accent/70">{post.slug}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        post.published
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-accent/70 text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/admin/blog/${post.slug}`}
                      className="inline-block px-3 py-1 text-sm bg-accent/20 text-accent rounded hover:bg-accent/30 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.id}
                      className="px-3 py-1 text-sm bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 disabled:opacity-50 transition"
                    >
                      {deleting === post.id ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
