export type ThemeMode = "cream" | "chocolate";

export interface ThemeColors {
  name: ThemeMode;
  bg: string;
  bgCard: string;
  bgSurface: string;
  badgeBg: string;
  text: string;
  textMuted: string;
  border: string;
  borderAccent: string;
  accent: string;
  gold: string;
  danger: string;
  dangerBg: string;
  dangerText: string;
  shadow: string;
  glow: string;
  gridLine: string;
}

export const THEMES: Record<ThemeMode, ThemeColors> = {
  cream: {
    name: "cream",
    bg: "#F7F4EC", // Warm paper parchment
    bgCard: "#FFFFFF", // Crisp milk white card
    bgSurface: "#F0EAE1",
    badgeBg: "#EDE6DA",
    text: "#1C1917", // Rich stone charcoal ink
    textMuted: "#78716C", // Warm slate
    border: "#E2DBD0", // Delicate warm hairline
    borderAccent: "#C4975D", // Warm bronze
    accent: "#C2410C", // Terracotta
    gold: "#B45309", // Warm antique gold / bronze
    danger: "#DC2626", // Vermilion red
    dangerBg: "#FEF2F2",
    dangerText: "#991B1B",
    shadow: "0 14px 34px -8px rgba(44, 30, 20, 0.09), 0 0 1px rgba(0,0,0,0.12)",
    glow: "rgba(196, 151, 93, 0.18)",
    gridLine: "rgba(44, 30, 20, 0.04)",
  },
  chocolate: {
    name: "chocolate",
    bg: "#15100E", // Deep roasted espresso cocoa
    bgCard: "#221915", // Velvety dark cocoa card
    bgSurface: "#1C1411",
    badgeBg: "#2C201B",
    text: "#F5EBE1", // Warm vanilla cream
    textMuted: "#A89589", // Mocha taupe
    border: "#3D2D27", // Warm cocoa border
    borderAccent: "#D4AF37", // Warm gold border
    accent: "#FF6B6B", // Warm coral
    gold: "#E5C07B", // Champagne gold
    danger: "#F43F5E", // Rich crimson
    dangerBg: "rgba(244, 63, 94, 0.15)",
    dangerText: "#FDA4AF",
    shadow: "0 20px 42px -10px rgba(0, 0, 0, 0.75), 0 0 25px rgba(212, 175, 55, 0.08)",
    glow: "rgba(212, 175, 55, 0.2)",
    gridLine: "rgba(245, 235, 225, 0.035)",
  },
};

export interface SceneProps {
  theme?: ThemeMode;
}

