import { useEffect, useState } from 'react';

/**
 * Typewriter effect for character speech bubbles.
 * Respects prefers-reduced-motion by revealing full text immediately.
 */
export function useTypewriter(text, speedMs = 26) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // Use Array.from so multi-byte emojis don't split mid-surrogate pair
    const chars = Array.from(text);
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(chars.slice(0, index).join(''));
      if (index >= chars.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs]);

  return { displayedText, isTyping };
}
