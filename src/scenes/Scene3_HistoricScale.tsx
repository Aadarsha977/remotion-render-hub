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

export const Scene3_HistoricScale: React.FC<SceneProps> = ({
  theme = 'cream',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isCream = theme === 'cream';
  const t = THEMES[theme] || THEMES.cream;

  // Spring physics for the three bar pillars
  const baringsSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const socgenSpring = spring({
    frame: frame - 26,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });
  const archegosSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12, stiffness: 90, mass: 0.7 },
  });

  const baringsH = interpolate(baringsSpring, [0, 1], [0, 55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const socgenH = interpolate(socgenSpring, [0, 1], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const archegosH = interpolate(archegosSpring, [0, 1], [0, 230], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      baseColor={isCream ? '#F4EFEA' : '#110D0C'}
      gradientColors={{
        primary: isCream ? 'rgba(194, 139, 56, 0.16)' : 'rgba(212, 175, 55, 0.14)',
        secondary: 'rgba(239, 68, 68, 0.12)',
        tertiary: isCream ? 'rgba(44, 62, 80, 0.08)' : 'rgba(28, 18, 16, 0.5)',
      }}
      grainOpacity={0.05}
      enableVignette={true}
    >
      {/* Law 4 & 5: Kinetic Cartesian Grid */}
      <KineticGrid
        entryFrame={4}
        cornerLabel="HISTORIC_SCALE // ALL_TIME_HIGH_DEVIATION"
        bracketColor={isCream ? 'rgba(26, 22, 21, 0.35)' : 'rgba(229, 192, 123, 0.35)'}
        dotColor={isCream ? 'rgba(26, 22, 21, 0.07)' : 'rgba(255, 255, 255, 0.05)'}
      />

      {/* Law 5: Expanding Shockwave Ripple when the Archegos Skyscraper Monolith Shoots Up */}
      <ShockwaveCircle
        startFrame={32}
        duration={26}
        size={480}
        color="#EF4444"
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
        {/* Law 3 & 5: Status Highlight Pill */}
        <div style={{ marginBottom: 12 }}>
          <HighlightPill
            delay={8}
            color={isCream ? 'rgba(194, 139, 56, 0.15)' : 'rgba(212, 175, 55, 0.15)'}
            borderColor={isCream ? 'rgba(194, 139, 56, 0.45)' : 'rgba(212, 175, 55, 0.45)'}
            textColor={isCream ? '#92400E' : '#E5C07B'}
          >
            GLOBAL FINANCIAL RECORD COMPARISON
          </HighlightPill>
        </div>

        {/* Law 6: Masked Kinetic Typography */}
        <div style={{ marginBottom: 24, maxWidth: 1200 }}>
          <MaskedReveal
            text="LARGEST SINGLE PERSON TRADING LOSS IN HUMAN HISTORY"
            delay={12}
            staggerFrames={2}
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: t.text,
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
            accentIndices={[3, 4]}
            accentStyle={{ color: t.danger }}
          />
        </div>

        {/* Law 7 & 9: 3D Frosted GlassCard with Specular Sheen Pass */}
        <GlassCard
          delay={18}
          sheenDelay={48}
          glowColor="rgba(239, 68, 68, 0.22)"
          tiltAngle={6}
          style={{
            padding: '30px 48px',
            minWidth: 1050,
            backgroundColor: isCream ? 'rgba(255, 255, 255, 0.9)' : 'rgba(28, 20, 17, 0.9)',
            border: `1.5px solid ${t.border}`,
            boxShadow: isCream
              ? '0 25px 60px -15px rgba(44, 30, 20, 0.15), 0 0 1px rgba(0,0,0,0.2)'
              : '0 30px 70px -15px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Top Comparative Context Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1.5px solid ${t.border}`,
              paddingBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 12,
                fontWeight: 800,
                color: t.textMuted,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              CATASTROPHIC ROGUE TRADING & LIQUIDATION BENCHMARKS
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ProgressRing
                percentage={100}
                radius={16}
                strokeWidth={3}
                delay={30}
                strokeColor="#EF4444"
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 900,
                  color: t.danger,
                }}
              >
                +185% HISTORIC JUMP
              </span>
            </div>
          </div>

          {/* Three Comparative Monolith Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1.4fr',
              gap: 28,
              alignItems: 'flex-end',
              height: 270,
              paddingBottom: 10,
            }}
          >
            {/* Pillar 1: Barings Bank (1995) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <DynamicCounter
                  startValue={0}
                  endValue={1.3}
                  decimals={1}
                  prefix="$"
                  suffix="B"
                  delay={22}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 26,
                    fontWeight: 900,
                    color: t.textMuted,
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  height: baringsH,
                  backgroundColor: isCream ? '#D6D3D1' : '#3F3530',
                  borderRadius: '6px 6px 0 0',
                  border: `1px solid ${t.border}`,
                }}
              />
              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 14, color: t.text, display: 'block' }}>
                  Barings Bank
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: t.textMuted }}>
                  Nick Leeson • 1995
                </span>
              </div>
            </div>

            {/* Pillar 2: Société Générale (2008) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <DynamicCounter
                  startValue={0}
                  endValue={7.0}
                  decimals={1}
                  prefix="$"
                  suffix="B"
                  delay={26}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 26,
                    fontWeight: 900,
                    color: t.textMuted,
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  height: socgenH,
                  backgroundColor: isCream ? '#A8A29E' : '#574842',
                  borderRadius: '6px 6px 0 0',
                  border: `1px solid ${t.border}`,
                }}
              />
              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 14, color: t.text, display: 'block' }}>
                  Société Générale
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: t.textMuted }}>
                  Jérôme Kerviel • 2008
                </span>
              </div>
            </div>

            {/* Pillar 3: Archegos Capital (2021) - Skyscraper Monolith */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <DynamicCounter
                  startValue={0}
                  endValue={20.0}
                  decimals={1}
                  prefix="$"
                  suffix="B"
                  delay={32}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 38,
                    fontWeight: 900,
                    color: t.danger,
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  height: archegosH,
                  background: 'linear-gradient(to top, #DC2626, #EF4444)',
                  borderRadius: '8px 8px 0 0',
                  boxShadow: '0 0 30px rgba(220, 38, 38, 0.45)',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                }}
              />
              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 16, color: t.danger, display: 'block' }}>
                  Archegos Capital
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: t.textMuted }}>
                  Bill Hwang • March 2021
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Law 10: 4-Second Attention Reset Banner at Frame 90 */}
        <div
          style={{
            marginTop: 18,
            opacity: resetOpacity,
            transform: `translateY(${resetTranslateY}px)`,
          }}
        >
          <HighlightPill
            delay={90}
            color="rgba(220, 38, 38, 0.16)"
            borderColor={t.danger}
            textColor={t.danger}
          >
            RECORD EXTENSION: EXCEEDS BARINGS AND SOCIÉTÉ GÉNÉRALE LOSSES COMBINED BY 2.4X
          </HighlightPill>
        </div>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
