"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import styles from "./RevealOnScroll.module.css";

const IMAGES = [
  { key: "1", className: styles.image1, src: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29mZmVlfGVufDB8fDB8fHww" },
  { key: "2", className: styles.image2, src: "https://plus.unsplash.com/premium_vector-1721296174521-1680ed7ae674?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { key: "3", className: styles.image3, src: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D" },
  { key: "4", className: styles.image4, src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D" },
  { key: "5", className: styles.image5, src: "https://plus.unsplash.com/premium_vector-1709299690215-e3cdddb3060e?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { key: "6", className: styles.image6, src: "https://plus.unsplash.com/premium_vector-1729883487961-848e9557d8e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8" },
] as const;

function RevealFigure({
  className,
  src,
  alt,
}: {
  className: string;
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inview, setInview] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setInview(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={`${styles.figure} ${className} ${mounted && inview ? styles.figureActive : ""}`}
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </figure>
  );
}

export default function RevealOnScroll() {
  return (
    <section className={`${styles.section} relative overflow-hidden`} style={{
      backgroundImage: `url('/images/cindynhiart-coffee-5635765_1920.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }} aria-label="Scroll to reveal gallery">
      <div className="absolute inset-0 bg-black/40" />
      <div className={styles.grid}>
        <div className={styles.intro}>
          <span className={styles.introLabel}>Scroll to reveal</span>
        </div>
        {IMAGES.map(({ key, className, src }) => (
          <RevealFigure
            key={key}
            className={className}
            src={src}
            alt="Gallery still"
          />
        ))}
      </div>
    </section>
  );
}
