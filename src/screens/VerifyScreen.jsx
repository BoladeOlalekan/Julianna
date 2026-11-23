import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config/config';
import { EnvelopeSVG } from '../components/EnvelopeSVG';

/**
 * Screen 2: Identity Check
 * - Envelope flap lifts open above a crisp ProFinance light-gray card (#F4F5F7)
 * - Validates against CONFIG.CORRECT_NAMES (case-insensitive, trimmed)
 * - Wrong answer: playful shake + rotating Nigerian-flavoured line
 * - Correct answer: electric-lime glow & unlocks Welcome screen
 */
export function VerifyScreen({ onVerified }) {
  const [inputValue, setInputValue] = useState('');
  const [wrongCount, setWrongCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setFlapOpen(true), 160);
    const t2 = setTimeout(() => inputRef.current?.focus(), 550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUnlocked) return;

    const normalized = inputValue.trim().toLowerCase();
    const accepted = CONFIG.CORRECT_NAMES.map((n) => n.trim().toLowerCase());

    if (normalized && accepted.includes(normalized)) {
      setErrorMsg('');
      setIsUnlocked(true);
      setTimeout(() => {
        onVerified();
      }, 950);
    } else {
      const lines = CONFIG.DIALOGUE.wrongAnswerLines;
      setErrorMsg(lines[wrongCount % lines.length]);
      setWrongCount((c) => c + 1);
      setShakeKey((k) => k + 1);
      inputRef.current?.focus();
    }
  };

  return (
    <section
      aria-label="Identity verification"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12"
    >
      <div className="mx-auto w-full max-w-md flex flex-col items-center">
        {/* Envelope with lifting flap */}
        <motion.div
          initial={{ scale: 0.92, y: 12, opacity: 0.7 }}
          animate={{ scale: 0.85, y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="-mb-4"
        >
          <EnvelopeSVG isOpen={flapOpen} className="w-48 sm:w-56" />
        </motion.div>

        {/* Crisp ProFinance rounded card */}
        <motion.div
          key={shakeKey}
          initial={shakeKey === 0 ? { y: 46, opacity: 0 } : { x: 0 }}
          animate={
            shakeKey === 0
              ? { y: 0, opacity: 1 }
              : { x: [0, -10, 10, -8, 8, -4, 4, 0] }
          }
          transition={
            shakeKey === 0
              ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
          className={`w-full rounded-[28px] p-6 sm:p-8 transition-all duration-500 ${
            isUnlocked
              ? 'bg-[#E2FF3B] text-[#0E0F12] shadow-pf-lime ring-2 ring-[#0E0F12]'
              : 'pf-surface-card shadow-pf-card'
          }`}
        >
          <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E0F12] leading-snug">
            {CONFIG.DIALOGUE.verifyQuestion}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="name-check-input" className="sr-only">
                {CONFIG.DIALOGUE.verifyQuestion}
              </label>
              <input
                ref={inputRef}
                id="name-check-input"
                type="text"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isUnlocked}
                placeholder={CONFIG.DIALOGUE.verifyPlaceholder}
                className="w-full rounded-2xl border-2 border-[#0E0F12]/12 bg-white px-4 py-3.5 text-base font-semibold text-[#0E0F12] placeholder:text-[#0E0F12]/40 focus:border-[#0E0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Feedback message */}
            <div className="min-h-[24px]" aria-live="polite">
              {isUnlocked ? (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-extrabold text-[#0E0F12]"
                >
                  {CONFIG.DIALOGUE.verifySuccessLine}
                </motion.p>
              ) : errorMsg ? (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold text-[#E64848]"
                >
                  {errorMsg}
                </motion.p>
              ) : null}
            </div>

            <motion.button
              type="submit"
              disabled={isUnlocked}
              whileHover={!isUnlocked ? { y: -2, scale: 1.01 } : {}}
              whileTap={!isUnlocked ? { scale: 0.98 } : {}}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0E0F12] px-6 py-4 font-display text-base font-bold text-white shadow-pf-float hover:bg-[#1F2129] transition-colors"
            >
              <span>
                {isUnlocked ? 'Unlocked!' : CONFIG.DIALOGUE.verifySubmitLabel}
              </span>
              {isUnlocked ? (
                <CheckCircle2 className="h-5 w-5 text-[#E2FF3B]" />
              ) : (
                <ArrowRight className="h-5 w-5 text-[#E2FF3B]" />
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
