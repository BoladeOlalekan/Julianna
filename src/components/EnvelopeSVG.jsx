import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glossy flat-3D envelope illustration styled in the ProFinance palette:
 * Jet-black body (#111214), crisp white peeking letter card with electric-lime
 * sparkline (#E2FF3B), and a coral-red heart wax seal (#FF6B6B).
 */
export function EnvelopeSVG({ isOpen = false, className = 'w-64 sm:w-80' }) {
  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 320 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-auto drop-shadow-[0_22px_30px_rgba(14,15,18,0.22)]"
      >
        <defs>
          <linearGradient id="envBody" x1="20" y1="55" x2="300" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D1F25" />
            <stop offset="100%" stopColor="#0E0F12" />
          </linearGradient>
          <linearGradient id="envInner" x1="160" y1="60" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A2D36" />
            <stop offset="100%" stopColor="#14161B" />
          </linearGradient>
          <linearGradient id="envFlap" x1="160" y1="55" x2="160" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A2D36" />
            <stop offset="100%" stopColor="#13151A" />
          </linearGradient>
          <linearGradient id="envFrontBottom" x1="160" y1="130" x2="160" y2="216" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#17191F" />
            <stop offset="100%" stopColor="#0B0C0F" />
          </linearGradient>
          <linearGradient id="waxSeal" x1="140" y1="112" x2="182" y2="156" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF8282" />
            <stop offset="60%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#E64848" />
          </linearGradient>
        </defs>

        {/* Back body of envelope */}
        <rect
          x="22"
          y="62"
          width="276"
          height="152"
          rx="22"
          fill="url(#envInner)"
          stroke="#0E0F12"
          strokeWidth="2"
        />

        {/* Peeking crisp white letter card */}
        <motion.g
          animate={{ y: isOpen ? -36 : 6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect
            x="46"
            y="68"
            width="228"
            height="122"
            rx="14"
            fill="#FFFFFF"
            stroke="#0E0F12"
            strokeOpacity="0.1"
            strokeWidth="1.5"
          />
          {/* Lime pill header + mini fintech lines on the letter */}
          <rect x="68" y="86" width="76" height="10" rx="5" fill="#E2FF3B" />
          <rect x="68" y="106" width="166" height="6" rx="3" fill="#0E0F12" fillOpacity="0.16" />
          <rect x="68" y="120" width="128" height="6" rx="3" fill="#0E0F12" fillOpacity="0.1" />
          {/* Tiny upward sparkline on letter */}
          <path
            d="M214 96 L224 90 L232 93 L246 82"
            stroke="#0E0F12"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Left & Right envelope side folds */}
        <path
          d="M22 84 C22 72 30 62 42 62 L160 144 L42 214 C30 214 22 204 22 192 Z"
          fill="url(#envBody)"
        />
        <path
          d="M298 84 C298 72 290 62 278 62 L160 144 L278 214 C290 214 298 204 298 192 Z"
          fill="#15171C"
        />

        {/* Bottom envelope fold */}
        <path
          d="M34 214 L145 134 C154 128 166 128 175 134 L286 214 C282 214 38 214 34 214 Z"
          fill="url(#envFrontBottom)"
        />
        <rect
          x="22"
          y="62"
          width="276"
          height="152"
          rx="22"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
        />

        {/* Animated Top Flap */}
        <motion.g
          style={{ transformOrigin: '160px 64px' }}
          animate={{
            scaleY: isOpen ? -0.92 : 1,
            y: isOpen ? -2 : 0,
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M28 70 C32 64 38 62 46 62 H274 C282 62 288 64 292 70 L174 152 C166 158 154 158 146 152 L28 70 Z"
            fill="url(#envFlap)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1.4"
          />
          <path d="M54 68 H266 L160 138 Z" fill="white" fillOpacity="0.06" />
        </motion.g>

        {/* Heart Wax Seal */}
        <motion.g
          animate={{
            scale: isOpen ? 0.72 : 1,
            opacity: isOpen ? 0 : 1,
            y: isOpen ? -16 : 0,
          }}
          style={{ transformOrigin: '160px 142px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="160" cy="142" r="24" fill="url(#waxSeal)" />
          <circle
            cx="160"
            cy="142"
            r="19"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <path
            d="M160 151.5 C160 151.5 149 144.6 149 138.2 C149 134.8 151.6 132.5 154.6 132.5 C156.8 132.5 158.7 133.8 160 135.6 C161.3 133.8 163.2 132.5 165.4 132.5 C168.4 132.5 171 134.8 171 138.2 C171 144.6 160 151.5 160 151.5 Z"
            fill="#FFFFFF"
          />
        </motion.g>

        {/* Crisp 4-point sparkle accents */}
        <path
          d="M292 22 L294.5 29 L302 31.5 L294.5 34 L292 41 L289.5 34 L282 31.5 L289.5 29 Z"
          fill="#0E0F12"
        />
        <circle cx="38" cy="40" r="4" fill="#FF6B6B" />
      </svg>
    </div>
  );
}
