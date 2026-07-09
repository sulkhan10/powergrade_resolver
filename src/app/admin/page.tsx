"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api-client";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts(undefined, 5);
      if (result.success) {
        setProducts(result.data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Dashboard</h1>
        <p className="text-accent/60">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-card border border-accent/10 rounded-lg p-6">
          <p className="text-accent/60 text-sm mb-2">Total Products</p>
          <p className="text-3xl font-bold text-accent">3</p>
        </div>
        <div className="bg-card border border-accent/10 rounded-lg p-6">
          <p className="text-accent/60 text-sm mb-2">Total Posts</p>
          <p className="text-3xl font-bold text-accent">0</p>
        </div>
        <div className="bg-card border border-accent/10 rounded-lg p-6">
          <p className="text-accent/60 text-sm mb-2">Database Status</p>
          <p className="text-3xl font-bold text-accent">✓</p>
        </div>
        <div className="bg-card border border-accent/10 rounded-lg p-6">
          <p className="text-accent/60 text-sm mb-2">Storage</p>
          <p className="text-3xl font-bold text-accent">S3</p>
        </div>
      </div>

      <div className="bg-card border border-accent/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-accent">Recent Products</h2>
          <Link
            href="/admin/products/create"
            className="px-4 py-2 bg-accent text-background rounded font-medium hover:opacity-90 transition"
          >
            Add Product
          </Link>
        </div>

        {loading ? (
          <p className="text-accent/60">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-accent/60">No products yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/10">
                <th className="text-left py-2 text-accent/60">Name</th>
                <th className="text-left py-2 text-accent/60">Category</th>
                <th className="text-left py-2 text-accent/60">Price</th>
                <th className="text-left py-2 text-accent/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-b border-accent/5">
                  <td className="py-3 text-accent">{product.name}</td>
                  <td className="py-3 text-accent/80">{product.category}</td>
                  <td className="py-3 text-accent/80">{product.price}</td>
                  <td className="py-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-accent/60 hover:text-accent transition"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
