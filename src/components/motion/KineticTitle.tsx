import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface KineticTitleProps {
  text: string;
  subtitle?: string;
  theme?: ThemeMode;
  highlightWords?: string[];
  highlightColor?: string;
  size?: number;
  align?: "left" | "center" | "right";
  delay?: number;
  slam?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}

export const KineticTitle: React.FC<KineticTitleProps> = ({
  text,
  subtitle,
  theme = "cream",
  highlightWords = [],
  highlightColor,
  size = 54,
  align = "center",
  delay = 0,
  slam = false,
  glow = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  const resolvedHighlight = highlightColor || (isCream ? t.accent : t.gold);

  const words = text.split(" ");
  const activeFrame = Math.max(0, frame - delay);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        textAlign: align,
        gap: 10,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
          gap: "10px 16px",
        }}
      >
        {words.map((word, i) => {
          const wordDelay = slam ? 0 : i * 2.2;
          const wordFrame = Math.max(0, activeFrame - wordDelay);

          const spr = spring({
            frame: wordFrame,
            fps,
            config: slam
              ? { damping: 11, stiffness: 180, mass: 1.1 }
              : { damping: 14, stiffness: 130 },
          });

          const scale = slam
            ? interpolate(spr, [0, 1], [1.7, 1])
            : interpolate(spr, [0, 1], [0.65, 1]);

          const opacity = interpolate(wordFrame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const isHighlight = highlightWords.some(
            (hw) => word.toLowerCase().replace(/[^a-z0-9]/g, "") === hw.toLowerCase().replace(/[^a-z0-9]/g, "")
          );

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: size,
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                opacity,
                transform: `scale(${scale})`,
                color: isHighlight ? resolvedHighlight : t.text,
                textShadow:
                  isHighlight && !isCream
                    ? `0 0 30px ${resolvedHighlight}88, 0 4px 15px rgba(0,0,0,0.8)`
                    : isCream
                    ? "0 2px 4px rgba(44, 30, 20, 0.08)"
                    : "0 4px 15px rgba(0,0,0,0.7)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {subtitle && (
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: Math.round(size * 0.35),
            fontWeight: 700,
            color: t.textMuted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: interpolate(activeFrame, [8, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(activeFrame, [8, 18], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
