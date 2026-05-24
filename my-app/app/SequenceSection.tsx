"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 100; // Total images in your sequence

export default function SequenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Generate URLs for your image sequence
  // Replace with your actual assets: e.g., /sequence/frame_001.webp
  const getFrameUrl = (index: number) => 
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`;

  useEffect(() => {
    const preloadImages = async () => {
      let loadedCount = 0;
      const loadedImages = await Promise.all(
        Array.from({ length: FRAME_COUNT }).map((_, i) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
              resolve(img);
            };
            img.src = getFrameUrl(i);
          });
        })
      );
      setImages(loadedImages);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = images[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = drawWidth / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;

    const handleScroll = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate scroll progress relative to this section
      const scrollFraction = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * FRAME_COUNT));
      
      requestAnimationFrame(() => renderFrame(frameIndex));
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
          >
            <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-white origin-left"
                style={{ scaleX: loadingProgress / 100 }}
              />
            </div>
            <span className="mt-4 text-[10px] uppercase tracking-[0.3em] font-light">Loading Assets {loadingProgress}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
          <h2 className="text-4xl font-light tracking-[0.4em] uppercase opacity-50">
            Precision
          </h2>
        </div>
      </div>
    </div>
  );
}