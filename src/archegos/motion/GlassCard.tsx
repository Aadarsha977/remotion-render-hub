import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface GlassCardProps {
  children?: React.ReactNode;
  delay?: number;
  sheenDelay?: number;
  width?: number | string;
  height?: number | string;
  glowColor?: string;
  tiltAngle?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * GlassCard
 * Frosted glassmorphic card container with:
 * 1. Spring physics 3D tilt arrival (rotateX / scale overshoot)
 * 2. 1px specular gradient border
 * 3. 45-degree diagonal light sheen sweep at sheenDelay
 * 4. Ambient volumetric blurred backlight glow
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  delay = 20,
  sheenDelay = 45,
  width = 'auto',
  height = 'auto',
  glowColor = 'rgba(56, 189, 248, 0.2)',
  tiltAngle = 6,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring with slight overshoot
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 95,
      mass: 0.7,
    },
  });

  const scale = interpolate(progress, [0, 1], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rotateX = interpolate(progress, [0, 1], [tiltAngle, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Specular light sheen sweep across the card (duration 24 frames)
  const sheenProgress = interpolate(frame, [sheenDelay, sheenDelay + 24], [-120, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sheenOpacity = interpolate(
    frame,
    [sheenDelay, sheenDelay + 6, sheenDelay + 18, sheenDelay + 24],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        perspective: '1200px',
      }}
    >
      {/* Volumetric Blurred Backlight Blob */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          width: '70%',
          height: '70%',
          background: glowColor,
          filter: 'blur(64px)',
          borderRadius: 32,
          opacity: opacity * 0.65,
          pointerEvents: 'none',
          transform: `scale(${scale})`,
        }}
      />

      {/* Main Glassmorphic Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `perspective(1200px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`,
          opacity,
          borderRadius: 20,
          background: 'rgba(15, 20, 30, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          ...style,
        }}
      >
        {/* Specular Diagonal Sheen Sweep */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sheenProgress}%`,
            width: '60%',
            background: 'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.14) 50%, transparent 80%)',
            transform: 'skewX(-20deg)',
            pointerEvents: 'none',
            opacity: sheenOpacity,
          }}
        />

        {children}
      </div>
    </div>
  );
};
