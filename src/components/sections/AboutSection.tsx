export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center justify-center bg-background px-6 md:px-12 overflow-hidden py-24"
    >
      <div className="relative max-w-4xl text-center">
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
