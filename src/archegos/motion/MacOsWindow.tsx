import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface MacOsWindowProps {
  children?: React.ReactNode;
  title?: string;
  url?: string;
  delay?: number;
  sheenDelay?: number;
  width?: number | string;
  height?: number | string;
  glowColor?: string;
  accentColor?: string;
  tiltAngle?: number;
  showUrlBar?: boolean;
  tabs?: string[];
  activeTabIndex?: number;
  style?: React.CSSProperties;
}

/**
 * MacOsWindow
 * Premium Code-Built Faux-UI Window Container.
 * Emulates a sleek macOS application or browser frame without relying on external screenshots:
 * - 3-button traffic light controls (close, minimize, maximize) with specular gloss
 * - Optional Safari-style pill URL bar or multi-tab header
 * - Frosted glassmorphism with backdrop blur
 * - 3D card tilt & spring entrance physics
 * - 45-degree diagonal specular sheen sweep
 * - Ambient volumetric backlight glow
 */
export const MacOsWindow: React.FC<MacOsWindowProps> = ({
  children,
  title = 'Terminal // Portfolio Analytics',
  url = 'https://bloomberg.terminal/v4/risk-matrix',
  delay = 18,
  sheenDelay = 42,
  width = 960,
  height = 'auto',
  glowColor = 'rgba(56, 189, 248, 0.25)',
  accentColor = '#38bdf8',
  tiltAngle = 5,
  showUrlBar = true,
  tabs,
  activeTabIndex = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy spring entrance
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 95,
      mass: 0.7,
    },
  });

  const scale = interpolate(progress, [0, 1], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rotateX = interpolate(progress, [0, 1], [tiltAngle, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [32, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Specular light sheen sweep across the glass surface
  const sheenProgress = interpolate(frame, [sheenDelay, sheenDelay + 24], [-120, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sheenOpacity = interpolate(
    frame,
    [sheenDelay, sheenDelay + 6, sheenDelay + 18, sheenDelay + 24],
    [0, 0.75, 0.75, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        perspective: '1200px',
      }}
    >
      {/* Volumetric Blurred Backlight Blob */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '80%',
          background: glowColor,
          filter: 'blur(72px)',
          borderRadius: 40,
          opacity: opacity * 0.7,
          pointerEvents: 'none',
          transform: `scale(${scale})`,
        }}
      />

      {/* Main Glassmorphic Window Chassis */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `perspective(1200px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`,
          opacity,
          borderRadius: 18,
          background: 'rgba(13, 17, 26, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        {/* Specular Diagonal Sheen Sweep */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sheenProgress}%`,
            width: '55%',
            background: 'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.16) 50%, transparent 80%)',
            transform: 'skewX(-20deg)',
            pointerEvents: 'none',
            opacity: sheenOpacity,
            zIndex: 30,
          }}
        />

        {/* Window Title & Controls Bar */}
        <div
          style={{
            height: 44,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            userSelect: 'none',
          }}
        >
          {/* Traffic Light Control Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 80 }}>
            {/* Close */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#ff5f56',
                boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            />
            {/* Minimize */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#ffbd2e',
                boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            />
            {/* Maximize */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#27c93f',
                boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            />
          </div>

          {/* Center Address Pill or Window Title */}
          {showUrlBar ? (
            <div
              style={{
                flex: 1,
                maxWidth: 480,
                height: 28,
                borderRadius: 6,
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 12px',
                gap: 8,
              }}
            >
              {/* SSL Padlock Icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  color: 'rgba(255, 255, 255, 0.75)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {url}
              </span>
            </div>
          ) : (
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {title}
            </div>
          )}

          {/* Right Status Indicator */}
          <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              LIVE
            </span>
          </div>
        </div>

        {/* Optional Multi-Tab Strip */}
        {tabs && tabs.length > 0 && (
          <div
            style={{
              display: 'flex',
              background: 'rgba(0, 0, 0, 0.25)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '0 8px',
              gap: 4,
            }}
          >
            {tabs.map((tab, idx) => {
              const isActive = idx === activeTabIndex;
              return (
                <div
                  key={tab}
                  style={{
                    padding: '6px 16px',
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                    borderBottom: isActive ? `2px solid ${accentColor}` : '2px solid transparent',
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        )}

        {/* Window Interior Content Slot */}
        <div
          style={{
            position: 'relative',
            padding: 24,
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
