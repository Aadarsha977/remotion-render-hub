import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface HighlighterSweepProps {
  children: React.ReactNode;
  delay?: number;
  color?: string; // Yellow, Mint, Red
}

export const HighlighterSweep: React.FC<HighlighterSweepProps> = ({
  children,
  delay = 0,
  color = LITTLE_BIT_BETTER_THEME.accentAmberBg,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sweep = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 220 },
  });

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '0 6px',
        margin: '0 2px',
      }}
    >
      {/* Expanding marker background */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          bottom: '12%',
          height: '46%',
          width: `${sweep * 100}%`,
          backgroundColor: color,
          zIndex: 0,
          borderRadius: 4,
          transform: 'rotate(-0.8deg)',
          pointerEvents: 'none',
        }}
      />
      {/* Foreground text */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          fontWeight: 800,
          color: LITTLE_BIT_BETTER_THEME.inkPrimary,
        }}
      >
        {children}
      </span>
    </span>
  );
};
