import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface KineticGridProps {
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  driftSpeed?: number;
  showBrackets?: boolean;
  showCrosshairs?: boolean;
  cornerLabel?: string;
  bracketColor?: string;
  entryFrame?: number;
}

/**
 * KineticGrid
 * Renders technical Cartesian dot matrix drifting along X/Y axes,
 * framed with technical corner brackets and coordinate crosshairs.
 */
export const KineticGrid: React.FC<KineticGridProps> = ({
  dotSize = 1.5,
  gap = 48,
  dotColor = 'rgba(255, 255, 255, 0.05)',
  driftSpeed = 0.4,
  showBrackets = true,
  showCrosshairs = true,
  cornerLabel = 'SYS_GRID // 04.22',
  bracketColor = 'rgba(255, 255, 255, 0.25)',
  entryFrame = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Drift offsets
  const offsetX = (frame * driftSpeed * 0.8) % gap;
  const offsetY = (frame * driftSpeed) % gap;

  // Staggered entry spring for technical UI markers
  const bracketProgress = spring({
    frame: frame - entryFrame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  const bracketOpacity = interpolate(bracketProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bracketInset = interpolate(bracketProgress, [0, 1], [30, 48], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* Drifting Dot Grid Pattern */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: bracketOpacity,
        }}
      >
        <defs>
          <pattern
            id="kinetic-dot-grid"
            x={offsetX}
            y={offsetY}
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={gap / 2} cy={gap / 2} r={dotSize} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kinetic-dot-grid)" />
      </svg>

      {/* Technical Corner Brackets */}
      {showBrackets && (
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: bracketOpacity,
          }}
        >
          {/* Top-Left */}
          <path
            d={`M ${bracketInset + 24} ${bracketInset} L ${bracketInset} ${bracketInset} L ${bracketInset} ${bracketInset + 24}`}
            fill="none"
            stroke={bracketColor}
            strokeWidth="2"
          />
          {/* Top-Right */}
          <path
            d={`M ${width - bracketInset - 24} ${bracketInset} L ${width - bracketInset} ${bracketInset} L ${width - bracketInset} ${bracketInset + 24}`}
            fill="none"
            stroke={bracketColor}
            strokeWidth="2"
          />
          {/* Bottom-Left */}
          <path
            d={`M ${bracketInset + 24} ${height - bracketInset} L ${bracketInset} ${height - bracketInset} L ${bracketInset} ${height - bracketInset - 24}`}
            fill="none"
            stroke={bracketColor}
            strokeWidth="2"
          />
          {/* Bottom-Right */}
          <path
            d={`M ${width - bracketInset - 24} ${height - bracketInset} L ${width - bracketInset} ${height - bracketInset} L ${width - bracketInset} ${height - bracketInset - 24}`}
            fill="none"
            stroke={bracketColor}
            strokeWidth="2"
          />
        </svg>
      )}

      {/* Coordinate Crosshairs at Key Intersections */}
      {showCrosshairs && (
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: bracketOpacity * 0.4,
          }}
        >
          {/* Center Left Crosshair */}
          <g transform={`translate(${width * 0.2}, ${height * 0.5})`}>
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="1" />
          </g>
          {/* Center Right Crosshair */}
          <g transform={`translate(${width * 0.8}, ${height * 0.5})`}>
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        </svg>
      )}

      {/* Telemetry Corner Label */}
      {cornerLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: bracketInset + 4,
            left: bracketInset + 8,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: bracketColor,
            opacity: bracketOpacity * 0.75,
            textTransform: 'uppercase',
          }}
        >
          {cornerLabel}
        </div>
      )}
    </AbsoluteFill>
  );
};
