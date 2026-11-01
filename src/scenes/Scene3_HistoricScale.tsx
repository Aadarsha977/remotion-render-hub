import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/motion/GridBackground";
import { Camera3D } from "../components/motion/Camera3D";
import { PaperTexture } from "../components/motion/PaperTexture";
import { ArchivalStamp } from "../components/motion/ArchivalStamp";
import { MotionArrow } from "../components/motion/MotionArrow";
import { KineticTitle } from "../components/motion/KineticTitle";
import { ThemeMode, THEMES, SceneProps } from "../theme/theme";

export const Scene3_HistoricScale: React.FC<SceneProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  // Staggered bar growth physics
  const bar1Grow = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const bar2Grow = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const bar3Grow = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 11, stiffness: 85, mass: 1.3 },
  });

  return (
    <AbsoluteFill>
      <GridBackground theme={theme} mood="default" />
      <PaperTexture theme={theme} opacity={0.35} />

      {/* Upward tilting virtual camera following the monolith */}
      <Camera3D
        durationInFrames={143}
        zoomFrom={1.0}
        zoomTo={1.08}
        panXFrom={0}
        panXTo={0}
        panYFrom={40}
        panYTo={-30}
        tiltX={6}
        tiltY={-2}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          {/* Top Title */}
          <KineticTitle
            text="LARGEST TRADING LOSS IN HUMAN HISTORY"
            subtitle="HISTORICAL SCALE BENCHMARK OF ALL-TIME FINANCIAL COLLAPSES"
            theme={theme}
            highlightWords={["LARGEST", "HUMAN", "HISTORY"]}
            highlightColor={isCream ? t.accent : t.gold}
            size={46}
            delay={5}
          />

          {/* Massive Architectural Bar Monolith Container */}
          <div
            style={{
              position: "relative",
              width: 1200,
              height: 600,
              marginTop: 20,
              backgroundColor: isCream ? "#FFFFFF" : "#1F1511",
              border: `2px solid ${t.border}`,
              borderRadius: 16,
              boxShadow: isCream
                ? "0 25px 60px -15px rgba(44, 30, 20, 0.12), 0 0 1px rgba(0,0,0,0.15)"
                : "0 30px 70px -15px rgba(0, 0, 0, 0.85)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              paddingBottom: 40,
              paddingLeft: 60,
              paddingRight: 60,
              overflow: "hidden",
            }}
          >
            {/* Background horizontal benchmark grid lines */}
            {[100, 200, 300, 400, 500].map((y) => (
              <div
                key={y}
                style={{
                  position: "absolute",
                  bottom: y,
                  left: 40,
                  right: 40,
                  height: 1,
                  background: isCream ? "rgba(44, 30, 20, 0.06)" : "rgba(255, 255, 255, 0.06)",
                }}
              />
            ))}

            {/* Stamp Overlay */}
            <div style={{ position: "absolute", top: 25, right: 35 }}>
              <ArchivalStamp
                text="NEW WORLD RECORD"
                subtext="MARCH 2021"
                delay={40}
                rotation={-8}
                color={t.danger}
                borderColor={t.danger}
                size={20}
              />
            </div>

            {/* Bar 1: Nick Leeson / Barings Bank */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                width: 220,
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', monospace",
                  fontSize: 20,
                  fontWeight: 800,
                  color: t.textMuted,
                  opacity: bar1Grow,
                }}
              >
                $1.3 BILLION
              </span>
              <div
                style={{
                  width: 120,
                  height: Math.max(18, 25 * bar1Grow),
                  borderRadius: "6px 6px 0 0",
                  background: isCream
                    ? "linear-gradient(to top, #D6D3D1, #A8A29E)"
                    : "linear-gradient(to top, #475569, #94A3B8)",
                  border: `1.5px solid ${t.border}`,
                }}
              />
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: t.text, display: "block" }}>
                  Nick Leeson
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: t.textMuted }}>
                  Barings Bank (1995)
                </span>
              </div>
            </div>

            {/* Bar 2: Jérôme Kerviel / SocGen */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                width: 220,
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', monospace",
                  fontSize: 22,
                  fontWeight: 800,
                  color: t.gold,
                  opacity: bar2Grow,
                }}
              >
                $7.0 BILLION
              </span>
              <div
                style={{
                  width: 130,
                  height: 90 * bar2Grow,
                  borderRadius: "8px 8px 0 0",
                  background: isCream
                    ? "linear-gradient(to top, #D97706, #B45309)"
                    : "linear-gradient(to top, #B45309, #F59E0B)",
                  border: `1.5px solid ${t.borderAccent}`,
                }}
              />
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: t.text, display: "block" }}>
                  Jérôme Kerviel
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: t.textMuted }}>
                  Société Générale (2008)
                </span>
              </div>
            </div>

            {/* Bar 3: Archegos / Bill Hwang (The Monolith) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                width: 280,
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: bar3Grow }}>
                <span
                  style={{
                    fontFamily: "'Inter', monospace",
                    fontSize: 34,
                    fontWeight: 900,
                    color: t.danger,
                    lineHeight: 1,
                  }}
                >
                  $20.0 BILLION
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: t.dangerText,
                    backgroundColor: t.dangerBg,
                    padding: "3px 8px",
                    borderRadius: 4,
                    border: `1px solid ${t.danger}`,
                  }}
                >
                  +185% OVER PREVIOUS RECORD
                </span>
              </div>
              <div
                style={{
                  width: 160,
                  height: 250 * bar3Grow,
                  borderRadius: "12px 12px 0 0",
                  background: isCream
                    ? "linear-gradient(to top, #991B1B, #DC2626)"
                    : "linear-gradient(to top, #BE123C, #F43F5E)",
                  border: `2.5px solid ${isCream ? "#EF4444" : "#FDA4AF"}`,
                  boxShadow: isCream
                    ? "0 15px 35px rgba(220, 38, 38, 0.3)"
                    : "0 0 45px rgba(244, 63, 94, 0.7)",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 900, color: t.text, display: "block" }}>
                  Archegos / Bill Hwang
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.danger, fontWeight: 800 }}>
                  March 2021 (Single Fund)
                </span>
              </div>
            </div>
          </div>
        </div>
      </Camera3D>
    </AbsoluteFill>
  );
};
