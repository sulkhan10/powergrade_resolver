"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const jakartaTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(jakartaTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "home", href: "/", secondary: "01/05" },
    { label: "personal", href: "/personal", secondary: "02/05" },
    { label: "store", href: "/store", secondary: "03/05" },
    { label: "blog", href: "/blog", secondary: "04/05" },
    { label: "contact", href: "/contact", secondary: "05/05" },
    // { label: "home", href: "/", secondary: "01/06" },
    // { label: "portfolio", href: "/portfolio", secondary: "02/06" },
    // { label: "personal", href: "/personal", secondary: "03/06" },
    // { label: "store", href: "/store", secondary: "04/06" },
    // { label: "blog", href: "/blog", secondary: "05/06" },
    // { label: "contact", href: "/contact", secondary: "06/06" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-start px-6 py-6 md:px-10 transition-all duration-500 ease-in-out ${scrolled ? "bg-background/60 backdrop-blur-xl py-4 shadow-lg border-b border-accent/5" : "bg-transparent"
          }`}
      >
        <Link href="/" className="text-accent font-mono text-sm lowercase tracking-tight cursor-pointer hover:opacity-70 transition-opacity">
          wilie effendi
        </Link>

        <div className="hidden md:flex flex-col items-center">
          <div className="flex gap-2 text-accent/60 font-mono text-[11px] lowercase tracking-tight">
            <span>jakarta</span>
            <span>{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-accent hover:opacity-70 transition-opacity flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="text-accent font-mono text-sm lowercase tracking-tight hover:opacity-70 transition-opacity"
          >
            menu
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for side drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-background/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full z-[100] bg-background border-l border-accent/10 flex flex-col px-8 md:px-16 py-12 w-full md:w-[500px] shadow-2xl"
            >
              <div className="flex justify-between items-center w-full mb-20">
                <span className="text-accent/40 font-mono text-[10px] uppercase tracking-[0.2em]">navigation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-accent font-mono text-sm lowercase tracking-tight hover:opacity-70 transition-opacity"
                >
                  close
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-baseline gap-6"
                  >
                    <span className="text-accent/20 font-mono text-sm md:text-base">{item.secondary}</span>
                    <span className="text-5xl md:text-7xl font-syne font-bold text-accent lowercase tracking-tighter hover:text-foreground transition-all duration-300 group-hover:translate-x-2">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-accent/10 flex flex-col gap-8">
                <div className="flex gap-8">
                  <a href="https://www.instagram.com/wilieeffendi/" target="_blank" rel="noopener noreferrer" className="text-accent/60 font-mono text-[11px] lowercase tracking-tight hover:text-accent transition-colors">instagram</a>
                  <a href="https://www.tiktok.com/@wilieeffendi" target="_blank" rel="noopener noreferrer" className="text-accent/60 font-mono text-[11px] lowercase tracking-tight hover:text-accent transition-colors">tiktok</a>
                </div>
                <div className="text-accent/20 font-mono text-[10px] space-y-1">
                  <p>2025 ® all rights reserved</p>
                  <p>wilie effendi</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
