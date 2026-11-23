import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MailOpen } from 'lucide-react';
import { CONFIG } from '../config/config';
import { EnvelopeSVG } from '../components/EnvelopeSVG';
import { MaskedHeading } from '../components/MaskedHeading';

/**
 * Screen 1: ProFinance-inspired Electric Lime Hero Card (#E2FF3B)
 * on a crisp white canvas, with bold black typography, hand-drawn curved
 * arrow, sliding obsidian envelope, and jet-black "Read Letter" button.
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
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12"
    >
      {/* Signature ProFinance rounded electric-lime hero container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-4xl rounded-[32px] pf-lime-card px-6 py-10 sm:px-12 sm:py-14 shadow-pf-lime overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-6">
          {/* Left column: Headline, subtitle & jet-black CTA */}
          <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start">
            {/* Sparkle + Headline */}
            <div className="relative inline-block">
              <MaskedHeading
                lines={CONFIG.DIALOGUE.landingHeadlineLines}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E0F12] leading-[1.08]"
              />
              {/* ProFinance 4-point sparkle beside headline */}
              <svg
                className="hidden sm:block absolute -top-3 -right-8 w-7 h-7"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14 2 L16.8 11.2 L26 14 L16.8 16.8 L14 26 L11.2 16.8 L2 14 L11.2 11.2 Z"
                  stroke="#0E0F12"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-md text-sm sm:text-base font-medium text-[#0E0F12]/75 leading-relaxed"
            >
              {CONFIG.DIALOGUE.landingSubtitle}
            </motion.p>

            {/* Prominent jet-black CTA button + hand-drawn looping arrow */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 min-h-[58px]">
              <motion.button
                type="button"
                onClick={onReadLetter}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={
                  envelopeSettled
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 16, scale: 0.94 }
                }
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group inline-flex items-center gap-3 rounded-2xl bg-[#0E0F12] px-7 py-4 font-display text-base font-bold text-white shadow-pf-float hover:bg-[#1E2028] transition-colors"
              >
                <MailOpen className="h-5 w-5 text-[#E2FF3B]" aria-hidden="true" />
                <span>{CONFIG.DIALOGUE.readButtonLabel}</span>
                <ArrowUpRight
                  className="h-5 w-5 text-[#E2FF3B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.button>

              {/* Signature ProFinance curved black arrow swooping toward the envelope */}
              <svg
                className="hidden md:block w-28 h-14 -ml-1 mt-2"
                viewBox="0 0 120 60"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 22 C 36 10, 68 18, 92 40 C 100 47, 108 42, 112 34"
                  stroke="#0E0F12"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d="M101 34 L113 33 L112 45"
                  stroke="#0E0F12"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.45 }}
                />
              </svg>
            </div>
          </div>

          {/* Right column: Sliding Envelope */}
          <div className="md:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ x: 180, opacity: 0, rotate: 6 }}
              animate={{ x: 0, opacity: 1, rotate: -2 }}
              transition={{
                type: 'spring',
                stiffness: 92,
                damping: 14,
                mass: 0.9,
                delay: 0.15,
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.9,
                }}
                whileHover={{ scale: 1.04, rotate: 1 }}
                className="cursor-pointer"
                onClick={onReadLetter}
              >
                <EnvelopeSVG isOpen={false} className="w-56 sm:w-64 md:w-72" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
