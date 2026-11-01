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
  RedactionMarker,
} from '../components/motion';
import { SceneProps, THEMES } from '../theme/theme';

export const Scene4_TerrifyingPart: React.FC<SceneProps> = ({
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

  return (
    <CinematicCanvas
      durationInFrames={durationInFrames}
      cameraDriftScale={1.045}
      baseColor={isCream ? '#150E0C' : '#0B0706'}
      gradientColors={{
        primary: 'rgba(239, 68, 68, 0.22)',
        secondary: 'rgba(217, 119, 6, 0.14)',
        tertiary: 'rgba(26, 16, 14, 0.6)',
      }}
      grainOpacity={0.055}
      enableVignette={true}
    >
      {/* Law 4 & 5: Kinetic Cartesian Grid with Regulatory Dossier Styling */}
      <KineticGrid
        entryFrame={3}
        cornerLabel="SEC_SDNY // CONFIDENTIAL_DOSSIER_998"
        bracketColor="rgba(239, 68, 68, 0.4)"
        dotColor="rgba(239, 68, 68, 0.08)"
      />

      {/* Law 5: Expanding Shockwave Ripple when the RESTRICTED Stamp Slams */}
      <ShockwaveCircle
        startFrame={34}
        duration={26}
        size={460}
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
            delay={6}
            color="rgba(239, 68, 68, 0.18)"
            borderColor="rgba(239, 68, 68, 0.45)"
            textColor="#F87171"
          >
            CONFIDENTIAL INVESTIGATION • FILE DOCKET: SEC-SDNY-2021-998
          </HighlightPill>
        </div>

        {/* Law 6: Masked Kinetic Typography */}
        <div style={{ marginBottom: 24, maxWidth: 1150 }}>
          <MaskedReveal
            text="BUT HERE IS THE TERRIFYING PART"
            delay={10}
            staggerFrames={2}
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.1,
              textTransform: 'uppercase',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            }}
            accentIndices={[4, 5]}
            accentStyle={{ color: '#EF4444' }}
          />
        </div>

        {/* Law 7 & 9: 3D Frosted Manila Dossier GlassCard with Specular Sheen */}
        <GlassCard
          delay={16}
          sheenDelay={40}
          glowColor="rgba(239, 68, 68, 0.28)"
          tiltAngle={6}
          style={{
            padding: '34px 52px',
            minWidth: 1060,
            backgroundColor: 'rgba(32, 20, 17, 0.92)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
            boxShadow: '0 30px 80px -15px rgba(220, 38, 38, 0.25), 0 0 1px rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Top Dossier Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              paddingBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 12px #EF4444',
                }}
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#FCA5A5',
                  letterSpacing: '0.12em',
                }}
              >
                DOCUMENT CLASSIFICATION: SPECIAL MARGIN INVESTIGATION
              </span>
            </div>
            <HighlightPill
              delay={22}
              color="rgba(239, 68, 68, 0.25)"
              borderColor="#EF4444"
              textColor="#FFFFFF"
            >
              FORM 13F EXEMPTION
            </HighlightPill>
          </div>

          {/* Dossier Content: Redaction Stroke + Dynamic Telemetry */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 32,
              alignItems: 'center',
            }}
          >
            {/* Left: Redacted Document Excerpt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: 'rgba(20, 12, 10, 0.7)',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                  SEC BENEFICIAL OWNERSHIP LOG // CLAUSE 13(D)
                </span>

                {/* Animated Redaction Stroke Over Text */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <p
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: 18,
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    BENEFICIAL OWNER: ARCHEGOS CAPITAL MANAGEMENT LP
                  </p>
                  <RedactionMarker delay={22} width={520} height={26} color="#050302" />
                </div>

                <span style={{ fontSize: 13, color: '#F87171', fontFamily: 'monospace' }}>
                  → [SYNTHETIC TOTAL RETURN SWAP: TITLE TRANSFERRED TO BROKER]
                </span>
              </div>
            </div>

            {/* Right: Dynamic Telemetry & Rubber Stamp */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                paddingLeft: 28,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                  PUBLIC VISIBILITY
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <DynamicCounter
                    startValue={100}
                    endValue={0}
                    delay={20}
                    prefix="$"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 42,
                      fontWeight: 900,
                      color: '#EF4444',
                      lineHeight: 1,
                    }}
                  />
                  <span style={{ fontFamily: 'monospace', fontSize: 16, color: '#EF4444', fontWeight: 800 }}>
                    DISCLOSED
                  </span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <ProgressRing
                    percentage={100}
                    radius={22}
                    strokeWidth={4}
                    delay={26}
                    strokeColor="#EF4444"
                  />
                </div>
              </div>

              {/* Red Archival Stamp */}
              <ArchivalStamp
                text="RESTRICTED"
                subtext="UNKNOWN ENTITY"
                delay={34}
                rotation={-11}
                color="#EF4444"
                borderColor="#EF4444"
                size={18}
              />
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
            color="rgba(239, 68, 68, 0.25)"
            borderColor="#EF4444"
            textColor="#FEE2E2"
          >
            SHADOW LEVERAGE LOOPHOLE: 10X GROSS LEVERAGE OBSCURED ACROSS 6 UNCOORDINATED PRIME BROKERS
          </HighlightPill>
        </div>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
