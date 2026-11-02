import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface ShrinkingCashStackProps {
  delay?: number;
  shrinkDelay?: number;
  shrinkToPercent?: number; // e.g. 50%
  label?: string;
  x?: number;
  y?: number;
}

export const ShrinkingCashStack: React.FC<ShrinkingCashStackProps> = ({
  delay = 0,
  shrinkDelay = 90,
  shrinkToPercent = 55,
  label = 'PURCHASING POWER',
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pop-in spring
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 220 },
  });

  // Shrink progress
  const shrinkProgress = interpolate(
    frame,
    [shrinkDelay, shrinkDelay + 35],
    [1, shrinkToPercent / 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  if (frame < delay) return null;

  const isShrunk = frame >= shrinkDelay;
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
      <svg width="140" height="150" viewBox="0 0 140 150" fill="none">
        {/* Base Stack Group with dynamic vertical scale */}
        <g
          style={{
            transform: `scaleY(${shrinkProgress})`,
            transformOrigin: 'bottom center',
            transition: 'none',
          }}
        >
          {/* 5 Stacked Bills */}
          {[0, 1, 2, 3, 4].map((i) => {
            const billY = 110 - i * 18;
            const billColor = i % 2 === 0 ? '#10B981' : '#34D399';
            return (
              <g key={i} transform={`translate(10, ${billY})`}>
                <rect
                  x="0"
                  y="0"
                  width="120"
                  height="26"
                  rx="6"
                  fill={billColor}
                  stroke={ink}
                  strokeWidth="3.5"
                />
                <circle cx="60" cy="13" r="6" fill="#065F46" />
                <line x1="12" y1="13" x2="28" y2="13" stroke="#065F46" strokeWidth="2" />
                <line x1="92" y1="13" x2="108" y2="13" stroke="#065F46" strokeWidth="2" />
              </g>
            );
          })}
        </g>

        {/* Inflation Flame / Scissors icon if shrinking */}
        {isShrunk && (
          <g transform="translate(100, 30)">
            <circle cx="16" cy="16" r="16" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
            <text x="16" y="21" fill="#DC2626" fontSize="16" fontWeight="900" textAnchor="middle">
              -45%
            </text>
          </g>
        )}
      </svg>

      {label && (
        <span
          style={{
            marginTop: 6,
            fontSize: 13,
            fontWeight: 800,
            color: isShrunk ? LITTLE_BIT_BETTER_THEME.accentRed : LITTLE_BIT_BETTER_THEME.inkSecondary,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
