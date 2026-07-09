"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPost(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-accent/60 font-mono text-sm">Loading...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-accent/60 font-mono text-sm">Post not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <h1 className="text-5xl md:text-7xl font-syne font-bold text-accent lowercase tracking-tighter leading-[0.9] mb-12">
              {post.title}
            </h1>
          </motion.div>

          {post.featured_image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative h-[60vh] w-full border border-accent/10 overflow-hidden"
            >
              <img 
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-none"
        >
          <div
            className="text-accent/70 font-mono text-base md:text-lg leading-relaxed lowercase whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        <footer className="mt-24 pt-12 border-t border-accent/10">
          <a href="/blog" className="text-accent font-mono text-xs uppercase tracking-widest border-b border-accent/40 pb-1 hover:border-accent transition-colors">
            back to writings
          </a>
        </footer>
      </article>

      <FooterSection />
    </main>
  );
}
