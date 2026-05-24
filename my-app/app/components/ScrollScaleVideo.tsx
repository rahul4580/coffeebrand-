"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoScrollOverlay.module.css";

const MIN_SCALE = 0.46;
const VIDEO_SRC = "/videos/344488_medium.mp4";

const PARAGRAPH =
  'The weather in the UK is a curious experiment designed to test patience rather than provide comfort. It can be raining, sunny, windy, and mildly offensive within the same afternoon. Forecasts exist mostly for entertainment, umbrellas serve as emotional support, and any mention of "summer" should be treated as a bold rumour.';

const WORDS = PARAGRAPH.split(/\s+/).filter(Boolean);
const WORD_GLOBAL_TOTAL = WORDS.length + 3;

export default function ScrollScaleVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [radius, setRadius] = useState(32);
  const [scrollP, setScrollP] = useState(0);

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
      setScrollP(p);
      setScale(MIN_SCALE + (1 - MIN_SCALE) * p);
      setRadius(32 * (1 - p));
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
      className="relative bg-[C:\Users\rahul\OneDrive\Desktop\app\my-app\public\images\zazufiane-coffee-7045578_1920.png]"
      style={{ height: "240vh" }}
      aria-label="Featured video"
      // imagesrc={"C:\Users\rahul\OneDrive\Desktop\app\my-app\public\images\zazufiane-coffee-7045578_1920.png"}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <div
            className="relative overflow-visible will-change-transform"
            style={{
              width: "100vw",
              height: "100vh",
              transform: `scale(${scale})`,
              borderRadius: `${radius}px`,
              boxShadow:
                scale < 0.98
                  ? "0 25px 80px rgba(171, 69, 6, 0.74)"
                  : "none",
            }}
            suppressHydrationWarning
          >
          <div
            className="absolute inset-0 overflow-hidden bg-black"
            style={{ borderRadius: `${radius}px` }}
          >
            <video
              className="h-full w-full object-cover"
              src="/videos/344488_medium.mp4"
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
            />
            <img 
              src="/images/zazufiane-coffee-7045578_1920.png" 
              alt="Coffee background" 
              className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-30 mix-blend-overlay"
            />
          </div>

          <div className={styles.overlay}>
            <div
              className={styles.leftTutorial}
              style={
                {
                  "--progress": scrollP,
                  "--st-g-margin": "clamp(0.75rem, 3vw, 2rem)",
                } as React.CSSProperties
              }
            >
              <div className={styles.leftInner}>
                <div className={styles.splitted}>
                  <span className={styles.sLine}>
                    <span
                      className={styles.indent}
                      data-val-pct={String(Math.round(scrollP * 100))}
                    />
                    {WORDS.map((word, i) => (
                      <span
                        key={`${i}-${word}`}
                        className={`${styles.sWord} ${i < 2 ? `${styles.highlight} ${styles.leadWord}` : ""}`}
                        style={
                          {
                            "--word-index": i + 3,
                            "--word-global-total": WORD_GLOBAL_TOTAL,
                          } as React.CSSProperties
                        }
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
