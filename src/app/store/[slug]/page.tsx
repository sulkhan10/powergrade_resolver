"use client";

import Lightbox from "@/components/Lightbox";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import productsData from "@/data/products.json";

interface Software {
  name: string;
  image: string;
}

interface BeforeAfter {
  before: string;
  after: string;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  category: string;
  description: string;
  main_image: string;
  gallery?: string[];
  beforeAfter?: BeforeAfter[];
  beforeAfterOneImage?: string[];
  software_compatibility?: Software[];
  three_cards?: string[];
  link: string;
}

export default function StoreDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = (productsData as Product[]).find(p => p.slug === slug);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!product) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Product not found</div>;

  // Prepare all photos for Lightbox including comparisons and single results
  const galleryPhotos = [
    { src: product.main_image, alt: product.name },
    ...(product.beforeAfterOneImage ? product.beforeAfterOneImage.map((img, i) => ({
      src: img,
      alt: `${product.name} result ${i + 1}`
    })) : []),
    ...(product.beforeAfter ? product.beforeAfter.map((ba, i) => ({
        src: ba.after,
        alt: `${product.name} comparison ${i + 1}`
    })) : []),
    ...(product.gallery ? product.gallery.map((img, i) => ({
      src: img,
      alt: `${product.name} sample ${i + 1}`
    })) : [])
  ];

  // Calculate indices for onClick events
  const baoOffset = 1;
  const baOffset = baoOffset + (product.beforeAfterOneImage?.length || 0);
  const galleryOffset = baOffset + (product.beforeAfter?.length || 0);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] w-full border border-accent/10 overflow-hidden bg-accent/5 cursor-pointer group"
            onClick={() => setSelectedIdx(0)}
          >
            <Image 
              src={product.main_image}
              alt={product.name}
              fill
              className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            {/* View Indicator for Main Image */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/40 font-mono text-[10px]">
                +
              </div>
            </div>
          </motion.div>
 
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <header className="mb-12">
              <div className="flex justify-between items-start mb-4">
                <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block">
                  {product.category} / digital asset
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-syne font-bold text-accent lowercase tracking-tighter leading-tight mb-6">
                {product.name}
              </h1>
              <span className="text-foreground font-mono text-2xl font-bold">{product.price}</span>
            </header>
 
            <div className="space-y-12">
              <div className="text-accent/70 font-mono text-sm md:text-base leading-relaxed lowercase whitespace-pre-wrap">
                {product.description}
              </div>
 
              {/* Software Compatibility */}
              {product.software_compatibility && (
                <div className="space-y-6">
                  <h3 className="text-accent font-syne font-bold text-lg lowercase">Compatibility</h3>
                  <div className="flex flex-wrap gap-6">
                    {product.software_compatibility.map((software, i) => (
                      <div key={i} className="flex items-center gap-3 transition-all group">
                        <div className="relative w-8 h-8">
                          <Image src={software.image} alt={software.name} fill className="object-contain" />
                        </div>
                        <span className="text-accent/60 font-mono text-[10px] lowercase tracking-widest group-hover:text-accent transition-colors">{software.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
 
              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 bg-accent text-background font-mono text-xs uppercase tracking-widest font-bold hover:bg-foreground transition-colors text-center"
              >
                buy now
              </a>
              
              <div className="pt-8 border-t border-accent/10">
                <p className="text-accent/20 font-mono text-[10px] lowercase leading-relaxed">
                  instant digital download. no physical shipping. compatible with major editing software.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

       

        {/* Comparisons Section */}
        {(product.beforeAfter && product.beforeAfter.length > 0)  ? (
          <div className="mt-32">
            <header className="mb-12">
              <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">visuals / comparisons</span>
              <h2 className="text-4xl md:text-5xl font-syne font-bold text-accent lowercase tracking-tighter">
                comparisons
              </h2>
            </header>

            {/* Before After Sliders */}
            {product.beforeAfter && product.beforeAfter.length > 0 && (
              <div className="space-y-12 mb-12">
                {product.beforeAfter.map((ba, i) => (
                  <motion.div
                    key={`ba-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="cursor-pointer"
                  >
                    <BeforeAfterSlider 
                      before={ba.before} 
                      after={ba.after} 
                      category={`${product.category} / 0${i + 1}`}
                      title="Comparison View"
                      onFullScreen={() => setSelectedIdx(baOffset + i)}
                    />
                  </motion.div>
                ))}
              </div>
            )}

         
          </div>
        ) : null}

        {(product.beforeAfterOneImage && product.beforeAfterOneImage.length > 0) ? (
          <div className="mt-32">
            <header className="mb-12">
              <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">visuals / before after</span>
              <h2 className="text-4xl md:text-5xl font-syne font-bold text-accent lowercase tracking-tighter">
                before after
              </h2>
            </header>

          

            {/* Single Large Result Images */}
            {product.beforeAfterOneImage && product.beforeAfterOneImage.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20">
                    {product.beforeAfterOneImage.map((img, i) => (
                        <motion.div
                            key={`bao-${i}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: (i % 3) * 0.1 }}
                            className="relative w-full aspect-[4/5] overflow-hidden group border border-accent/5 cursor-pointer"
                        >
                            <Image 
                                src={img} 
                                alt={`${product.name} result ${i + 1}`} 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIdx(baoOffset + i);
                                }}
                            />
                            <div 
                                style={{ backgroundColor: "white", color: "black" }}
                                className="hidden lg:block absolute top-4 left-4 p-3 z-30 pointer-events-none border border-accent/10 transition-colors"
                            >
                                <span className="text-black/40 font-mono text-[8px] lowercase tracking-[0.3em] block mb-0.5">{product.category} / 0{i + 1}</span>
                                <h3 className="text-black font-syne font-bold text-xs lowercase tracking-tighter">Result</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
          </div>
        ) : null}

        {/* Gallery Grid Section */}
        {product.gallery && product.gallery.length > 0 && (
          <div className="mt-32">
            <header className="mb-12">
              <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-4">visuals / examples</span>
              <h2 className="text-4xl md:text-5xl font-syne font-bold text-accent lowercase tracking-tighter">
                gallery
              </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {product.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="relative aspect-square overflow-hidden group border-[0.5px] border-accent/5 cursor-pointer"
                  onClick={() => setSelectedIdx(galleryOffset + i)}
                >
                  <Image 
                    src={img}
                    alt={`${product.name} sample ${i + 1}`}
                    fill
                    className="object-cover  transition-all duration-700"
                  />
                  {/* View Indicator */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/40 font-mono text-[10px]">
                      +
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
 
  {/* Triple Feature Cards */}
        {product.three_cards && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
            {product.three_cards.map((card, i) => (
              <div key={i} className="border border-accent/10 p-8 pt-12 relative group hover:border-accent/40 transition-colors bg-foreground/[0.01]">
                <span className="absolute top-4 left-4 text-accent/10 font-mono text-4xl">0{i+1}</span>
                <div className="text-accent/60 font-mono text-xs lowercase leading-relaxed whitespace-pre-wrap">
                  {card}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <footer className="mt-24 pt-12 border-b border-accent/10">
          <Link href="/store" className="text-accent font-mono text-xs uppercase tracking-widest border-b border-accent/40 pb-1 hover:border-accent transition-colors">
            back to store
          </Link>
        </footer>
      </section>

      {/* Lightbox Implementation */}
      {selectedIdx !== null && (
        <Lightbox 
          photos={galleryPhotos} 
          currentIndex={selectedIdx} 
          onClose={() => setSelectedIdx(null)}
          onNavigate={(index) => setSelectedIdx(index)}
        />
      )}
 
      <FooterSection />
    </main>
  );
}
