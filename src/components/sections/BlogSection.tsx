"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewPosts, setPreviewPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?published=true&limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPreviewPosts(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".blog-item");
      if (items) {
        gsap.from(items, {
          x: -40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" className="py-32 px-6 md:px-12 max-w-5xl mx-auto bg-background">
      <header className="mb-24">
        <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">blog / thoughts</span>
        <h2 className="text-5xl md:text-[6vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none">
          writings
        </h2>
      </header>

      {loading ? (
        <div className="flex flex-col border-t border-accent/10">
          {[1,2,3].map((i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-accent/10 px-4">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <div className="h-3 w-24 bg-accent/10 animate-pulse rounded" />
                <div className="h-8 w-64 bg-accent/10 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div ref={containerRef} className="flex flex-col border-t border-accent/10">
        {previewPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="blog-item group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-accent/10 hover:bg-accent/[0.02] transition-colors transition-all duration-300 px-4"
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
              <span className="text-accent/40 font-mono text-[10px] uppercase tracking-widest">
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <h3 className="text-3xl font-syne font-bold text-accent group-hover:text-foreground transition-colors lowercase">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      )}

      <div className="mt-20 text-center">
        <Link 
          href="/blog" 
          className="inline-block px-10 py-4 border border-accent/20 hover:border-accent text-accent font-mono text-xs uppercase tracking-widest transition-all hover:bg-accent/5"
        >
          view all articles
        </Link>
      </div>
    </section>
  );
}
