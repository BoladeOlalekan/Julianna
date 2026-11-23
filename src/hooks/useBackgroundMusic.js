import { useCallback, useEffect, useRef, useState } from 'react';
import { CONFIG } from '../config/config';

const BASE_VOLUME = 0.6;
const DUCKED_VOLUME = 0.28;

/**
 * Manages the local background music track (CONFIG.SONG_PATH).
 * - Starts only on user gesture ("Read Letter" click or music pill click)
 * - Loops seamlessly with smooth fade-in to 60% volume
 * - Supports ducking while characters speak
 * - Pauses when browser tab is hidden and resumes on return
 * - Fails silently into muted state if audio file is missing or blocked
 */
export function useBackgroundMusic() {
  const audioRef = useRef(null);
  const fadeFrameRef = useRef(null);
  const isMutedRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isDuckedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Starts visually muted until first gesture

  // Smoothly ramp audio.volume toward targetVolume
  const fadeVolume = useCallback((targetVolume, durationMs = 700) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeFrameRef.current) {
      cancelAnimationFrame(fadeFrameRef.current);
    }

    const startVolume = audio.volume;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, startVolume + (targetVolume - startVolume) * eased));

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
      } else {
        fadeFrameRef.current = null;
      }
    };

    fadeFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Preload audio element once on mount
  useEffect(() => {
    const audio = new Audio(CONFIG.SONG_PATH);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;

    const handleError = () => {
      setIsPlaying(false);
      setIsMuted(true);
      isMutedRef.current = true;
    };

    audio.addEventListener('error', handleError);
    audioRef.current = audio;

    // Pause when tab hidden, resume when visible again
    const handleVisibilityChange = () => {
      const el = audioRef.current;
      if (!el || !hasStartedRef.current) return;

      if (document.hidden) {
        el.pause();
        setIsPlaying(false);
      } else if (!isMutedRef.current) {
        el.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
            setIsMuted(true);
            isMutedRef.current = true;
          });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.removeEventListener('error', handleError);
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Triggered on "Read Letter" click (first user gesture)
  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If user previously muted manually across a replay, respect their mute state
    if (hasStartedRef.current && isMutedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    isMutedRef.current = false;
    setIsMuted(false);
    audio.muted = false;
    audio.volume = 0;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeVolume(isDuckedRef.current ? DUCKED_VOLUME : BASE_VOLUME, 1400);
      })
      .catch(() => {
        // Fail silently and show toggle in muted state
        setIsPlaying(false);
        setIsMuted(true);
        isMutedRef.current = true;
      });
  }, [fadeVolume]);

  // Persistent mute/unmute toggle in top bar
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMutedRef.current || !hasStartedRef.current) {
      hasStartedRef.current = true;
      isMutedRef.current = false;
      setIsMuted(false);
      audio.muted = false;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeVolume(isDuckedRef.current ? DUCKED_VOLUME : BASE_VOLUME, 500);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsMuted(true);
          isMutedRef.current = true;
        });
    } else {
      isMutedRef.current = true;
      setIsMuted(true);
      fadeVolume(0, 280);
      setTimeout(() => {
        if (isMutedRef.current && audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, 300);
    }
  }, [fadeVolume]);

  // Duck volume slightly while anime characters are speaking
  const setDucked = useCallback(
    (ducked) => {
      isDuckedRef.current = ducked;
      const audio = audioRef.current;
      if (!audio || isMutedRef.current || !hasStartedRef.current) return;
      fadeVolume(ducked ? DUCKED_VOLUME : BASE_VOLUME, 450);
    },
    [fadeVolume]
  );

  return {
    isPlaying,
    isMuted,
    startMusic,
    toggleMute,
    setDucked,
  };
}
