"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from 'next/image';
import { useRef } from "react";

export default function CharlyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Vertical scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for different layers
  const marqueeY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageLayer1Y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imageLayer2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const marqueeText = "CHARLYGRAPHICS SELECTION 2024 / 2025 • ";

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#f0f0f0] text-[#111] overflow-hidden flex flex-col justify-between py-12">
      
      {/* Top Navigation Bar */}
      <div className="w-full px-8 md:px-16 flex justify-between items-start z-30 mix-blend-difference text-white md:text-black">
        <div className="text-[10px] md:text-sm font-mono tracking-widest uppercase opacity-70">
          INDEPENDENT BRAND & WEB DESIGNER
        </div>
        <a href="mailto:hi@charly.graphics" className="text-[10px] md:text-sm font-mono tracking-widest uppercase underline underline-offset-4 hover:opacity-50 transition-opacity">
          HI@CHARLY.GRAPHICS
        </a>
      </div>

      {/* Main Content Area - Marquee + Parallax Images */}
      <div className="relative flex-1 flex items-center overflow-visible py-20">
        
        {/* Infinite Horizontal Marquee Layer */}
        <motion.div 
          className="w-full flex whitespace-nowrap overflow-hidden select-none pointer-events-none"
        >
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(4)].map((_, i) => (
              <h2 key={i} className="text-[28vw] font-black uppercase tracking-tighter leading-[0.85] pr-20">
                {marqueeText}
              </h2>
            ))}
          </motion.div>
        </motion.div>

        {/* Parallax Floating Image 1 (Leftish) */}
        <motion.div 
          style={{ y: imageLayer1Y }}
          className="absolute left-[10%] top-1/2 -translate-y-[40%] w-[25vw] max-w-[360px] aspect-[4/5] z-20 shadow-2xl overflow-hidden"
        >
          <Image 
            src="/images/davidswidjaja-coffee-5769721_1920.png" 
            alt="Project A" 
            fill
            className="object-cover scale-110 rounded-xl"
            sizes="(max-width: 768px) 80vw, 25vw"
            priority
          />
        </motion.div>

        {/* Parallax Floating Image 2 (Center-Right) */}
        <motion.div 
          style={{ y: imageLayer2Y }}
          className="absolute right-[5%] top-[15%] w-[20vw] max-w-[300px] aspect-square z-20 shadow-2xl overflow-hidden"
        >
           <Image 
            src="/images/julientromeur-coffee-4289545_1920.jpg" 
            alt="Project B" 
            fill
            className="object-cover scale-110 rounded-xl"
            sizes="(max-width: 768px) 80vw, 20vw"
            priority
          />
        </motion.div>

      </div>

      {/* Bottom Description Bar */}
      <div className="w-full px-8 md:px-16 flex flex-col md:flex-row justify-between items-end gap-6 z-30 mb-8">
        <p className="max-w-xl text-[10px] md:text-sm font-mono tracking-tight leading-relaxed opacity-70 uppercase">
 静かな朝、私は珈琲のブランドを創ることを決めた。<br />
苦くて温かい香りが、人の心を繋ぐと信じている。<br />
一杯の珈琲が、誰かの一日を変える。<br />
そんな想いを込めて、私のブランドは生まれた。<br />  

           </p>
        <div className="flex gap-6 text-[10px] md:text-xs font-mono tracking-widest uppercase opacity-70 underline underline-offset-4 hover:opacity-40 transition-all cursor-pointer">
          <span>INSTAGRAM</span>
          <span>LINKEDIN</span>
        </div>
      </div>

      {/* Floating Award Badge (Charly Graphics style) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="fixed right-8 bottom-8 z-50 pointer-events-none hidden lg:block"
      >
        <div className="w-24 h-24 rounded-full border border-black/10 flex flex-col items-center justify-center text-[8px] font-mono tracking-[0.15em] uppercase text-center p-2 leading-tight bg-white/40 backdrop-blur-xl shadow-lg">
          <span className="opacity-40 text-[6px] mb-1">AWWWARDS</span>
          W. Nominee<br />Site of<br />The Day
        </div>
      </motion.div>

    </section>
  );
}
