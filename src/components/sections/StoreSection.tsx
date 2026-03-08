"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

import productsData from "@/data/products.json";

export default function StoreSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  const previewProducts = [...productsData]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".store-product");
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
    <section id="store" className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-background">
      <header className="mb-24">
        <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">store / digital assets</span>
        <h2 className="text-5xl md:text-[6vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none">
          shop assets
        </h2>
      </header>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {previewProducts.map((product) => (
          <Link
            key={product.id}
            href={`/store/${product.slug}`}
            className="store-product group flex flex-col gap-4 border border-accent/10 p-4 bg-foreground/[0.02] hover:border-accent/40 transition-colors"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image 
                src={product.main_image}
                alt={product.name}
                fill
                className="object-cover  group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="flex justify-between items-start mt-4">
              <div>
                <h3 className="text-lg font-syne font-bold text-accent lowercase tracking-tight group-hover:text-foreground transition-colors">
                  {product.name}
                </h3>
                <p className="text-accent/40 font-mono text-[10px] lowercase tracking-widest mt-1">{product.category}</p>
              </div>
              <span className="text-accent font-mono text-xs font-bold">{product.price}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link 
          href="/store" 
          className="inline-block px-10 py-4 border border-accent/20 hover:border-accent text-accent font-mono text-xs uppercase tracking-widest transition-all hover:bg-accent/5"
        >
          visit store
        </Link>
      </div>
    </section>
  );
}
