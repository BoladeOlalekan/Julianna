/**
 * ============================================================================
 * SINGLE CONFIG FILE — EDIT EVERYTHING HERE
 * Nothing personal is hard-coded inside any component.
 * ============================================================================
 */

export const CONFIG = {
  // ==========================================================================
  // 1. NAME CONFIRMATION (Screen 2: Identity Check)
  //    Add every nickname or spelling you want to accept.
  //    Matching is case-insensitive and trims extra spaces automatically.
  // ==========================================================================
  CORRECT_NAMES: [
    'Oluwanifemiii',
  ],

  // Short name used by the anime characters & pre-filled in the reply form
  FRIEND_DISPLAY_NAME: 'Oluwanifemiii',

  // Full name displayed on the Welcome screen under her photo
  FRIEND_FULL_NAME: 'Oladipo Oluwanifemi Julianna',

  // Path to her photo inside /public/assets/ (falls back to glowing initials if missing)
  FRIEND_PHOTO: '/assets/friend.jpg',

  // Your name / sign-off title
  CREATOR_NAME: 'Olalekan',

  // ==========================================================================
  // 2. SONG SELECTION (Background Music)
  //    Drop your MP3 file into: public/assets/gratitude.mp3
  //    (or change SONG_PATH to match whatever filename you put in public/assets/)
  // ==========================================================================
  SONG_PATH: '/assets/gratitude.mp3',
  SONG_TITLE: 'Gratitude',
  SONG_ARTIST: 'An Endless Ocean',

  // ==========================================================================
  // 3. CREDITS SCROLL SPEED (pixels per second — lower = slower & more readable)
  // ==========================================================================
  SCROLL_SPEED: 36,

  // ==========================================================================
  // 4. BIRTHDAY EPISTLE (Screen 5: Cinematic End-Credits)
  //    Each string is a paragraph. Use *text* for italic emphasis.
  // ==========================================================================
  BIRTHDAY_MESSAGE: [
    'Dear Oluwanifemiii.',
    'Look at you, honestly. If someone had told me back when I was running around serving as the JCCF Organizing Coordinator in the last tenure that one random night of you simply checking up on me would turn into this, I probably would have smiled politely and gone back to my endless to-do list. Yet here we are, and you have quietly become one of the closest, most irreplaceable people in my entire life.',
    'Sometimes the best friendships don’t announce themselves with fireworks; they sneak up on you through genuine care. That night you reached out just to check on me wasn\'t just a casual message-it was the doorway to a bond I didn\'t even realize I needed. In the middle of all the coordination, the planning, the pressure, and trying to keep everything together for everyone else, you showed up for *me*. You asked how I was really doing, and you actually stayed to listen. That single act of thoughtfulness set the tone for everything we have built since then.',
    'One of the things I admire most about you is your heart for God. Being around a genuinely God-fearing lady who doesn\'t just talk the talk, but carries grace, reverence, and sincerity in how she treats people, is such a rare gift. Your faith isn\'t loud for the sake of attention; it’s steady, grounding, and visible in your kindness. You have a heart so pure and generous that you naturally make the people around you feel seen, valued, and safe. Even when life gets hectic, your instinct is still to care, to pray, to encourage, and to show up.',
    'Now, let’s talk about the real you-because anyone who only sees the gentle, kind-hearted side hasn\'t gotten the full package yet! You are a certified good stubborn girl, and honestly, I wouldn\'t trade that for anything. Once your mind is made up about something, trying to convince you otherwise is practically an extreme sport. You stand your ground, you have your own strong convictions, and you refuse to let anyone push you around. Even when you’re being hard-headed and testing my patience, there’s something so endearing and authentic about how fiercely you own who you are.',
    'And of course, how could I write an epistle about you without mentioning my favorite cry baby? For someone so strong-willed and stubborn, your heart is remarkably soft. The smallest things can get those tears flowing-whether you’re overwhelmed, touched, frustrated, or just in your feelings-and every single time, it reminds me just how deeply you feel everything. You don\'t do fake toughness; you’re real, vulnerable, and human. And between your stubbornness and your waterworks, I’ve somehow signed up for a lifetime subscription to calming you down, teasing you about it, and making sure you’re okay. And truthfully? I love you just like that. Every single part of it.',
    'Now that I’m officially a graduate and you’re still holding things down in school, please know that distance, schedules, or new phases of life will never change where you stand with me. If anything, it only makes me more determined to be your anchor. Whenever school gets overwhelming, whenever deadlines start piling up, or whenever you just need someone to rant or cry to, I am right here. Come rain or sun, in good seasons and stressful ones, I will always show up for you, stand by you, and have your back-no questions asked. I will always love and cherish you, and you will never have to walk through any of it alone.',
    'Thank you for being a constant in my corner. Thank you for the late-night gist, the random check-ins, the laughter, the prayers, the honesty, and the effortless way you make friendship feel like home. Life moves fast, seasons change, and tenures come and go, but the people God plants in your life during those seasons are meant to last. You are proof that some connections are divinely orchestrated.',
    'I pray that God continues to bless you, strengthen you through the rest of your time in school, guard that big, soft heart of yours, and favor every single thing you lay your hands upon. May He surround you with the same genuine love, loyalty, and peace that you so freely pour into others-and may He give me extra strength to keep handling my stubborn cry baby for many, many years to come!',
    'Always in your corner, today and always my love.',
  ],

  // ==========================================================================
  // 5. FINTECH STAT CHIPS & UI BRANDING
  // ==========================================================================
  BRAND_WORDMARK: 'Birthday Edition',
  STAT_CHIPS: [
    { label: '+1 Year Wiser', trend: '↗', tone: 'mint' },
    { label: '100% Vibes', trend: '↗', tone: 'sunny' },
    { label: 'Grace Index', trend: '+999% ↗', tone: 'violet' },
  ],

  // ==========================================================================
  // 6. ALL CHARACTER & SCREEN DIALOGUE
  //    Use {name} anywhere to automatically insert FRIEND_DISPLAY_NAME.
  // ==========================================================================
  DIALOGUE: {
    // Screen 1: Landing
    landingEyebrow: 'SPECIAL DELIVERY · SEALED WITH CARE',
    landingHeadlineLines: ['Someone special has a', 'message for you 💌'],
    landingSubtitle: 'Tap below to unseal your letter and start the soundtrack.',
    readButtonLabel: 'Read Letter',

    // Screen 2: Identity Check
    verifyBadge: 'Quick Security Check',
    verifyQuestion: 'What are you mostly known by to the creator of this website?',
    verifyPlaceholder: 'Type your name or nickname...',
    verifySubmitLabel: 'Unlock Letter',
    verifySuccessLine: 'Identity confirmed! Welcome in ✨',
    wrongAnswerLines: [
      "Ah ah, that's not the name o! Try again 😄",
      'Hmm, close... or maybe not! Think of what he actually calls you 👀',
      'Oya pause and think well! Try another spelling or nickname 😅',
      'Security says no entry yet o! Give it one more shot 🔐',
    ],

    // Screen 3: Welcome Screen
    welcomeBadge: 'ACCESS GRANTED · HAPPY BIRTHDAY',
    welcomeSubtitle: 'Another year of grace, soft heart, and undefeated stubbornness. HAPPY BIRTHDAY✨',
    welcomeContinueLabel: 'Continue',

    // Screen 4: Characters ("Ready?" & "Confirm")
    readyGreeting: 'Heyyy {name}! 🎉 Welcome oo! You ready to read the message?',
    yesButtonLabel: 'Yes, I am!',
    noButtonLabel: 'No',
    noFinalButtonLabel: 'Okay fine 😅',

    // Escalating, funny, never-rude "No" lines
    noLines: [
      "NO oooo, you no get choice but to read am after all the creator's stress 😭",
      'Abeg {name}, even the characters don tire to wait o 🥺 Just click yes!',
      'Ehen? You wan make we call your mama? 😂 Click yes jhor!',
      'Okay okay, the No button has officially resigned 😅 Tap Yes already!',
    ],

    // Confirmation step when she clicks "Yes"
    confirmQuestion: 'You sure sure say you wan see wetin dey inside? 👀',
    confirmYesLabel: "Yes, I'm sure",
    confirmWaitLabel: 'Wait, let me think',

    // Funny loop-back lines when she clicks "Wait, let me think"
    waitLoopLines: [
      'Think wetin again {name}?! 😂 No suspense here, just pure love. Ready now?',
      'Take a deep breath, grab tissue just in case 🥺... okay, ready now?',
    ],

    // Celebration right before the curtains close
    celebrationLine: 'Get in jhor! 🔥',

    // Screen 5: Curtain & Credits
    curtainTitle: 'Now Showing',
    curtainSubtitle: 'A special epistle written just for {name}',
    creditsHeader: 'HAPPY BIRTHDAY',
    creditsEndTagline: 'Written with love & gratitude 💌',
    creditsContinueLabel: 'Leave a Reply',

    // Screen 6: Reply Form
    replyBadge: 'Your Turn',
    replyQuestion: 'What do you have to say?',
    replyNameLabel: 'Your Name',
    replyMessageLabel: 'Your Message',
    replyPlaceholder: 'Write anything on your heart right now...',
    replySubmitLabel: 'Send Reply 💌',
    replySendingLabel: 'Sending your message...',
    replyEmptyError: 'Abeg write something small before sending o 😊',
    replyErrorLine: "Oops! Message couldn't land right now. Tap retry to send again.",

    // Screen 7: Thank You & Auto-Reset
    thanksHeadline: 'Thank you o! Your message don land 💌',
    thanksSubline: 'Returning to the start in a few seconds so you can replay anytime...',
    thanksResetSeconds: 4,
  },

  // ==========================================================================
  // 7. FORMSPREE ENDPOINT (Read from .env — NEVER commit your .env file)
  //    Create a form at https://formspree.io and paste its URL into .env:
  //    VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
  // ==========================================================================
  FORMSPREE_ENDPOINT: import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
};

/**
 * Helper to replace {name} tokens with FRIEND_DISPLAY_NAME.
 */
export function formatLine(template, name = CONFIG.FRIEND_DISPLAY_NAME) {
  return String(template).replace(/\{name\}/g, name);
}
