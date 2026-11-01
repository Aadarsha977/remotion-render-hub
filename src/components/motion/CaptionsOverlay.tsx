import React from "react";
import { useCurrentFrame } from "remotion";
import { WORD_TIMESTAMPS } from "../../data/timestamps";
import { ThemeMode, THEMES } from "../../theme/theme";

export interface CaptionsOverlayProps {
  theme?: ThemeMode;
}

export const CaptionsOverlay: React.FC<CaptionsOverlayProps> = ({
  theme = "cream",
}) => {
  const frame = useCurrentFrame();
  const t = THEMES[theme] || THEMES.cream;
  const isCream = theme === "cream";

  // Find active word index
  const activeIndex = WORD_TIMESTAMPS.findIndex(
    (w) => frame >= w.startFrame && frame <= w.endFrame + 2
  );

  if (activeIndex === -1 && (frame < 0 || frame > 870)) {
    return null;
  }

  const targetIndex = activeIndex === -1 ? 0 : activeIndex;
  const chunkStart = Math.max(0, Math.floor(targetIndex / 6) * 6);
  const currentWords = WORD_TIMESTAMPS.slice(chunkStart, chunkStart + 6);

  const isSpeaking = activeIndex !== -1;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 46,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 14px",
          padding: "12px 26px",
          borderRadius: 999,
          background: isCream ? "#FFFFFF" : "rgba(36, 28, 25, 0.9)",
          border: `1.5px solid ${t.border}`,
          boxShadow: isCream
            ? "0 10px 28px -6px rgba(44, 30, 20, 0.1), 0 0 1px rgba(0,0,0,0.15)"
            : "0 12px 35px rgba(0, 0, 0, 0.7)",
          maxWidth: "80%",
          opacity: isSpeaking ? 1 : 0.5,
          transition: "opacity 0.2s ease",
        }}
      >
        {currentWords.map((item, idx) => {
          const isActive = frame >= item.startFrame && frame <= item.endFrame + 1;
          const isPast = frame > item.endFrame + 1;

          let wordColor: string;
          if (isActive) {
            wordColor = isCream ? t.gold : t.gold;
          } else if (isPast) {
            wordColor = isCream ? t.text : "#E2D9D2";
          } else {
            wordColor = isCream ? "#A8A29E" : "#786B64";
          }

          return (
            <span
              key={`${chunkStart + idx}-${item.word}`}
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: 25,
                fontWeight: isActive ? 900 : 700,
                color: wordColor,
                transform: isActive ? "scale(1.14)" : "scale(1.0)",
                display: "inline-block",
                textShadow:
                  isActive && !isCream
                    ? "0 0 16px rgba(229, 192, 123, 0.7)"
                    : "none",
                transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
