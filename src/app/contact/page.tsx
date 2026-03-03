"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  const contactMethods = [
    {
      label: "instagram",
      value: "@wilieeffendi",
      href: "https://www.instagram.com/wilieeffendi/",
      description: "Direct message for inquiries and collaborations."
    },
    {
      label: "tiktok",
      value: "@wilieeffendi",
      href: "https://www.tiktok.com/@wilieeffendi",
      description: "Behind the scenes and creative process."
    },
    {
      label: "location",
      value: "jakarta, indonesia",
      href: "#",
      description: "Available for projects worldwide."
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4"
          >
            contact / connectivity
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[8vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none"
          >
            get in touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-accent/60 font-mono text-xs md:text-sm lowercase tracking-tight leading-relaxed max-w-xl mt-12"
          >
            for collaborations, print inquiries, or just to say hello. 
            feel free to reach out via social media.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-accent/10 pt-16">
          <div className="flex flex-col gap-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <span className="text-accent/40 font-mono text-[10px] lowercase tracking-tight block mb-2">{method.label}</span>
                <a 
                  href={method.href}
                  target={method.href !== "#" ? "_blank" : undefined}
                  rel={method.href !== "#" ? "noopener noreferrer" : undefined}
                  className="text-3xl md:text-5xl font-syne font-bold text-accent lowercase tracking-tighter hover:text-white transition-colors block"
                >
                  {method.value}
                </a>
                <p className="text-accent/30 font-mono text-[11px] lowercase tracking-tight mt-2 italic">
                  {method.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative aspect-square md:aspect-auto h-full min-h-[400px] border border-accent/10 overflow-hidden group shadow-2xl"
          >
            <Image 
              src="/assets/Screen Shot 2025-03-17 at 00.41.25.png"
              alt="Wilie Effendi"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
