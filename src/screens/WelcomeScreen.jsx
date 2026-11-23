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
 * - Crisp ProFinance card with electric-lime & coral geometric photo framing
 * - Graceful initials fallback if photo fails to load
 * - Bold black typography + stat pills + jet-black Continue CTA
 */
export function WelcomeScreen({ onContinue }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      aria-label="Birthday welcome"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12 text-center overflow-hidden"
    >
      <ConfettiBurst count={30} />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-md rounded-[32px] pf-surface-card p-7 sm:p-9 shadow-pf-card"
      >
        {/* Rounded photo frame with electric-lime ring & crisp black border */}
        <motion.div
          initial={{ scale: 0.78, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48"
        >
          {/* Decorative electric-lime offset backing */}
          <div
            className="absolute -inset-2.5 rounded-[34px] bg-[#E2FF3B] rotate-3"
            aria-hidden="true"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[28px] border-2 border-[#0E0F12] bg-white flex items-center justify-center shadow-pf-float">
            {!imgFailed && CONFIG.FRIEND_PHOTO ? (
              <img
                src={CONFIG.FRIEND_PHOTO}
                alt={`Portrait of ${CONFIG.FRIEND_FULL_NAME}`}
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center bg-[#0E0F12] text-white"
                role="img"
                aria-label={`Initials avatar for ${CONFIG.FRIEND_FULL_NAME}`}
              >
                <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#E2FF3B]">
                  {getInitials(CONFIG.FRIEND_FULL_NAME)}
                </span>
                <span className="mt-1 text-[11px] font-semibold text-white/75">
                  Birthday Star ✨
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Animated Full Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E0F12]"
        >
          {CONFIG.FRIEND_FULL_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-sm sm:text-base font-medium text-[#0E0F12]/70 leading-relaxed"
        >
          {CONFIG.DIALOGUE.welcomeSubtitle}
        </motion.p>

        {/* Crisp ProFinance stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="rounded-full bg-[#E2FF3B] px-3.5 py-1 text-xs font-extrabold text-[#0E0F12]">
            +1 Year Wiser ↗
          </span>
          <span className="rounded-full bg-white border border-[#0E0F12]/12 px-3.5 py-1 text-xs font-bold text-[#0E0F12]">
            100% Vibes ↗
          </span>
        </motion.div>

        {/* Jet-black Continue button */}
        <motion.button
          type="button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0E0F12] px-7 py-4 font-display text-base font-bold text-white shadow-pf-float hover:bg-[#1F2129] transition-colors"
        >
          <span>{CONFIG.DIALOGUE.welcomeContinueLabel}</span>
          <ArrowRight className="h-5 w-5 text-[#E2FF3B]" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </section>
  );
}
