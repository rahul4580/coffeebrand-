"use client";

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./CursorSection.module.css";

const ITEMS = [
  {
    target: 1 as const,
    name: "Water",
    col: "l" as const,
    row: "top" as const,
    thumbs: [
      "https://plus.unsplash.com/premium_vector-1719374656665-67ce373d2124?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8",
      "https://plus.unsplash.com/premium_vector-1719412827908-8222dd668848?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    target: 2 as const,
    name: "Coffee",
    col: "r" as const,
    row: "top" as const,
    thumbs: [
      "https://plus.unsplash.com/premium_vector-1764681648857-dcbabd7abc5b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyOHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_vector-1731665822758-9bef09459871?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyNHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    target: 3 as const,
    name: "Timing",
    col: "l" as const,
    row: "bottom" as const,
    thumbs: [
      "https://plus.unsplash.com/premium_vector-1731582098306-11e5a1d604ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGltaW5nfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_vector-1731582099221-43d12466429a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRpbWluZ3xlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    target: 4 as const,
    name: "Fire",
    col: "r" as const,
    row: "bottom" as const,
    thumbs: [
      "https://plus.unsplash.com/premium_vector-1719440858689-405459c2077b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZpcmV8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_vector-1722063794775-98406657bb88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxhbWV8ZW58MHx8MHx8fDA%3D",
    ],
  },
] as const;

const CURSOR_IMAGES = [
  "/assets/keyboard.png",
  "/assets/gpu.png",
  "/assets/headset.png",
  "/assets/drone.png",
] as const;

/** Per tutorial string-cursor-lerp values */
const ECHO_LERPS = [0.6, 0.85, 0.95] as const;
const MAIN_LERP = 0.75;
const ROTATE_SMOOTH = 0.12;

export default function CursorSection() {
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({
    mx: 0,
    my: 0,
    e1x: 0,
    e1y: 0,
    e2x: 0,
    e2y: 0,
    e3x: 0,
    e3y: 0,
    rot: 0,
  });
  const [hoverTarget, setHoverTarget] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [desktop, setDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  const rafRef = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const echoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const loop = useCallback(function tick() {
    const t = targetRef.current;
    const s = smoothRef.current;
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    s.mx = lerp(s.mx, t.x, MAIN_LERP);
    s.my = lerp(s.my, t.y, MAIN_LERP);
    s.e1x = lerp(s.e1x, t.x, ECHO_LERPS[0]);
    s.e1y = lerp(s.e1y, t.y, ECHO_LERPS[0]);
    s.e2x = lerp(s.e2x, t.x, ECHO_LERPS[1]);
    s.e2y = lerp(s.e2y, t.y, ECHO_LERPS[1]);
    s.e3x = lerp(s.e3x, t.x, ECHO_LERPS[2]);
    s.e3y = lerp(s.e3y, t.y, ECHO_LERPS[2]);

    const cx =
      typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    const desiredRot = ((s.mx - cx) / 120) * 0.5;
    s.rot = lerp(s.rot, desiredRot, ROTATE_SMOOTH);

    const cur = cursorRef.current;
    if (cur) {
      cur.style.transform = `translate3d(calc(${s.mx}px + 1rem), calc(${s.my}px + 1.5rem), 0) rotate(${s.rot}deg)`;
    }
    const echoes = echoRefs.current;
    const echoPos = [
      { x: s.e1x, y: s.e1y },
      { x: s.e2x, y: s.e2y },
      { x: s.e3x, y: s.e3y },
    ];
    for (let i = 0; i < 3; i++) {
      const el = echoes[i];
      if (el) {
        const { x, y } = echoPos[i];
        el.style.transform = `translate3d(calc(${x}px + 0.5rem), calc(${y}px + 0.75rem), 0)`;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setDesktop(mq.matches);
      if (!mq.matches) {
        setHoverTarget(0);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [desktop, loop]);

  useEffect(() => {
    if (!desktop) return;
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [desktop]);

  return (
    <section className={`${styles.section} relative min-h-screen`} style={{
      backgroundImage: "url('/images/saydung-kettle-6125711_1920.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }} aria-label="Cursor interaction demo">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      <div className={styles.grid}>
        <span className={styles.note}>(Disabled on mobile devices)</span>
        <span className={styles.cross} aria-hidden />

        {ITEMS.map((item) => (
          <div
            key={item.name}
            className={`${styles.item} ${item.col === "l" ? styles.colL : styles.colR} ${item.row === "top" ? styles.rowTop : styles.rowBottom}`}
            onMouseEnter={() => desktop && setHoverTarget(item.target)}
            onMouseLeave={() => desktop && setHoverTarget(0)}
          >
            <figure className="relative w-full h-full">
              <Image 
                src={item.thumbs[0]} 
                alt="" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-[var(--g-gap)]"
              />
            </figure>
            <span className={styles.itemLabel}>{item.name}</span>
            <figure className="relative w-full h-full">
              <Image 
                src={item.thumbs[1]} 
                alt="" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-[var(--g-gap)]"
              />
            </figure>
          </div>
        ))}
      </div>

      {mounted && desktop && (
        <>
          {ECHO_LERPS.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                echoRefs.current[i] = el;
              }}
              className={styles.tutorialCursorEcho}
            />
          ))}

          <div
            ref={cursorRef}
            className={styles.tutorialCursor}
            data-active={hoverTarget > 0 ? String(hoverTarget) : undefined}
            suppressHydrationWarning
          >
            {CURSOR_IMAGES.map((src, i) => (
              <figure key={src} className={styles.cursorFigure}>
                <Image 
                  src={src} 
                  alt="" 
                  fill 
                  sizes="12rem"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
