"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog?published=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPosts(data.data || []);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        <header className="mb-24">
          <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">blog / thoughts</span>
          <h1 className="text-6xl md:text-[8vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none">
            writings
          </h1>
        </header>

        <div className="flex flex-col border-t border-accent/10">
          {posts.length === 0 ? (
            <p className="text-accent/60 py-12 text-center font-mono text-sm">No articles yet.</p>
          ) : (
            posts.map((post: any, index: number) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-item group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-accent/10 hover:bg-accent/[0.02] transition-colors transition-all duration-300 px-4"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <span className="text-accent/40 font-mono text-[10px] uppercase tracking-widest min-w-[70px]">
                    {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <h3 className="text-3xl font-syne font-bold text-accent group-hover:text-foreground transition-colors lowercase">
                    {post.title}
                  </h3>
                </div>
                <span className="text-accent/20 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0 group-hover:text-accent/60">
                  Read
                </span>
              </Link>
            ))
          )}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
