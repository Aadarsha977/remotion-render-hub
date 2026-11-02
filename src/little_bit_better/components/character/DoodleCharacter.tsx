import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { CharacterMood, CharacterProp, LITTLE_BIT_BETTER_THEME } from '../../types';

interface DoodleCharacterProps {
  name?: string;
  role?: string;
  mood?: CharacterMood;
  prop?: CharacterProp;
  delay?: number;
  scale?: number;
  x?: number;
  y?: number;
  flipHorizontal?: boolean;
}

export const DoodleCharacter: React.FC<DoodleCharacterProps> = ({
  name,
  role,
  mood = 'happy',
  prop = 'none',
  delay = 0,
  scale = 1,
  x = 0,
  y = 0,
  flipHorizontal = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy spring entrance with slight overshoot
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 210, mass: 0.6 },
  });

  // Tilt settle animation (-7deg to 0deg)
  const rotation = interpolate(pop, [0, 1], [-7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Name badge secondary spring delay
  const badgePop = spring({
    frame: frame - (delay + 8),
    fps,
    config: { damping: 14, stiffness: 220 },
  });

  // Continuous subtle idle float (3px oscillation)
  const idleY = Math.sin((frame + delay * 3) / 12) * 3;
  // Micro breathing scale
  const breath = 1 + Math.sin(frame / 16) * 0.015;

  if (frame < delay) return null;

  const ink = LITTLE_BIT_BETTER_THEME.inkPrimary;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + idleY,
        transform: `scale(${pop * scale * (flipHorizontal ? -1 : 1)}, ${pop * scale * breath}) rotate(${rotation}deg)`,
        transformOrigin: 'bottom center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg width="220" height="280" viewBox="0 0 220 280" fill="none">
        {/* HEAD */}
        <circle
          cx="110"
          cy="70"
          r="42"
          stroke={ink}
          strokeWidth="6"
          fill="#FAF9F6"
        />

        {/* EYES & BROWS */}
        {mood === 'happy' && (
          <>
            <circle cx="95" cy="62" r="4.5" fill={ink} />
            <circle cx="125" cy="62" r="4.5" fill={ink} />
            {/* Smile */}
            <path
              d="M 94 78 Q 110 94 126 78"
              stroke={ink}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}

        {mood === 'worried' && (
          <>
            {/* Slanted brows */}
            <line x1="88" y1="52" x2="100" y2="56" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="132" y1="52" x2="120" y2="56" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="95" cy="64" r="4" fill={ink} />
            <circle cx="125" cy="64" r="4" fill={ink} />
            {/* Wavy nervous mouth */}
            <path
              d="M 94 85 Q 102 78 110 85 Q 118 92 126 85"
              stroke={ink}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Sweat Drop on Head */}
            <path
              d="M 148 50 Q 142 62 148 68 Q 154 62 148 50"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="1.5"
            />
          </>
        )}

        {mood === 'thinking' && (
          <>
            {/* Raised one brow */}
            <line x1="88" y1="50" x2="102" y2="54" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="120" y1="46" x2="134" y2="50" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="95" cy="63" r="4" fill={ink} />
            <circle cx="125" cy="61" r="4" fill={ink} />
            {/* Thoughtful smirk */}
            <path
              d="M 98 82 Q 112 80 126 76"
              stroke={ink}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </>
        )}

        {mood === 'rich' && (
          <>
            {/* Cool Sunglasses */}
            <rect x="85" y="52" width="22" height="18" rx="4" fill={ink} />
            <rect x="113" y="52" width="22" height="18" rx="4" fill={ink} />
            <line x1="107" y1="58" x2="113" y2="58" stroke={ink} strokeWidth="4" />
            {/* Confident big grin */}
            <path
              d="M 92 80 Q 110 100 128 80 Z"
              stroke={ink}
              strokeWidth="4"
              fill="#FFFFFF"
            />
          </>
        )}

        {mood === 'shocked' && (
          <>
            <circle cx="94" cy="58" r="6" fill={ink} />
            <circle cx="126" cy="58" r="6" fill={ink} />
            {/* Big Open O-mouth */}
            <ellipse cx="110" cy="82" rx="10" ry="14" stroke={ink} strokeWidth="4.5" fill="#EF4444" />
          </>
        )}

        {mood === 'confident' && (
          <>
            <circle cx="95" cy="62" r="4" fill={ink} />
            <circle cx="125" cy="62" r="4" fill={ink} />
            <path
              d="M 94 77 Q 110 90 126 77"
              stroke={ink}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}

        {/* BODY (Spine) */}
        <line
          x1="110"
          y1="112"
          x2="110"
          y2="200"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* LEGS */}
        <line
          x1="110"
          y1="200"
          x2="80"
          y2="265"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="110"
          y1="200"
          x2="140"
          y2="265"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* ARMS & PROPS */}
        {prop === 'none' && (
          <>
            <path d="M 110 135 L 75 175" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 110 135 L 145 175" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
          </>
        )}

        {prop === 'cash' && (
          <>
            <path d="M 110 135 L 75 160 L 60 145" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 110 135 L 145 160 L 160 145" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            {/* Green Cash Stack in hands */}
            <g transform="translate(140, 130)">
              <rect x="0" y="8" width="36" height="22" rx="4" fill="#10B981" stroke={ink} strokeWidth="2.5" />
              <rect x="4" y="2" width="36" height="22" rx="4" fill="#34D399" stroke={ink} strokeWidth="2.5" />
              <text x="18" y="18" fill="#065F46" fontSize="14" fontWeight="bold" textAnchor="middle">$</text>
            </g>
          </>
        )}

        {prop === 'gold_coin' && (
          <>
            <path d="M 110 135 L 80 170" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 110 135 L 145 145 L 160 120" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            {/* Floating Gold Coin */}
            <circle cx="165" cy="110" r="18" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
            <text x="165" y="117" fill="#78350F" fontSize="18" fontWeight="900" textAnchor="middle">$</text>
          </>
        )}

        {prop === 'laptop' && (
          <>
            <path d="M 110 135 L 85 165 L 105 165" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 110 135 L 135 165 L 115 165" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            {/* Laptop Screen & Base */}
            <rect x="85" y="145" width="45" height="28" rx="3" fill="#64748B" stroke={ink} strokeWidth="2.5" />
            <polygon points="80,173 135,173 140,178 75,178" fill="#94A3B8" stroke={ink} strokeWidth="2" />
          </>
        )}

        {prop === 'debt_ball' && (
          <>
            <path d="M 110 135 L 75 175" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 110 135 L 145 175" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
            {/* Heavy Iron Ball on Leg */}
            <line x1="80" y1="265" x2="45" y2="265" stroke="#475569" strokeWidth="4" strokeDasharray="3,3" />
            <circle cx="35" cy="265" r="22" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
            <text x="35" y="271" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">DEBT</text>
          </>
        )}
      </svg>

      {/* NAME & ROLE BADGE PILL */}
      {name && (
        <div
          style={{
            marginTop: 10,
            transform: `scale(${badgePop})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: LITTLE_BIT_BETTER_THEME.inkPrimary,
            color: '#FFFFFF',
            padding: '6px 18px',
            borderRadius: 24,
            boxShadow: '0 8px 20px rgba(30, 41, 59, 0.15)',
            border: '2px solid #334155',
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>{name}</span>
          {role && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
