"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PersonalSection() {
  return (
    <section id="personal" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto bg-background overflow-hidden">
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.02] -translate-y-20">
        <h2 className="text-[20vw] font-syne font-black uppercase tracking-tighter rotate-90 origin-right">ABOUT</h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">personal / bio</span>
          <h2 className="text-5xl md:text-[6vw] font-syne font-bold text-accent lowercase tracking-tighter leading-[0.9] mb-12">
            hey it's me,<br />
            <span className="text-foreground">wilie effendi</span>
          </h2>
          
          <div className="space-y-8 max-w-xl">
            <p className="text-xl font-syne text-accent/90 leading-relaxed">
              hello, i'm wilie effendi, a passionate photographer and content creator committed to capturing life's most beautiful moments.
            </p>
            <p className="text-accent/60 font-mono text-sm leading-relaxed">
              my journey in visual storytelling has led me to create stunning images and videos that resonate with emotion and artistry. i share my unique perspective on the world through every frame.
            </p>
            <Link 
              href="/personal" 
              className="inline-block text-accent font-mono text-[10px] uppercase tracking-widest border-b border-accent/40 pb-1 hover:border-accent transition-colors"
            >
              read full story
            </Link>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[60vh] border border-accent/10 overflow-hidden"
        >
          <Image 
            src="/assets/Screen Shot 2025-03-17 at 00.41.25.png"
            alt="Wilie Effendi Personal"
            fill
            className="object-cover grayscale"
          />
        </motion.div>
      </div>
    </section>
  );
}
