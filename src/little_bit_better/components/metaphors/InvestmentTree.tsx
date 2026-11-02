import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface InvestmentTreeProps {
  delay?: number;
  x?: number;
  y?: number;
  label?: string;
}

export const InvestmentTree: React.FC<InvestmentTreeProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  label = 'COMPOUNDING ASSETS',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy trunk growth spring
  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  // Coin pop delay
  const coinPop = spring({
    frame: frame - (delay + 14),
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  if (frame < delay) return null;

  const ink = LITTLE_BIT_BETTER_THEME.inkPrimary;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${grow})`,
        transformOrigin: 'bottom center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg width="240" height="250" viewBox="0 0 240 250" fill="none">
        {/* Pot / Earth Base */}
        <path
          d="M 80 230 L 160 230 L 150 200 L 90 200 Z"
          fill="#D97706"
          stroke={ink}
          strokeWidth="4"
        />

        {/* Tree Trunk */}
        <path
          d="M 114 200 Q 112 150 90 120 M 126 200 Q 128 140 150 110"
          stroke="#92400E"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Foliage Clouds (Compounding Leaves) */}
        <circle cx="85" cy="100" r="34" fill="#34D399" stroke={ink} strokeWidth="4" />
        <circle cx="155" cy="95" r="38" fill="#10B981" stroke={ink} strokeWidth="4" />
        <circle cx="120" cy="70" r="44" fill="#059669" stroke={ink} strokeWidth="4" />

        {/* Shiny Compounding Gold Coins on Branches */}
        <g style={{ transform: `scale(${coinPop})`, transformOrigin: '120px 90px' }}>
          {/* Coin 1 */}
          <circle cx="75" cy="88" r="14" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <text x="75" y="93" fill="#78350F" fontSize="13" fontWeight="900" textAnchor="middle">$</text>

          {/* Coin 2 */}
          <circle cx="160" cy="80" r="15" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <text x="160" y="85" fill="#78350F" fontSize="14" fontWeight="900" textAnchor="middle">$</text>

          {/* Coin 3 Top */}
          <circle cx="120" cy="52" r="16" fill="#FBBF24" stroke="#B45309" strokeWidth="3" />
          <text x="120" y="58" fill="#78350F" fontSize="15" fontWeight="900" textAnchor="middle">$</text>

          {/* Coin 4 Right */}
          <circle cx="138" cy="118" r="13" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <text x="138" y="123" fill="#78350F" fontSize="12" fontWeight="900" textAnchor="middle">$</text>
        </g>
      </svg>

      {/* Label */}
      {label && (
        <div
          style={{
            marginTop: 4,
            backgroundColor: '#065F46',
            color: '#A7F3D0',
            padding: '4px 16px',
            borderRadius: 16,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
