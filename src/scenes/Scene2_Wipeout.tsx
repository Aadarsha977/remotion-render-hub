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
} from '../components/motion';
import { SceneProps, THEMES } from '../theme/theme';

export const Scene2_Wipeout: React.FC<SceneProps> = ({
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
      cameraDriftScale={1.05}
      baseColor={isCream ? '#160E0B' : '#0B0706'}
      gradientColors={{
        primary: 'rgba(239, 68, 68, 0.22)',   // Warning Crimson
        secondary: 'rgba(217, 119, 6, 0.15)',  // Amber Fire
        tertiary: 'rgba(26, 16, 14, 0.6)',     // Deep Charcoal
      }}
      grainOpacity={0.055}
      enableVignette={true}
    >
      {/* Law 4 & 5: Kinetic Cartesian Grid with Warning Red Accents */}
      <KineticGrid
        entryFrame={3}
        cornerLabel="COLLAPSE RUNNER // MARGIN_CALL_DEATH_SPIRAL"
        bracketColor="rgba(239, 68, 68, 0.4)"
        dotColor="rgba(239, 68, 68, 0.08)"
      />

      {/* Law 5: Expanding Shockwave Ripple when the $20B Metric Slams */}
      <ShockwaveCircle
        startFrame={20}
        duration={28}
        size={520}
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
        <div style={{ marginBottom: 14 }}>
          <HighlightPill
            delay={6}
            color="rgba(239, 68, 68, 0.18)"
            borderColor="rgba(239, 68, 68, 0.5)"
            textColor="#F87171"
          >
            TERMINAL LIQUIDATION DISPATCH • VELOCITY: $555M / HOUR
          </HighlightPill>
        </div>

        {/* Law 6: Masked Kinetic Typography */}
        <div style={{ marginBottom: 28, maxWidth: 1200 }}>
          <MaskedReveal
            text="ONE MAN LOST 20 BILLION DOLLARS IN UNDER 36 HOURS"
            delay={10}
            staggerFrames={2}
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.1,
              textTransform: 'uppercase',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            }}
            accentIndices={[3, 4]}
            accentStyle={{ color: '#EF4444' }}
          />
        </div>

        {/* Law 7 & 9: 3D Frosted Terminal GlassCard with Specular Sheen Pass */}
        <GlassCard
          delay={18}
          sheenDelay={42}
          glowColor="rgba(239, 68, 68, 0.28)"
          tiltAngle={7}
          style={{
            padding: '38px 56px',
            minWidth: 1080,
            backgroundColor: 'rgba(28, 16, 14, 0.88)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
            boxShadow: '0 30px 80px -15px rgba(220, 38, 38, 0.25), 0 0 1px rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left Column: Live Ticking Negative Capital Odometer */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              CUMULATIVE CAPITAL WIPEOUT (NET WORTH ERASED)
            </span>

            {/* Live Ticking -$20,000,000,000 Metric */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <DynamicCounter
                startValue={0}
                endValue={-20000000000}
                delay={20}
                prefix="-$"
                useGrouping={true}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 74,
                  fontWeight: 900,
                  color: '#EF4444',
                  lineHeight: 1,
                  textShadow: '0 0 35px rgba(239, 68, 68, 0.55)',
                  letterSpacing: '-0.02em',
                }}
              />
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
              <HighlightPill
                delay={28}
                color="rgba(239, 68, 68, 0.22)"
                borderColor="#EF4444"
                textColor="#FCA5A5"
              >
                -100% COLLATERAL EVAPORATED
              </HighlightPill>
              <HighlightPill
                delay={34}
                color="rgba(245, 158, 11, 0.15)"
                borderColor="#F59E0B"
                textColor="#FCD34D"
              >
                UNWIND RATE: $9.25M / MINUTE
              </HighlightPill>
            </div>
          </div>

          {/* Right Column: Depleting 36-Hour Circular Telemetry Gauge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
              paddingLeft: 36,
            }}
          >
            <ProgressRing
              percentage={92}
              radius={46}
              strokeWidth={6}
              delay={24}
              strokeColor="#EF4444"
              trackColor="rgba(255, 255, 255, 0.08)"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 800,
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                TOTAL TIMEFRAME
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  &lt;
                </span>
                <DynamicCounter
                  startValue={0}
                  endValue={36}
                  delay={24}
                  suffix="h"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                />
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.5)', marginTop: 4 }}>
                Thursday 8PM → Saturday 8AM
              </span>
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
            color="rgba(239, 68, 68, 0.28)"
            borderColor="#EF4444"
            textColor="#FEE2E2"
          >
            🚨 SYSTEMIC RISK ALERT: 6 WALL STREET PRIME BROKERS RECEIVE SIMULTANEOUS DEFAULT NOTICES
          </HighlightPill>
        </div>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
