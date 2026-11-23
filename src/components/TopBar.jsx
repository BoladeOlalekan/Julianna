import React from 'react';
import { motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';
import { CONFIG } from '../config/config';

/**
 * Slim floating top bar with the persistent music toggle pill (♪ Gratitude, playing/muted).
 * Styled after the crisp ProFinance top-right action pill.
 */
export function TopBar({ isDark = false, isPlaying, isMuted, onToggleMute }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 pointer-events-none">
      <div className="mx-auto max-w-4xl flex items-center justify-end gap-2">
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
          className={`pointer-events-auto inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition-colors ${
            isDark
              ? 'bg-white/10 text-white border border-white/15 backdrop-blur-md hover:bg-white/15'
              : 'bg-white text-[#0E0F12] border border-[#0E0F12]/12 shadow-pf-card hover:border-[#0E0F12]/35'
          }`}
        >
          {isPlaying && !isMuted ? (
            <span
              className="flex items-end justify-center gap-[2px] h-4 w-4 rounded-full bg-[#E2FF3B] p-[3px]"
              aria-hidden="true"
            >
              <span className="w-[2.5px] h-full rounded-full bg-[#0E0F12] origin-bottom eq-bar-1" />
              <span className="w-[2.5px] h-full rounded-full bg-[#0E0F12] origin-bottom eq-bar-2" />
              <span className="w-[2.5px] h-full rounded-full bg-[#0E0F12] origin-bottom eq-bar-3" />
            </span>
          ) : (
            <VolumeX
              className={`h-3.5 w-3.5 ${isDark ? 'text-white/60' : 'text-[#0E0F12]/50'}`}
              aria-hidden="true"
            />
          )}
          <span className="max-w-[115px] sm:max-w-[170px] truncate">
            ♪ {CONFIG.SONG_TITLE}
          </span>
          <span
            className={`hidden xs:inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
              isPlaying && !isMuted
                ? 'bg-[#E2FF3B] text-[#0E0F12]'
                : isDark
                  ? 'bg-white/10 text-white/60'
                  : 'bg-[#F4F5F7] text-[#0E0F12]/55'
            }`}
          >
            {isPlaying && !isMuted ? 'On' : 'Muted'}
          </span>
        </motion.button>
      </div>
    </header>
  );
}
