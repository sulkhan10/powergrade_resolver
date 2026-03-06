"use client";


export default function FooterSection() {
  const contactLinks = [
    { label: "instagram", value: "https://www.instagram.com/wilieeffendi/" },
    { label: "tiktok", value: "https://www.tiktok.com/@wilieeffendi" },
  ];

  return (
    <footer id="contact" className="relative flex flex-col items-center justify-between bg-background py-24 px-6 md:px-12 overflow-hidden border-t border-accent/10">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12 z-10">
        <div className="flex flex-col gap-8">
          <h2 className="text-accent/40 font-mono text-[10px] lowercase tracking-[0.3em]">get in touch</h2>
          <div className="flex flex-col gap-6">
            {contactLinks.map((link) => (
              <a 
                key={link.label}
                href={link.value} 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col"
              >
                <span className="text-accent/40 font-mono text-[9px] lowercase tracking-tight">{link.label}</span>
                <span className="text-3xl md:text-5xl font-syne font-bold text-accent lowercase tracking-tighter group-hover:text-foreground transition-colors">
                  {link.label === "email" ? link.value : `@wilieeffendi`}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:text-right">
          <span className="text-accent/40 font-mono text-[10px] lowercase tracking-tight">location</span>
          <p className="text-accent font-syne font-bold lowercase tracking-tighter text-xl leading-none">
            jakarta, indonesia
          </p>
        </div>
      </div>

      <div className="relative w-full mt-32 z-0">
        <h2 className="text-[18vw] font-syne font-black text-accent lowercase leading-none tracking-tighter select-none pointer-events-none opacity-10">
          wilie effendi
        </h2>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-accent/40 font-mono text-[10px] lowercase tracking-tight mt-8">
        <p>© 2025 wilie effendi</p>
        <p>all rights reserved</p>
      </div>
    </footer>
  );
}
