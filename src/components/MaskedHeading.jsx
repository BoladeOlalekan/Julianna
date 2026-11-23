import React from 'react';
import { motion } from 'framer-motion';

/**
 * Masked line-by-line headline reveal (translateY + opacity, staggered 70ms).
 */
export function MaskedHeading({ lines = [], className = '' }) {
  return (
    <h1 className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <motion.span
            className="block"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.72,
              delay: 0.08 + idx * 0.075,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
