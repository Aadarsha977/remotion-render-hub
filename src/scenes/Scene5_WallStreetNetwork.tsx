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

export const Scene5_WallStreetNetwork: React.FC<SceneProps> = ({
  theme = 'cream',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isCream = theme === 'cream';
  const t = THEMES[theme] || THEMES.cream;

  // Law 10: Attention Reset Event at Frame 75
  const resetSpring = spring({
    frame: frame - 75,
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

  // Animated pulse for converging swap vector lines
  const pulse = interpolate(frame % 30, [0, 15, 30], [0.4, 0.9, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <CinematicCanvas
      durationInFrames={durationInFrames}
      cameraDriftScale={1.045}
      baseColor={isCream ? '#12100E' : '#07090E'}
      gradientColors={{
        primary: 'rgba(56, 189, 248, 0.18)',   // Tactical Cyan
        secondary: 'rgba(239, 68, 68, 0.14)',  // Warning Red
        tertiary: 'rgba(99, 102, 241, 0.1)',   // Indigo
      }}
      grainOpacity={0.05}
      enableVignette={true}
    >
      {/* Law 4 & 5: Kinetic Cartesian Grid with Tactical Radar Styling */}
      <KineticGrid
        entryFrame={3}
        cornerLabel="TACTICAL_RADAR // PRIME_BROKER_EXPOSURE_MAP"
        bracketColor="rgba(56, 189, 248, 0.4)"
        dotColor="rgba(56, 189, 248, 0.08)"
      />

      {/* Law 5: Expanding Shockwave Ripple when the Unregistered Hub Locks */}
      <ShockwaveCircle
        startFrame={22}
        duration={26}
        size={460}
        color="#38BDF8"
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
            delay={6}
            color="rgba(56, 189, 248, 0.16)"
            borderColor="rgba(56, 189, 248, 0.45)"
            textColor="#38BDF8"
          >
            TACTICAL RADAR MAP • CONVERGING TOTAL RETURN SWAPS
          </HighlightPill>
        </div>

        {/* Law 6: Masked Kinetic Typography */}
        <div style={{ marginBottom: 22, maxWidth: 1150 }}>
          <MaskedReveal
            text="WALL STREET DIDN'T EVEN KNOW HIS FIRM EXISTED"
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
            accentIndices={[0, 1, 8]}
            accentStyle={{ color: '#38BDF8' }}
          />
        </div>

        {/* Law 7 & 9: 3D Frosted GlassCard Housing the Radar Node Network */}
        <GlassCard
          delay={16}
          sheenDelay={42}
          glowColor="rgba(56, 189, 248, 0.25)"
          tiltAngle={6}
          style={{
            padding: '30px 48px',
            minWidth: 1080,
            backgroundColor: 'rgba(16, 20, 28, 0.92)',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 30px 80px -15px rgba(56, 189, 248, 0.2), 0 0 1px rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Top Network Metadata Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#38BDF8',
                  boxShadow: '0 0 10px #38BDF8',
                }}
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 800,
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '0.12em',
                }}
              >
                MULTI-AGENT PRISONER'S DILEMMA // ISOLATED DERIVATIVE NODES
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ProgressRing
                percentage={100}
                radius={14}
                strokeWidth={3}
                delay={24}
                strokeColor="#38BDF8"
              />
              <DynamicCounter
                startValue={0}
                endValue={6}
                delay={20}
                prefix="BANKS: "
                suffix=" PRIME BROKERS"
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 900,
                  color: '#38BDF8',
                }}
              />
            </div>
          </div>

          {/* Prime Broker Radar Diagram Container */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr 1fr',
              gap: 24,
              alignItems: 'center',
              position: 'relative',
              padding: '10px 0',
            }}
          >
            {/* Left Bank Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  padding: '12px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 8,
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: '#FFFFFF', display: 'block' }}>
                  GOLDMAN SACHS
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#38BDF8' }}>
                  $3.5B Block Sale Defection
                </span>
              </div>

              <div
                style={{
                  padding: '12px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 8,
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: '#FFFFFF', display: 'block' }}>
                  MORGAN STANLEY
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#38BDF8' }}>
                  $5.0B Pre-Market Liquidation
                </span>
              </div>
            </div>

            {/* Center Unregistered Ghost Hub */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 16px',
                backgroundColor: 'rgba(220, 38, 38, 0.12)',
                borderRadius: 12,
                border: '2px dashed #EF4444',
                textAlign: 'center',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.25)',
              }}
            >
              <HighlightPill
                delay={22}
                color="rgba(239, 68, 68, 0.28)"
                borderColor="#EF4444"
                textColor="#EF4444"
              >
                404: NO SEC REGISTRATION
              </HighlightPill>
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  marginTop: 10,
                  display: 'block',
                }}
              >
                ARCHEGOS CAPITAL
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#FCA5A5', marginTop: 4 }}>
                Private Family Office Exemption
              </span>
              <div style={{ marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>
                  Synthetic Exposure:
                </span>
                <DynamicCounter
                  startValue={0}
                  endValue={100}
                  prefix="$"
                  suffix="B+"
                  delay={26}
                  style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 900, color: '#EF4444' }}
                />
              </div>
            </div>

            {/* Right Bank Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  padding: '12px 18px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderRadius: 8,
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: '#FFFFFF', display: 'block' }}>
                  CREDIT SUISSE
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#F87171' }}>
                  -$5.5B Fatal Death Blow
                </span>
              </div>

              <div
                style={{
                  padding: '12px 18px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderRadius: 8,
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: '#FFFFFF', display: 'block' }}>
                  NOMURA HOLDINGS
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#F87171' }}>
                  -$2.9B Margin Loss
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Law 10: Attention Reset Banner at Frame 75 */}
        <div
          style={{
            marginTop: 18,
            opacity: resetOpacity,
            transform: `translateY(${resetTranslateY}px)`,
          }}
        >
          <HighlightPill
            delay={75}
            color="rgba(56, 189, 248, 0.22)"
            borderColor="#38BDF8"
            textColor="#E0F2FE"
          >
            CONCEALED MULTIPLIER: EACH BANK BELIEVED THEY WERE ARCHEGOS'S SOLE MARGIN LENDER
          </HighlightPill>
        </div>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
