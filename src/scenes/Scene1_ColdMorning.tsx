import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/motion/GridBackground";
import { Camera3D } from "../components/motion/Camera3D";
import { PaperTexture } from "../components/motion/PaperTexture";
import { ArchivalStamp } from "../components/motion/ArchivalStamp";
import { MotionArrow } from "../components/motion/MotionArrow";
import { ThemeMode, THEMES, SceneProps } from "../theme/theme";

export const Scene1_ColdMorning: React.FC<SceneProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  return (
    <AbsoluteFill>
      <GridBackground theme={theme} mood="default" />
      <PaperTexture theme={theme} opacity={0.4} />

      {/* 3D Virtual Camera with continuous push-in momentum */}
      <Camera3D
        durationInFrames={135}
        zoomFrom={1.0}
        zoomTo={1.12}
        panXFrom={0}
        panXTo={-25}
        panYFrom={0}
        panYTo={15}
        tiltX={4}
        tiltY={-3}
      >
        {/* Full Screen Archival Broadsheet Newspaper Container */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1400,
            height: 920,
            backgroundColor: isCream ? "#FFFFFF" : "#1E1613",
            border: `2px solid ${t.border}`,
            borderRadius: 8,
            boxShadow: isCream
              ? "0 25px 60px -15px rgba(44, 30, 20, 0.15), 0 0 1px rgba(0,0,0,0.2)"
              : "0 30px 70px -15px rgba(0, 0, 0, 0.9)",
            padding: "36px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Newspaper Masthead */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderBottom: `3px double ${t.text}`,
              paddingBottom: 16,
              gap: 8,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span>MANHATTAN EDITION • SPECIAL INVESTIGATION</span>
              <span>ESTABLISHED 1889</span>
              <span>PRICE: $4.00</span>
            </div>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: "0.04em",
                color: t.text,
                margin: 0,
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1,
              }}
            >
              The Wall Street Chronicle
            </h1>

            {/* Dateline Bar */}
            <div
              style={{
                width: "100%",
                borderTop: `1px solid ${t.border}`,
                borderBottom: `1px solid ${t.border}`,
                padding: "6px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 800,
                color: t.text,
                letterSpacing: "0.08em",
              }}
            >
              <span style={{ color: t.accent }}>VOL. CCXXXVIII NO. 61</span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  color: isCream ? "#111827" : "#F5EBE1",
                  background: isCream ? "#FEF3C7" : "rgba(229, 192, 123, 0.15)",
                  padding: "4px 16px",
                  borderRadius: 4,
                  border: `1px solid ${t.borderAccent}`,
                }}
              >
                FRIDAY • MARCH 26, 2021
              </span>
              <span>MIDTOWN NEW YORK • 07:00 AM EST</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 54,
                fontWeight: 900,
                lineHeight: 1.05,
                color: t.text,
                letterSpacing: "-0.02em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              A COLD FRIDAY MORNING IN MARCH:
              <br />
              <span style={{ color: t.danger }}>THE $20,000,000,000 COLLAPSE BEGINS</span>
            </h2>

            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 20,
                lineHeight: 1.45,
                color: t.textMuted,
                maxWidth: "85%",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              Before market open on March 26, unprecedented margin calls struck prime brokers
              across Manhattan, triggering the fastest single-firm liquidation in modern financial history.
            </p>
          </div>

          {/* Broadsheet Multi-Column Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr",
              gap: 28,
              borderTop: `1px solid ${t.border}`,
              paddingTop: 18,
              flex: 1,
            }}
          >
            {/* Column 1: Lead Story & Time HUD */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  fontWeight: 800,
                  color: t.accent,
                  letterSpacing: "0.1em",
                }}
              >
                PRE-MARKET DISPATCH
              </span>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: t.text,
                  margin: 0,
                  textAlign: "justify",
                }}
              >
                At dawn in Midtown Manhattan, global investment banks scrambled to tally exposure to a secretive
                family office. With temperature lingering at -2°C, the opening bell at 09:30 AM loomed
                as the deadline for emergency margin deposits that would never arrive.
              </p>
            </div>

            {/* Column 2: Meteorological & Market Indicator */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                borderLeft: `1px solid ${t.border}`,
                paddingLeft: 20,
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: t.textMuted }}>
                CONDITIONS AT DAWN
              </span>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 6,
                  backgroundColor: isCream ? "#F9F7F4" : "#281E19",
                  border: `1px solid ${t.border}`,
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 900, color: t.gold }}>
                  -2°C / 28°F
                </span>
                <span style={{ fontFamily: "system-ui", fontSize: 12, color: t.textMuted, display: "block", marginTop: 4 }}>
                  FREEZING WINDS OVER WALL ST
                </span>
              </div>
            </div>

            {/* Column 3: Red Stamp & Archival Docket */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderLeft: `1px solid ${t.border}`,
                paddingLeft: 20,
                position: "relative",
              }}
            >
              <ArchivalStamp
                text="MARCH 26, 2021"
                subtext="OFFICIAL CASE FILE 001"
                delay={20}
                rotation={-8}
                color={t.danger}
                borderColor={t.danger}
                size={22}
              />
            </div>
          </div>
        </div>
      </Camera3D>
    </AbsoluteFill>
  );
};
