import React, { useId } from "react";
import { ThemeMode } from "../../theme/theme";

export interface PaperTextureProps {
  theme?: ThemeMode;
  opacity?: number;
}

export const PaperTexture: React.FC<PaperTextureProps> = ({
  theme = "cream",
  opacity = 0.35,
}) => {
  const filterId = useId();
  const isCream = theme === "cream";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 40,
        opacity,
        mixBlendMode: isCream ? "multiply" : "overlay",
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0.33 0.33 0.33 0 0
              0.33 0.33 0.33 0 0
              0.33 0.33 0.33 0 0
              0 0 0 1 0
            "
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity="0.6" />
      </svg>
    </div>
  );
};
