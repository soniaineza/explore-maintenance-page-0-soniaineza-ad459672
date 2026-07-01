'use client'

export function DancingGorilla() {
  return (
    <span className="inline-flex items-center justify-center dancing-gorilla" aria-label="Dancing gorilla">
      <svg
        width="22"
        height="22"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <ellipse cx="50" cy="55" rx="32" ry="28" className="fill-foreground/90 dark:fill-foreground/90" />
        <circle cx="36" cy="50" r="5" fill="white" />
        <circle cx="64" cy="50" r="5" fill="white" />
        <circle cx="37" cy="49" r="2.5" className="fill-foreground" />
        <circle cx="65" cy="49" r="2.5" className="fill-foreground" />
        <ellipse cx="50" cy="62" rx="10" ry="6" className="fill-foreground/80 dark:fill-foreground/80" />
        <circle cx="44" cy="60" r="1.2" fill="white" />
        <circle cx="56" cy="60" r="1.2" fill="white" />
        <rect x="30" y="42" width="8" height="4" rx="2" className="fill-foreground/80 dark:fill-foreground/80" />
        <rect x="62" y="42" width="8" height="4" rx="2" className="fill-foreground/80 dark:fill-foreground/80" />
        <path d="M25 70 Q15 85 20 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-foreground/80 arm-left" />
        <path d="M75 70 Q85 85 80 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-foreground/80 arm-right" />
        <ellipse cx="20" cy="68" rx="6" ry="4" className="fill-foreground/70 dark:fill-foreground/70" />
        <ellipse cx="80" cy="68" rx="6" ry="4" className="fill-foreground/70 dark:fill-foreground/70" />
        <path d="M38 30 Q45 22 50 22 Q55 22 62 30" stroke="currentColor" strokeWidth="3" fill="none" className="text-foreground/90" />
        <circle cx="50" cy="28" r="4" className="fill-primary" />
        <circle cx="48" cy="27" r="1" fill="white" />
        <circle cx="52" cy="27" r="1" fill="white" />
      </svg>
      <style>{`
        .dancing-gorilla {
          animation: gorillaBounce 1.5s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .arm-left {
          animation: armSwing 1.5s ease-in-out infinite;
          transform-origin: 25px 70px;
        }
        .arm-right {
          animation: armSwing 1.5s ease-in-out infinite;
          transform-origin: 75px 70px;
          animation-delay: 0.15s;
        }
        @keyframes gorillaBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-3deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-2px) rotate(3deg); }
        }
        @keyframes armSwing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(8deg); }
        }
        .dancing-gorilla:hover {
          animation-duration: 0.6s;
        }
      `}</style>
    </span>
  )
}
