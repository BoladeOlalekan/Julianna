import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MailOpen } from 'lucide-react';
import { CONFIG } from '../config/config';
import { EnvelopeSVG } from '../components/EnvelopeSVG';
import { MaskedHeading } from '../components/MaskedHeading';

/**
 * Screen 1: Fintech-style Hero + Sliding Envelope + "Read Letter" CTA
 * Clicking "Read Letter" is the first user gesture, starting background music.
 */
export function LandingScreen({ onReadLetter }) {
  const [envelopeSettled, setEnvelopeSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEnvelopeSettled(true), 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      aria-label="Welcome"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12 text-center"
    >
      <div className="mx-auto w-full max-w-xl flex flex-col items-center">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider text-mint uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
          {CONFIG.DIALOGUE.landingEyebrow}
        </motion.div>

        {/* Masked line-by-line headline */}
        <MaskedHeading
          lines={CONFIG.DIALOGUE.landingHeadlineLines}
          className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-md text-sm sm:text-base text-white/70 leading-relaxed"
        >
          {CONFIG.DIALOGUE.landingSubtitle}
        </motion.p>

        {/* Mobile stat chips row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex sm:hidden flex-wrap items-center justify-center gap-2"
        >
          <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-[11px] font-bold text-mint">
            {CONFIG.STAT_CHIPS[0]?.label} {CONFIG.STAT_CHIPS[0]?.trend}
          </span>
          <span className="rounded-full border border-sunny/30 bg-sunny/10 px-3 py-1 text-[11px] font-bold text-sunny">
            {CONFIG.STAT_CHIPS[1]?.label} {CONFIG.STAT_CHIPS[1]?.trend}
          </span>
        </motion.div>

        {/* Envelope slides in from the side with smooth deceleration + tiny settle bounce, then idles */}
        <motion.div
          initial={{ x: -240, opacity: 0, rotate: -7 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 92,
            damping: 14,
            mass: 0.9,
            delay: 0.15,
          }}
          className="mt-8 sm:mt-10"
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.9,
            }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="cursor-pointer"
            onClick={onReadLetter}
          >
            <EnvelopeSVG isOpen={false} className="w-60 sm:w-72" />
          </motion.div>
        </motion.div>

        {/* Prominent "Read Letter" pill button appears once envelope settles */}
        <div className="mt-8 sm:mt-10 min-h-[60px] flex items-center justify-center">
          <motion.button
            type="button"
            onClick={onReadLetter}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={
              envelopeSettled
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.92 }
            }
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-electric via-[#7D5BFF] to-coral px-8 py-4 font-display text-base sm:text-lg font-bold text-white shadow-glow-violet hover:shadow-[0_18px_42px_-6px_rgba(109,74,255,0.75)] transition-shadow"
          >
            <MailOpen className="h-5 w-5" aria-hidden="true" />
            <span>{CONFIG.DIALOGUE.readButtonLabel}</span>
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
