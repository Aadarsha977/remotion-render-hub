import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface PopAssetProps {
  children: React.ReactNode;
  popFrame: number;
  origin?: string;
  damping?: number;
  mass?: number;
  stiffness?: number;
  style?: React.CSSProperties;
}

/**
 * Authentic Overshoot Elastic Spring Physics Container (LITTLE BIT BETTER).
 * Formula:
 * Scale(t) = 1 - e^(-zeta * omega * t) * (cos(omega_d * t) + (zeta / sqrt(1 - zeta^2)) * sin(omega_d * t))
 *
 * Scales from 0.0 -> 1.15 overshoot -> snaps back to 1.0 within 10-14 frames.
 * Never linear. Snappy, light, and elastic.
 */
export const PopAsset: React.FC<PopAssetProps> = ({
  children,
  popFrame,
  origin = 'bottom center',
  damping = 12, // Controls overshoot bounce
  mass = 0.5, // Light, snappy feel
  stiffness = 140, // Fast snap
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < popFrame) return null;

  const scale = spring({
    frame: frame - popFrame,
    fps,
    config: {
      damping,
      mass,
      stiffness,
    },
  });

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, scale)})`,
        transformOrigin: origin,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
