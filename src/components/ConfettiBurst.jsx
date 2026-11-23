import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#6D4AFF', '#2EE6A6', '#FFC83D', '#FF6B8A', '#FFFFFF'];

/**
 * Lightweight GPU-accelerated confetti & fintech arrow burst.
 */
export function ConfettiBurst({ count = 28 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.22;
      const distance = 90 + ((i * 37) % 150);
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 40,
        rotate: ((i * 53) % 360) - 180,
        color: COLORS[i % COLORS.length],
        size: 6 + (i % 4) * 2.5,
        isArrow: i % 5 === 0,
        delay: (i % 6) * 0.03,
      };
    });
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y + 80,
            scale: [0, 1.15, 0.9],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: 1.55,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute"
        >
          {p.isArrow ? (
            <span
              style={{ color: p.color, fontSize: `${p.size + 6}px` }}
              className="font-bold leading-none"
            >
              ↗
            </span>
          ) : (
            <span
              style={{
                width: p.size,
                height: p.size * 0.65,
                backgroundColor: p.color,
              }}
              className="block rounded-sm"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
