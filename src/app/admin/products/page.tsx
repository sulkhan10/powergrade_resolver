"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/lib/api-client";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    if (result.success) {
      setProducts(result.data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(id);
    const result = await deleteProduct(id);

    if (result.success) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert(result.error || "Failed to delete product");
    }

    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-accent mb-2">Products</h1>
          <p className="text-accent/60">Manage your digital products</p>
        </div>
        <Link
          href="/admin/products/create"
          className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 transition"
        >
          Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-accent/60">Loading...</p>
      ) : products.length === 0 ? (
        <div className="bg-card border border-accent/10 rounded-lg p-8 text-center">
          <p className="text-accent/60 mb-4">No products yet</p>
          <Link
            href="/admin/products/create"
            className="inline-block px-6 py-2 bg-accent text-background rounded font-medium hover:opacity-90 transition"
          >
            Create First Product
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-accent/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-accent/5 border-b border-accent/10">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-accent">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Price</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Rating</th>
                <th className="text-left px-6 py-4 font-semibold text-accent">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-b border-accent/5 hover:bg-accent/5 transition">
                  <td className="px-6 py-4 text-accent font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-accent/70">{product.category}</td>
                  <td className="px-6 py-4 text-accent/70">{product.price}</td>
                  <td className="px-6 py-4 text-accent/70">
                    {product.rating ? `${product.rating}/5` : "N/A"}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="inline-block px-3 py-1 text-sm bg-accent/20 text-accent rounded hover:bg-accent/30 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="px-3 py-1 text-sm bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 disabled:opacity-50 transition"
                    >
                      {deleting === product.id ? "..." : "Delete"}
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
