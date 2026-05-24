"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Anton } from "next/font/google";
import EditorialPortfolio from "./EditorialPortfolio";
import StorySection from "./StorySection";

const anton = Anton({ weight: "400", subsets: ["latin"] });

export default function JasmineHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });

  // Expanding box
  const imageWidth = useTransform(smoothProgress, [0, 0.7], ["40%", "100%"]);
  const imageHeight = useTransform(smoothProgress, [0, 0.7], ["50%", "100%"]);
  const imageRadius = useTransform(smoothProgress, [0, 0.7], ["16px", "0px"]);

  // Opacity for elements fading out
  const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.15], [1, 0.95]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titleChars = "Caffinity Labs".split("");

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#EBEAE4] text-[#111] overflow-clip">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden" suppressHydrationWarning>

        {/* TOP TEXT */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="w-full flex justify-center pt-6 md:pt-10 z-10"
          suppressHydrationWarning
        >
          <motion.h1
            className={`text-[12vw] tracking-tighter uppercase leading-[0.85] text-center flex gap-[1vw] ${anton.className}`}
            style={{
              x: mousePos.x * -1,
              y: mousePos.y * -1,
              transformOrigin: "top center"
            }}
          >
            {"   Caffinity Labs".split(" ").map((word, wIdx) => (
              <span key={wIdx} className="flex">
                {word.split("").map((char, cIdx) => (
                  <motion.span
                    key={`${wIdx}-${cIdx}`}
                    initial={{ y: 150, opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: (wIdx * 5 + cIdx) * 0.05
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </motion.div>

        {/* MIDDLE SECTION: "A VISUAL" and "DESIGNER" */}
        <div className="flex-1 w-full flex items-center justify-between px-8 md:px-16 z-10 pointer-events-none">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              opacity: textOpacity,
              x: useTransform(smoothProgress, [0, 0.5], ["0%", "-100%"]),
              y: mousePos.y * 1
            }}
            className={`text-4xl sm:text-6xl lg:text-[7vw] uppercase tracking-tighter ${anton.className}`}
            suppressHydrationWarning
          >
            A TEA
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              opacity: textOpacity,
              x: useTransform(smoothProgress, [0, 0.5], ["0%", "100%"]),
              y: mousePos.y * 1
            }}
            className={`text-4xl sm:text-6xl lg:text-[7vw] uppercase tracking-tighter ${anton.className}`}
            suppressHydrationWarning
          >
            Designer
          </motion.div>
        </div>

        {/* SCROLL DOWN */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="w-full flex justify-center pb-8 z-10"
          suppressHydrationWarning
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              Scroll Down
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-black"
            />
          </motion.div>
        </motion.div>

        {/* CENTER IMAGE/VIDEO */}
        <motion.div
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-0 overflow-hidden flex flex-col justify-center bg-white shadow-2xl"
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageRadius,
          }}
          initial={{ scale: 0.8, opacity: 0, y: "-40%", x: "-50%" }}
          animate={{ scale: 1, opacity: 1, y: "-50%", x: "-50%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          suppressHydrationWarning
        >
          {/* Video / Content */}
          <div className="relative w-full h-full group">

            {/* Overlay labels when small */}
            <motion.div style={{ opacity: textOpacity }} className="absolute top-0 left-0 w-full flex items-start justify-between p-4 md:p-6 z-30 pointer-events-none" suppressHydrationWarning>
              <span className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-black bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                Motion Design
              </span>
              <span className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-black bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                2026
              </span>
            </motion.div>

            {/* In the user's screenshot, it looks like a collage. We'll use an aesthetic video loop */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-20 group-hover:scale-105 transition-transform duration-1000 ease-out"
src="/videos/137513-766715288.mp4"
            />

            {/* We can use mix-blend-mode text overlay if we want */}
            <div className="absolute inset-0 z-30 bg-black/10 transition-opacity duration-500 opacity-0 group-hover:opacity-100 mix-blend-overlay" />
          </div>

        </motion.div>

      </div>

      <EditorialPortfolio />
      <StorySection />
    </div>
  );
}
