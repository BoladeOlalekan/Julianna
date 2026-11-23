import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONFIG, formatLine } from '../config/config';
import { AnimeCharacters } from '../components/AnimeCharacters';
import { ConfettiBurst } from '../components/ConfettiBurst';
import { useTypewriter } from '../hooks/useTypewriter';

/**
 * Screen 4: The two anime characters + "Ready?" & "Confirm" dialogue tree.
 * - Typewriter speech bubbles (ducks background music slightly while typing)
 * - Escalating funny Nigerian-flavoured "No" path (#1, #2, #3, #4+ dodging/shrinking)
 * - "Yes" triggers confirmation ("You sure sure...?") with "Wait, let me think" loop
 * - "Yes, I'm sure" triggers celebration ("Get in jhor! 🔥") -> Curtain sequence
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

  // Duck background music gently while characters are talking
  useEffect(() => {
    onSpeakingChange?.(isTyping);
    return () => onSpeakingChange?.(false);
  }, [isTyping, onSpeakingChange]);

  const handleNoClick = () => {
    if (isCelebrating) return;

    const lines = CONFIG.DIALOGUE.noLines;
    // After 4 clicks, clicking "Okay fine 😅" smoothly moves her to the Yes/confirm path!
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

    // On 3rd+ click, nudge the No button playfully
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
        {/* Speech Bubble */}
        <motion.div
          layout
          className="relative w-full rounded-[28px] fintech-light-card px-6 py-5 sm:px-7 sm:py-6 shadow-fintech-light text-center"
        >
          <p
            className="font-display text-lg sm:text-xl font-bold text-[#111111] leading-snug min-h-[3.5rem] flex items-center justify-center"
            aria-live="polite"
          >
            <span>
              {displayedText}
              {isTyping && (
                <span className="ml-0.5 inline-block h-5 w-0.5 bg-violet-electric align-middle animate-pulse" />
              )}
            </span>
          </p>

          {/* Speech bubble tail pointing toward characters */}
          <div
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-5 w-5 rotate-45 bg-[#F5F7FB] border-r border-b border-[#111111]/10"
            aria-hidden="true"
          />
        </motion.div>

        {/* Animated Boy & Girl Chibi/Anime Characters */}
        <div className="mt-6">
          <AnimeCharacters mood={mood} />
        </div>

        {/* Action Buttons */}
        <div className="mt-7 w-full flex flex-col sm:flex-row items-center justify-center gap-3.5 min-h-[64px]">
          {isCelebrating ? (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-sunny/20 border border-sunny/40 px-6 py-3 font-display text-base font-extrabold text-sunny"
            >
              Opening the curtains... 🎭
            </motion.div>
          ) : step === 'ready' ? (
            <>
              <motion.button
                type="button"
                onClick={handleYesClick}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  scale: noCount >= 3 ? 1.07 : 1,
                }}
                className="w-full sm:w-auto min-w-[160px] rounded-full bg-gradient-to-r from-mint to-[#19C98E] px-8 py-3.5 font-display text-base font-extrabold text-[#0B1020] shadow-glow-mint"
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
                className="w-full sm:w-auto min-w-[130px] rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-display text-base font-bold text-white/90 hover:bg-white/15"
              >
                {noButtonLabel}
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                type="button"
                onClick={handleConfirmYes}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto min-w-[180px] rounded-full bg-gradient-to-r from-violet-electric via-[#7D5BFF] to-coral px-8 py-3.5 font-display text-base font-extrabold text-white shadow-glow-violet"
              >
                {CONFIG.DIALOGUE.confirmYesLabel}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleWaitClick}
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto min-w-[170px] rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-display text-base font-bold text-white/90 hover:bg-white/15"
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
