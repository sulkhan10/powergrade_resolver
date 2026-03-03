"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

const blogPosts = {
  "the-gear-i-use-2025": {
    title: "The Gear I Use in 2025",
    date: "Feb 12, 2025",
    category: "Gear",
    image: "/assets/DSCF1147.jpg",
    content: `
      <ctrl42>ing into 2025, my workflow has shifted towards a more compact and efficient setup. photography is as much about the tools as it is about the vision, but having the right ones can truly liberate the creative process.

      my primary camera remains the fujifilm x-series, known for its exceptional color science and tactile controls. it allows me to stay present in the moment rather than getting buried in menus.

      in this post, i'll break down the specific lenses, filters, and accessories that have become essential to my daily carry.
    `
  },
  "finding-light-in-shadows": {
    title: "Finding Light in Shadows",
    date: "Jan 28, 2025",
    category: "Technique",
    image: "/assets/DSCF1195.jpg",
    content: `
      as photographers, we are often taught to chase the light. but some of the most powerful stories are found where the light ends and the shadows begin. 

      low-light photography isn't just about technical settings; it's about mood, mystery, and the emotion of the unknown. capturing the interplay between highlights and deep blacks is a deliberate choice that defines a cinematic aesthetic.

      here are my thoughts on how to intentionally use shadows to create depth and focus in your compositions.
    `
  },
  "jakarta-street-photography-guide": {
    title: "Jakarta Street Photography Guide",
    date: "Jan 15, 2025",
    category: "Travel",
    image: "/assets/DSCF0912.jpg",
    content: `
      jakarta is a city of contrasts. from the towering skyscrapers of sudirman to the chaotic charm of kota tua, there is a story on every corner if you're patient enough to wait for it.

      street photography here requires a blend of boldness and respect. the heat, the traffic, and the sheer energy of the city can be overwhelming, but for a photographer, it's a playground of constant motion.

      this guide covers my favorite locations, the best times to shoot, and how to navigate the city's complex urban landscape.
    `
  }
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Post not found</div>;

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <article className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">
              {post.category} / {post.date}
            </span>
            <h1 className="text-5xl md:text-7xl font-syne font-bold text-accent lowercase tracking-tighter leading-[0.9] mb-12">
              {post.title}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative h-[60vh] w-full border border-accent/10 overflow-hidden"
          >
            <Image 
              src={post.image}
              alt={post.title}
              fill
              className="object-cover grayscale-[0.2]"
            />
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-invert max-w-none"
        >
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-accent/70 font-mono text-base md:text-lg leading-relaxed mb-8 lowercase">
              {paragraph.trim()}
            </p>
          ))}
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
