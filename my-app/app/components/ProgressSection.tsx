"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProgressSection.module.css";

const VIDEO_SRC = "/videos/311602_medium.mp4";

export default function ProgressSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = height - vh;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -top / scrollable));
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} relative min-h-screen`}
      style={{
        backgroundImage: "url('/images/saydung-kettle-6125711_1920.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      aria-label="Progress illustration"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      <div
        className={styles.grid}
        style={{ "--progress": progress } as React.CSSProperties}
        suppressHydrationWarning
      >
        <figure className={`${styles.figure} relative h-full overflow-hidden`}>
          <video 
            src={VIDEO_SRC}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        </figure>
        <span className={styles.line} aria-hidden />
      </div>
    </section>
  );

}
