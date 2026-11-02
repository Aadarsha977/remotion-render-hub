import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface DoodleArrowProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX?: number;
  controlY?: number;
  delay?: number;
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
  label?: string;
}

export const DoodleArrow: React.FC<DoodleArrowProps> = ({
  startX,
  startY,
  endX,
  endY,
  controlX = (startX + endX) / 2,
  controlY = (startY + endY) / 2 - 50,
  delay = 0,
  color = LITTLE_BIT_BETTER_THEME.inkPrimary,
  strokeWidth = 4.5,
  dashed = true,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Natural drawing spring
  const draw = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 130 },
  });

  if (frame < delay) return null;

  // Approximate quadratic bezier curve length
  const dx = endX - startX;
  const dy = endY - startY;
  const pathLength = Math.sqrt(dx * dx + dy * dy) * 1.35;
  const dashOffset = (1 - draw) * pathLength;

  const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  const markerId = `arrowhead-${Math.floor(startX)}-${Math.floor(endX)}-${delay}`;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="9"
          refX="9"
          refY="4.5"
          orient="auto"
        >
          <polygon
            points="0 1, 10 4.5, 0 8"
            fill={color}
            opacity={draw > 0.85 ? (draw - 0.85) / 0.15 : 0}
          />
        </marker>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? '10,8' : pathLength}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />

      {/* Optional Midpoint Label */}
      {label && draw > 0.5 && (
        <text
          x={controlX}
          y={controlY - 14}
          fill={color}
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
          opacity={draw}
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {label}
        </text>
      )}
    </svg>
  );
};
