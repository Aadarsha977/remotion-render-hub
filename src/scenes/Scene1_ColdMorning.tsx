import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  CinematicCanvas,
  KineticGrid,
  MaskedReveal,
  GlassCard,
  DynamicCounter,
  ProgressRing,
  ShockwaveCircle,
  HighlightPill,
  ArchivalStamp,
} from '../components/motion';
import { SceneProps, THEMES } from '../theme/theme';

export const Scene1_ColdMorning: React.FC<SceneProps> = ({
  theme = 'cream',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isCream = theme === 'cream';
  const t = THEMES[theme] || THEMES.cream;

  // Law 10: 4-Second Attention Reset Event at Frame 90
  const resetSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 13, stiffness: 120, mass: 0.5 },
  });

  const resetOpacity = interpolate(resetSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const resetTranslateY = interpolate(resetSpring, [0, 1], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <CinematicCanvas
      durationInFrames={durationInFrames}
      cameraDriftScale={1.045}
      baseColor={isCream ? '#F4EFEA' : '#140F0D'}
      gradientColors={{
        primary: isCream ? 'rgba(194, 139, 56, 0.18)' : 'rgba(212, 175, 55, 0.15)',
        secondary: isCream ? 'rgba(192, 57, 43, 0.12)' : 'rgba(231, 76, 60, 0.12)',
        tertiary: isCream ? 'rgba(44, 62, 80, 0.08)' : 'rgba(26, 20, 18, 0.4)',
      }}
      grainOpacity={0.05}
      enableVignette={true}
    >
      {/* Law 4 & 5: Kinetic Cartesian Grid, Framing Brackets, and Coordinate Crosshairs */}
      <KineticGrid
        entryFrame={4}
        cornerLabel="MANHATTAN DISPATCH // SEC-VOL-2021"
        bracketColor={isCream ? 'rgba(26, 22, 21, 0.35)' : 'rgba(229, 192, 123, 0.35)'}
        dotColor={isCream ? 'rgba(26, 22, 21, 0.07)' : 'rgba(255, 255, 255, 0.05)'}
      />

      {/* Law 5: Expanding Shockwave Ripple when the Case Stamp Slams at Frame 38 */}
      <ShockwaveCircle
        startFrame={36}
        duration={26}
        size={420}
        color={t.danger}
        strokeWidth={3}
      />

      {/* Primary Center Layout */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        {/* Law 3 & 5: Staggered Status Highlight Pill */}
        <div style={{ marginBottom: 14 }}>
          <HighlightPill
            delay={8}
            color={isCream ? 'rgba(194, 139, 56, 0.15)' : 'rgba(212, 175, 55, 0.15)'}
            borderColor={isCream ? 'rgba(194, 139, 56, 0.45)' : 'rgba(212, 175, 55, 0.45)'}
            textColor={isCream ? '#92400E' : '#E5C07B'}
          >
            THE WALL STREET CHRONICLE • ESTABLISHED 1889
          </HighlightPill>
        </div>

        {/* Law 6: Masked Kinetic Typography with Tracking Deceleration */}
        <div style={{ marginBottom: 28, maxWidth: 1200 }}>
          <MaskedReveal
            text="ON A COLD FRIDAY MORNING IN MARCH 2021"
            delay={12}
            staggerFrames={3}
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: t.text,
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
            accentIndices={[2, 3]}
            accentStyle={{ color: t.danger }}
          />
        </div>

        {/* Law 7 & 9: 3D Frosted Editorial GlassCard with Specular Sheen Sweep */}
        <GlassCard
          delay={20}
          sheenDelay={45}
          glowColor={isCream ? 'rgba(194, 139, 56, 0.2)' : 'rgba(212, 175, 55, 0.2)'}
          tiltAngle={6}
          style={{
            padding: '36px 48px',
            minWidth: 1050,
            backgroundColor: isCream ? 'rgba(255, 255, 255, 0.88)' : 'rgba(30, 22, 19, 0.88)',
            border: `1.5px solid ${t.border}`,
            boxShadow: isCream
              ? '0 25px 60px -15px rgba(44, 30, 20, 0.15), 0 0 1px rgba(0,0,0,0.2)'
              : '0 30px 70px -15px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* Top Subheader Line */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `2px solid ${t.border}`,
              paddingBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 800,
                color: t.accent,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              VOL. CCXXXVIII NO. 61 • PRE-MARKET INVESTIGATION
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 900,
                color: isCream ? '#92400E' : '#E5C07B',
                background: isCream ? 'rgba(194, 139, 56, 0.12)' : 'rgba(229, 192, 123, 0.15)',
                padding: '4px 14px',
                borderRadius: 4,
                border: `1px solid ${t.borderAccent}`,
                letterSpacing: '0.08em',
              }}
            >
              MIDTOWN NEW YORK
            </span>
          </div>

          {/* Three Forensic Telemetry Data Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.2fr 1fr',
              gap: 32,
              alignItems: 'center',
            }}
          >
            {/* Column 1: Live Pre-Market Clock & Telemetry Odometer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 800,
                  color: t.textMuted,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                UNWIND WINDOW OPENS
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 48,
                    fontWeight: 900,
                    color: t.text,
                    lineHeight: 1,
                  }}
                >
                  07:
                </span>
                <DynamicCounter
                  startValue={0}
                  endValue={0}
                  delay={24}
                  prefix="0"
                  suffix=" AM"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 48,
                    fontWeight: 900,
                    color: t.text,
                    lineHeight: 1,
                  }}
                />
              </div>
              <span style={{ fontSize: 13, color: t.textMuted, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                NYSE Bell in 150 minutes
              </span>
            </div>

            {/* Column 2: Meteorological Gauge & Dynamic Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                borderLeft: `1px solid ${t.border}`,
                paddingLeft: 24,
              }}
            >
              <ProgressRing
                percentage={85}
                radius={36}
                strokeWidth={5}
                delay={26}
                strokeColor={t.gold}
                trackColor={isCream ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: 800,
                    color: t.textMuted,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  DAWN TEMPERATURE
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <DynamicCounter
                    startValue={5}
                    endValue={-2}
                    delay={28}
                    suffix="°C"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 34,
                      fontWeight: 900,
                      color: t.gold,
                      lineHeight: 1.1,
                    }}
                  />
                  <span style={{ fontFamily: 'monospace', fontSize: 16, color: t.textMuted, marginLeft: 6 }}>
                    / 28°F
                  </span>
                </div>
                <span style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>
                  Sub-zero freezing winds
                </span>
              </div>
            </div>

            {/* Column 3: The Tactile Red Case Stamp */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: `1px solid ${t.border}`,
                paddingLeft: 24,
              }}
            >
              <ArchivalStamp
                text="MARCH 26, 2021"
                subtext="CASE FILE: ARCHEGOS"
                delay={36}
                rotation={-9}
                color={t.danger}
                borderColor={t.danger}
                size={18}
              />
            </div>
          </div>
        </GlassCard>

        {/* Law 10: 4-Second Attention Reset Banner at Frame 90 */}
        <div
          style={{
            marginTop: 22,
            opacity: resetOpacity,
            transform: `translateY(${resetTranslateY}px)`,
          }}
        >
          <HighlightPill
            delay={90}
            color={isCream ? 'rgba(220, 38, 38, 0.12)' : 'rgba(244, 63, 94, 0.16)'}
            borderColor={t.danger}
            textColor={t.danger}
          >
            ⚠️ 07:15 AM EST: UNUSUAL BLOCK LIQUIDATION ORDERS DISPATCHED TO PRIME BROKERS
          </HighlightPill>
        </div>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
