"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import styles from "./PositionTrackerSection.module.css";

export default function PositionTrackerSection() {
  const prevRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [trackerOn, setTrackerOn] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dir, setDir] = useState<string>("1");

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!desktop) {
      setTrackerOn(false);
      return;
    }
    const t = window.setTimeout(() => setTrackerOn(true), 0);
    return () => clearTimeout(t);
  }, [desktop]);

  useEffect(() => {
    if (!desktop || !trackerOn) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - prevRef.current.x;
      const dy = y - prevRef.current.y;
      prevRef.current = { x, y };

      let d = "1";
      if (Math.abs(dx) > Math.abs(dy)) {
        d = dx >= 0 ? "r" : "l";
      } else if (dy !== 0) {
        d = dy >= 0 ? "d" : "u";
      }
      setDir(d);
      setPos({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [desktop, trackerOn]);

  const coordLabel = `c : ${Math.round(pos.x)}${Math.round(pos.y)}`;

  return (
    <section className={styles.section} aria-label="Position tracker demo">
      <div className={styles.tutorial}>
        <div className={`${styles.artWrap} relative h-[50vh]`}>
          <Image
            src="/position-tracker-art.svg"
            alt=""
            fill
            sizes="100vw"
            className={styles.svg}
            priority
          />
        </div>
        <div className={styles.gridWrap}>
          <p>Every pixel tells the story of your journey.</p>
          <p>Where movement becomes meaning.</p>
          <p>[c]</p>
          <p>Motion becomes measurement</p>
          <p>{coordLabel}</p>
        </div>
      </div>

      {desktop && trackerOn && (
        <div
          className={styles.tracker}
          data-dir={dir}
          style={{ left: `${pos.x}px` }}
        />
      )}
    </section>
  );
}
