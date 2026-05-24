"use client";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function LerpSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // High-precision spring for that "liquid" lerp feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 200]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 15]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[140vh] flex items-center justify-center overflow-hidden bg-white py-20"
    >
      <div className="container px-8 flex flex-col md:flex-row items-center justify-between gap-20">
        <motion.div style={{ y: y1 }} className="flex-1 space-y-6 z-10">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none text-black"
            >
              MOTION <br /> IS FLUID.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-black/60 max-w-md font-light uppercase tracking-widest"
          >
            Experience movement redefined through high-precision linear interpolation.
          </motion.p>
        </motion.div>

        <motion.div 
          style={{ y: y2, rotate }} 
          className="relative w-full max-w-md aspect-[4/5] bg-gray-100 border border-black/5"
        >
          <Image 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Abstract Motion"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        style={{ y: y1, rotate: -rotate }}
        className="absolute top-1/4 right-[15%] w-40 h-40 overflow-hidden border border-black/10 rounded-full z-0 opacity-40 blur-[1px]" 
      >
        <Image 
          src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop" 
          alt="Detail"
          fill
          className="object-cover scale-110"
        />
      </motion.div>
      
      <motion.div 
        style={{ y: y2, x: y1, scale: 1.1 }}
        className="absolute bottom-[5%] left-[5%] w-56 h-72 overflow-hidden border border-black/5 z-0 grayscale opacity-30" 
      >
        <Image 
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop" 
          alt="Architecture"
          fill
          className="object-cover "
        />
      </motion.div>
    </section>
  );
}