import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ArchivalStampProps {
  text: string;
  subtext?: string;
  delay?: number;
  rotation?: number;
  color?: string;
  borderColor?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const ArchivalStamp: React.FC<ArchivalStampProps> = ({
  text,
  subtext,
  delay = 0,
  rotation = 12,
  color = "#DC2626",
  borderColor = "#DC2626",
  size = 20,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeFrame = Math.max(0, frame - delay);

  // Heavy stamp slam physics
  const slam = spring({
    frame: activeFrame,
    fps,
    config: {
      damping: 10,
      stiffness: 220,
      mass: 1.2,
    },
  });

  const scale = interpolate(slam, [0, 1], [2.2, 1]);
  const opacity = interpolate(activeFrame, [0, 4], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (activeFrame < 0) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: `3px solid ${borderColor}`,
        borderRadius: 8,
        padding: "6px 16px",
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity,
        background: `${borderColor}15`,
        boxShadow: `0 0 15px ${borderColor}25`,
        userSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: size,
          fontWeight: 900,
          letterSpacing: "0.18em",
          color,
          textTransform: "uppercase",
          lineHeight: 1.1,
        }}
      >
        {text}
      </span>
      {subtext && (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: Math.round(size * 0.45),
            fontWeight: 800,
            letterSpacing: "0.12em",
            color,
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};
