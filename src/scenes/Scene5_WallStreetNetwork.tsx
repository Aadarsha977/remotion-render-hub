import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/motion/GridBackground";
import { Camera3D } from "../components/motion/Camera3D";
import { PaperTexture } from "../components/motion/PaperTexture";
import { ArchivalStamp } from "../components/motion/ArchivalStamp";
import { MotionArrow } from "../components/motion/MotionArrow";
import { KineticTitle } from "../components/motion/KineticTitle";
import { ThemeMode, THEMES, SceneProps } from "../theme/theme";

export const Scene5_WallStreetNetwork: React.FC<SceneProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  // Radar ping ring
  const pingScale = interpolate(frame % 40, [0, 40], [0.8, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pingOpacity = interpolate(frame % 40, [0, 40], [0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GridBackground theme={theme} mood="default" />
      <PaperTexture theme={theme} opacity={0.35} />

      {/* 3D Virtual Camera with slow circular tracking momentum */}
      <Camera3D
        durationInFrames={110}
        zoomFrom={1.0}
        zoomTo={1.07}
        panXFrom={-15}
        panXTo={15}
        panYFrom={10}
        panYTo={-10}
        tiltX={4}
        tiltY={-4}
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
            text="WALL STREET DIDN'T EVEN KNOW"
            subtitle="TOTAL BLIND SPOT ACROSS THE WORLD'S LARGEST PRIME BROKERS"
            theme={theme}
            highlightWords={["WALL", "STREET", "KNOW"]}
            highlightColor={isCream ? t.accent : t.gold}
            size={48}
            delay={5}
          />

          {/* Tactical Network Map Board */}
          <div
            style={{
              position: "relative",
              width: 1300,
              height: 600,
              marginTop: 20,
              backgroundColor: isCream ? "#FFFFFF" : "#1B1310",
              border: `2px solid ${t.border}`,
              borderRadius: 16,
              boxShadow: isCream
                ? "0 25px 60px -15px rgba(44, 30, 20, 0.12)"
                : "0 30px 70px -15px rgba(0, 0, 0, 0.85)",
              overflow: "hidden",
            }}
          >
            {/* Grid coordinates & drafting lines */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 30,
                fontFamily: "monospace",
                fontSize: 12,
                color: t.textMuted,
                letterSpacing: "0.1em",
              }}
            >
              PRIME BROKER DERIVATIVE RADAR • LAT 40.7580° N, LON 73.9855° W
            </div>

            {/* Central Radar Ping Anomaly */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 320,
                height: 320,
                borderRadius: "50%",
                border: `2px dashed ${t.danger}`,
                transformOrigin: "center center",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 260,
                height: 260,
                borderRadius: "50%",
                border: `2px solid ${t.danger}`,
                transform: `translate(-50%, -50%) scale(${pingScale})`,
                opacity: pingOpacity,
                pointerEvents: "none",
              }}
            />

            {/* Central Ghost Fund Entity Card */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: isCream ? "#FEF2F2" : "#281212",
                border: `2.5px solid ${t.danger}`,
                borderRadius: 12,
                padding: "20px 32px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                boxShadow: isCream ? "0 10px 30px rgba(220, 38, 38, 0.2)" : "0 0 30px rgba(244, 63, 94, 0.4)",
                zIndex: 10,
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 900, color: t.danger, letterSpacing: "0.2em" }}>
                [ 404 UNREGISTERED ]
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 900, color: t.text }}>
                ARCHEGOS CAPITAL
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: t.danger }}>
                OVER $50B HIDDEN SWAPS
              </span>
            </div>

            {/* Outer Bank Hub 1: Goldman Sachs (Top Left) */}
            <div
              style={{
                position: "absolute",
                top: 60,
                left: 80,
                backgroundColor: isCream ? "#F9F7F4" : "#241A16",
                border: `1.5px solid ${t.border}`,
                borderRadius: 8,
                padding: "14px 22px",
                zIndex: 5,
              }}
            >
              <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 800, color: t.text, display: "block" }}>
                Goldman Sachs
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: t.gold, fontWeight: 700 }}>
                200 West St • $1.2B LOSS
              </span>
            </div>

            {/* Outer Bank Hub 2: Morgan Stanley (Top Right) */}
            <div
              style={{
                position: "absolute",
                top: 60,
                right: 80,
                backgroundColor: isCream ? "#F9F7F4" : "#241A16",
                border: `1.5px solid ${t.border}`,
                borderRadius: 8,
                padding: "14px 22px",
                zIndex: 5,
              }}
            >
              <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 800, color: t.text, display: "block" }}>
                Morgan Stanley
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: t.gold, fontWeight: 700 }}>
                1585 Broadway • $911M LOSS
              </span>
            </div>

            {/* Outer Bank Hub 3: Credit Suisse (Bottom Left) */}
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 80,
                backgroundColor: isCream ? "#FEF2F2" : "#2B1414",
                border: `2px solid ${t.danger}`,
                borderRadius: 8,
                padding: "14px 22px",
                zIndex: 5,
              }}
            >
              <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 900, color: t.danger, display: "block" }}>
                Credit Suisse
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 12, color: t.danger, fontWeight: 800 }}>
                11 Madison Ave • -$5.5B CATASTROPHE
              </span>
            </div>

            {/* Converging Derivative Flow Vectors (Inside Board) */}
            <svg
              width={1300}
              height={600}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 4,
              }}
            >
              <defs>
                <marker
                  id="gold-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={t.gold} />
                </marker>
                <marker
                  id="danger-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={t.danger} />
                </marker>
              </defs>

              {/* Vector 1: Goldman -> Archegos */}
              <line
                x1={290}
                y1={120}
                x2={490}
                y2={260}
                stroke={t.gold}
                strokeWidth={2.5}
                strokeDasharray="6,4"
                markerEnd="url(#gold-arrow)"
                opacity={interpolate(frame, [15, 30], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />

              {/* Vector 2: Morgan Stanley -> Archegos */}
              <line
                x1={1010}
                y1={120}
                x2={810}
                y2={260}
                stroke={t.gold}
                strokeWidth={2.5}
                strokeDasharray="6,4"
                markerEnd="url(#gold-arrow)"
                opacity={interpolate(frame, [22, 38], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />

              {/* Vector 3: Credit Suisse -> Archegos */}
              <line
                x1={290}
                y1={480}
                x2={490}
                y2={340}
                stroke={t.danger}
                strokeWidth={3}
                strokeDasharray="6,4"
                markerEnd="url(#danger-arrow)"
                opacity={interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />

              {/* Vector 4: Nomura -> Archegos */}
              <line
                x1={1010}
                y1={480}
                x2={810}
                y2={340}
                stroke={t.danger}
                strokeWidth={3}
                strokeDasharray="6,4"
                markerEnd="url(#danger-arrow)"
                opacity={interpolate(frame, [36, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />
            </svg>
          </div>
        </div>
      </Camera3D>
    </AbsoluteFill>
  );
};
