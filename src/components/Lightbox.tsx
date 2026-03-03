"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    onNavigate((currentIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-white font-mono text-sm lowercase z-[210] transition-colors"
        >
          close / esc
        </button>

        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-[210] hidden md:block">
          <button
            onClick={handlePrev}
            className="text-white/20 hover:text-white transition-colors p-4"
          >
            ← prev
          </button>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[210] hidden md:block">
          <button
            onClick={handleNext}
            className="text-white/20 hover:text-white transition-colors p-4"
          >
            next →
          </button>
        </div>

        <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col items-center justify-center">
          {/* Loading Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-[205]"
              >
                <div className="w-12 h-12 border-2 border-white/10 border-t-white/40 rounded-full animate-spin"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                hidden: (d: number) => ({
                  opacity: 0,
                  x: d > 0 ? 100 : -100,
                  scale: 0.9,
                }),
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                },
                exit: (d: number) => ({
                  opacity: 0,
                  x: d > 0 ? -100 : 100,
                  scale: 0.9,
                }),
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  className={`object-contain transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  sizes="100vw"
                  priority
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 py-8 text-center bg-gradient-to-t from-black/60 to-transparent">
            <span className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em] block mb-2">
              {currentIndex + 1} / {photos.length}
            </span>
            <h3 className="text-white font-syne font-bold lowercase text-xl tracking-tighter">
              {currentPhoto.alt}
            </h3>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
