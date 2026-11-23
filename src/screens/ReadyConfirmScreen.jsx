import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONFIG, formatLine } from '../config/config';
import { AnimeCharacters } from '../components/AnimeCharacters';
import { ConfettiBurst } from '../components/ConfettiBurst';
import { useTypewriter } from '../hooks/useTypewriter';

/**
 * Screen 4: The two anime characters + "Ready?" & "Confirm" dialogue tree.
 * Styled in the crisp white + electric-lime + jet-black ProFinance palette.
 */
export function ReadyConfirmScreen({
  step, // 'ready' | 'confirm'
  onSetStep,
  onStartCurtain,
  onSpeakingChange,
}) {
  const [noCount, setNoCount] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const [speechText, setSpeechText] = useState(() =>
    formatLine(CONFIG.DIALOGUE.readyGreeting)
  );
  const [mood, setMood] = useState('happy');
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });

  const { displayedText, isTyping } = useTypewriter(speechText, 24);

  useEffect(() => {
    onSpeakingChange?.(isTyping);
    return () => onSpeakingChange?.(false);
  }, [isTyping, onSpeakingChange]);

  const handleNoClick = () => {
    if (isCelebrating) return;

    const lines = CONFIG.DIALOGUE.noLines;
    if (noCount >= 4) {
      handleYesClick();
      return;
    }

    const nextLine = formatLine(lines[Math.min(noCount, lines.length - 1)]);
    setSpeechText(nextLine);

    if (noCount === 0) setMood('shock');
    else if (noCount === 1) setMood('begging');
    else if (noCount === 2) setMood('laughing');
    else setMood('begging');

    if (noCount >= 2) {
      const offsets = [
        { x: 26, y: -10 },
        { x: -24, y: 8 },
        { x: 18, y: 12 },
      ];
      setDodgeOffset(offsets[noCount % offsets.length]);
    }

    setNoCount((c) => c + 1);
  };

  const handleYesClick = () => {
    if (isCelebrating) return;
    setMood('thinking');
    setSpeechText(formatLine(CONFIG.DIALOGUE.confirmQuestion));
    onSetStep('confirm');
  };

  const handleWaitClick = () => {
    if (isCelebrating) return;
    const waitLines = CONFIG.DIALOGUE.waitLoopLines;
    const nextLine = formatLine(waitLines[waitCount % waitLines.length]);
    setWaitCount((c) => c + 1);
    setMood('laughing');
    setSpeechText(nextLine);
    onSetStep('ready');
  };

  const handleConfirmYes = () => {
    if (isCelebrating) return;
    setIsCelebrating(true);
    setMood('celebrating');
    setSpeechText(formatLine(CONFIG.DIALOGUE.celebrationLine));

    setTimeout(() => {
      onStartCurtain();
    }, 1500);
  };

  const noButtonScale = noCount === 0 ? 1 : noCount === 1 ? 0.94 : noCount === 2 ? 0.88 : 0.82;
  const noButtonLabel =
    noCount >= 3 ? CONFIG.DIALOGUE.noFinalButtonLabel : CONFIG.DIALOGUE.noButtonLabel;

  return (
    <section
      aria-label="Character dialogue"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12"
    >
      {isCelebrating && <ConfettiBurst count={36} />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-lg flex flex-col items-center"
      >
        {/* Crisp Speech Bubble with electric-lime accent shadow */}
        <motion.div
          layout
          className="relative w-full rounded-[28px] bg-white border-2 border-[#0E0F12] px-6 py-5 sm:px-7 sm:py-6 shadow-[0_8px_0_#E2FF3B] text-center"
        >
          <p
            className="font-display text-lg sm:text-xl font-bold text-[#0E0F12] leading-snug min-h-[3.5rem] flex items-center justify-center"
            aria-live="polite"
          >
            <span>
              {displayedText}
              {isTyping && (
                <span className="ml-0.5 inline-block h-5 w-0.5 bg-[#0E0F12] align-middle animate-pulse" />
              )}
            </span>
          </p>

          {/* Speech bubble tail */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-5 w-5 rotate-45 bg-white border-r-2 border-b-2 border-[#0E0F12]"
            aria-hidden="true"
          />
        </motion.div>

        {/* Animated Boy & Girl Chibi/Anime Characters */}
        <div className="mt-7">
          <AnimeCharacters mood={mood} />
        </div>

        {/* Action Buttons */}
        <div className="mt-7 w-full flex flex-col sm:flex-row items-center justify-center gap-3.5 min-h-[64px]">
          {isCelebrating ? (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#E2FF3B] border-2 border-[#0E0F12] px-6 py-3 font-display text-base font-extrabold text-[#0E0F12]"
            >
              Opening the curtains... 🎭
            </motion.div>
          ) : step === 'ready' ? (
            <>
              <motion.button
                type="button"
                onClick={handleYesClick}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  scale: noCount >= 3 ? 1.07 : 1,
                }}
                className="w-full sm:w-auto min-w-[165px] rounded-2xl bg-[#0E0F12] px-8 py-4 font-display text-base font-bold text-white shadow-pf-float hover:bg-[#1F2129] transition-colors"
              >
                {CONFIG.DIALOGUE.yesButtonLabel}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleNoClick}
                animate={{
                  scale: noButtonScale,
                  x: noCount >= 3 ? dodgeOffset.x : 0,
                  y: noCount >= 3 ? dodgeOffset.y : 0,
                }}
                whileHover={
                  noCount >= 3
                    ? { x: -dodgeOffset.x * 0.8, y: -6 }
                    : { y: -1, scale: noButtonScale * 1.02 }
                }
                whileTap={{ scale: noButtonScale * 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full sm:w-auto min-w-[130px] rounded-2xl border-2 border-[#0E0F12]/15 bg-[#F4F5F7] px-7 py-4 font-display text-base font-bold text-[#0E0F12] hover:border-[#0E0F12]/40 transition-colors"
              >
                {noButtonLabel}
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                type="button"
                onClick={handleConfirmYes}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto min-w-[180px] rounded-2xl bg-[#E2FF3B] border-2 border-[#0E0F12] px-8 py-4 font-display text-base font-extrabold text-[#0E0F12] shadow-pf-lime"
              >
                {CONFIG.DIALOGUE.confirmYesLabel}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleWaitClick}
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto min-w-[170px] rounded-2xl border-2 border-[#0E0F12]/15 bg-[#F4F5F7] px-6 py-4 font-display text-base font-bold text-[#0E0F12] hover:border-[#0E0F12]/40 transition-colors"
              >
                {CONFIG.DIALOGUE.confirmWaitLabel}
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
