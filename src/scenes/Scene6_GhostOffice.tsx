import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/motion/GridBackground";
import { Camera3D } from "../components/motion/Camera3D";
import { PaperTexture } from "../components/motion/PaperTexture";
import { ArchivalStamp } from "../components/motion/ArchivalStamp";
import { KineticTitle } from "../components/motion/KineticTitle";
import { ThemeMode, THEMES, SceneProps } from "../theme/theme";

export const Scene6_GhostOffice: React.FC<SceneProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  // Transition from the 3 checklist cards to the macro door plate resolve
  const resolveProgress = interpolate(frame, [155, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GridBackground theme={theme} mood="noir" />
      <PaperTexture theme={theme} opacity={0.35} />

      {/* 3D Camera executing dynamic track-in */}
      <Camera3D
        durationInFrames={238}
        zoomFrom={1.0}
        zoomTo={1.12}
        panXFrom={10}
        panXTo={-10}
        panYFrom={0}
        panYTo={0}
        tiltX={3}
        tiltY={-2}
      >
        {/* Phase 1: The Three Tactical Clues (Before frame 180) */}
        {resolveProgress < 0.95 && (
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
              paddingTop: 100,
              opacity: 1 - resolveProgress,
              transform: `scale(${1 - resolveProgress * 0.08})`,
            }}
          >
            <KineticTitle
              text="THE ANATOMY OF A GHOST"
              subtitle="THREE ANOMALIES THAT KEPT A $20 BILLION EMPIRE COMPLETELY INVISIBLE"
              theme={theme}
              highlightWords={["GHOST", "INVISIBLE"]}
              highlightColor={t.danger}
              size={48}
              delay={5}
            />

            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: 36,
                marginTop: 40,
              }}
            >
              {/* Clue 1: No Press Conferences */}
              <div
                style={{
                  width: 360,
                  backgroundColor: isCream ? "#FFFFFF" : "#221915",
                  border: `2px solid ${t.border}`,
                  borderRadius: 12,
                  boxShadow: isCream ? "0 20px 45px -10px rgba(44, 30, 20, 0.12)" : "0 25px 50px rgba(0,0,0,0.8)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  position: "relative",
                  transform: "rotate(-1.5deg)",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900, color: t.gold, letterSpacing: "0.15em" }}>
                  FACTOR 01
                </span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 900, color: t.text }}>
                  NO PRESS
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.textMuted, textAlign: "center" }}>
                  ZERO PUBLIC INTERVIEWS • NO SPEECHES • NO MEDIA FOOTPRINT
                </span>
                <ArchivalStamp
                  text="SILENCE"
                  subtext="UNPUBLICIZED"
                  delay={12}
                  rotation={-10}
                  color={t.danger}
                  borderColor={t.danger}
                  size={18}
                />
              </div>

              {/* Clue 2: No Client Funds */}
              <div
                style={{
                  width: 360,
                  backgroundColor: isCream ? "#FFFFFF" : "#221915",
                  border: `2px solid ${t.border}`,
                  borderRadius: 12,
                  boxShadow: isCream ? "0 20px 45px -10px rgba(44, 30, 20, 0.12)" : "0 25px 50px rgba(0,0,0,0.8)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  position: "relative",
                  transform: "rotate(1deg)",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900, color: t.gold, letterSpacing: "0.15em" }}>
                  FACTOR 02
                </span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 900, color: t.text }}>
                  NO CLIENTS
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.textMuted, textAlign: "center" }}>
                  100% PERSONAL FAMILY CAPITAL • NO OUTSIDE LP INVESTORS
                </span>
                <ArchivalStamp
                  text="EXEMPT"
                  subtext="FAMILY OFFICE"
                  delay={55}
                  rotation={8}
                  color={t.gold}
                  borderColor={t.gold}
                  size={18}
                />
              </div>

              {/* Clue 3: No Company Sign on Door */}
              <div
                style={{
                  width: 360,
                  backgroundColor: isCream ? "#FFFFFF" : "#221915",
                  border: `2px solid ${t.border}`,
                  borderRadius: 12,
                  boxShadow: isCream ? "0 20px 45px -10px rgba(44, 30, 20, 0.12)" : "0 25px 50px rgba(0,0,0,0.8)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  position: "relative",
                  transform: "rotate(-0.8deg)",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900, color: t.gold, letterSpacing: "0.15em" }}>
                  FACTOR 03
                </span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 900, color: t.text }}>
                  NO SIGN
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.textMuted, textAlign: "center" }}>
                  888 7TH AVE, NYC • ANONYMOUS BLANK FROSTED DOOR
                </span>
                <ArchivalStamp
                  text="UNLABELED"
                  subtext="BLANK DOOR"
                  delay={100}
                  rotation={-6}
                  color={t.danger}
                  borderColor={t.danger}
                  size={18}
                />
              </div>
            </div>

            {/* Tactical Dossier Footer Callout */}
            <div
              style={{
                marginTop: 44,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 32px",
                borderRadius: 8,
                backgroundColor: isCream ? "#EDE6DA" : "#241A16",
                border: `1.5px solid ${t.border}`,
                boxShadow: isCream ? "0 4px 12px rgba(44,30,20,0.06)" : "0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900, color: t.danger, letterSpacing: "0.15em" }}>
                CLASSIFICATION: FAMILY OFFICE
              </span>
              <span style={{ color: t.borderAccent, fontWeight: 900 }}>•</span>
              <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: t.text }}>
                ZERO SEC FORM 13F FILINGS REQUIRED UNDER FEDERAL LAW
              </span>
            </div>
          </div>
        )}

        {/* Phase 2: Macro Brushed Brass Door Plate Resolve (Outro) */}
        {resolveProgress > 0.05 && (
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
              opacity: resolveProgress,
              transform: `scale(${interpolate(resolveProgress, [0, 1], [0.92, 1])})`,
              zIndex: 30,
            }}
          >
            {/* Photorealistic Brushed Brass Office Door Nameplate */}
            <div
              style={{
                width: 900,
                height: 480,
                borderRadius: 14,
                background: isCream
                  ? "linear-gradient(135deg, #F3ECE1 0%, #E8DFD0 50%, #FAF6EE 100%)"
                  : "linear-gradient(135deg, #2D221C 0%, #1F1713 50%, #362922 100%)",
                border: `4px solid ${isCream ? "#C4975D" : "#D4AF37"}`,
                boxShadow: isCream
                  ? "0 35px 80px -15px rgba(50, 40, 30, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.7)"
                  : "0 40px 90px -15px rgba(0, 0, 0, 0.95), inset 0 2px 4px rgba(212, 175, 55, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: "40px 60px",
              }}
            >
              {/* 4 Brass Corner Screws */}
              {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: pos.includes("top") ? 16 : undefined,
                    bottom: pos.includes("bottom") ? 16 : undefined,
                    left: pos.includes("left") ? 16 : undefined,
                    right: pos.includes("right") ? 16 : undefined,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: isCream ? "#B08A55" : "#D4AF37",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.4)",
                  }}
                />
              ))}

              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: "0.25em",
                  color: isCream ? "#8C6B3D" : "#E5C07B",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                THE ARCHIVE OF BILL HWANG
              </span>

              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: 66,
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  color: t.text,
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                }}
              >
                A $20,000,000,000
                <br />
                <span style={{ color: t.danger }}>GHOST</span>
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 24,
                  padding: "8px 20px",
                  borderRadius: 6,
                  backgroundColor: isCream ? "rgba(44, 30, 20, 0.06)" : "rgba(0, 0, 0, 0.4)",
                  border: `1px solid ${t.border}`,
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: t.danger }}>
                  ARCHEGOS CAPITAL MANAGEMENT LP
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.textMuted }}>
                  • 36 HOURS TO COLLAPSE
                </span>
              </div>
            </div>
          </div>
        )}
      </Camera3D>
    </AbsoluteFill>
  );
};
