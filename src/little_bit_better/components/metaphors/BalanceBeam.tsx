import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface BalanceBeamProps {
  delay?: number;
  tiltAngle?: number; // Target tilt angle in degrees (positive = right down, negative = left down)
  tiltDelay?: number;
  leftLabel?: string;
  rightLabel?: string;
  x?: number;
  y?: number;
}

export const BalanceBeam: React.FC<BalanceBeamProps> = ({
  delay = 0,
  tiltAngle = 14,
  tiltDelay = 60,
  leftLabel = 'CASH SAVINGS',
  rightLabel = 'ASSETS',
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const tilt = spring({
    frame: frame - tiltDelay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const currentTilt = interpolate(tilt, [0, 1], [0, tiltAngle]);

  if (frame < delay) return null;

  const ink = LITTLE_BIT_BETTER_THEME.inkPrimary;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${pop})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="340" height="200" viewBox="0 0 340 200" fill="none">
        {/* Fulcrum Triangle Base */}
        <polygon points="170,120 145,185 195,185" fill="#64748B" stroke={ink} strokeWidth="5" />
        <circle cx="170" cy="120" r="8" fill={ink} />

        {/* Rotating Beam */}
        <g
          style={{
            transform: `rotate(${currentTilt}deg)`,
            transformOrigin: '170px 120px',
          }}
        >
          {/* Main Crossbar */}
          <line x1="30" y1="120" x2="310" y2="120" stroke={ink} strokeWidth="8" strokeLinecap="round" />

          {/* Left Pan Chain & Weight */}
          <g transform="translate(45, 120)">
            <line x1="0" y1="0" x2="-15" y2="35" stroke={ink} strokeWidth="3" />
            <line x1="0" y1="0" x2="15" y2="35" stroke={ink} strokeWidth="3" />
            <path d="M -25 35 L 25 35 L 20 42 L -20 42 Z" fill="#94A3B8" stroke={ink} strokeWidth="3" />
            {/* Cash/Weight stack */}
            <rect x="-16" y="16" width="32" height="18" rx="3" fill="#EF4444" stroke={ink} strokeWidth="2" />
          </g>

          {/* Right Pan Chain & Heavy Golden Wealth */}
          <g transform="translate(295, 120)">
            <line x1="0" y1="0" x2="-15" y2="35" stroke={ink} strokeWidth="3" />
            <line x1="0" y1="0" x2="15" y2="35" stroke={ink} strokeWidth="3" />
            <path d="M -25 35 L 25 35 L 20 42 L -20 42 Z" fill="#94A3B8" stroke={ink} strokeWidth="3" />
            {/* Multiple Gold Blocks */}
            <rect x="-18" y="14" width="36" height="20" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
            <rect x="-14" y="-2" width="28" height="16" rx="3" fill="#10B981" stroke="#065F46" strokeWidth="2" />
          </g>
        </g>
      </svg>

      {/* Under Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 340,
          marginTop: -6,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 0.5,
        }}
      >
        <span style={{ color: LITTLE_BIT_BETTER_THEME.accentRed }}>{leftLabel}</span>
        <span style={{ color: LITTLE_BIT_BETTER_THEME.accentGreen }}>{rightLabel}</span>
      </div>
    </div>
  );
};
