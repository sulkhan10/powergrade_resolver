"use client";

import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import products from "@/data/products.json";

const categories = ["All", "Presets", "PowerGrades", "LUTs"];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">store / digital assets</span>
          <h1 className="text-6xl md:text-[8vw] font-syne font-bold text-accent lowercase tracking-tighter leading-none">
            shop assets
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-12">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 border rounded-full font-mono text-xs lowercase transition-all ${
                  activeCategory === cat 
                    ? "border-accent text-accent bg-accent/5" 
                    : "border-accent/10 text-accent/60 hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.name}
              href={`/store/${product.slug}`}
              className="group"
            >
              <motion.div
                key={`${activeCategory}-${product.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col gap-4 border border-accent/10 p-4 hover:border-accent/40 transition-colors bg-foreground/[0.02]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-accent/5">
                  <Image 
                    src={product.main_image}
                    alt={product.name}
                    fill
                    className="object-cover  group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="flex justify-between items-start mt-4">
                  <div>
                    <h2 className="text-xl font-syne font-bold text-accent lowercase tracking-tight group-hover:text-foreground transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-accent/40 font-mono text-[10px] lowercase tracking-widest mt-1">{product.category}</p>
                  </div>
                  <span className="text-accent font-mono text-xs font-bold">{product.price}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
