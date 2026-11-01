import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface HighlightPillProps {
  children?: React.ReactNode;
  delay?: number;
  color?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
}

/**
 * HighlightPill
 * Kinetic background highlight card that dynamically sweeps / scales
 * behind key phrases or telemetry tags with snappy spring physics.
 */
export const HighlightPill: React.FC<HighlightPillProps> = ({
  children,
  delay = 28,
  color = 'rgba(56, 189, 248, 0.16)',
  borderColor = 'rgba(56, 189, 248, 0.4)',
  textColor = '#38bdf8',
  borderRadius = 9999,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      stiffness: 130,
      mass: 0.5,
    },
  });

  const scaleX = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const contentOpacity = interpolate(progress, [0, 0.4, 1], [0, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2em 0.85em',
        borderRadius,
        color: textColor,
        fontWeight: 700,
        ...style,
      }}
    >
      {/* Expanding Pill Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: color,
          border: `1px solid ${borderColor}`,
          borderRadius,
          transform: `scaleX(${scaleX})`,
          transformOrigin: 'left center',
          pointerEvents: 'none',
          boxShadow: `0 0 12px ${color}`,
        }}
      />

      {/* Pill Text Content */}
      <span
        style={{
          position: 'relative',
          opacity: contentOpacity,
          zIndex: 1,
        }}
      >
        {children}
      </span>
    </div>
  );
};
