"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  category?: string;
  title?: string;
  onFullScreen?: () => void;
}

export default function BeforeAfterSlider({ before, after, category, title, onFullScreen }: BeforeAfterSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let x = 0;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
    } else {
      x = (e as MouseEvent).clientX - rect.left;
    }
    
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group select-none border border-accent/10">
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image 
            src={after} 
            alt="After" 
            fill 
            className="object-cover"
            priority
          />
          {/* <div 
            style={{ backgroundColor: "white", color: "black" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 border border-accent/10 font-mono text-[9px] lowercase tracking-widest z-10 transition-colors"
          >
            after
          </div> */}
        </div>

        {/* Before Image (Clip) */}
        <div 
          className="absolute inset-0 overflow-hidden" 
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[100vw] h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
            <Image 
              src={before} 
              alt="Before" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          {/* <div 
            style={{ backgroundColor: "white", color: "black" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 border border-accent/10 font-mono text-[9px] lowercase tracking-widest z-10 transition-colors"
          >
            before
          </div> */}
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 z-20 pointer-events-none" 
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-black dark:bg-white/40 shadow-[0_0_15px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-accent/20 bg-white dark:bg-red flex items-center justify-center shadow-xl transition-colors">
             <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 border-t-2 border-l-2 border-black dark:border-white -rotate-45"></div>
                <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-black dark:border-white rotate-45"></div>
             </div>
          </div>
        </div>
      </div>
      
      {(title || category) && (
        <div 
          style={{ backgroundColor: "white", color: "black" }}
          className="absolute top-6 left-6 p-4 z-30 pointer-events-none border border-accent/10 transition-colors"
        >
          {category && <span className="text-black/40 font-mono text-[9px] lowercase tracking-[0.3em] block mb-1">{category}</span>}
          {title && <h3 className="text-black font-syne font-bold text-lg lowercase tracking-tighter">{title}</h3>}
        </div>
      )}

      {/* {onFullScreen && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFullScreen();
          }}
          style={{ backgroundColor: "white", color: "black" }}
          className="absolute bottom-6 right-6 p-3 border border-accent/10 font-mono text-[10px] lowercase tracking-[0.2em] z-30"
        >
          view fullscreen
        </button>
      )} */}
    </div>
  );
}
