import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface ShockwaveCircleProps {
  startFrame: number;
  duration?: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
  center?: { x: number | string; y: number | string };
}

/**
 * ShockwaveCircle
 * Kinetic impact accent ring that expands and dissolves rapidly
 * to mark visual impacts, slams, and keyframe transitions.
 */
export const ShockwaveCircle: React.FC<ShockwaveCircleProps> = ({
  startFrame,
  duration = 20,
  size = 180,
  color = '#38bdf8',
  strokeWidth = 3,
  center = { x: '50%', y: '50%' },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + duration) {
    return null;
  }

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 18,
      stiffness: 140,
      mass: 0.4,
    },
  });

  const scale = interpolate(progress, [0, 1], [0.2, 2.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.2, 1], [0.9, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: center.y,
        left: center.x,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: '50%',
        border: `${strokeWidth}px solid ${color}`,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: 'none',
        boxShadow: `0 0 16px ${color}`,
      }}
    />
  );
};
