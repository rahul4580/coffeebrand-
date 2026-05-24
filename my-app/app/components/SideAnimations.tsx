'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';

// Side floating elements
export function SideFloatingElements() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none" suppressHydrationWarning />
    );
  }
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" suppressHydrationWarning>
      {/* Left side elements */}
      <motion.div
        className="fixed left-4 top-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="fixed left-8 top-2/3 w-3 h-3 border border-blue-400 rounded-full opacity-40"
        animate={{
          y: [0, 40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      {/* Right side elements */}
      <motion.div
        className="fixed right-4 top-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-60"
        animate={{
          y: [0, 35, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 1,
        }}
      />
      <motion.div
        className="fixed right-8 top-3/4 w-3 h-3 border border-purple-400 rounded-full opacity-40"
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          delay: 1.5,
        }}
      />

      {/* Flowing lines */}
      <svg className="fixed left-0 top-0 w-full h-full pointer-events-none opacity-20">
        <motion.line
          x1="0%"
          y1="20%"
          x2="100%"
          y2="30%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          animate={{
            x1: ['0%', '10%', '0%'],
            x2: ['100%', '110%', '100%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
        <defs>
          <linearGradient id="lineGradient">
            <stop offset="0%" stopColor="rgb(168, 85, 247)" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Side slide animation
interface SideSlideInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

export function SideSlideIn({ children, duration = 0.8, delay = 0 }: SideSlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration, delay }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Animated divider
interface AnimatedDividerProps {
  height?: number;
  delay?: number;
}

export function AnimatedDivider({ height = 1, delay = 0 }: AnimatedDividerProps) {
  return (
    <motion.div
      className={`w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent`}
      style={{ height }}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: false, amount: 0.5 }}
    />
  );
}

// Staggered container for children
interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
}

export function StaggerContainer({ children, delay = 0 }: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

// Scroll progress bar
export function ScrollProgressBar() {
  const { scrollProgress } = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 z-50"
      style={{ scaleX: scrollProgress, originX: 0 }}
    />
  );
}

// Scroll progress hook
function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollProgress(scrolled / scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress };
}
