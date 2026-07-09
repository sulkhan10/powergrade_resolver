"use client";

import Lightbox from "@/components/Lightbox";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PortfolioPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPhotos(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background">
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

        {loading ? (
          <p className="text-accent/60 text-center font-mono text-sm">Loading...</p>
        ) : photos.length === 0 ? (
          <p className="text-accent/60 text-center font-mono text-sm">No images yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1, duration: 0.8 }}
                className="relative break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedIdx(index)}
              >
                <div className="relative w-full overflow-hidden bg-accent/5 border border-accent/10 group-hover:border-accent/40 transition-colors duration-500">
                  <img 
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="text-accent/40 font-mono text-[9px] lowercase tracking-widest block mb-1">
                      {photo.category} / 0{index + 1}
                    </span>
                    <h3 className="text-foreground font-syne font-bold lowercase text-lg leading-tight">
                      {photo.alt}
                    </h3>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/40 font-mono text-[10px]">
                      +
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {selectedIdx !== null && photos.length > 0 && (
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
