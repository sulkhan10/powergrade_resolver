"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout, verifySession } from "@/lib/api-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifySession();
      if (result.success) {
        setUser(result.data);
      } else if (!isLoginPage) {
        router.push("/admin/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  // Login page: render without admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh bg-background" data-lenis-prevent>
      {/* Sidebar */}
      <aside className="w-64 border-r border-accent/10 bg-background/50 p-6 overflow-y-auto shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-accent">Admin</h1>
          <p className="text-accent/60 text-sm">Content Management</p>
        </div>

        <nav className="space-y-2 mb-8">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded text-accent hover:bg-accent/10 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 rounded text-accent hover:bg-accent/10 transition"
          >
            Products
          </Link>
          <Link
            href="/admin/blog"
            className="block px-4 py-2 rounded text-accent hover:bg-accent/10 transition"
          >
            Blog Posts
          </Link>
          <Link
            href="/admin/content"
            className="block px-4 py-2 rounded text-accent hover:bg-accent/10 transition"
          >
            Site Content
          </Link>
          <Link
            href="/admin/backup"
            className="block px-4 py-2 rounded text-accent hover:bg-accent/10 transition"
          >
            Backup & Export
          </Link>
        </nav>

        <div className="border-t border-accent/10 pt-4">
          <p className="text-accent/60 text-sm mb-4">
            Logged in as: <strong>{user?.username}</strong>
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-accent/20 text-accent rounded hover:bg-accent/30 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 min-h-0">{children}</div>
      </main>
    </div>
  );
}
