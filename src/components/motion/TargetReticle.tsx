import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface TargetReticleProps {
  size?: number;
  theme?: ThemeMode;
  color?: string;
  delay?: number;
  label?: string;
  pulsing?: boolean;
}

export const TargetReticle: React.FC<TargetReticleProps> = ({
  size = 170,
  theme = "cream",
  color,
  delay = 0,
  label = "TARGET LOCK",
  pulsing = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  const resolvedColor = color || (isCream ? t.danger : t.accent);
  const activeFrame = Math.max(0, frame - delay);

  // Rotation animation
  const rotation = (activeFrame * 1.5) % 360;

  // Pulse
  const pulseScale = pulsing
    ? 1 + Math.sin((activeFrame / fps) * Math.PI * 3) * 0.04
    : 1;

  const opacity = interpolate(activeFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bracketLength = size * 0.2;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        opacity,
        transform: `scale(${pulseScale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Corner Brackets */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: bracketLength,
          height: bracketLength,
          borderTop: `2.5px solid ${resolvedColor}`,
          borderLeft: `2.5px solid ${resolvedColor}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: bracketLength,
          height: bracketLength,
          borderTop: `2.5px solid ${resolvedColor}`,
          borderRight: `2.5px solid ${resolvedColor}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: bracketLength,
          height: bracketLength,
          borderBottom: `2.5px solid ${resolvedColor}`,
          borderLeft: `2.5px solid ${resolvedColor}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: bracketLength,
          height: bracketLength,
          borderBottom: `2.5px solid ${resolvedColor}`,
          borderRight: `2.5px solid ${resolvedColor}`,
        }}
      />

      {/* Rotating dashed ring */}
      <svg
        style={{
          position: "absolute",
          width: size * 0.75,
          height: size * 0.75,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={resolvedColor}
          strokeWidth="2"
          strokeDasharray="6 5"
          opacity="0.5"
        />
      </svg>

      {/* Center crosshair pip */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: resolvedColor,
          boxShadow: isCream ? "none" : `0 0 10px ${resolvedColor}`,
        }}
      />

      {/* Label tag */}
      {label && (
        <span
          style={{
            position: "absolute",
            bottom: -28,
            fontFamily: "monospace",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.15em",
            color: resolvedColor,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
