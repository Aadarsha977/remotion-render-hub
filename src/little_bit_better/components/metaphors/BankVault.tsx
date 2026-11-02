import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface BankVaultProps {
  delay?: number;
  x?: number;
  y?: number;
  balanceText?: string;
}

export const BankVault: React.FC<BankVaultProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  balanceText = '$50,000 SAVED',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.7 },
  });

  // Rotation of combination dial
  const dialRotation = interpolate(frame - delay, [0, 45], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg width="220" height="230" viewBox="0 0 220 230" fill="none">
        {/* Main Vault Box */}
        <rect
          x="15"
          y="25"
          width="190"
          height="190"
          rx="24"
          fill="#F1F5F9"
          stroke={ink}
          strokeWidth="6"
        />

        {/* Inner Door */}
        <rect
          x="35"
          y="45"
          width="150"
          height="150"
          rx="16"
          fill="#E2E8F0"
          stroke={ink}
          strokeWidth="4"
        />

        {/* Combination Wheel Rim */}
        <circle cx="110" cy="120" r="42" fill="#CBD5E1" stroke={ink} strokeWidth="5" />
        
        {/* Rotating Wheel Spokes */}
        <g
          style={{
            transform: `rotate(${dialRotation}deg)`,
            transformOrigin: '110px 120px',
          }}
        >
          <circle cx="110" cy="120" r="14" fill="#94A3B8" stroke={ink} strokeWidth="3.5" />
          <line x1="110" y1="80" x2="110" y2="160" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="70" y1="120" x2="150" y2="120" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="82" y1="92" x2="138" y2="148" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          <line x1="138" y1="92" x2="82" y2="148" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Steel Hinges */}
        <rect x="188" y="55" width="16" height="32" rx="4" fill="#64748B" stroke={ink} strokeWidth="3" />
        <rect x="188" y="150" width="16" height="32" rx="4" fill="#64748B" stroke={ink} strokeWidth="3" />
      </svg>

      {/* Balance Tag */}
      {balanceText && (
        <div
          style={{
            marginTop: 4,
            backgroundColor: '#0F172A',
            color: '#38BDF8',
            padding: '4px 16px',
            borderRadius: 16,
            fontSize: 14,
            fontWeight: 800,
            fontFamily: 'monospace',
            letterSpacing: 0.5,
          }}
        >
          {balanceText}
        </div>
      )}
    </div>
  );
};
