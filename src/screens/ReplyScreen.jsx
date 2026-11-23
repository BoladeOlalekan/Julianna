import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, RefreshCw, Send } from 'lucide-react';
import { CONFIG } from '../config/config';

/**
 * Screen 6: Reply Sheet
 * - Rounded light-mode fintech card slides up
 * - Name pre-filled from CONFIG.FRIEND_DISPLAY_NAME
 * - Sends reply to your Formspree endpoint with name, message, and timestamp
 * - Validation, loading state, and graceful error state with retry
 */
export function ReplyScreen({ onSubmitted }) {
  const [name, setName] = useState(CONFIG.FRIEND_DISPLAY_NAME);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'error'
  const [errorText, setErrorText] = useState('');

  const sendReply = async () => {
    const trimmedMessage = message.trim();
    const trimmedName = name.trim() || CONFIG.FRIEND_DISPLAY_NAME;

    if (!trimmedMessage) {
      setErrorText(CONFIG.DIALOGUE.replyEmptyError);
      setStatus('error');
      return;
    }

    const endpoint = CONFIG.FORMSPREE_ENDPOINT?.trim();

    setStatus('sending');
    setErrorText('');

    const timestamp = new Date().toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    try {
      if (!endpoint) {
        throw new Error('FORMSPREE_NOT_CONFIGURED');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
          sent_at: timestamp,
          _subject: `Birthday Reply from ${trimmedName} 💌`,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.errors?.[0]?.message || 'FORMSPREE_REQUEST_FAILED');
      }

      onSubmitted();
    } catch (err) {
      setStatus('error');
      if (err?.message === 'FORMSPREE_NOT_CONFIGURED') {
        setErrorText(
          'Formspree endpoint is not set in .env yet. Add VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id to .env and restart the dev server.'
        );
      } else {
        setErrorText(CONFIG.DIALOGUE.replyErrorLine);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    sendReply();
  };

  return (
    <section
      aria-label="Send a reply"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-12"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-lg rounded-[32px] fintech-light-card p-6 sm:p-9 shadow-fintech-light"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-coral/15 px-3.5 py-1 text-xs font-bold text-rose-600">
          <span>💌 {CONFIG.DIALOGUE.replyBadge}</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]">
          {CONFIG.DIALOGUE.replyQuestion}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {/* Pre-filled Name Field */}
          <div>
            <label
              htmlFor="reply-name"
              className="block text-xs font-bold uppercase tracking-wider text-[#111111]/60 mb-1.5"
            >
              {CONFIG.DIALOGUE.replyNameLabel}
            </label>
            <input
              id="reply-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'sending'}
              className="w-full rounded-2xl border-2 border-[#111111]/10 bg-white px-4 py-3 text-base font-semibold text-[#111111] focus:border-violet-electric focus:outline-none transition-colors"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="reply-message"
              className="block text-xs font-bold uppercase tracking-wider text-[#111111]/60 mb-1.5"
            >
              {CONFIG.DIALOGUE.replyMessageLabel}
            </label>
            <textarea
              id="reply-message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === 'error') {
                  setStatus('idle');
                  setErrorText('');
                }
              }}
              disabled={status === 'sending'}
              placeholder={CONFIG.DIALOGUE.replyPlaceholder}
              className="w-full resize-none rounded-2xl border-2 border-[#111111]/10 bg-white px-4 py-3.5 text-base font-medium text-[#111111] placeholder:text-[#111111]/40 focus:border-violet-electric focus:outline-none transition-colors"
            />
          </div>

          {/* Error state with Retry */}
          {status === 'error' && errorText && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{errorText}</p>
              </div>
            </div>
          )}

          {/* Submit / Retry button */}
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={status !== 'sending' ? { y: -2, scale: 1.01 } : {}}
            whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-violet-electric via-[#7D5BFF] to-coral px-7 py-4 font-display text-base font-bold text-white shadow-glow-violet disabled:opacity-70"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{CONFIG.DIALOGUE.replySendingLabel}</span>
              </>
            ) : status === 'error' ? (
              <>
                <RefreshCw className="h-5 w-5" />
                <span>Try Sending Again</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{CONFIG.DIALOGUE.replySubmitLabel}</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
