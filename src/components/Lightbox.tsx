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
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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
    setIsLoading(true);
    setDirection(1);
    onNavigate((currentIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setIsLoading(true);
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
        className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-4 md:p-12"
      >
        <button
        style={{ backgroundColor: "white", color: "black" }}
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white font-mono text-[10px] md:text-xs lowercase z-[210] transition-colors 
          bg-black
          
          "
        >
          close / esc
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 bottom-8 md:bottom-12 z-[210] flex flex-col items-center md:items-start gap-4">
          {/* <div 
            style={{ backgroundColor: "white", color: "black" }}
            className="px-5 py-3 border border-black/10 shadow-2xl flex flex-col gap-1.5 min-w-[200px]"
          >
            <span className="text-black/40 font-mono text-[9px] lowercase tracking-[0.3em] block">
              {currentIndex + 1} / {photos.length}
            </span>
            <h3 className="text-black font-syne font-bold lowercase text-sm md:text-base tracking-tighter">
              {currentPhoto.alt}
            </h3>
          </div> */}
        </div>

        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-[210] hidden md:block">
          <button
                  style={{ backgroundColor: "white", color: "black" }}

            onClick={handlePrev}
            className="text-white/20 hover:text-white transition-colors  text-sm font-mono"
          >
            ← prev
          </button>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[210] hidden md:block">
          <button
                  style={{ backgroundColor: "white", color: "black" }}

            onClick={handleNext}
            className="text-white/20 hover:text-white transition-colors text-sm font-mono"
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
                <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
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
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const thresholdX = 100;
                const thresholdY = 100;
                if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
                  if (info.offset.x > thresholdX) handlePrev();
                  else if (info.offset.x < -thresholdX) handleNext();
                } else {
                  if (info.offset.y < -thresholdY) onClose();
                }
              }}
              className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
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
                  onError={() => setIsLoading(false)}
                />
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
