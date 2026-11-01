import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CodeLine {
  text: string;
  type?: 'command' | 'output' | 'success' | 'error' | 'warning' | 'comment';
  delay?: number;
}

export interface CodeTerminalProps {
  title?: string;
  lines?: CodeLine[];
  delay?: number;
  width?: number | string;
  accentColor?: string;
  style?: React.CSSProperties;
}

/**
 * CodeTerminal
 * High-aesthetic developer command terminal mockup.
 * Displays staggered syntax-highlighted commands and system logs with
 * a live blinking cursor, CRT line texture, and spring entrance physics.
 */
export const CodeTerminal: React.FC<CodeTerminalProps> = ({
  title = 'bash - 80x24 - /var/log/audit.log',
  lines = [
    { text: '$ curl -s https://api.risk.internal/v1/exposure', type: 'command', delay: 24 },
    { text: '[200 OK] Connecting to Prime Broker Clearing Hub...', type: 'comment', delay: 32 },
    { text: 'MARGIN DEFICIT DETECTED: $19,840,000,000.00', type: 'error', delay: 42 },
    { text: 'INITIATING SYSTEMIC COLLATERAL LIQUIDATION', type: 'warning', delay: 54 },
    { text: 'STATUS: DISPERSAL COMPLETE (47 ACCOUNTS SEIZED)', type: 'success', delay: 68 },
  ],
  delay = 18,
  width = 720,
  accentColor = '#38bdf8',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy window entrance spring
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 100, mass: 0.7 },
  });

  const scale = interpolate(progress, [0, 1], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Blinking terminal cursor (2 Hz frequency)
  const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // Type color mappings
  const typeColors: Record<string, string> = {
    command: '#f8fafc',
    output: '#cbd5e1',
    comment: '#64748b',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 14,
        background: '#0a0d14',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.12)',
        transform: `scale(${scale})`,
        opacity,
        overflow: 'hidden',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        ...style,
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          height: 38,
          background: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
        }}
      >
        {/* Terminal Window Dots */}
        <div style={{ display: 'flex', gap: 7 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        </div>

        <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.02em' }}>
          {title}
        </span>

        <div style={{ width: 44 }} />
      </div>

      {/* Terminal Content Body */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lines.map((line, idx) => {
          const lineDelay = line.delay ?? delay + idx * 8;
          const lineProgress = spring({
            frame: frame - lineDelay,
            fps,
            config: { damping: 14, stiffness: 120, mass: 0.5 },
          });

          const lineOpacity = interpolate(lineProgress, [0, 0.4, 1], [0, 0.7, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const lineTranslateX = interpolate(lineProgress, [0, 1], [-12, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const color = typeColors[line.type || 'command'];

          return (
            <div
              key={idx}
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                color,
                opacity: lineOpacity,
                transform: `translateX(${lineTranslateX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>{line.text}</span>
            </div>
          );
        })}

        {/* Live Blinking Prompt Cursor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ color: accentColor, fontSize: 14, fontWeight: 700 }}>$</span>
          <span
            style={{
              width: 8,
              height: 16,
              background: accentColor,
              display: 'inline-block',
              opacity: cursorOpacity,
            }}
          />
        </div>
      </div>
    </div>
  );
};
