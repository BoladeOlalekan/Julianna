import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glossy flat-3D envelope illustration with a coral/pink heart wax seal,
 * subtle fintech highlight sheen, and animated lifting top flap.
 */
export function EnvelopeSVG({ isOpen = false, className = 'w-64 sm:w-80' }) {
  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      {/* Ambient glow behind envelope */}
      <div className="absolute -inset-6 rounded-full bg-violet-electric/25 blur-3xl pointer-events-none" />

      <svg
        viewBox="0 0 320 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-auto drop-shadow-[0_24px_38px_rgba(11,16,32,0.75)]"
      >
        <defs>
          <linearGradient id="envBody" x1="20" y1="55" x2="300" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7E5EFF" />
            <stop offset="55%" stopColor="#6D4AFF" />
            <stop offset="100%" stopColor="#4B2EDB" />
          </linearGradient>
          <linearGradient id="envInner" x1="160" y1="60" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#261B5C" />
            <stop offset="100%" stopColor="#3B2791" />
          </linearGradient>
          <linearGradient id="envFlap" x1="160" y1="55" x2="160" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#947BFF" />
            <stop offset="100%" stopColor="#6240F5" />
          </linearGradient>
          <linearGradient id="envFrontLeft" x1="20" y1="70" x2="160" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6A46FF" />
            <stop offset="100%" stopColor="#4D2EE0" />
          </linearGradient>
          <linearGradient id="envFrontBottom" x1="160" y1="130" x2="160" y2="216" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5D3CF2" />
            <stop offset="100%" stopColor="#4224C9" />
          </linearGradient>
          <linearGradient id="waxSeal" x1="140" y1="112" x2="182" y2="156" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF85A1" />
            <stop offset="55%" stopColor="#FF6B8A" />
            <stop offset="100%" stopColor="#E13E65" />
          </linearGradient>
          <linearGradient id="letterCard" x1="160" y1="20" x2="160" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EDF1FA" />
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
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />

        {/* Peeking letter card that rises slightly when open */}
        <motion.g
          animate={{ y: isOpen ? -34 : 6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect
            x="48"
            y="68"
            width="224"
            height="120"
            rx="14"
            fill="url(#letterCard)"
          />
          {/* Mini fintech-style lines on the letter */}
          <rect x="72" y="88" width="76" height="8" rx="4" fill="#6D4AFF" fillOpacity="0.8" />
          <rect x="72" y="106" width="166" height="6" rx="3" fill="#0B1020" fillOpacity="0.16" />
          <rect x="72" y="120" width="132" height="6" rx="3" fill="#0B1020" fillOpacity="0.12" />
          {/* Tiny emerald upward sparkline on letter */}
          <path
            d="M214 96 L224 90 L232 93 L244 82"
            stroke="#2EE6A6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Left & Right envelope side folds */}
        <path
          d="M22 84 C22 72 30 62 42 62 L160 144 L42 214 C30 214 22 204 22 192 Z"
          fill="url(#envFrontLeft)"
        />
        <path
          d="M298 84 C298 72 290 62 278 62 L160 144 L278 214 C290 214 298 204 298 192 Z"
          fill="url(#envBody)"
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
          stroke="rgba(255,255,255,0.22)"
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
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="1.4"
          />
          {/* Glossy specular highlight on flap */}
          <path
            d="M54 68 H266 L160 138 Z"
            fill="white"
            fillOpacity="0.08"
          />
        </motion.g>

        {/* Heart Wax Seal (fades & pops gently when flap lifts) */}
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
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Glossy heart icon inside wax seal */}
          <path
            d="M160 151.5 C160 151.5 149 144.6 149 138.2 C149 134.8 151.6 132.5 154.6 132.5 C156.8 132.5 158.7 133.8 160 135.6 C161.3 133.8 163.2 132.5 165.4 132.5 C168.4 132.5 171 134.8 171 138.2 C171 144.6 160 151.5 160 151.5 Z"
            fill="#FFFFFF"
          />
        </motion.g>

        {/* Tiny floating sparkles around envelope */}
        <circle cx="38" cy="40" r="3.5" fill="#2EE6A6" />
        <circle cx="288" cy="46" r="4" fill="#FFC83D" />
        <path d="M292 22 L294 28 L300 30 L294 32 L292 38 L290 32 L284 30 L290 28 Z" fill="#FF6B8A" />
      </svg>
    </div>
  );
}
