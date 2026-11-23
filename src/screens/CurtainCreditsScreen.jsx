import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, formatLine } from '../config/config';
import { AnimeCharacters } from '../components/AnimeCharacters';

/**
 * Renders *italic* spans inside a paragraph safely without dangerouslySetInnerHTML.
 */
function FormattedParagraph({ text }) {
  const parts = String(text).split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <em key={idx} className="italic text-sunny font-semibold">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}

/**
 * Screen 5: Red Velvet Curtain Reveal + Cinematic Auto-Scrolling Credits
 * - Curtains close across screen, then characters pull them open left & right
 * - Dark cinema stage with soft spotlight & masked vertical fade
 * - Smooth 60fps auto-scroll (speed from CONFIG.SCROLL_SPEED)
 * - Clean unobstructed cinema view (supports gentle touch/wheel drag-to-scrub)
 */
export function CurtainCreditsScreen({ onStageReady, onFinished }) {
  // 'closing' -> 'pausedClosed' -> 'opening' -> 'open'
  const [curtainPhase, setCurtainPhase] = useState('closing');

  const stageRef = useRef(null);
  const contentRef = useRef(null);
  const offsetRef = useRef(0);
  const maxOffsetRef = useRef(1);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const hasTriggeredEndRef = useRef(false);

  // Orchestrate the curtain close -> character pull open sequence
  useEffect(() => {
    const t1 = setTimeout(() => setCurtainPhase('pausedClosed'), 750);
    const t2 = setTimeout(() => setCurtainPhase('opening'), 1450);
    const t3 = setTimeout(() => {
      setCurtainPhase('open');
      onStageReady?.();
    }, 2650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onStageReady]);

  // Measure credits height & run 60fps GPU-accelerated auto-scroll
  useEffect(() => {
    if (curtainPhase !== 'opening' && curtainPhase !== 'open') return;

    const stageEl = stageRef.current;
    const contentEl = contentRef.current;
    if (!stageEl || !contentEl) return;

    const recalcBounds = () => {
      const stageH = stageEl.clientHeight || window.innerHeight;
      const contentH = contentEl.scrollHeight || 1200;
      const totalTravel = contentH + stageH * 0.72;
      maxOffsetRef.current = Math.max(1, totalTravel);
    };

    recalcBounds();
    window.addEventListener('resize', recalcBounds);

    if (offsetRef.current === 0) {
      contentEl.style.transform = `translate3d(0, ${stageEl.clientHeight * 0.65}px, 0)`;
    }

    let frameId;
    let lastTime = performance.now();

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const stageH = stageEl.clientHeight || window.innerHeight;
      const startY = stageH * 0.65;

      if (!isDraggingRef.current && !prefersReduced) {
        offsetRef.current = Math.min(
          maxOffsetRef.current,
          offsetRef.current + CONFIG.SCROLL_SPEED * dt
        );
      }

      const currentY = startY - offsetRef.current;
      contentEl.style.transform = `translate3d(0, ${currentY}px, 0)`;

      const pct = Math.min(1, Math.max(0, offsetRef.current / maxOffsetRef.current));

      if (pct >= 0.995 && !hasTriggeredEndRef.current) {
        hasTriggeredEndRef.current = true;
        setTimeout(() => {
          onFinished();
        }, 1200);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', recalcBounds);
    };
  }, [curtainPhase, onFinished]);

  // Drag-to-scrub pointer handlers (works on mobile touch & desktop mouse)
  const handlePointerDown = useCallback((e) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartOffsetRef.current = offsetRef.current;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const deltaY = dragStartYRef.current - e.clientY;
    offsetRef.current = Math.min(
      maxOffsetRef.current,
      Math.max(0, dragStartOffsetRef.current + deltaY * 1.15)
    );
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Mouse wheel scrub support
  const handleWheel = useCallback((e) => {
    offsetRef.current = Math.min(
      maxOffsetRef.current,
      Math.max(0, offsetRef.current + e.deltaY * 0.75)
    );
  }, []);

  const curtainsClosed = curtainPhase === 'closing' || curtainPhase === 'pausedClosed';

  return (
    <section
      aria-label="Birthday letter cinema stage"
      className="relative z-10 h-screen w-full overflow-hidden bg-[#060812]"
    >
      {/* Soft cinema spotlight from top center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 18%, rgba(109, 74, 255, 0.22), rgba(255, 200, 61, 0.06) 45%, rgba(6, 8, 18, 0.96) 80%)',
        }}
        aria-hidden="true"
      />

      {/* Clean Cinema Credits Stage (drag up/down or scroll to scrub) */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative h-full w-full overflow-hidden credits-mask cursor-grab active:cursor-grabbing touch-none select-none px-6 sm:px-10"
      >
        <div
          ref={contentRef}
          className="mx-auto max-w-2xl text-center will-change-transform pb-32"
        >
          {/* Credits Title Header */}
          <div className="mb-12">
            <span className="inline-block rounded-full border border-sunny/35 bg-sunny/10 px-4 py-1 font-display text-[11px] font-bold tracking-[0.22em] text-sunny uppercase">
              {CONFIG.DIALOGUE.creditsHeader}
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
              {CONFIG.FRIEND_FULL_NAME}
            </h2>
            <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-mint to-transparent" />
          </div>

          {/* Epistle Paragraphs */}
          <div className="space-y-8 sm:space-y-10">
            {CONFIG.BIRTHDAY_MESSAGE.map((paragraph, idx) => (
              <p
                key={idx}
                className={`font-serif leading-[1.85] tracking-[0.01em] ${
                  idx === 0
                    ? 'text-2xl sm:text-3xl font-semibold text-mint'
                    : idx === CONFIG.BIRTHDAY_MESSAGE.length - 1
                      ? 'text-2xl sm:text-3xl italic font-semibold text-sunny pt-4'
                      : 'text-xl sm:text-2xl text-white/90 font-medium'
                }`}
              >
                <FormattedParagraph text={paragraph} />
              </p>
            ))}
          </div>

          {/* End Credits Sign-Off */}
          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-white/55">
              {CONFIG.DIALOGUE.creditsEndTagline}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-mint">
              - {CONFIG.CREATOR_NAME}
            </p>
          </div>
        </div>
      </div>

      {/* RED VELVET THEATRE CURTAINS OVERLAY */}
      <AnimatePresence>
        {curtainPhase !== 'open' && (
          <div className="pointer-events-none fixed inset-0 z-40 flex overflow-hidden">
            {/* Left Curtain Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: curtainsClosed ? '0%' : '-100%' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-1/2 velvet-curtain border-r-4 border-sunny/70"
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sunny via-amber-400 to-sunny opacity-75" />
            </motion.div>

            {/* Right Curtain Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: curtainsClosed ? '0%' : '100%' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-1/2 velvet-curtain border-l-4 border-sunny/70"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sunny via-amber-400 to-sunny opacity-75" />
            </motion.div>

            {/* Center Curtain Title + Characters Pulling Them Open */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: curtainPhase === 'pausedClosed' ? 1 : 0,
                scale: curtainPhase === 'pausedClosed' ? 1 : 0.92,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span className="rounded-full bg-sunny/20 border border-sunny/50 px-4 py-1 font-display text-xs font-bold tracking-[0.2em] text-sunny uppercase">
                {CONFIG.DIALOGUE.curtainTitle}
              </span>
              <p className="mt-3 font-serif text-2xl sm:text-3xl italic text-white drop-shadow-lg">
                {formatLine(CONFIG.DIALOGUE.curtainSubtitle)}
              </p>
              <div className="mt-4">
                <AnimeCharacters mood="celebrating" compact />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
