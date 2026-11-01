import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface MotionPlateProps {
  children?: React.ReactNode;
  theme?: ThemeMode;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  variant?: "default" | "danger" | "warning" | "stealth" | "gold" | "frost";
  width?: number | string;
  height?: number | string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  glow?: boolean;
  style?: React.CSSProperties;
}

export const MotionPlate: React.FC<MotionPlateProps> = ({
  children,
  theme = "cream",
  title,
  subtitle,
  badge,
  badgeColor,
  variant = "default",
  width = "auto",
  height = "auto",
  delay = 0,
  direction = "up",
  glow = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  const activeFrame = Math.max(0, frame - delay);

  const entrance = spring({
    frame: activeFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.8,
    },
  });

  const opacity = interpolate(activeFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let transform = "";
  if (direction === "up") {
    const translateY = interpolate(entrance, [0, 1], [50, 0]);
    transform = `translateY(${translateY}px)`;
  } else if (direction === "down") {
    const translateY = interpolate(entrance, [0, 1], [-50, 0]);
    transform = `translateY(${translateY}px)`;
  } else if (direction === "left") {
    const translateX = interpolate(entrance, [0, 1], [60, 0]);
    transform = `translateX(${translateX}px)`;
  } else if (direction === "right") {
    const translateX = interpolate(entrance, [0, 1], [-60, 0]);
    transform = `translateX(${translateX}px)`;
  } else {
    const scale = interpolate(entrance, [0, 1], [0.88, 1]);
    transform = `scale(${scale})`;
  }

  // Variant styling customized per theme
  const creamVariants = {
    default: {
      bg: "linear-gradient(150deg, #FFFFFF, #FAF7F2)",
      border: "rgba(196, 151, 93, 0.28)",
      glow: "rgba(196, 151, 93, 0.12)",
      defaultBadge: t.gold,
    },
    danger: {
      bg: "linear-gradient(150deg, #FFF5F5, #FEE2E2)",
      border: "rgba(220, 38, 38, 0.35)",
      glow: "rgba(220, 38, 38, 0.15)",
      defaultBadge: t.danger,
    },
    warning: {
      bg: "linear-gradient(150deg, #FFFBEB, #FEF3C7)",
      border: "rgba(217, 119, 6, 0.35)",
      glow: "rgba(217, 119, 6, 0.15)",
      defaultBadge: "#D97706",
    },
    stealth: {
      bg: "linear-gradient(150deg, #F9F7F4, #F2ECE4)",
      border: "rgba(120, 113, 108, 0.25)",
      glow: "rgba(120, 113, 108, 0.08)",
      defaultBadge: t.textMuted,
    },
    gold: {
      bg: "linear-gradient(150deg, #FFFDF8, #FEF8EC)",
      border: "rgba(180, 83, 9, 0.35)",
      glow: "rgba(180, 83, 9, 0.15)",
      defaultBadge: t.gold,
    },
    frost: {
      bg: "linear-gradient(150deg, #FFFFFF, #F5F3EF)",
      border: "rgba(196, 151, 93, 0.3)",
      glow: "rgba(196, 151, 93, 0.12)",
      defaultBadge: t.gold,
    },
  };

  const chocolateVariants = {
    default: {
      bg: "linear-gradient(150deg, #241C19, #1C1411)",
      border: "rgba(212, 175, 55, 0.25)",
      glow: "rgba(212, 175, 55, 0.15)",
      defaultBadge: t.gold,
    },
    danger: {
      bg: "linear-gradient(150deg, #2B1414, #1E0C0C)",
      border: "rgba(244, 63, 94, 0.45)",
      glow: "rgba(244, 63, 94, 0.25)",
      defaultBadge: t.danger,
    },
    warning: {
      bg: "linear-gradient(150deg, #2D1F12, #1F150A)",
      border: "rgba(245, 158, 11, 0.4)",
      glow: "rgba(245, 158, 11, 0.2)",
      defaultBadge: "#F59E0B",
    },
    stealth: {
      bg: "linear-gradient(150deg, #1C1513, #150E0C)",
      border: "rgba(168, 149, 137, 0.25)",
      glow: "rgba(168, 149, 137, 0.08)",
      defaultBadge: t.textMuted,
    },
    gold: {
      bg: "linear-gradient(150deg, #2E2218, #20170F)",
      border: "rgba(229, 192, 123, 0.45)",
      glow: "rgba(229, 192, 123, 0.25)",
      defaultBadge: t.gold,
    },
    frost: {
      bg: "linear-gradient(150deg, #261E1A, #1D1512)",
      border: "rgba(212, 175, 55, 0.3)",
      glow: "rgba(212, 175, 55, 0.15)",
      defaultBadge: t.gold,
    },
  };

  const variants = isCream ? creamVariants : chocolateVariants;
  const currentVariant = variants[variant] || variants.default;
  const resolvedBadgeColor = badgeColor || currentVariant.defaultBadge;

  return (
    <div
      style={{
        width,
        height,
        opacity,
        transform,
        background: currentVariant.bg,
        border: `1px solid ${currentVariant.border}`,
        borderRadius: 20,
        padding: "24px 28px",
        boxShadow: glow
          ? isCream
            ? `0 18px 36px -10px rgba(44, 30, 20, 0.08), 0 0 1px rgba(0,0,0,0.14)`
            : `0 22px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px ${currentVariant.glow}`
          : t.shadow,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Delicate top specular line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${currentVariant.border}, transparent)`,
        }}
      />

      {/* Header bar if badge or title is present */}
      {(badge || title) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: children ? 16 : 0,
            gap: 12,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {title && (
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 17,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: t.text,
                }}
              >
                {title}
              </span>
            )}
            {subtitle && (
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: t.textMuted,
                  letterSpacing: "0.02em",
                }}
              >
                {subtitle}
              </span>
            )}
          </div>

          {badge && (
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 999,
                background: isCream ? "rgba(44, 30, 20, 0.05)" : "rgba(0, 0, 0, 0.45)",
                color: resolvedBadgeColor,
                border: `1px solid ${resolvedBadgeColor}66`,
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Plate content */}
      {children}
    </div>
  );
};
