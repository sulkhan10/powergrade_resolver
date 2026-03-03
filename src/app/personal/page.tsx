"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-20 right-0 pointer-events-none select-none overflow-hidden h-full flex items-center">
            <h2 className="text-[25vw] font-syne font-black text-accent/[0.02] leading-none uppercase tracking-tighter rotate-90 origin-right translate-x-[15%]">
                ABOUT
            </h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden border border-accent/10 shadow-2xl"
          >
            <Image 
              src="/assets/Screen Shot 2025-03-17 at 00.41.25.png"
              alt="Wilie Effendi Personal"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </motion.div>

          {/* Text Content Column */}
          <div className="lg:col-span-7">
            <header className="mb-12">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4"
              >
                personal / legacy
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-5xl md:text-[6vw] font-syne font-bold text-accent lowercase tracking-tighter leading-[0.9] mb-8"
              >
                hey it's me,<br />
                <span className="text-white">wilie effendi</span>
              </motion.h1>
            </header>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-10"
            >
              <p className="text-xl md:text-2xl font-syne text-accent/90 leading-relaxed font-medium max-w-2xl">
                hello, i'm wilie effendi, a passionate photographer and content creator committed to capturing life's most beautiful moments. my journey in visual storytelling has led me to create stunning images and videos that resonate with emotion and artistry.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="p-8 border border-accent/10 bg-accent/[0.02] backdrop-blur-sm group hover:border-accent/40 transition-colors">
                  <h3 className="text-accent font-syne font-bold text-lg lowercase mb-4">creative tools</h3>
                  <p className="text-accent/60 font-mono text-xs leading-relaxed mb-6">
                    Lightroom presets, power grades, and LUTs designed to elevate your own photography and videography projects.
                  </p>
                  <a href="/store" className="inline-block text-accent font-mono text-[10px] uppercase tracking-widest border-b border-accent/40 pb-1 hover:border-accent transition-colors">
                    explore store
                  </a>
                </div>

                <div className="p-8 border border-accent/10 bg-accent/[0.02] backdrop-blur-sm group hover:border-accent/40 transition-colors">
                  <h3 className="text-accent font-syne font-bold text-lg lowercase mb-4">insights & blog</h3>
                  <p className="text-accent/60 font-mono text-xs leading-relaxed mb-6">
                    Sharing insights and experiences through my blog, discussing topics related to photography and videography.
                  </p>
                  <a href="/blog" className="inline-block text-accent font-mono text-[10px] uppercase tracking-widest border-b border-accent/40 pb-1 hover:border-accent transition-colors">
                    read stories
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
