"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation feel
      const chars = headlineRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.from(chars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5,
          force3D: true,
        });
      }

      gsap.from(subtextRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });

      // Simple parallax on scroll
      gsap.to(imageRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Background Photography */}
      <div className="absolute inset-0 z-0 scale-110">
        <div ref={imageRef} className="relative w-full h-full">
          <Image 
            src="/assets/DSCF1147.jpg" 
            alt="Wilie Effendi Photography" 
            fill 
            sizes="100vw"
            className="object-cover opacity-60 grayscale-[0.2]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
      </div>

 
       <div className="relative z-20 text-center px-4">
        <h1 
          ref={headlineRef}
          className="text-[10vw] md:text-[8vw] font-syne font-bold leading-[0.85] tracking-tighter text-accent lowercase perspective-1000"
        >
          <div className="overflow-hidden">
            {splitText("capture life")}
          </div>
          <div className="overflow-hidden text-white">
            {splitText("storytell more")}
          </div>
        </h1>
        
        <div ref={subtextRef}>
          <p className="mt-8 text-accent font-mono text-sm md:text-base lowercase tracking-tight max-w-md mx-auto">
            photographer and content creator. capturing life's most beautiful moments.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer z-20">
        <span className="text-accent/60 font-mono text-[10px] lowercase tracking-tight rotate-90 origin-left group-hover:text-accent transition-colors duration-300">scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-accent/40 group-hover:bg-accent transition-colors duration-300"
        />
      </div>

     
    </section>
  );
}
