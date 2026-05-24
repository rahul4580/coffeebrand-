"use client";

import { useEffect, useRef, useState } from "react";

const lines = [
  "NEXT GENERATION",
  "HARDWARE CRAFTED",
  "FOR THE FUTURE",
];

export default function KineticTextSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#050505",
        padding: "6rem 2rem",
        overflow: "hidden",
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            overflow: "hidden",
            marginBottom: li < lines.length - 1 ? "0.25rem" : 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: li % 2 === 0 ? "#fff" : "transparent",
              WebkitTextStroke: li % 2 === 0 ? "0px" : "1px rgba(255,255,255,0.4)",
              transform: mounted && visible ? "translateY(0)" : "translateY(110%)",
              transition: `transform 1s cubic-bezier(0.19,1,0.22,1) ${li * 0.15}s`,
            }}
          >
            {line}
          </p>
        </div>
      ))}
      <div
        style={{
          marginTop: "3rem",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,90,55,0.7), transparent)",
          transform: mounted && visible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1.5s cubic-bezier(0.19,1,0.22,1) 0.5s",
          transformOrigin: "left",
        }}
      />
      <p
        style={{
          marginTop: "2rem",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "Arial, sans-serif",
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: mounted && visible ? 1 : 0,
          transform: mounted && visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(0.19,1,0.22,1) 0.7s",
        }}
      >
        Engineered for excellence
      </p>
    </div>
  );
}
