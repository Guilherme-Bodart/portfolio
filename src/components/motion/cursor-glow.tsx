"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-220);
  const pointerY = useMotionValue(-220);
  const cursorX = useSpring(pointerX, {
    stiffness: 420,
    damping: 52,
    mass: 0.16,
  });
  const cursorY = useSpring(pointerY, {
    stiffness: 420,
    damping: 52,
    mass: 0.16,
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - 96);
      pointerY.set(event.clientY - 96);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--cursor-glow-inner)_0%,var(--cursor-glow-mid)_42%,transparent_74%)] blur-xl md:block"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}
