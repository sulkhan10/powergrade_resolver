"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    { id: "01", title: "Capture", desc: "Mastering light and composition on the field." },
    { id: "02", title: "Color", desc: "Crafting the palette to evoke specific emotions." },
    { id: "03", title: "Edit", desc: "Story-driven post-production and refinement." },
    { id: "04", title: "Story", desc: "Finalizing the narrative for impactful delivery." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.from(stepsRef.current, {
        x: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-24">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="flex flex-col justify-center">
            <h2 ref={titleRef} className="text-6xl md:text-8xl font-syne font-bold text-accent lowercase tracking-tighter mb-8">
              process
            </h2>
            <p className="text-accent/60 font-mono text-xs md:text-sm lowercase tracking-tight leading-relaxed max-w-md">
              our creative journey is where vision meets technical precision. every frame is curated, every color is intentional.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="group border-b border-accent/20 pb-4"
              >
                <div className="flex items-start gap-6">
                  <span className="text-accent font-mono text-xs pt-1">{step.id}</span>
                  <div>
                    <h3 className="text-2xl font-syne font-bold text-accent lowercase group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-accent/40 font-mono text-xs lowercase tracking-tight mt-1 opacity-100">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12">
        <span className="text-accent/40 font-mono text-[10px] lowercase tracking-tight">jakarta</span>
      </div>
    </section>
  );
}
