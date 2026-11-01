import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface BalanceScaleProps {
  leftLabel?: string;
  leftWeight?: string;
  rightLabel?: string;
  rightWeight?: string;
  tiltSide?: 'left' | 'right';
  tiltDegree?: number;
  delay?: number;
  width?: number | string;
  accentColor?: string;
  alertColor?: string;
  style?: React.CSSProperties;
}

/**
 * BalanceScale
 * Kinetic metaphor representing disproportionate risk, capital leverage vs. collateral,
 * or cost/benefit trade-offs.
 */
export const BalanceScale: React.FC<BalanceScaleProps> = ({
  leftLabel = 'PHYSICAL COLLATERAL',
  leftWeight = '$10 BILLION',
  rightLabel = 'SYNTHETIC SWAP DEBT',
  rightWeight = '$50 BILLION',
  tiltSide = 'right',
  tiltDegree = 18,
  delay = 18,
  width = 640,
  accentColor = '#38bdf8',
  alertColor = '#ff3b30',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fulcrum tilt spring physics
  const tiltProgress = spring({
    frame: frame - (delay + 10),
    fps,
    config: { damping: 11, stiffness: 90, mass: 0.8 },
  });

  const targetRotation = tiltSide === 'right' ? tiltDegree : -tiltDegree;
  const currentRotation = interpolate(tiltProgress, [0, 1], [0, targetRotation], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const panDisplacement = interpolate(tiltProgress, [0, 1], [0, 36], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leftPanY = tiltSide === 'right' ? -panDisplacement : panDisplacement;
  const rightPanY = tiltSide === 'right' ? panDisplacement : -panDisplacement;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 240" fill="none">
        {/* Central Fulcrum Stand */}
        <polygon points="190,220 210,220 200,90" fill="rgba(255, 255, 255, 0.2)" />
        <circle cx="200" cy="90" r="8" fill="#ffffff" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />
        <rect x="150" y="220" width="100" height="8" rx="4" fill="rgba(255, 255, 255, 0.3)" />

        {/* Tilting Lever Beam */}
        <g transform={`rotate(${currentRotation} 200 90)`}>
          <rect x="50" y="86" width="300" height="8" rx="4" fill="rgba(255, 255, 255, 0.7)" />

          {/* Left Pan Strings */}
          <line x1="70" y1="94" x2="50" y2="160" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
          <line x1="70" y1="94" x2="90" y2="160" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />

          {/* Right Pan Strings */}
          <line x1="330" y1="94" x2="310" y2="160" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
          <line x1="330" y1="94" x2="350" y2="160" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Floating Left Pan Card */}
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 140 + leftPanY,
          width: 170,
          padding: '12px 14px',
          borderRadius: 12,
          background: 'rgba(15, 23, 42, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 4 }}>
          {leftLabel}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: accentColor }}>
          {leftWeight}
        </div>
      </div>

      {/* Floating Right Pan Card (Heavy/Alert) */}
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 140 + rightPanY,
          width: 170,
          padding: '12px 14px',
          borderRadius: 12,
          background: 'rgba(15, 23, 42, 0.88)',
          border: `1px solid ${alertColor}60`,
          textAlign: 'center',
          boxShadow: `0 14px 35px rgba(0,0,0,0.6), 0 0 20px ${alertColor}20`,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, color: alertColor, marginBottom: 4 }}>
          {rightLabel}
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: alertColor }}>
          {rightWeight}
        </div>
      </div>
    </div>
  );
};
