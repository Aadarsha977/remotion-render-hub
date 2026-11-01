import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/motion/GridBackground";
import { Camera3D } from "../components/motion/Camera3D";
import { PaperTexture } from "../components/motion/PaperTexture";
import { ArchivalStamp } from "../components/motion/ArchivalStamp";
import { MotionArrow } from "../components/motion/MotionArrow";
import { ThemeMode, THEMES, SceneProps } from "../theme/theme";

export const Scene2_Wipeout: React.FC<SceneProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  // Rapid countdown for 36 hours
  const countdownProgress = interpolate(frame, [30, 95], [1, 0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentHours = Math.max(0, Math.round(36 * countdownProgress));

  // Counter animation from 0 to 20,000,000,000
  const counterProgress = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayVal = Math.round(20000000000 * counterProgress);
  const formattedVal = displayVal.toLocaleString("en-US");

  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference * (1 - countdownProgress);

  return (
    <AbsoluteFill>
      <GridBackground theme={theme} mood="danger" />
      <PaperTexture theme={theme} opacity={0.35} />

      {/* 3D Virtual Camera with dramatic pull-back momentum */}
      <Camera3D
        durationInFrames={145}
        zoomFrom={1.08}
        zoomTo={1.0}
        panXFrom={15}
        panXTo={-15}
        panYFrom={-10}
        panYTo={10}
        tiltX={-3}
        tiltY={3}
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
            justifyContent: "center",
            gap: 24,
            padding: "0 80px",
          }}
        >
          {/* Top Classification Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: isCream ? "#FEF2F2" : "rgba(244, 63, 94, 0.15)",
              border: `1.5px solid ${t.danger}`,
              padding: "8px 24px",
              borderRadius: 999,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: t.danger,
                boxShadow: `0 0 10px ${t.danger}`,
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 900,
                color: t.danger,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              CRITICAL MARGIN CALL DEFAULT • NEW YORK DISPATCH
            </span>
          </div>

          {/* Massive Screen-Filling Hero Ticker Monolith */}
          <div
            style={{
              width: "100%",
              maxWidth: 1300,
              backgroundColor: isCream ? "#FFFFFF" : "#1F1511",
              border: `2px solid ${isCream ? "#FCA5A5" : "rgba(244, 63, 94, 0.4)"}`,
              borderRadius: 16,
              boxShadow: isCream
                ? "0 25px 50px -12px rgba(220, 38, 38, 0.15), 0 0 1px rgba(0,0,0,0.15)"
                : "0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 63, 94, 0.15)",
              padding: "40px 60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background distress scanline */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${t.danger}, ${t.accent}, ${t.danger})`,
              }}
            />

            <span
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 800,
                color: t.danger,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              TOTAL CAPITAL ERADICATED
            </span>

            {/* Giant Monolithic Number */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                color: t.danger,
              }}
            >
              <span style={{ fontSize: 56, fontWeight: 900, lineHeight: 1 }}>-$</span>
              <span
                style={{
                  fontFamily: "'Inter', monospace",
                  fontSize: 104,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  textShadow: !isCream ? "0 0 40px rgba(244, 63, 94, 0.6)" : "none",
                }}
              >
                {formattedVal}
              </span>
            </div>

            {/* Stamp Overlay */}
            <div style={{ position: "absolute", top: 25, right: 40 }}>
              <ArchivalStamp
                text="DEFAULTED"
                subtext="100% LOSS"
                delay={22}
                rotation={14}
                color={t.danger}
                borderColor={t.danger}
                size={22}
              />
            </div>

            {/* Secondary Metric Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 28,
                paddingTop: 20,
                borderTop: `1px solid ${t.border}`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.textMuted, fontWeight: 700 }}>
                  ACCELERATION
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 900, color: t.text }}>
                  $555,000,000 PER HOUR
                </span>
              </div>

              {/* 36 Hours Countdown Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "8px 20px",
                  borderRadius: 12,
                  backgroundColor: isCream ? "#FEF3C7" : "rgba(245, 158, 11, 0.15)",
                  border: `1px solid ${t.borderAccent}`,
                }}
              >
                <div style={{ position: "relative", width: 50, height: 50 }}>
                  <svg width={50} height={50} style={{ transform: "rotate(-90deg)" }}>
                    <circle cx={25} cy={25} r={20} fill="none" stroke={t.border} strokeWidth={4} />
                    <circle
                      cx={25}
                      cy={25}
                      r={20}
                      fill="none"
                      stroke={t.gold}
                      strokeWidth={4}
                      strokeDasharray={2 * Math.PI * 20}
                      strokeDashoffset={2 * Math.PI * 20 * (1 - countdownProgress)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "monospace",
                      fontSize: 12,
                      fontWeight: 800,
                      color: t.text,
                    }}
                  >
                    {currentHours}h
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 800, color: t.gold }}>
                    ELAPSED WINDOW
                  </span>
                  <span style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 900, color: t.text }}>
                    UNDER 36 HOURS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Camera3D>
    </AbsoluteFill>
  );
};
