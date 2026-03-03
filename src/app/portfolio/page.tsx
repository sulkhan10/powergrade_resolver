"use client";

import Lightbox from "@/components/Lightbox";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const photos = [
  { src: "/assets/DSCF1195.jpg", alt: "Visual Stories", height: "h-[500px]", category: "Street" },
  { src: "/assets/DSCF1147.jpg", alt: "Cinematic Scene", height: "h-[400px]", category: "Cinema" },
  { src: "/assets/DSCF0912.jpg", alt: "Street Moment", height: "h-[600px]", category: "Urban" },
  { src: "/assets/DSCF0918.jpg", alt: "Urban Life", height: "h-[450px]", category: "Street" },
  { src: "/assets/DSCF0921.jpg", alt: "Portraits", height: "h-[550px]", category: "People" },
  { src: "/assets/DSCF0926.jpg", alt: "Details", height: "h-[400px]", category: "Macro" },
  { src: "/assets/DSCF0972.jpg", alt: "Nature", height: "h-[500px]", category: "Travel" },
  { src: "/assets/DSCF0976.jpg", alt: "Light & Shadow", height: "h-[650px]", category: "Cinema" },
  { src: "/assets/DSCF1006.jpg", alt: "Composition", height: "h-[400px]", category: "Minimal" },
  { src: "/assets/DSCF1017.jpg", alt: "Atmosphere", height: "h-[550px]", category: "Night" },
  { src: "/assets/DSCF1018.jpg", alt: "Street Story", height: "h-[450px]", category: "Urban" },
  { src: "/assets/DSCF1036.jpg", alt: "Cinematic Colors", height: "h-[600px]", category: "Cinema" },
  { src: "/assets/DSCF1047.jpg", alt: "Visual Flow", height: "h-[500px]", category: "Street" },
  { src: "/assets/DSCF1048.jpg", alt: "Urban Texture", height: "h-[550px]", category: "Details" },
  { src: "/assets/DSCF1061.jpg", alt: "Daily Life", height: "h-[400px]", category: "Street" },
  { src: "/assets/DSCF1086.jpg", alt: "Minimalism", height: "h-[600px]", category: "Art" },
];

export default function PortfolioPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <header className="mb-24 text-center">
          <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">discover / photo gallery</span>
          <h1 className="text-6xl md:text-[8vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none mb-8">
            portfolio
          </h1>
          <p className="text-accent/60 font-mono text-xs max-w-lg mx-auto leading-relaxed">
            a collection of captured moments, cinematic stories, and visual explorations through the lens.
          </p>
        </header>

        {/* Masonry Layout using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.8 }}
              className="relative break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedIdx(index)}
            >
              <div className={`relative w-full ${photo.height} overflow-hidden bg-accent/5 border border-accent/10 group-hover:border-accent/40 transition-colors duration-500`}>
                <Image 
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  priority={index < 8}
                  loading={index >= 8 ? "lazy" : undefined}
                />
                
                {/* Hover Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="text-accent/40 font-mono text-[9px] lowercase tracking-widest block mb-1">
                    {photo.category} / 0{index + 1}
                  </span>
                  <h3 className="text-white font-syne font-bold lowercase text-lg leading-tight">
                    {photo.alt}
                  </h3>
                </div>

                {/* View Indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 font-mono text-[10px]">
                    +
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {selectedIdx !== null && (
        <Lightbox 
          photos={photos} 
          currentIndex={selectedIdx} 
          onClose={() => setSelectedIdx(null)}
          onNavigate={(index) => setSelectedIdx(index)}
        />
      )}

      <FooterSection />
    </main>
  );
}
