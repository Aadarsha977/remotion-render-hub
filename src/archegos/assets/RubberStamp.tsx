import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface RubberStampProps {
  text: string;
  subText?: string;
  color?: string;
  delay?: number;
  rotation?: number;
}

/**
 * RubberStamp
 * Tactile Ink Rubber Stamp Impact with 3-frame scale spring and shockwave.
 */
export const RubberStamp: React.FC<RubberStampProps> = ({
  text,
  subText = 'OFFICIAL REGULATORY NOTICE',
  color = '#EF4444',
  delay = 20,
  rotation = -12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, stiffness: 160, mass: 0.4 },
  });

  const scale = interpolate(entrance, [0, 1], [3.0, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 24px',
        border: `4px solid ${color}`,
        borderRadius: 6,
        background: `${color}15`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity: entrance,
        boxShadow: `0 0 30px ${color}50`,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 900, color, letterSpacing: '0.12em', fontFamily: 'system-ui, sans-serif' }}>
        {text}
      </div>
      {subText && (
        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.18em', fontFamily: 'monospace', marginTop: 2 }}>
          {subText}
        </div>
      )}
    </div>
  );
};