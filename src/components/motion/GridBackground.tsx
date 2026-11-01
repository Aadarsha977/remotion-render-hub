import React from "react";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface GridBackgroundProps {
  theme?: ThemeMode;
  mood?: "default" | "danger" | "noir" | "amber";
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  theme = "cream",
  mood = "default",
}) => {
  const currentTheme = THEMES[theme] || THEMES.cream;

  // Background gradient adjustments
  const isCream = theme === "cream";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: currentTheme.bg,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Editorial Micro-dot / Grid texture */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: isCream
            ? `radial-gradient(circle, rgba(44, 30, 20, 0.07) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(245, 235, 225, 0.05) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: 0.8,
        }}
      />

      {/* Subtle secondary hairline grid for financial drafting feel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `
            linear-gradient(to right, ${currentTheme.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${currentTheme.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: "144px 144px",
          opacity: 0.6,
        }}
      />

      {/* Atmospheric warm ambient light blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: isCream
            ? `radial-gradient(circle, rgba(245, 235, 220, 0.7) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(140, 60, 30, 0.18) 0%, transparent 70%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: isCream
            ? `radial-gradient(circle, rgba(237, 225, 205, 0.6) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)`,
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Soft perimeter vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          boxShadow: isCream
            ? "inset 0 0 120px rgba(180, 160, 140, 0.15)"
            : "inset 0 0 160px rgba(0, 0, 0, 0.8)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
