import React from 'react';
import { motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';
import { CONFIG } from '../config/config';

/**
 * Slim floating top bar with the persistent music toggle pill (♪ Gratitude, playing/muted).
 */
export function TopBar({ isPlaying, isMuted, onToggleMute }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 pointer-events-none">
      <div className="mx-auto max-w-3xl flex items-center justify-end gap-2">
        {/* Persistent music toggle pill */}
        <motion.button
          type="button"
          onClick={onToggleMute}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label={
            isPlaying && !isMuted
              ? `Mute ${CONFIG.SONG_TITLE} by ${CONFIG.SONG_ARTIST}`
              : `Play ${CONFIG.SONG_TITLE} by ${CONFIG.SONG_ARTIST}`
          }
          aria-pressed={isPlaying && !isMuted}
          className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full glass-card px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-fintech hover:border-violet-electric/60 transition-colors"
        >
          {isPlaying && !isMuted ? (
            <span className="flex items-end gap-[2px] h-3.5 w-3.5" aria-hidden="true">
              <span className="w-[3px] h-full rounded-full bg-mint origin-bottom eq-bar-1" />
              <span className="w-[3px] h-full rounded-full bg-sunny origin-bottom eq-bar-2" />
              <span className="w-[3px] h-full rounded-full bg-coral origin-bottom eq-bar-3" />
            </span>
          ) : (
            <VolumeX className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
          )}
          <span className="max-w-[115px] sm:max-w-[170px] truncate">
            ♪ {CONFIG.SONG_TITLE}
          </span>
          <span
            className={`hidden xs:inline-block rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              isPlaying && !isMuted
                ? 'bg-mint/20 text-mint'
                : 'bg-white/10 text-white/60'
            }`}
          >
            {isPlaying && !isMuted ? 'On' : 'Muted'}
          </span>
        </motion.button>
      </div>
    </header>
  );
}
