"use client";

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GlideSection.module.css";

/** Matches tutorial string-glide magnitudes (center = 0) */
const GLIDE_FACTORS = [1.0, 0.5, 0.0, 0.5, 1.0] as const;
/** Fan outward: left stack ↔ right stack */
const GLIDE_SIGN = [-1, -1, 0, 1, 1] as const;

const IMAGES = [
  { src: "https://plus.unsplash.com/premium_vector-1756997386432-9c3ba22079ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI4fHx8ZW58MHx8fHx8", className: styles.image1 },
  { src: "https://plus.unsplash.com/premium_vector-1758287263566-ebd2553bf64a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMxfHx8ZW58MHx8fHx8", className: styles.image2 },
  { src: "https://plus.unsplash.com/premium_vector-1765438363413-4adb4b63ee9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU0fHx8ZW58MHx8fHx8", className: styles.image3 },
  { src: "https://plus.unsplash.com/premium_vector-1768547485257-f30522ce77f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU1fHx8ZW58MHx8fHx8", className: styles.image4 },
  { src: "https://plus.unsplash.com/premium_vector-1759976467234-05494d0f6f4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYzfHx8ZW58MHx8fHx8", className: styles.image5 },
] as const;

const MAX_SHIFT_PX = 110;

export default function GlideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shifts, setShifts] = useState<[number, number, number, number, number]>([
    0, 0, 0, 0, 0,
  ]);

  const update = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) {
      setShifts([0, 0, 0, 0, 0]);
      return;
    }

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const range = vh + rect.height;
    const scrolled = vh - rect.top;
    const raw = range > 0 ? scrolled / range : 0.5;
    const u = Math.max(0, Math.min(1, raw));
    const t = (u - 0.5) * 2;

    setShifts(
      GLIDE_FACTORS.map((g, i) => t * MAX_SHIFT_PX * g * GLIDE_SIGN[i]) as [
        number,
        number,
        number,
        number,
        number,
      ]
    );
  }, []);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => update();
    onMq();
    mq.addEventListener("change", onMq);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <section ref={sectionRef} className={`${styles.section} relative min-h-screen`} style={{
      backgroundImage: "url('/images/saydung-kettle-6125711_1920.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }} aria-label="Glide gallery">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      <div className={styles.grid}>
        <span className={styles.note}>
          <span className={styles.noteMobile}>(Glide off on small screens)</span>
          <span className={styles.noteDesktop}>
            (Disabled on mobile devices)
          </span>
        </span>
        <p className={styles.copy}>
          Order is temporary — tension is permanent.
        </p>

        {IMAGES.map(({ src, className }, i) => (
          <figure key={src} className={`${styles.figure} ${className}`}>
            <Image
              src={src}
              alt="Glide gallery image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{
                transform: `translate3d(${shifts[i]}px, 0, 0)`,
              }}
              suppressHydrationWarning
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
