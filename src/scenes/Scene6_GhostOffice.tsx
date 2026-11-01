import React from 'react';
import {
  AbsoluteFill,
  Easing,
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

export const Scene6_GhostOffice: React.FC<SceneProps> = ({
  theme = 'cream',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isCream = theme === 'cream';
  const t = THEMES[theme] || THEMES.cream;

  // Law 10: Attention Reset Event at Frame 90
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

  // Crossfade between Phase A (3 Anomaly Cards) and Phase B (Brass Door Plate Outro)
  const phaseSwitchSpring = spring({
    frame: frame - 135,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.6 },
  });

  const phaseSwitch = interpolate(phaseSwitchSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const phaseAOpacity = 1 - phaseSwitch;
  const phaseBOpacity = phaseSwitch;

  // Brass plate spring entrance
  const brassSpring = spring({
    frame: frame - 145,
    fps,
    config: { damping: 13, stiffness: 95, mass: 0.7 },
  });

  const brassScale = interpolate(brassSpring, [0, 1], [0.88, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Continuous Living Ambient Floating Micro-Particles
  const particles = [
    { x: 300, y: 220, r: 2.2, speed: 0.04, color: 'rgba(212, 175, 55, 0.4)' },
    { x: 1600, y: 260, r: 2.0, speed: 0.035, color: 'rgba(239, 68, 68, 0.35)' },
    { x: 430, y: 820, r: 1.8, speed: 0.045, color: 'rgba(56, 189, 248, 0.3)' },
    { x: 1480, y: 780, r: 2.5, speed: 0.03, color: 'rgba(212, 175, 55, 0.3)' },
    { x: 960, y: 140, r: 2.0, speed: 0.05, color: 'rgba(255, 255, 255, 0.2)' },
  ];

  return (
    <CinematicCanvas
      durationInFrames={durationInFrames}
      cameraDriftScale={1.055}
      baseColor={isCream ? '#F4EFEA' : '#100C0A'}
      gradientColors={{
        primary: isCream ? 'rgba(194, 139, 56, 0.18)' : 'rgba(212, 175, 55, 0.18)',
        secondary: 'rgba(239, 68, 68, 0.12)',
        tertiary: isCream ? 'rgba(44, 62, 80, 0.08)' : 'rgba(24, 16, 14, 0.6)',
      }}
      grainOpacity={0.05}
      enableVignette={true}
    >
      {/* Law 4 & 5: Kinetic Cartesian Grid with Midtown Archival Coordinates */}
      <KineticGrid
        entryFrame={4}
        cornerLabel="ANOMALY_ARCHIVE // 888_SEVENTH_AVE_MIDTOWN"
        bracketColor={isCream ? 'rgba(26, 22, 21, 0.35)' : 'rgba(229, 192, 123, 0.35)'}
        dotColor={isCream ? 'rgba(26, 22, 21, 0.07)' : 'rgba(255, 255, 255, 0.05)'}
      />

      {/* Law 5: Expanding Shockwave Ripples */}
      <ShockwaveCircle
        startFrame={26}
        duration={26}
        size={460}
        color={t.danger}
        strokeWidth={3}
      />
      <ShockwaveCircle
        startFrame={155}
        duration={28}
        size={540}
        color={t.gold}
        strokeWidth={4}
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
        {/* ========================================================================= */}
        {/* PHASE A: THE 3 ANOMALY CARDS (Frames 0 - 145)                             */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: phaseAOpacity,
            pointerEvents: phaseAOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          {/* Law 3 & 5: Status Highlight Pill */}
          <div style={{ marginBottom: 12 }}>
            <HighlightPill
              delay={8}
              color={isCream ? 'rgba(194, 139, 56, 0.16)' : 'rgba(212, 175, 55, 0.16)'}
              borderColor={isCream ? 'rgba(194, 139, 56, 0.45)' : 'rgba(212, 175, 55, 0.45)'}
              textColor={isCream ? '#92400E' : '#E5C07B'}
            >
              INVESTIGATIVE DOSSIER • THE ANATOMY OF A GHOST
            </HighlightPill>
          </div>

          {/* Law 6: Masked Kinetic Typography */}
          <div style={{ marginBottom: 24, maxWidth: 1200 }}>
            <MaskedReveal
              text="NO PRESS RELEASES • NO CLIENT FUNDS • NO SIGN ON THE DOOR"
              delay={12}
              staggerFrames={2}
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: t.text,
                fontFamily: "Georgia, 'Times New Roman', serif",
                lineHeight: 1.1,
                textTransform: 'uppercase',
              }}
              accentIndices={[2, 5, 8]}
              accentStyle={{ color: t.danger }}
            />
          </div>

          {/* 3D GlassCard Housing the 3 Anomaly Cards */}
          <GlassCard
            delay={18}
            sheenDelay={45}
            glowColor={isCream ? 'rgba(194, 139, 56, 0.2)' : 'rgba(212, 175, 55, 0.2)'}
            tiltAngle={5}
            style={{
              padding: '28px 48px',
              minWidth: 1060,
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
            {/* Top Evidence Metadata */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${t.border}`,
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
                }}
              >
                SEC EVIDENCE DOCKET // ZERO PUBLIC FOOTPRINT VERIFICATION
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ProgressRing
                  percentage={100}
                  radius={14}
                  strokeWidth={3}
                  delay={24}
                  strokeColor={t.danger}
                />
                <DynamicCounter
                  startValue={3}
                  endValue={0}
                  delay={22}
                  prefix="CONFIRMED: "
                  suffix=" FOOTPRINTS"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 900,
                    color: t.danger,
                  }}
                />
              </div>
            </div>

            {/* 3 Physical Index Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 22,
              }}
            >
              {/* Card 1: No Press */}
              <div
                style={{
                  padding: '20px 16px',
                  backgroundColor: isCream ? '#F9F7F4' : '#221915',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <ArchivalStamp
                  text="NO PRESS"
                  subtext="0 PUBLIC STATEMENTS"
                  delay={24}
                  rotation={-8}
                  color={t.danger}
                  borderColor={t.danger}
                  size={14}
                />
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: t.textMuted }}>
                  Never held an investor call or answered media questions.
                </span>
              </div>

              {/* Card 2: No Clients */}
              <div
                style={{
                  padding: '20px 16px',
                  backgroundColor: isCream ? '#F9F7F4' : '#221915',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <ArchivalStamp
                  text="NO CLIENTS"
                  subtext="100% PRIVATE CAPITAL"
                  delay={28}
                  rotation={6}
                  color={t.danger}
                  borderColor={t.danger}
                  size={14}
                />
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: t.textMuted }}>
                  Zero fiduciary duties to outside investors or limited partners.
                </span>
              </div>

              {/* Card 3: No Sign */}
              <div
                style={{
                  padding: '20px 16px',
                  backgroundColor: isCream ? '#F9F7F4' : '#221915',
                  borderRadius: 8,
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <ArchivalStamp
                  text="NO SIGN"
                  subtext="BLANK MIDTOWN DOOR"
                  delay={34}
                  rotation={-5}
                  color={t.danger}
                  borderColor={t.danger}
                  size={14}
                />
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: t.textMuted }}>
                  Suite 3800 at 888 7th Avenue had no company name plate.
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Law 10: Attention Reset Banner at Frame 90 */}
          <div
            style={{
              marginTop: 18,
              opacity: resetOpacity,
              transform: `translateY(${resetTranslateY}px)`,
            }}
          >
            <HighlightPill
              delay={90}
              color={isCream ? 'rgba(220, 38, 38, 0.14)' : 'rgba(244, 63, 94, 0.16)'}
              borderColor={t.danger}
              textColor={t.danger}
            >
              FORENSIC POST-MORTEM: A SHADOW EMPIRE OPERATING IN PLAIN SIGHT ON 7TH AVENUE
            </HighlightPill>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE B: BRUSHED BRASS MIDTOWN DOOR OUTRO RESOLVE (Frames 140 - 238)      */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: phaseBOpacity,
            transform: `scale(${brassScale})`,
            pointerEvents: phaseBOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          {/* Tactical Resolving Pill */}
          <div style={{ marginBottom: 16 }}>
            <HighlightPill
              delay={148}
              color="rgba(194, 139, 56, 0.22)"
              borderColor={t.gold}
              textColor={isCream ? '#92400E' : '#E5C07B'}
            >
              MIDTOWN MANHATTAN • 888 SEVENTH AVENUE • SUITE 3800
            </HighlightPill>
          </div>

          {/* Photorealistic Brushed Brass Nameplate */}
          <div
            style={{
              width: 980,
              padding: '54px 64px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 35%, #F3E5AB 50%, #B8860B 70%, #8A6407 100%)',
              borderRadius: 14,
              boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.7), inset 0 -2px 6px rgba(0,0,0,0.5)',
              border: '2px solid #5C4008',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* 4 Brass Corner Screws */}
            <div style={{ position: 'absolute', top: 16, left: 20, width: 14, height: 14, borderRadius: '50%', background: '#5C4008', boxShadow: 'inset 0 1px 2px #000' }} />
            <div style={{ position: 'absolute', top: 16, right: 20, width: 14, height: 14, borderRadius: '50%', background: '#5C4008', boxShadow: 'inset 0 1px 2px #000' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 20, width: 14, height: 14, borderRadius: '50%', background: '#5C4008', boxShadow: 'inset 0 1px 2px #000' }} />
            <div style={{ position: 'absolute', bottom: 16, right: 20, width: 14, height: 14, borderRadius: '50%', background: '#5C4008', boxShadow: 'inset 0 1px 2px #000' }} />

            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '0.22em',
                color: '#2A1A04',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              FINAL OUTRO RESOLVE // SPECIAL CASE STUDY
            </span>

            {/* Laser Engraved Typography Burning into Brass */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0' }}>
              <span
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: 58,
                  fontWeight: 900,
                  color: '#1A1002',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.4), 0 -1px 2px rgba(0, 0, 0, 0.8)',
                }}
              >
                A
              </span>
              <DynamicCounter
                startValue={0}
                endValue={20}
                delay={152}
                prefix="$"
                suffix=" BILLION GHOST"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: 58,
                  fontWeight: 900,
                  color: '#1A1002',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.4), 0 -1px 2px rgba(0, 0, 0, 0.8)',
                }}
              />
            </div>

            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 800,
                color: '#3D2504',
                letterSpacing: '0.14em',
                marginTop: 6,
              }}
            >
              BILL HWANG • ARCHEGOS CAPITAL MANAGEMENT • 1964–PRESENT
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
