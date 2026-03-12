"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const easeCurve = [0.22, 1, 0.36, 1] as const;

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.55, ease: easeCurve }}
      >
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-50 origin-top bg-foreground"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: easeCurve }}
          />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
