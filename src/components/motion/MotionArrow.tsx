import React, { useId } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface MotionArrowProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  curve?: number;
  theme?: ThemeMode;
  color?: string;
  glowColor?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  label?: string;
  arrowSize?: number;
  dashed?: boolean;
}

export const MotionArrow: React.FC<MotionArrowProps> = ({
  startX,
  startY,
  endX,
  endY,
  curve = 0,
  theme = "cream",
  color,
  glowColor,
  strokeWidth = 3.5,
  delay = 0,
  duration = 20,
  label,
  arrowSize = 13,
  dashed = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gradientId = useId();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  const resolvedColor = color || (isCream ? t.accent : t.gold);
  const resolvedGlowColor =
    glowColor || (isCream ? "rgba(194, 65, 12, 0.25)" : "rgba(229, 192, 123, 0.5)");

  const activeFrame = Math.max(0, frame - delay);

  // Compute control point for quadratic bezier curve
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const dx = endX - startX;
  const dy = endY - startY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Perpendicular normal vector
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const ctrlX = midX + nx * curve;
  const ctrlY = midY + ny * curve;

  const pathD =
    curve === 0
      ? `M ${startX} ${startY} L ${endX} ${endY}`
      : `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;

  // Approximate arc length
  const approxLength =
    curve === 0
      ? dist
      : Math.sqrt(
          (startX - ctrlX) * (startX - ctrlX) + (startY - ctrlY) * (startY - ctrlY)
        ) +
        Math.sqrt(
          (ctrlX - endX) * (ctrlX - endX) + (ctrlY - endY) * (ctrlY - endY)
        );

  // Animate path draw
  const drawProgress = interpolate(activeFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const strokeDashoffset = approxLength * (1 - drawProgress);

  // Arrowhead arrival spring
  const headSpring = spring({
    frame: Math.max(0, activeFrame - duration + 3),
    fps,
    config: {
      damping: 12,
      stiffness: 140,
    },
  });

  // Calculate tangent angle at endpoint for arrowhead rotation
  let tangentAngle = Math.atan2(endY - ctrlY, endX - ctrlX) * (180 / Math.PI);
  if (curve === 0) {
    tangentAngle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  }

  // Label position at midpoint of curve
  const labelX = curve === 0 ? midX : 0.25 * startX + 0.5 * ctrlX + 0.25 * endX;
  const labelY = (curve === 0 ? midY : 0.25 * startY + 0.5 * ctrlY + 0.25 * endY) - 16;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 20,
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={resolvedColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={resolvedColor} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Subtle soft shadow trail */}
      <path
        d={pathD}
        fill="none"
        stroke={resolvedGlowColor}
        strokeWidth={strokeWidth * 2}
        strokeOpacity={drawProgress * 0.4}
        strokeDasharray={`${approxLength} ${approxLength}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />

      {/* Main animated path */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? `7, 5` : `${approxLength} ${approxLength}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />

      {/* Arrowhead snapping at end target */}
      {headSpring > 0.01 && (
        <g
          transform={`translate(${endX}, ${endY}) rotate(${tangentAngle}) scale(${headSpring})`}
        >
          <path
            d={`M 0 0 L -${arrowSize * 1.3} -${arrowSize * 0.7} L -${arrowSize * 0.8} 0 L -${arrowSize * 1.3} ${arrowSize * 0.7} Z`}
            fill={resolvedColor}
          />
        </g>
      )}

      {/* Optional animated label plate along arrow */}
      {label && drawProgress > 0.6 && (
        <g
          transform={`translate(${labelX}, ${labelY}) scale(${interpolate(
            drawProgress,
            [0.6, 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )})`}
        >
          <rect
            x={-55}
            y={-13}
            width={110}
            height={26}
            rx={6}
            fill={isCream ? "#FFFFFF" : "#1C1411"}
            stroke={resolvedColor}
            strokeWidth={1.5}
            style={{
              filter: isCream
                ? "drop-shadow(0 4px 10px rgba(44, 30, 20, 0.12))"
                : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.7))",
            }}
          />
          <text
            x={0}
            y={4}
            textAnchor="middle"
            fill={isCream ? t.text : t.text}
            fontSize={11}
            fontFamily="monospace"
            fontWeight={800}
            letterSpacing="0.08em"
          >
            {label}
          </text>
        </g>
      )}
    </svg>
  );
};
