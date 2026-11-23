import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CONFIG } from '../config/config';
import { ConfettiBurst } from '../components/ConfettiBurst';

function getInitials(name) {
  const parts = String(name || 'B').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Screen 3: Welcome Screen (Photo + Full Name)
 * - Smooth light burst / gradient glow reveal
 * - Rounded photo frame with glowing ring + graceful initials fallback
 * - Animated full name, sparkles, confetti arrows, and Continue CTA
 */
export function WelcomeScreen({ onContinue }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      aria-label="Birthday welcome"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12 text-center overflow-hidden"
    >
      {/* Light burst behind photo */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0.85 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gradient-to-r from-violet-electric via-mint to-sunny blur-3xl"
        aria-hidden="true"
      />

      <ConfettiBurst count={30} />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-md rounded-[32px] glass-card p-7 sm:p-9 shadow-fintech"
      >
        {/* Rounded photo frame with glowing gradient ring */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48"
        >
          {/* Rotating soft glow ring */}
          <div
            className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-violet-electric via-mint to-coral opacity-80 blur-md"
            aria-hidden="true"
          />
          <div className="relative h-full w-full rounded-[32px] p-1 bg-gradient-to-tr from-violet-electric via-mint to-sunny">
            <div className="h-full w-full overflow-hidden rounded-[28px] bg-navy-light flex items-center justify-center">
              {!imgFailed && CONFIG.FRIEND_PHOTO ? (
                <img
                  src={CONFIG.FRIEND_PHOTO}
                  alt={`Portrait of ${CONFIG.FRIEND_FULL_NAME}`}
                  onError={() => setImgFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-violet-electric/40 via-navy-light to-coral/35"
                  role="img"
                  aria-label={`Initials avatar for ${CONFIG.FRIEND_FULL_NAME}`}
                >
                  <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    {getInitials(CONFIG.FRIEND_FULL_NAME)}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold text-mint">
                    Birthday Star ✨
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Animated Full Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-mint to-sunny bg-clip-text text-transparent"
        >
          {CONFIG.FRIEND_FULL_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed"
        >
          {CONFIG.DIALOGUE.welcomeSubtitle}
        </motion.p>

        {/* Fintech stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-bold text-mint">
            +1 Year Wiser ↗
          </span>
          <span className="rounded-full border border-coral/30 bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
            100% Vibes ↗
          </span>
        </motion.div>

        {/* Continue button */}
        <motion.button
          type="button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-mint to-[#19C98E] px-7 py-3.5 font-display text-base font-extrabold text-[#0B1020] shadow-glow-mint"
        >
          <span>{CONFIG.DIALOGUE.welcomeContinueLabel}</span>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </section>
  );
}
