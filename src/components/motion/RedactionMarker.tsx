import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface RedactionMarkerProps {
  width: number;
  height?: number;
  delay?: number;
  duration?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const RedactionMarker: React.FC<RedactionMarkerProps> = ({
  width,
  height = 24,
  delay = 0,
  duration = 18,
  color = "#18181B",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - delay);

  const progress = interpolate(activeFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentWidth = width * progress;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        height,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%) rotate(-0.5deg)",
          width: currentWidth,
          height: height * 0.9,
          background: color,
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      />
    </div>
  );
};
