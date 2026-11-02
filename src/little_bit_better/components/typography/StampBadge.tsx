import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface StampBadgeProps {
  text: string;
  delay?: number;
  color?: string;
  backgroundColor?: string;
  rotation?: number;
  fontSize?: number;
}

export const StampBadge: React.FC<StampBadgeProps> = ({
  text,
  delay = 0,
  color = LITTLE_BIT_BETTER_THEME.accentRed,
  backgroundColor = 'rgba(254, 242, 242, 0.95)',
  rotation = -10,
  fontSize = 32,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heavy stamp impact physics
  const slam = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 360, mass: 0.5 },
  });

  const opacity = interpolate(slam, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${slam}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        opacity,
        border: `4.5px dashed ${color}`,
        borderRadius: 12,
        padding: '10px 24px',
        color,
        backgroundColor,
        fontSize,
        fontWeight: 900,
        letterSpacing: 2,
        textTransform: 'uppercase',
        boxShadow: '0 12px 30px rgba(220, 38, 38, 0.2)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {text}
    </div>
  );
};
