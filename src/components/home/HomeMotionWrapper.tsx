"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HomeMotionWrapperProps {
  children: ReactNode;
  delay?: number;
}

export default function HomeMotionWrapper({ children, delay = 0 }: HomeMotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        duration: 0.9, 
        ease: [0.21, 1.02, 0.43, 1.01], // custom premium cubic-bezier curve for smooth fluid deceleration
        delay 
      }}
    >
      {children}
    </motion.div>
  );
}
