"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function KineticTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothX1 = useSpring(x1, springConfig);
  const smoothX2 = useSpring(x2, springConfig);

  const phrases = ["CREATIVE", "ENGINEERING", "KINETIC", "DYNAMICS", "RADIANCE"];

  return (
    <section 
      ref={containerRef} 
      className="relative h-[150vh] bg-black overflow-hidden flex flex-col justify-center gap-4 py-20"
    >
      {/* Line 1 - Moving Left */}
      <div className="flex whitespace-nowrap">
        <motion.div style={{ x: smoothX1 }} className="flex gap-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-[15vw] font-black text-white leading-none tracking-tighter">
              KINETIC MOTION KINETIC MOTION
            </span>
          ))}
        </motion.div>
      </div>

      {/* Line 2 - Moving Right (Outline Style) */}
      <div className="flex whitespace-nowrap">
        <motion.div style={{ x: smoothX2 }} className="flex gap-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-[15vw] font-black text-transparent stroke-white leading-none tracking-tighter"
              style={{ WebkitTextStroke: '2px white' }}>
              DYNAMIC ENERGY DYNAMIC ENERGY
            </span>
          ))}
        </motion.div>
      </div>

      {/* Line 3 - Moving Left */}
      <div className="flex whitespace-nowrap">
        <motion.div style={{ x: smoothX1 }} className="flex gap-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-[15vw] font-black text-white leading-none tracking-tighter">
              RADIANCE RADIANCE RADIANCE
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </section>
  );
}