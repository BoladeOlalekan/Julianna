import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config/config';
import { ConfettiBurst } from '../components/ConfettiBurst';

/**
 * Screen 7: Thank You & Auto-Reset
 * - Confetti burst + warm Nigerian-flavoured confirmation
 * - Smoothly resets back to landing after ~4 seconds while preserving music mute state
 */
export function ThanksScreen({ onReset }) {
  const durationSec = CONFIG.DIALOGUE.thanksResetSeconds || 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, durationSec * 1000);
    return () => clearTimeout(timer);
  }, [durationSec, onReset]);

  return (
    <section
      aria-label="Thank you"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12 text-center overflow-hidden"
    >
      <ConfettiBurst count={40} />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-md rounded-[32px] glass-card p-8 sm:p-10 shadow-fintech"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.12 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/20 text-mint shadow-glow-mint"
        >
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </motion.div>

        <h2 className="mt-6 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {CONFIG.DIALOGUE.thanksHeadline}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-white/70">
          {CONFIG.DIALOGUE.thanksSubline}
        </p>

        {/* Smooth 4-second reset progress bar */}
        <div className="mt-7 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: durationSec, ease: [0.22, 1, 0.36, 1] }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-violet-electric via-mint to-sunny"
          />
        </div>
      </motion.div>
    </section>
  );
}
