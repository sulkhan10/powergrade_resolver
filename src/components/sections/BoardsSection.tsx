"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function BoardsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const boards = [
    { title: "Analog Presets", type: "Visual Assets", id: "01/06", img: "/assets/ThumbnailLightroomPresetProduct.PNG" },
    { title: "Cinematic LUTs", type: "Color Grading", id: "02/06", img: "/assets/Photo_Product_Street_Film_Emulation_LUTs.jpg" },
    { title: "Visual Stories", type: "Photography", id: "03/06", img: "/assets/DSCF1195.jpg" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="boards" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden py-24">
      <div className="w-full max-w-7xl px-6 md:px-12">
        <h2 className="text-[10vw] font-syne font-bold text-accent/10 lowercase absolute top-20 left-12 pointer-events-none">
          work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {boards.map((board, index) => (
            <div 
              key={board.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[60vh] bg-accent/5 overflow-hidden flex flex-col justify-end p-8 border border-accent/10 hover:border-accent/40 transition-colors"
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={board.img} 
                  alt={board.title} 
                  fill 
                  className="object-cover opacity-60 grayscale-[0.3] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-t from-black to-transparent z-10"></div>
              
              <div className="relative z-20">
                <span className="text-accent/40 font-mono text-[10px] lowercase tracking-widest block mb-2">{board.id}</span>
                <h2 className="text-4xl font-syne font-bold text-accent lowercase tracking-tighter group-hover:text-foreground transition-colors">
                  {board.title}
                </h2>
                <p className="text-accent/60 font-mono text-xs lowercase tracking-tight mt-2">{board.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 right-12">
        <a href="#" className="text-accent font-mono text-xs lowercase tracking-tight hover:underline">view all work →</a>
      </div>
    </section>
  );
}
