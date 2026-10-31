import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth bounce animation using spring physics
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeScale = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at center, #1e1b4b 0%, #09090b 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Decorative Glow Circle */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main Title with Spring Scale */}
      <div
        style={{
          transform: `scale(${entrance})`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-2px",
            margin: 0,
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          Antigravity + Kaggle
        </h1>
      </div>

      {/* Subtitle */}
      <p
        style={{
          opacity: subtitleOpacity,
          fontSize: 34,
          fontWeight: 400,
          color: "#94a3b8",
          marginTop: 20,
          marginBottom: 30,
          zIndex: 1,
        }}
      >
        Cloud-Rendered Programmatic Video Pipeline
      </p>

      {/* Verification Badge */}
      <div
        style={{
          transform: `scale(${Math.max(0, badgeScale)})`,
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          border: "2px solid #22c55e",
          borderRadius: 9999,
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: 24 }}>🚀</span>
        <span
          style={{
            color: "#4ade80",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Rendered 100% in Kaggle Cloud
        </span>
      </div>

      {/* Real-time Frame Counter */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          color: "#475569",
          fontSize: 18,
          fontFamily: "monospace",
        }}
      >
        Frame: {frame} / 150 (Time: {(frame / fps).toFixed(2)}s)
      </div>
    </AbsoluteFill>
  );
};
