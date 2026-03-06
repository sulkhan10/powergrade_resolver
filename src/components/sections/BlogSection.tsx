"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const previewPosts = [
  { title: "The Gear I Use in 2025", date: "Feb 12", category: "Gear", slug: "the-gear-i-use-2025" },
  { title: "Finding Light in shadows", date: "Jan 28", category: "Technique", slug: "finding-light-in-shadows" },
  { title: "Jakarta Street Photography Guide", date: "Jan 15", category: "Travel", slug: "jakarta-street-photography-guide" },
];

export default function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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

      <div ref={containerRef} className="flex flex-col border-t border-accent/10">
        {previewPosts.map((post, index) => (
          <Link
            key={post.title}
            href={`/blog/${post.slug}`}
            className="blog-item group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-accent/10 hover:bg-accent/[0.02] transition-colors transition-all duration-300 px-4"
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
              <span className="text-accent/40 font-mono text-[10px] uppercase tracking-widest">{post.date}</span>
              <h3 className="text-3xl font-syne font-bold text-accent group-hover:text-foreground transition-colors lowercase">
                {post.title}
              </h3>
            </div>
            <span className="text-accent/20 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0 group-hover:text-accent/60">
              {post.category}
            </span>
          </Link>
        ))}
      </div>

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
