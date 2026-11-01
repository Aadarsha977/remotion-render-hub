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

  // Radial burst lines on -$20B impact at frame 20
  const burstSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.5 },
  });

  const burstRadius = interpolate(burstSpring, [0, 1], [60, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const burstLineLength = interpolate(burstSpring, [0, 0.4, 1], [0, 26, 6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const burstOpacity = interpolate(burstSpring, [0, 0.2, 1], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const burstAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  // Continuous Living Ambient Floating Micro-Particles
  const particles = [
    { x: 350, y: 220, r: 2.5, speed: 0.04, color: 'rgba(239, 68, 68, 0.4)' },
    { x: 1550, y: 260, r: 2.2, speed: 0.035, color: 'rgba(245, 158, 11, 0.35)' },
    { x: 420, y: 840, r: 1.8, speed: 0.045, color: 'rgba(56, 189, 248, 0.3)' },
    { x: 1480, y: 780, r: 2.8, speed: 0.03, color: 'rgba(239, 68, 68, 0.3)' },
    { x: 960, y: 150, r: 2.0, speed: 0.05, color: 'rgba(255, 255, 255, 0.2)' },
  ];

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

      {/* Continuous Living Ambient Floating Micro-Particles */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          {particles.map((p, idx) => {
            const dy = Math.sin(frame * p.speed + idx) * 18;
            const dx = Math.cos(frame * p.speed * 0.8 + idx) * 12;
            return (
              <circle
                key={idx}
                cx={p.x + dx}
                cy={p.y + dy}
                r={p.r}
                fill={p.color}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

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

            {/* Live Ticking -$20,000,000,000 Metric with Radial Accent Burst Lines */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '35%',
                  transform: 'translate(-50%, -50%)',
                  width: 440,
                  height: 440,
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}
              >
                {burstAngles.map((ang) => {
                  const rad = (ang * Math.PI) / 180;
                  const x1 = 220 + Math.cos(rad) * burstRadius;
                  const y1 = 220 + Math.sin(rad) * burstRadius;
                  const x2 = 220 + Math.cos(rad) * (burstRadius + burstLineLength);
                  const y2 = 220 + Math.sin(rad) * (burstRadius + burstLineLength);
                  return (
                    <line
                      key={ang}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#EF4444"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      opacity={burstOpacity}
                    />
                  );
                })}
              </svg>
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
