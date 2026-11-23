import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Two expressive chibi/anime SVG characters (Boy & Girl) styled in the site's
 * fintech colour palette (#6D4AFF, #2EE6A6, #FFC83D, #FF6B8A).
 *
 * Moods: 'happy' | 'shock' | 'begging' | 'laughing' | 'thinking' | 'celebrating'
 */
export function AnimeCharacters({ mood = 'happy', compact = false }) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural periodic blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      const timer = setTimeout(() => setIsBlinking(false), 150);
      return () => clearTimeout(timer);
    }, 3400);
    return () => clearInterval(interval);
  }, []);

  const bounceAnim =
    mood === 'celebrating'
      ? { y: [0, -14, 0], rotate: [0, -4, 4, 0] }
      : mood === 'shock'
        ? { x: [0, -4, 4, -3, 3, 0], y: [0, -4, 0] }
        : { y: [0, -6, 0] };

  const bounceTransition =
    mood === 'celebrating'
      ? { duration: 0.55, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }
      : mood === 'shock'
        ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' };

  const sizeClass = compact ? 'w-24 h-28 sm:w-28 sm:h-32' : 'w-32 h-36 sm:w-40 sm:h-44';

  return (
    <div
      className="flex items-end justify-center gap-3 sm:gap-6 select-none"
      aria-label="Two animated anime characters reacting to your choices"
    >
      {/* BOY CHARACTER (Electric Violet + Mint hoodie) */}
      <motion.div
        animate={bounceAnim}
        transition={bounceTransition}
        className={sizeClass}
      >
        <svg viewBox="0 0 150 165" fill="none" className="w-full h-full drop-shadow-[0_14px_24px_rgba(11,16,32,0.55)]">
          {/* Body / Hoodie */}
          <path
            d="M36 154 C36 118 52 106 75 106 C98 106 114 118 114 154 Z"
            fill="#6D4AFF"
          />
          {/* Mint hoodie stripe & drawstrings */}
          <path d="M58 112 L75 128 L92 112" stroke="#2EE6A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="68" y1="124" x2="66" y2="142" stroke="#FFC83D" strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="124" x2="84" y2="142" stroke="#FFC83D" strokeWidth="3" strokeLinecap="round" />

          {/* Arms (raised when celebrating or shocked) */}
          {mood === 'celebrating' ? (
            <>
              <path d="M40 124 L18 96" stroke="#6D4AFF" strokeWidth="14" strokeLinecap="round" />
              <circle cx="16" cy="92" r="8" fill="#8D5524" />
              <path d="M110 124 L132 96" stroke="#6D4AFF" strokeWidth="14" strokeLinecap="round" />
              <circle cx="134" cy="92" r="8" fill="#8D5524" />
            </>
          ) : (
            <>
              <circle cx="34" cy="142" r="8" fill="#8D5524" />
              <circle cx="116" cy="142" r="8" fill="#8D5524" />
            </>
          )}

          {/* Neck */}
          <rect x="67" y="96" width="16" height="14" rx="6" fill="#7D491D" />

          {/* Head */}
          <ellipse cx="75" cy="64" rx="41" ry="39" fill="#8D5524" />

          {/* Stylish curly fade anime hair */}
          <path
            d="M33 56 C30 28 50 12 75 12 C100 12 120 28 117 56 C112 40 100 32 75 32 C50 32 38 40 33 56 Z"
            fill="#141829"
          />
          <circle cx="52" cy="24" r="10" fill="#141829" />
          <circle cx="72" cy="18" r="12" fill="#141829" />
          <circle cx="94" cy="23" r="11" fill="#141829" />
          {/* Violet hair shine */}
          <path d="M56 24 Q74 17 90 24" stroke="#6D4AFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.65" />

          {/* Ears */}
          <circle cx="34" cy="66" r="7" fill="#8D5524" />
          <circle cx="116" cy="66" r="7" fill="#8D5524" />

          {/* Rosy anime cheeks */}
          <ellipse cx="49" cy="74" rx="6.5" ry="3.8" fill="#FF6B8A" fillOpacity="0.45" />
          <ellipse cx="101" cy="74" rx="6.5" ry="3.8" fill="#FF6B8A" fillOpacity="0.45" />

          {/* Eyes based on mood */}
          <CharacterEyes mood={mood} isBlinking={isBlinking} accentColor="#2EE6A6" />

          {/* Mouth based on mood */}
          <CharacterMouth mood={mood} />

          {/* Sweat drop for shock/begging */}
          {(mood === 'shock' || mood === 'begging') && (
            <path
              d="M112 36 C112 36 118 45 118 49 C118 52.5 115.3 55 112 55 C108.7 55 106 52.5 106 49 C106 45 112 36 112 36 Z"
              fill="#60A5FA"
            />
          )}

          {/* Sparkle for celebrating */}
          {mood === 'celebrating' && (
            <path
              d="M126 20 L128.5 27 L136 29.5 L128.5 32 L126 39 L123.5 32 L116 29.5 L123.5 27 Z"
              fill="#FFC83D"
            />
          )}
        </svg>
      </motion.div>

      {/* GIRL CHARACTER (Coral + Sunny Yellow outfit, twin puffs) */}
      <motion.div
        animate={bounceAnim}
        transition={{ ...bounceTransition, delay: 0.18 }}
        className={sizeClass}
      >
        <svg viewBox="0 0 150 165" fill="none" className="w-full h-full drop-shadow-[0_14px_24px_rgba(11,16,32,0.55)]">
          {/* Twin hair puffs */}
          <circle cx="32" cy="34" r="18" fill="#141829" />
          <circle cx="118" cy="34" r="18" fill="#141829" />
          {/* Sunny yellow hair scrunchies */}
          <circle cx="42" cy="43" r="6" fill="#FFC83D" />
          <circle cx="108" cy="43" r="6" fill="#FFC83D" />

          {/* Body / Jacket */}
          <path
            d="M36 154 C36 118 52 106 75 106 C98 106 114 118 114 154 Z"
            fill="#FF6B8A"
          />
          {/* White inner tee & sunny collar */}
          <path d="M62 108 L75 134 L88 108 Z" fill="#F5F7FB" />
          <circle cx="75" cy="120" r="4" fill="#FFC83D" />

          {/* Arms */}
          {mood === 'celebrating' ? (
            <>
              <path d="M40 124 L18 96" stroke="#FF6B8A" strokeWidth="14" strokeLinecap="round" />
              <circle cx="16" cy="92" r="8" fill="#9E6230" />
              <path d="M110 124 L132 96" stroke="#FF6B8A" strokeWidth="14" strokeLinecap="round" />
              <circle cx="134" cy="92" r="8" fill="#9E6230" />
            </>
          ) : (
            <>
              <circle cx="34" cy="142" r="8" fill="#9E6230" />
              <circle cx="116" cy="142" r="8" fill="#9E6230" />
            </>
          )}

          {/* Neck */}
          <rect x="67" y="96" width="16" height="14" rx="6" fill="#8B5324" />

          {/* Head */}
          <ellipse cx="75" cy="64" rx="40" ry="38" fill="#9E6230" />

          {/* Sleek anime bangs */}
          <path
            d="M34 56 C34 26 52 15 75 15 C98 15 116 26 116 56 C106 42 94 36 82 38 C76 46 68 46 62 38 C50 36 42 42 34 56 Z"
            fill="#141829"
          />
          {/* Coral hair shine */}
          <path d="M56 26 Q75 19 94 26" stroke="#FF6B8A" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.65" />

          {/* Ears & tiny gold hoop earrings */}
          <circle cx="35" cy="66" r="6.5" fill="#9E6230" />
          <circle cx="115" cy="66" r="6.5" fill="#9E6230" />
          <circle cx="35" cy="74" r="4" stroke="#FFC83D" strokeWidth="2" />
          <circle cx="115" cy="74" r="4" stroke="#FFC83D" strokeWidth="2" />

          {/* Cheeks */}
          <ellipse cx="49" cy="74" rx="7" ry="4" fill="#FF6B8A" fillOpacity="0.5" />
          <ellipse cx="101" cy="74" rx="7" ry="4" fill="#FF6B8A" fillOpacity="0.5" />

          {/* Eyes */}
          <CharacterEyes mood={mood} isBlinking={isBlinking} accentColor="#FFC83D" hasLashes />

          {/* Mouth */}
          <CharacterMouth mood={mood} />

          {/* Sparkle for celebrating */}
          {mood === 'celebrating' && (
            <path
              d="M22 18 L24.5 25 L32 27.5 L24.5 30 L22 37 L19.5 30 L12 27.5 L19.5 25 Z"
              fill="#2EE6A6"
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
}

function CharacterEyes({ mood, isBlinking, accentColor, hasLashes = false }) {
  if (isBlinking && mood !== 'shock') {
    return (
      <g stroke="#141829" strokeWidth="3.5" strokeLinecap="round">
        <path d="M48 63 Q57 68 66 63" />
        <path d="M84 63 Q93 68 102 63" />
      </g>
    );
  }

  if (mood === 'laughing' || mood === 'celebrating') {
    return (
      <g stroke="#141829" strokeWidth="3.8" strokeLinecap="round">
        <path d="M48 65 Q57 54 66 65" />
        <path d="M84 65 Q93 54 102 65" />
      </g>
    );
  }

  if (mood === 'shock') {
    return (
      <g>
        <circle cx="57" cy="62" r="10.5" fill="#FFFFFF" stroke="#141829" strokeWidth="2.5" />
        <circle cx="93" cy="62" r="10.5" fill="#FFFFFF" stroke="#141829" strokeWidth="2.5" />
        <circle cx="57" cy="62" r="3.5" fill="#141829" />
        <circle cx="93" cy="62" r="3.5" fill="#141829" />
      </g>
    );
  }

  if (mood === 'begging') {
    return (
      <g>
        {/* Huge watery puppy eyes */}
        <ellipse cx="57" cy="63" rx="10" ry="11.5" fill="#141829" />
        <ellipse cx="93" cy="63" rx="10" ry="11.5" fill="#141829" />
        <circle cx="53" cy="59" r="4" fill="#FFFFFF" />
        <circle cx="89" cy="59" r="4" fill="#FFFFFF" />
        <circle cx="60" cy="67" r="2.2" fill="#FFFFFF" />
        <circle cx="96" cy="67" r="2.2" fill="#FFFFFF" />
        {/* Tiny worried brows */}
        <path d="M47 49 L64 46" stroke="#141829" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M103 49 L86 46" stroke="#141829" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    );
  }

  // Default big glossy anime eyes ('happy' | 'thinking')
  return (
    <g>
      <ellipse cx="57" cy="62" rx="8.5" ry="10" fill="#141829" />
      <ellipse cx="93" cy="62" rx="8.5" ry="10" fill="#141829" />
      {/* Colored iris glow */}
      <circle cx="57" cy="65" r="4.5" fill={accentColor} fillOpacity="0.4" />
      <circle cx="93" cy="65" r="4.5" fill={accentColor} fillOpacity="0.4" />
      {/* Big white anime catchlights */}
      <circle cx="54" cy="58" r="3.2" fill="#FFFFFF" />
      <circle cx="90" cy="58" r="3.2" fill="#FFFFFF" />
      <circle cx="60" cy="66" r="1.5" fill="#FFFFFF" />
      <circle cx="96" cy="66" r="1.5" fill="#FFFFFF" />
      {hasLashes && (
        <g stroke="#141829" strokeWidth="2.4" strokeLinecap="round">
          <path d="M46 56 L49 59" />
          <path d="M104 56 L101 59" />
        </g>
      )}
    </g>
  );
}

function CharacterMouth({ mood }) {
  if (mood === 'shock') {
    return <ellipse cx="75" cy="83" rx="6" ry="8" fill="#141829" stroke="#FF6B8A" strokeWidth="2" />;
  }
  if (mood === 'begging') {
    return <path d="M68 84 Q75 79 82 84" stroke="#141829" strokeWidth="3" strokeLinecap="round" />;
  }
  if (mood === 'thinking') {
    return <path d="M69 82 Q75 80 81 83" stroke="#141829" strokeWidth="3" strokeLinecap="round" />;
  }
  if (mood === 'laughing' || mood === 'celebrating') {
    return (
      <path
        d="M64 78 Q75 93 86 78 Z"
        fill="#141829"
        stroke="#141829"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    );
  }
  // Happy smile
  return <path d="M66 79 Q75 88 84 79" stroke="#141829" strokeWidth="3.2" strokeLinecap="round" />;
}
