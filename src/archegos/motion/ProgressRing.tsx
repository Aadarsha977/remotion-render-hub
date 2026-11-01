import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface ProgressRingProps {
  radius?: number;
  strokeWidth?: number;
  percentage: number; // 0 to 100
  delay?: number;
  strokeColor?: string;
  trackColor?: string;
  glow?: boolean;
}

/**
 * ProgressRing
 * SVG circular telemetry gauge animated via Remotion spring physics,
 * utilizing strokeDasharray & strokeDashoffset with an optional glowing particle head.
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  radius = 64,
  strokeWidth = 6,
  percentage = 75,
  delay = 24,
  strokeColor = '#38bdf8',
  trackColor = 'rgba(255, 255, 255, 0.08)',
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circumference = 2 * Math.PI * radius;
  const size = (radius + strokeWidth) * 2 + 16;
  const center = size / 2;

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 85, mass: 0.8 },
  });

  const currentPercent = interpolate(progress, [0, 1], [0, percentage], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  // Leading dot position calculation
  const angle = (currentPercent / 100) * 360 - 90;
  const angleRad = (angle * Math.PI) / 180;
  const dotX = center + radius * Math.cos(angleRad);
  const dotY = center + radius * Math.sin(angleRad);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />

      {/* Animated Stroke Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${center} ${center})`}
        style={glow ? { filter: `drop-shadow(0 0 8px ${strokeColor})` } : {}}
      />

      {/* Leading Orbiting Glow Particle */}
      {currentPercent > 2 && (
        <circle
          cx={dotX}
          cy={dotY}
          r={strokeWidth * 0.9}
          fill="#FFFFFF"
          style={{
            filter: `drop-shadow(0 0 6px ${strokeColor})`,
          }}
        />
      )}
    </svg>
  );
};
