import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config/config';

const TONE_CLASSES = {
  mint: 'border-mint/30 text-mint bg-mint/10',
  sunny: 'border-sunny/30 text-sunny bg-sunny/10',
  violet: 'border-violet-electric/40 text-[#B8A6FF] bg-violet-electric/15',
  coral: 'border-coral/30 text-coral bg-coral/10',
};

/**
 * Fintech-inspired decorative background layer:
 * - Soft radial gradient glows
 * - Self-drawing upward-trending line chart & rising arrows
 * - Floating stat chips ("+1 Year Wiser ↗", "100% Vibes ↗")
 * - Floating coins / sparkline badges
 */
export function FintechDecor({ intensity = 'full' }) {
  const showChips = intensity === 'full';

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Ambient soft gradient glows */}
      <div className="absolute -top-24 -left-24 h-80 w-80 sm:h-[420px] sm:w-[420px] rounded-full glow-violet opacity-80" />
      <div className="absolute top-1/3 -right-24 h-72 w-72 sm:h-[380px] sm:w-[380px] rounded-full glow-mint opacity-75" />
      <div className="absolute -bottom-24 left-1/4 h-72 w-72 sm:h-[360px] sm:w-[360px] rounded-full glow-coral opacity-70" />

      {/* Subtle fintech grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Upward-trending animated SVG sparkline (bottom-left) */}
      <svg
        className="absolute bottom-6 left-2 sm:left-10 w-44 sm:w-64 h-28 opacity-35"
        viewBox="0 0 240 110"
        fill="none"
      >
        <defs>
          <linearGradient id="sparkLineGrad" x1="0" y1="100" x2="220" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6D4AFF" />
            <stop offset="55%" stopColor="#2EE6A6" />
            <stop offset="100%" stopColor="#FFC83D" />
          </linearGradient>
        </defs>
        <motion.path
          d="M10 92 C 45 86, 60 64, 92 68 C 122 72, 138 38, 170 42 C 192 44, 206 20, 224 14"
          stroke="url(#sparkLineGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Arrowhead */}
        <motion.path
          d="M212 11 L226 13 L220 26"
          stroke="#FFC83D"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Rising curved arrow (top-right) */}
      <svg
        className="absolute top-20 right-3 sm:right-12 w-28 sm:w-40 h-28 opacity-30"
        viewBox="0 0 140 120"
        fill="none"
      >
        <motion.path
          d="M16 102 Q 62 96, 86 58 T 122 18"
          stroke="#2EE6A6"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M110 18 L124 16 L122 30"
          stroke="#2EE6A6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        />
      </svg>

      {showChips && (
        <>
          {/* Floating Stat Chip 1 */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 absolute top-24 left-8 lg:left-16 rounded-full border px-3.5 py-1.5 text-xs font-bold backdrop-blur-md ${
              TONE_CLASSES[CONFIG.STAT_CHIPS[0]?.tone || 'mint']
            }`}
          >
            <span>{CONFIG.STAT_CHIPS[0]?.label}</span>
            <span>{CONFIG.STAT_CHIPS[0]?.trend}</span>
          </motion.div>

          {/* Floating Stat Chip 2 */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: [0, 9, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 absolute top-44 right-8 lg:right-20 rounded-full border px-3.5 py-1.5 text-xs font-bold backdrop-blur-md ${
              TONE_CLASSES[CONFIG.STAT_CHIPS[1]?.tone || 'sunny']
            }`}
          >
            <span>{CONFIG.STAT_CHIPS[1]?.label}</span>
            <span>{CONFIG.STAT_CHIPS[1]?.trend}</span>
          </motion.div>

          {/* Floating Sparkline Mini Card (desktop/tablet) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.85, y: [0, -7, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.55 },
              y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="hidden md:flex flex-col gap-1 absolute bottom-12 right-12 rounded-2xl glass-card px-4 py-3 shadow-fintech"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
              {CONFIG.STAT_CHIPS[2]?.label || 'Grace Index'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-mint">
                {CONFIG.STAT_CHIPS[2]?.trend || '+999% ↗'}
              </span>
              <svg width="42" height="16" viewBox="0 0 42 16" fill="none">
                <path
                  d="M2 13 L12 9 L20 11 L30 5 L40 2"
                  stroke="#2EE6A6"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Floating Coin Accent */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 8, -6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex items-center justify-center absolute bottom-28 left-14 h-10 w-10 rounded-full bg-gradient-to-br from-sunny to-[#F59E0B] text-[#0B1020] font-display font-extrabold text-sm shadow-[0_8px_24px_rgba(255,200,61,0.35)]"
          >
            ★
          </motion.div>
        </>
      )}
    </div>
  );
}
