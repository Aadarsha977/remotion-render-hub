import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MotionPlate } from "./MotionPlate";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface MetricCardProps {
  label: string;
  value: number;
  theme?: ThemeMode;
  prefix?: string;
  suffix?: string;
  deltaText?: string;
  isNegative?: boolean;
  delay?: number;
  duration?: number;
  width?: number | string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  theme = "cream",
  prefix = "$",
  suffix = "",
  deltaText = "-100% MARGIN CALL",
  isNegative = true,
  delay = 0,
  duration = 35,
  width = 440,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  const activeFrame = Math.max(0, frame - delay);

  // Animate counter progress
  const progress = interpolate(activeFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayVal = Math.round(value * progress);
  const formattedVal = displayVal.toLocaleString("en-US");

  return (
    <MotionPlate
      width={width}
      theme={theme}
      variant={isNegative ? "danger" : "default"}
      delay={delay}
      direction="scale"
      badge="LIVE EXPOSURE"
      badgeColor={isNegative ? t.danger : t.gold}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.textMuted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            color: isNegative ? t.danger : t.text,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 800 }}>{prefix}</span>
          <span
            style={{
              fontFamily: "'Inter', monospace",
              fontSize: 46,
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            {formattedVal}
          </span>
          {suffix && <span style={{ fontSize: 24, fontWeight: 700 }}>{suffix}</span>}
        </div>

        {deltaText && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 8,
              background: isCream ? "#FEF2F2" : "rgba(244, 63, 94, 0.15)",
              border: `1px solid ${isCream ? "#FCA5A5" : "rgba(244, 63, 94, 0.4)"}`,
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: t.danger,
                boxShadow: `0 0 6px ${t.danger}`,
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 800,
                color: isCream ? "#991B1B" : "#FDA4AF",
                letterSpacing: "0.06em",
              }}
            >
              {deltaText}
            </span>
          </div>
        )}
      </div>
    </MotionPlate>
  );
};
