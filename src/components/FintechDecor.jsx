import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config/config';

/**
 * ProFinance-inspired clean white-canvas decorative layer:
 * - Bold electric-lime geometric circle peeking from the corner
 * - Playful hand-drawn looping black curved arrows
 * - Coral geometric arc + 4-point sparkles
 * - Clean floating fintech stat chips
 */
export function FintechDecor({ intensity = 'full' }) {
  const showChips = intensity === 'full';

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0 bg-white"
      aria-hidden="true"
    >
      {/* Large soft electric-lime geometric circle (top-right / bottom-right signature ProFinance accent) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#E2FF3B]/55"
      />

      {/* Coral geometric ring accent (top-left) */}
      <svg
        className="absolute -top-6 -left-6 w-36 sm:w-48 h-36 sm:h-48 opacity-70"
        viewBox="0 0 180 180"
        fill="none"
      >
        <motion.path
          d="M28 132 A 70 70 0 0 1 132 28"
          stroke="#FF6B6B"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Hand-drawn looping curved black arrow (bottom-left) */}
      <svg
        className="absolute bottom-8 left-4 sm:left-12 w-36 sm:w-52 h-24 opacity-80"
        viewBox="0 0 210 100"
        fill="none"
      >
        <motion.path
          d="M12 82 C 55 86, 86 64, 76 44 C 66 26, 46 42, 66 56 C 92 72, 148 52, 188 20"
          stroke="#0E0F12"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M174 18 L190 18 L187 33"
          stroke="#0E0F12"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 1.3 }}
        />
      </svg>

      {/* Crisp 4-point sparkles */}
      <motion.svg
        animate={{ rotate: [0, 12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:block absolute top-28 right-12 w-7 h-7"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M14 2 L16.8 11.2 L26 14 L16.8 16.8 L14 26 L11.2 16.8 L2 14 L11.2 11.2 Z"
          stroke="#0E0F12"
          strokeWidth="1.8"
          fill="#E2FF3B"
        />
      </motion.svg>

      {showChips && (
        <>
          {/* Floating crisp white/black stat chip 1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: [0, -7, 0] }}
            transition={{
              opacity: { duration: 0.65, delay: 0.25 },
              y: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="hidden lg:inline-flex items-center gap-2 absolute top-24 left-10 rounded-full bg-white border border-[#0E0F12]/10 px-4 py-2 text-xs font-bold text-[#0E0F12] shadow-pf-card"
          >
            <span className="h-2 w-2 rounded-full bg-[#E2FF3B] ring-2 ring-[#0E0F12]" />
            <span>{CONFIG.STAT_CHIPS[0]?.label}</span>
            <span className="font-extrabold">{CONFIG.STAT_CHIPS[0]?.trend}</span>
          </motion.div>

          {/* Floating crisp black/lime stat chip 2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.65, delay: 0.4 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="hidden lg:inline-flex items-center gap-2 absolute bottom-16 right-12 rounded-2xl bg-[#0E0F12] px-4 py-3 text-xs font-bold text-white shadow-pf-float"
          >
            <span className="text-white/65">{CONFIG.STAT_CHIPS[1]?.label}</span>
            <span className="rounded-full bg-[#E2FF3B] px-2 py-0.5 text-[11px] font-extrabold text-[#0E0F12]">
              {CONFIG.STAT_CHIPS[1]?.trend}
            </span>
          </motion.div>
        </>
      )}
    </div>
  );
}
