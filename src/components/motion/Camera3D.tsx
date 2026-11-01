import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface Camera3DProps {
  children: React.ReactNode;
  durationInFrames: number;
  zoomFrom?: number;
  zoomTo?: number;
  panXFrom?: number;
  panXTo?: number;
  panYFrom?: number;
  panYTo?: number;
  tiltX?: number;
  tiltY?: number;
  style?: React.CSSProperties;
}

export const Camera3D: React.FC<Camera3DProps> = ({
  children,
  durationInFrames,
  zoomFrom = 1.0,
  zoomTo = 1.06,
  panXFrom = 0,
  panXTo = 0,
  panYFrom = 0,
  panYTo = 0,
  tiltX = 3,
  tiltY = -2,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [zoomFrom, zoomTo]);
  const translateX = interpolate(progress, [0, 1], [panXFrom, panXTo]);
  const translateY = interpolate(progress, [0, 1], [panYFrom, panYTo]);

  // Subtle continuous camera drift
  const currentTiltX = tiltX + Math.sin((frame / 30) * Math.PI) * 0.4;
  const currentTiltY = tiltY + Math.cos((frame / 30) * Math.PI) * 0.4;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        perspective: 1200,
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`,
          transformOrigin: "center center",
          transition: "transform 0.05s linear",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
