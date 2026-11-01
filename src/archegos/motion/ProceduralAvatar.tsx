import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface ProceduralAvatarProps {
  seed: string;
  size?: number;
  delay?: number;
  glowColor?: string;
  style?: React.CSSProperties;
}

/**
 * ProceduralAvatar
 * 100% code-built, zero-network deterministic vector character avatar.
 * Eliminates external network calls (DiceBear, Unsplash, Pravatar) during headless Remotion rendering.
 * Uses string hashing to deterministically generate consistent palettes, shapes, and facial geometry.
 */
export const ProceduralAvatar: React.FC<ProceduralAvatarProps> = ({
  seed,
  size = 64,
  delay = 10,
  glowColor,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Simple deterministic hash function from seed string
  const hash = seed.split('').reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);

  const absHash = Math.abs(hash);

  // Curated high-contrast aesthetic gradient palettes
  const palettes = [
    { start: '#6366f1', end: '#a855f7', accent: '#38bdf8' }, // Indigo-Purple-Cyan
    { start: '#0ea5e9', end: '#10b981', accent: '#f59e0b' }, // Ocean-Emerald-Amber
    { start: '#ec4899', end: '#f43f5e', accent: '#fbbf24' }, // Pink-Rose-Gold
    { start: '#f97316', end: '#ef4444', accent: '#a855f7' }, // Orange-Red-Violet
    { start: '#14b8a6', end: '#06b6d4', accent: '#6366f1' }, // Teal-Cyan-Indigo
    { start: '#8b5cf6', end: '#3b82f6', accent: '#10b981' }, // Purple-Blue-Emerald
  ];

  const palette = palettes[absHash % palettes.length];
  const activeGlow = glowColor || `${palette.accent}40`;

  // Entrance spring animation
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 120,
      mass: 0.6,
    },
  });

  const scale = interpolate(progress, [0, 1], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Facial geometry variations derived from hash
  const eyeDistance = 14 + (absHash % 6);
  const eyeRadius = 3 + (absHash % 2.5);
  const smileVariant = absHash % 3; // 0 = smile arc, 1 = serious line, 2 = smirk
  const hasGlasses = absHash % 4 === 0;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        transform: `scale(${scale})`,
        opacity,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Volumetric glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          background: activeGlow,
          filter: 'blur(12px)',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Deterministic SVG Vector Art */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <defs>
          <linearGradient id={`grad-${absHash}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.start} />
            <stop offset="100%" stopColor={palette.end} />
          </linearGradient>
        </defs>

        {/* Background gradient disk */}
        <circle cx="50" cy="50" r="50" fill={`url(#grad-${absHash})`} />

        {/* Shoulders / Torso */}
        <ellipse cx="50" cy="95" rx="36" ry="24" fill="rgba(255, 255, 255, 0.2)" />

        {/* Head */}
        <circle cx="50" cy="46" r="24" fill="rgba(255, 255, 255, 0.95)" />

        {/* Eyes */}
        <circle cx={50 - eyeDistance / 2} cy="44" r={eyeRadius} fill="#1e293b" />
        <circle cx={50 + eyeDistance / 2} cy="44" r={eyeRadius} fill="#1e293b" />

        {/* Optional Glasses */}
        {hasGlasses && (
          <g stroke="#1e293b" strokeWidth="2.5" fill="none">
            <rect x={50 - eyeDistance / 2 - 6} y="38" width="12" height="12" rx="3" />
            <rect x={50 + eyeDistance / 2 - 6} y="38" width="12" height="12" rx="3" />
            <line x1={50 - eyeDistance / 2 + 6} y1="44" x2={50 + eyeDistance / 2 - 6} y2="44" />
          </g>
        )}

        {/* Mouth expression */}
        {smileVariant === 0 && (
          <path
            d="M 44 54 Q 50 60 56 54"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {smileVariant === 1 && (
          <line
            x1="45"
            y1="56"
            x2="55"
            y2="56"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
        {smileVariant === 2 && (
          <path
            d="M 44 56 Q 51 57 56 52"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
};
