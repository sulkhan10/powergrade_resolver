"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  { title: "The Gear I Use in 2025", date: "Feb 12", category: "Gear", slug: "the-gear-i-use-2025" },
  { title: "Finding Light in shadows", date: "Jan 28", category: "Technique", slug: "finding-light-in-shadows" },
  { title: "Jakarta Street Photography Guide", date: "Jan 15", category: "Travel", slug: "jakarta-street-photography-guide" },
  { title: "Editing for a cinematic Look", date: "Jan 04", category: "Workflow", slug: "the-gear-i-use-2025" },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        <header className="mb-24">
          <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">blog / thoughts</span>
          <h1 className="text-6xl md:text-[8vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none">
            writings
          </h1>
        </header>

        <div className="flex flex-col border-t border-accent/10">
          {posts.map((post, index) => (
            <Link
              key={post.title}
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-accent/10 hover:bg-accent/[0.02] transition-colors transition-all duration-300 px-4"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12"
              >
                <span className="text-accent/40 font-mono text-[10px] uppercase tracking-widest">{post.date}</span>
                <h2 className="text-3xl md:text-4xl font-syne font-bold text-accent group-hover:text-white transition-colors lowercase">
                  {post.title}
                </h2>
              </motion.div>
              <span className="text-accent/20 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0 group-hover:text-accent/60">
                {post.category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
