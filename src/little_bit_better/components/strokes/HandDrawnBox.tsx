import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface HandDrawnBoxProps {
  children: React.ReactNode;
  delay?: number;
  width?: number | string;
  padding?: number | string;
  borderColor?: string;
  backgroundColor?: string;
  title?: string;
  titleColor?: string;
}

export const HandDrawnBox: React.FC<HandDrawnBoxProps> = ({
  children,
  delay = 0,
  width = 'auto',
  padding = '24px 32px',
  borderColor = LITTLE_BIT_BETTER_THEME.inkPrimary,
  backgroundColor = '#FFFFFF',
  title,
  titleColor = LITTLE_BIT_BETTER_THEME.inkPrimary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 200, mass: 0.6 },
  });

  const rotation = interpolate(pop, [0, 1], [-2, 0.4]);

  if (frame < delay) return null;

  return (
    <div
      style={{
        transform: `scale(${pop}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        width,
        padding,
        backgroundColor,
        borderRadius: 16,
        border: `3.5px solid ${borderColor}`,
        boxShadow: '0 10px 30px rgba(30, 41, 59, 0.08), 0 2px 6px rgba(30, 41, 59, 0.04)',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {title && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: 20,
            backgroundColor: titleColor,
            color: '#FFFFFF',
            padding: '2px 14px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
};
