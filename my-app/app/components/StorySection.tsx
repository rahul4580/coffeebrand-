"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2 }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-110 blur-[1px] opacity-30"
          src="https://cdn.pixabay.com/video/2018/10/01/18469-291757134_large.mp4"
        />
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3filter id='noiseFilter'%3feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Top Left Text */}
      <motion.div 
        {...fadeIn}
        className="absolute top-12 left-12 z-20 hidden md:block"
      >
        <p className="text-white/60 text-sm font-medium tracking-tight leading-relaxed">
          Some write.<br />
          <span className="ml-4">Some design.</span>
        </p>
      </motion.div>

      {/* Large Central Typography */}
      <div className="relative z-10 pointer-events-none text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-white text-[12vw] font-serif leading-[0.8] mix-blend-screen select-none uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          I Tell The<br />Whole<br />Story.
        </motion.h2>
      </div>

      {/* Centered Video Player / Watch Now */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pt-20 translate-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative group cursor-pointer"
        >
          <div className="w-[30vw] min-w-[280px] max-w-[500px] aspect-video bg-white/10 rounded-sm overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              src="https://cdn.pixabay.com/video/2017/04/18/8863-214486518_large.mp4"
            />
            {/* Screen Overlay */}
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
          </div>
          
          <motion.div 
            className="absolute -bottom-10 right-0 flex items-center gap-2 group"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Watch Now</span>
            <span className="text-white text-xs">▶</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div 
        {...fadeIn}
        className="absolute bottom-12 left-0 w-full px-6 flex justify-center z-20 text-center"
      >
        <p className="max-w-xl text-white/50 text-[11px] md:text-sm font-medium leading-[1.6] tracking-tight">
        静かな朝、私は珈琲のブランドを創ることを決めた。<br />
苦くて温かい香りが、人の心を繋ぐと信じている。<br />
一杯の珈琲が、誰かの一日を変える。<br />
そんな想いを込めて、私のブランドは生まれた。<br />
        </p>
      </motion.div>
    </section>
  );
}
