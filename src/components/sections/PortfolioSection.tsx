"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import Lightbox from "../Lightbox";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPhotos((data.data || []).slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".portfolio-item");
      if (items) {
        gsap.from(items, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
      }
    });
    return () => ctx.revert();
  }, [photos]);

  if (photos.length === 0 && !loading) return null;

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-background">
      <header className="mb-24 text-center">
        <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">discover / selected work</span>
        <h2 className="text-5xl md:text-[6vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none mb-8">
          portfolio
        </h2>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="relative w-full aspect-[4/5] bg-accent/10 animate-pulse border border-accent/10" />
          ))}
        </div>
      ) : (
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="portfolio-item relative group overflow-hidden cursor-pointer"
            onClick={() => setSelectedIdx(index)}
          >
            <div className="relative w-full aspect-[4/5] bg-accent/5 border border-accent/10 group-hover:border-accent/40 transition-colors duration-500">
              <img 
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
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
          </div>
        ))}
      </div>
      )}

      <div className="mt-20 text-center">
        <Link 
          href="/portfolio" 
          className="inline-block px-10 py-4 border border-accent/20 hover:border-accent text-accent font-mono text-xs uppercase tracking-widest transition-all hover:bg-accent/5"
        >
          view full portfolio
        </Link>
      </div>

      {selectedIdx !== null && photos.length > 0 && (
        <Lightbox 
          photos={photos} 
          currentIndex={selectedIdx} 
          onClose={() => setSelectedIdx(null)}
          onNavigate={(index) => setSelectedIdx(index)}
        />
      )}
    </section>
  );
}
