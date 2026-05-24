"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import styles from "./FinalSection.module.css";

/* ─────────────────────────── helpers ─────────────────────────── */

function useClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time ?? "--:--:--";
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
function useScramble(target: string, trigger: boolean, speed = 40) {
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(target);
  const iter = useRef(0);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!trigger || !mounted) { setDisplay(target); return; }
    iter.current = 0;
    const id = setInterval(() => {
      setDisplay(
        target.split("").map((ch, i) =>
          i < iter.current ? target[i]
            : ch === " " ? " "
              : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      if (iter.current >= target.length) clearInterval(id);
      iter.current += 0.5;
    }, speed);
    return () => clearInterval(id);
  }, [trigger, target, speed, mounted]);
  return display;
}

/* ─── magnetic button ─── */
function MagneticBtn({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: "inline-block" }} className={className} aria-label={label}>
      {children}
    </motion.div>
  );
}

/* ─── scramble text on hover ─── */
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [hovered, setHovered] = useState(false);
  const display = useScramble(text, hovered, 30);
  return (
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "default", fontFamily: "inherit" }}
    >
      {display}
    </span>
  );
}

/* ─── letter-by-letter animated heading ─── */
function AnimatedHeading({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: ch === " " ? "inline" : "inline-block" }}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── word-by-word reveal ─── */
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}
          initial={{ y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Floating widget card ─── */
function FloatingCard({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={`${styles.floatingCard} ${className ?? ""}`}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, boxShadow: "0 24px 60px rgba(0,0,0,0.14)" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── constants ─── */
const cubic: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CORE_ITEMS = [
  { num: "01", tag: "(XR/MR/VR)", label: "Perceptual Interfaces" },
  { num: "02", tag: "//////////", label: "Embodiment" },
  { num: "03", tag: "//////////", label: "IA & AI" },
  { num: "04", tag: "//////////", label: "System and Tools" },
];

/* ══════════════════════════════════════════════════════════════ */
export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const time = useClock();
  const [btnHovered, setBtnHovered] = useState(false);
  const btnLabel = useScramble("CHANGE REALITY", btnHovered, 25);
  
  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    dur: number;
    delay: number;
  }
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    })));
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const islandY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const bgGradientY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  /* cursor parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const sMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) / 20);
    mouseY.set((e.clientY - r.top - r.height / 2) / 20);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      onMouseMove={onMouseMove}
      aria-label="Reality by design final section"
    >
      {/* ── Animated grain / texture overlay ── */}
      <div className={styles.grain} />

      {/* ── Animated grid SVG background ── */}
      <svg className={styles.gridBg} width="100%" height="100%" aria-hidden>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.055)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={styles.particle}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Animated radial glow ── */}
      <motion.div className={styles.radialGlow} style={{ y: bgGradientY }} />

      {/* ══ TOP BAR ══ */}
      <motion.div
        className={styles.topBar}
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: cubic }}
      >
        <motion.span
          className={styles.brandName}
          whileHover={{ letterSpacing: "0.35em" }}
          transition={{ duration: 0.3 }}
        >
          <ScrambleText text="RADIANCE" className={styles.brandName} />
        </motion.span>

        <MagneticBtn>
          <motion.button
            className={styles.changeReality}
            onHoverStart={() => setBtnHovered(true)}
            onHoverEnd={() => setBtnHovered(false)}
            whileHover={{ backgroundColor: "#0a0a0a", color: "#fff", scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              animate={{ rotate: btnHovered ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: "inline-block", marginRight: "0.4rem" }}
            >
              ✦
            </motion.span>
            {btnLabel}
          </motion.button>
        </MagneticBtn>

        <div className={styles.localTime}>
          <div className={styles.localTimeLabel}>LOCAL TIME</div>
          <motion.div
            key={time}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {time}
          </motion.div>
        </div>
      </motion.div>

      {/* ══ MAIN CONTENT GRID ══ */}
      <div className={styles.mainGrid}>

        {/* ── LEFT COLUMN ── */}
        <div className={styles.leftCol}>
          {/* Small descriptor widget */}
          <motion.div
            className={styles.descriptorWidget}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: cubic }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={styles.descriptorLabel}>DESIGNING CONNECTIONS<br />BETWEEN HUMANS AND<br />MACHINES</div>
            <div className={styles.descriptorTag}>— A LIVING <span className={styles.tagBox}>CYBERNETIC</span> SYMBIOSIS.</div>
          </motion.div>

          {/* Technical circle diagram */}
          <motion.div
            className={styles.circleDiagram}
            style={{ x: sMouseX, y: sMouseY }}
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: cubic }}
          >
            <svg viewBox="0 0 200 200" className={styles.circleSvg}>
              {/* Concentric rings */}
              {[90, 70, 52, 36, 20].map((r, i) => (
                <motion.circle
                  key={r} cx="100" cy="100" r={r}
                  fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                />
              ))}
              {/* Tick marks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 10 * Math.PI) / 180;
                return (
                  <line key={i}
                    x1={100 + 85 * Math.cos(angle)} y1={100 + 85 * Math.sin(angle)}
                    x2={100 + 92 * Math.cos(angle)} y2={100 + 92 * Math.sin(angle)}
                    stroke="rgba(0,0,0,0.25)" strokeWidth="1"
                  />
                );
              })}
              {/* Rotating sweep */}
              <motion.line
                x1="100" y1="100" x2="100" y2="14"
                stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ originX: "100px", originY: "100px" }}
              />
              <circle cx="100" cy="100" r="3" fill="#0a0a0a" />
            </svg>

            {/* Floating island in the center */}
            <motion.div className={styles.islandCenter} style={{ y: islandY }}>
              <div className={styles.islandFloat}>
                <Image src="/images/island.png" alt="Floating island" width={160} height={120} className={styles.islandSmall} priority />
              </div>
            </motion.div>
          </motion.div>

          {/* Video thumbnail card */}
          <FloatingCard delay={0.4} className={styles.videoCard}>
            <div className={styles.videoThumb}>
              <div className={styles.videoOverlay}>▶</div>
              <div className={styles.videoGradient} />
            </div>
            <div className={styles.videoLabel}>XR / INTERFACE LAB</div>
          </FloatingCard>

          {/* Core threads list */}
          <motion.div
            className={styles.coreThreads}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.5, ease: cubic }}
          >
            <div className={styles.coreLabel}>[CORE THREADS OF MY WORK]</div>
            {CORE_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.coreItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                whileHover={{ x: 6, backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <span className={styles.coreNum}>{item.num}.</span>
                <span className={styles.coreTag}>{item.tag}</span>
                <span className={styles.coreLabel2}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── CENTER / RIGHT – Main headline ── */}
        <div className={styles.rightCol}>

          {/* Giant headline */}
          <h2 className={styles.headline} aria-label="I design systems that shape how humans and machines connect">
            <div className={styles.headlineLine}>
              <AnimatedHeading text="I design " delay={0.05} />
              {/* Inline animated star */}
              <motion.span
                className={styles.starIcon}
                animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.span>
              <AnimatedHeading text=" systems that shape" delay={0.15} />
            </div>

            <div className={styles.headlineLine}>
              <AnimatedHeading text="how " delay={0.4} />
              {/* Highlighted/boxed words */}
              <motion.span
                className={styles.boxedWord}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7, ease: cubic }}
                whileHover={{ backgroundColor: "#0a0a0a", color: "#fff" }}
              >
                <AnimatedHeading text="humans and machines" delay={0.42} />
              </motion.span>
            </div>

            <div className={styles.headlineLine}>
              <AnimatedHeading text="connect." delay={0.75} />
              {/* Animated chain link */}
              <motion.span
                className={styles.chainIcon}
                animate={{ rotate: [0, 10, -10, 0], y: [0, -4, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ⛓
              </motion.span>
            </div>
          </h2>

          {/* Sub body text */}
          <motion.div className={styles.bodyText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <WordReveal
              text="From robotic extensions to perceptual interfaces, my work"
              delay={1.1}
            />
            {/* Inline eye/tech symbol */}
            <motion.span
              className={styles.eyeIcon}
              animate={{ scaleX: [1, 0.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ◎
            </motion.span>
            <WordReveal
              text=" lives at the intersection of"
              delay={1.3}
            />
            {/* Inline coral emoji */}
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", marginLeft: "0.2em" }}
            >
              🪸
            </motion.span>
            <WordReveal text=" biology and technology." delay={1.5} />
          </motion.div>

          {/* Robotic arm widget */}
          <FloatingCard delay={0.8} className={styles.armCard}>
            <div className={styles.armCardInner}>
              <div className={styles.armCardText}>ROBOTIC<br />EXTENSION →</div>
              <div className={styles.armPlaceholder}>
                {/* Animated bars mimicking arm */}
                {[1, 0.8, 0.6, 0.4].map((h, i) => (
                  <motion.div key={i} className={styles.armBar}
                    style={{ height: `${h * 40}px` }}
                    animate={{ scaleY: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
          </FloatingCard>

          {/* Bottom row: def card + bio card */}
          <div className={styles.bottomRow}>
            {/* Definition card */}
            <FloatingCard delay={0.9} className={styles.defCard}>
              <div className={styles.defCardHeader}>
                <ScrambleText text="RADIANCE" className={styles.defCardBrand} />
                <span className={styles.defCardNum}>/25</span>
              </div>
              <div className={styles.defCardLine}>SU (UNDERNEATH)</div>
              <div className={styles.defCardLine}>+ TERA (EARTH)</div>
              <div className={styles.defCardLine} style={{ marginTop: "0.4rem" }}>→ UNDERNEATH THE EARTH</div>
            </FloatingCard>

            {/* Bio card */}
            <FloatingCard delay={1.0} className={styles.bioCard}>
              <div className={styles.bioCardHeader}>
                <span className={styles.bioCardTitle}>NOT A STUDIO – JUST ME</span>
                <motion.div className={styles.closeBtn} whileHover={{ rotate: 90, scale: 1.2 }} transition={{ duration: 0.2 }}>✕</motion.div>
              </div>
              <p className={styles.bioCardText}>
                I&apos;m building Radiance — working at the intersection of design and technology. I give talks, mentor, and write about systems that shape how we interact with machines.
              </p>
              <div className={styles.bioLinks}>
                {["LINKEDIN", "MEDIUM", "INSTAGRAM"].map((l) => (
                  <MagneticBtn key={l}>
                    <motion.span
                      className={styles.bioLink}
                      whileHover={{ backgroundColor: "#0a0a0a", color: "#fff", scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ScrambleText text={l} />
                    </motion.span>
                  </MagneticBtn>
                ))}
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* ── Decorative animated crosshairs ── */}
      {([
        { top: "20%", left: "35%" },
        { top: "50%", left: "55%" },
        { bottom: "25%", left: "72%" },
        { top: "72%", left: "28%" },
      ] as React.CSSProperties[]).map((pos, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", width: 16, height: 16, color: "rgba(0,0,0,0.22)", ...pos, pointerEvents: "none" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
          animate={{ rotate: [0, 90, 0] }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* ── Animated bottom border line ── */}
      <motion.div
        className={styles.bottomLine}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: cubic }}
      />
    </section>
  );
}
