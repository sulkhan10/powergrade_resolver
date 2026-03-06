"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import Lightbox from "../Lightbox";

gsap.registerPlugin(ScrollTrigger);

const previewPhotos = [
  { src: "/assets/DSCF1195.jpg", alt: "Visual Stories", category: "Street" },
  { src: "/assets/DSCF1147.jpg", alt: "Cinematic Scene", category: "Cinema" },
  { src: "/assets/DSCF0912.jpg", alt: "Street Moment", category: "Urban" },
];

export default function PortfolioSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-background">
      <header className="mb-24 text-center">
        <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">discover / selected work</span>
        <h2 className="text-5xl md:text-[6vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none mb-8">
          portfolio
        </h2>
      </header>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {previewPhotos.map((photo, index) => (
          <div
            key={photo.src}
            className="portfolio-item relative group overflow-hidden cursor-pointer"
            onClick={() => setSelectedIdx(index)}
          >
            <div className="relative w-full aspect-[4/5] bg-accent/5 border border-accent/10 group-hover:border-accent/40 transition-colors duration-500">
              <Image 
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Bottom Info Bar - Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="text-accent/40 font-mono text-[9px] lowercase tracking-widest block mb-1">
                  {photo.category} / 0{index + 1}
                </span>
                <h3 className="text-foreground font-syne font-bold lowercase text-lg leading-tight">
                  {photo.alt}
                </h3>
              </div>

              {/* View Indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/40 font-mono text-[10px]">
                  +
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link 
          href="/portfolio" 
          className="inline-block px-10 py-4 border border-accent/20 hover:border-accent text-accent font-mono text-xs uppercase tracking-widest transition-all hover:bg-accent/5"
        >
          view full portfolio
        </Link>
      </div>

      {selectedIdx !== null && (
        <Lightbox 
          photos={previewPhotos} 
          currentIndex={selectedIdx} 
          onClose={() => setSelectedIdx(null)}
          onNavigate={(index) => setSelectedIdx(index)}
        />
      )}
    </section>
  );
}
