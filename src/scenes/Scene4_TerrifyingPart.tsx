import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/motion/GridBackground";
import { Camera3D } from "../components/motion/Camera3D";
import { PaperTexture } from "../components/motion/PaperTexture";
import { ArchivalStamp } from "../components/motion/ArchivalStamp";
import { RedactionMarker } from "../components/motion/RedactionMarker";
import { MotionArrow } from "../components/motion/MotionArrow";
import { KineticTitle } from "../components/motion/KineticTitle";
import { ThemeMode, THEMES, SceneProps } from "../theme/theme";

export const Scene4_TerrifyingPart: React.FC<SceneProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  return (
    <AbsoluteFill>
      <GridBackground theme={theme} mood="noir" />
      <PaperTexture theme={theme} opacity={0.35} />

      {/* 3D Camera executing slow suspense push-in */}
      <Camera3D
        durationInFrames={103}
        zoomFrom={1.0}
        zoomTo={1.1}
        panXFrom={0}
        panXTo={0}
        panYFrom={10}
        panYTo={-10}
        tiltX={5}
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
            paddingTop: 55,
          }}
        >
          {/* Top Title */}
          <KineticTitle
            text="BUT HERE IS THE TERRIFYING PART"
            subtitle="A COMPLETE REGULATORY BLIND SPOT IN THE HEART OF WALL STREET"
            theme={theme}
            highlightWords={["TERRIFYING", "PART"]}
            highlightColor={t.danger}
            size={48}
            delay={5}
            slam
          />

          {/* Physical Manila Classified Folder Card */}
          <div
            style={{
              position: "relative",
              width: 1100,
              height: 580,
              marginTop: 25,
              backgroundColor: isCream ? "#F4EBD9" : "#241914",
              border: `2px solid ${isCream ? "#D3C3A7" : "#4A3528"}`,
              borderRadius: "4px 20px 20px 20px",
              boxShadow: isCream
                ? "0 30px 70px -15px rgba(50, 40, 30, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                : "0 35px 80px -15px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.08)",
              padding: "45px 65px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: "rotate(-1deg)",
            }}
          >
            {/* Top Folder Tab with Serial Code */}
            <div
              style={{
                position: "absolute",
                top: -32,
                left: 0,
                backgroundColor: isCream ? "#EADBC3" : "#2F211A",
                border: `2px solid ${isCream ? "#D3C3A7" : "#4A3528"}`,
                borderBottom: "none",
                borderRadius: "8px 8px 0 0",
                padding: "4px 24px",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 800,
                color: isCream ? "#574433" : "#D4AF37",
                letterSpacing: "0.15em",
              }}
            >
              DOSSIER: SEC-SDNY-2021-998 // CLASSIFIED
            </div>

            {/* Folder Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: `2px solid ${isCream ? "#D3C3A7" : "#4A3528"}`,
                paddingBottom: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900, color: t.danger, letterSpacing: "0.2em" }}>
                  UNITED STATES REGULATORY INVESTIGATION
                </span>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 900, color: t.text, margin: 0 }}>
                  SUBJECT: BILL S. HWANG
                </h3>
                <span style={{ fontFamily: "monospace", fontSize: 14, color: t.textMuted }}>
                  ENTITY: ARCHEGOS CAPITAL MANAGEMENT LP (PRIVATE FAMILY OFFICE)
                </span>
              </div>

              {/* Rubber Stamp Slam */}
              <ArchivalStamp
                text="RESTRICTED"
                subtext="OFF-SHORE SHADOW ENTITY"
                delay={15}
                rotation={12}
                color={t.danger}
                borderColor={t.danger}
                size={22}
              />
            </div>

            {/* Redaction Document Body */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: t.text }}>
                  PUBLIC 13F ASSET FILING:
                </span>
                {/* Sharpie redaction line */}
                <div style={{ position: "relative" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 16, color: t.textMuted }}>
                    $0 REPORTED (EXEMPTION 13(d) FAMILY OFFICE RULE)
                  </span>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                    <RedactionMarker width={460} height={22} delay={20} color="#18181B" />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: t.text }}>
                  SYNTHETIC SWAP LEVERAGE:
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900, color: t.danger }}>
                  HIDDEN 5X TO 8X MULTIPLIER (OVER $50 BILLION TOTAL NOTIONAL)
                </span>
              </div>
            </div>

            {/* Warning Callout Bar */}
            <div
              style={{
                backgroundColor: isCream ? "#FFFFFF" : "#1B120E",
                border: `1.5px solid ${t.border}`,
                borderRadius: 8,
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: t.danger }}>
                ALERT: ZERO PUBLIC FOOTPRINT ACROSS ALL GLOBAL CLEARING HOUSES
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: t.textMuted }}>
                BYPASSED VIA DERIVATIVE CONTRACTS
              </span>
            </div>
          </div>
        </div>
      </Camera3D>
    </AbsoluteFill>
  );
};
