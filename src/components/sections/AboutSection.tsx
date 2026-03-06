"use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { useEffect, useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  // const sectionRef = useRef<HTMLElement>(null);
  // const textRef = useRef<HTMLDivElement>(null);
  // const contentRef = useRef<HTMLDivElement>(null);
  // const fragmentsRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // Pin section and scale background text
  //     gsap.fromTo(textRef.current, 
  //       { scale: 0.8, opacity: 0, rotate: -5 },
  //       {
  //         scale: 1.2,
  //         opacity: 0.05,
  //         rotate: 0,
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top bottom",
  //           end: "bottom top",
  //           scrub: 1,
  //         },
  //         force3D: true,
  //       }
  //     );

  //     // Content reveal with stagger feel
  //     const paragraphs = contentRef.current?.querySelectorAll("p");
  //     if (paragraphs) {
  //       gsap.from(paragraphs, {
  //         y: 60,
  //         opacity: 0,
  //         stagger: 0.2,
  //         duration: 1,
  //         ease: "power3.out",
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top 70%",
  //           end: "top 30%",
  //           scrub: 0.5,
  //         },
  //         force3D: true,
  //       });
  //     }

  //     // Mouse Parallax Effect - Optimized
  //     const fragments = fragmentsRef.current?.querySelectorAll(".fragment");
  //     const setters = Array.from(fragments || []).map(frag => ({
  //       x: gsap.quickSetter(frag, "x", "px"),
  //       y: gsap.quickSetter(frag, "y", "px")
  //     }));
  //     const textSetterX = gsap.quickSetter(textRef.current, "x", "px");
  //     const textSetterY = gsap.quickSetter(textRef.current, "y", "px");

  //     const handleMouseMove = (e: MouseEvent) => {
  //       const { clientX, clientY } = e;
  //       const xPos = (clientX / window.innerWidth - 0.5) * 2;
  //       const yPos = (clientY / window.innerHeight - 0.5) * 2;

  //       setters.forEach((set, i) => {
  //         const speed = (i + 1) * 20;
  //         set.x(xPos * speed);
  //         set.y(yPos * speed);
  //       });

  //       textSetterX(xPos * 10);
  //       textSetterY(yPos * 10);
  //     };

  //     window.addEventListener("mousemove", handleMouseMove, { passive: true });
  //     return () => window.removeEventListener("mousemove", handleMouseMove);
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

  // const decorativeImages = [
  //   { src: "/assets/IMG_4943.PNG", size: "w-32 h-40", pos: "top-20 left-[10%]", rotate: "rotate-12", delay: 0 },
  //   { src: "/assets/IMG_4944.PNG", size: "w-40 h-32", pos: "bottom-40 left-[15%]", rotate: "-rotate-6", delay: 0.2 },
  //   { src: "/assets/IMG_4945.PNG", size: "w-24 h-32", pos: "top-40 right-[15%]", rotate: "-rotate-12", delay: 0.4 },
  //   { src: "/assets/IMG_4946.PNG", size: "w-32 h-32", pos: "bottom-20 right-[10%]", rotate: "rotate-6", delay: 0.6 },
  // ];

  return (
    <section 
      id="about" 
      // ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-background px-6 md:px-12 overflow-hidden py-24"
    >
      {/* Background Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>

      {/* Floating Decorative Fragments */}
      {/* <div ref={fragmentsRef} className="absolute inset-0 pointer-events-none z-0">
        {decorativeImages.map((img, i) => (
          <div 
            key={i}
            className={`fragment absolute ${img.size} ${img.pos} ${img.rotate} opacity-10 grayscale border border-foreground/10 overflow-hidden transition-all duration-700`}
          >
            <Image 
              src={img.src}
              alt="decorative"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div> */}

      {/* <div 
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 select-none pointer-events-none z-0"
      >
        <h2 className="text-[35vw] font-syne font-black text-foreground uppercase leading-none opacity-[0.05]">
          WILIE
        </h2>
      </div> */}

      <div 
      // ref={contentRef} 
      className="relative z-10 max-w-4xl text-center">
        <div className="space-y-8">
          <p className="text-4xl md:text-6xl font-syne font-bold text-foreground uppercase tracking-tighter leading-tight">
            Capturing life's most beautiful moments <br />
            through visual storytelling.
          </p>
          
          <p className="text-foreground/60 font-mono text-sm md:text-xl lowercase tracking-tight leading-relaxed max-w-2xl mx-auto">
            Committed to creating images and videos that resonate with emotion and artistry. Focused on the intersection of light, shadow, and human connection.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 text-right z-10">
        <span className="text-foreground/30 font-mono text-[9px] lowercase tracking-[0.2em] uppercase">about // visual artist</span>
      </div>
    </section>
  );
}
