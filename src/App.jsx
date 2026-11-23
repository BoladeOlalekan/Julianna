import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { CONFIG } from './config/config';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { TopBar } from './components/TopBar';
import { FintechDecor } from './components/FintechDecor';
import { LandingScreen } from './screens/LandingScreen';
import { VerifyScreen } from './screens/VerifyScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ReadyConfirmScreen } from './screens/ReadyConfirmScreen';
import { ThanksScreen } from './screens/ThanksScreen';

// Lazy-load heavier cinema & email scenes for fast initial WhatsApp mobile load
const CurtainCreditsScreen = lazy(() =>
  import('./screens/CurtainCreditsScreen').then((m) => ({
    default: m.CurtainCreditsScreen,
  }))
);
const ReplyScreen = lazy(() =>
  import('./screens/ReplyScreen').then((m) => ({
    default: m.ReplyScreen,
  }))
);

/**
 * Valid state machine steps:
 * landing -> verify -> welcome -> ready -> confirm -> curtain -> message -> reply -> thanks -> landing
 */
const SHEET_TRANSITION = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [cycleKey, setCycleKey] = useState(0);

  const { isPlaying, isMuted, startMusic, toggleMute, setDucked } =
    useBackgroundMusic();

  // Preload her photo in the background so Screen 3 renders instantly
  useEffect(() => {
    if (!CONFIG.FRIEND_PHOTO) return;
    const img = new Image();
    img.src = CONFIG.FRIEND_PHOTO;
  }, []);

  const handleReadLetter = useCallback(() => {
    // First user gesture: start background music
    startMusic();
    setScreen('verify');
  }, [startMusic]);

  const handleResetToLanding = useCallback(() => {
    // Full state reset (envelope slides in again); music keeps its current mute state
    setCycleKey((k) => k + 1);
    setScreen('landing');
  }, []);

  const isCinemaScreen = screen === 'curtain' || screen === 'message';

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0B1020] text-white">
        {/* Persistent Fintech Background Decor (softened during cinema stage) */}
        {!isCinemaScreen && (
          <FintechDecor intensity={screen === 'landing' ? 'full' : 'minimal'} />
        )}

        {/* Slim Floating Top Bar + Music Equaliser Pill */}
        <TopBar
          currentState={screen}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />

        {/* Single-Page State Machine */}
        <main>
          <AnimatePresence mode="wait">
            {screen === 'landing' && (
              <motion.div key={`landing-${cycleKey}`} {...SHEET_TRANSITION}>
                <LandingScreen onReadLetter={handleReadLetter} />
              </motion.div>
            )}

            {screen === 'verify' && (
              <motion.div key="verify" {...SHEET_TRANSITION}>
                <VerifyScreen onVerified={() => setScreen('welcome')} />
              </motion.div>
            )}

            {screen === 'welcome' && (
              <motion.div key="welcome" {...SHEET_TRANSITION}>
                <WelcomeScreen onContinue={() => setScreen('ready')} />
              </motion.div>
            )}

            {(screen === 'ready' || screen === 'confirm') && (
              <motion.div key="ready-confirm" {...SHEET_TRANSITION}>
                <ReadyConfirmScreen
                  step={screen}
                  onSetStep={setScreen}
                  onStartCurtain={() => setScreen('curtain')}
                  onSpeakingChange={setDucked}
                />
              </motion.div>
            )}

            {isCinemaScreen && (
              <motion.div
                key="curtain-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Suspense
                  fallback={
                    <div className="flex min-h-screen items-center justify-center bg-[#060812] text-sm font-semibold text-white/70">
                      Setting the stage...
                    </div>
                  }
                >
                  <CurtainCreditsScreen
                    onStageReady={() => setScreen('message')}
                    onFinished={() => setScreen('reply')}
                  />
                </Suspense>
              </motion.div>
            )}

            {screen === 'reply' && (
              <motion.div key="reply" {...SHEET_TRANSITION}>
                <Suspense
                  fallback={
                    <div className="flex min-h-screen items-center justify-center text-sm font-semibold text-white/70">
                      Loading reply card...
                    </div>
                  }
                >
                  <ReplyScreen onSubmitted={() => setScreen('thanks')} />
                </Suspense>
              </motion.div>
            )}

            {screen === 'thanks' && (
              <motion.div key="thanks" {...SHEET_TRANSITION}>
                <ThanksScreen onReset={handleResetToLanding} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
