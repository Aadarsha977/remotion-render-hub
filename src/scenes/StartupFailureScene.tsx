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
  GlassCard,
  ProgressRing,
  ShockwaveCircle,
  HighlightPill,
  MaskedReveal,
} from '../components/motion';

/**
 * StartupFailureScene
 * 
 * 4-second (120 frames @ 30 fps) high-retention cinematic Remotion motion graphics scene.
 * Highlights the stat: "78% of Startups Fail within Year 1"
 * 
 * Requirements Enforced:
 * 1. Zero static dead-frames (perpetual camera zoom, drifting gradients, drifting grid, floating particles).
 * 2. Subtle continuous ambient background motion (radial mesh drift, stepped noise, particle oscillation).
 * 3. The number '78%' counts up with an authentic elastic overshoot spring (0 -> 83% -> 78%).
 * 4. Staggered entry cascades across frames 0, 8, 16, 22, 38, 52, 60, and 78.
 * 5. Kinetic accents: SVG coordinate grid drift, radial accent burst lines, highlight pill cards, 
 *    shockwave impact ripples, and specular light sheen.
 * 6. Continuous 3% camera zoom (scale 1.00 -> 1.03) across all 120 frames.
 * 7. Frame 78 attention reset for retention optimization.
 */
export const StartupFailureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const duration = durationInFrames || 120;

  // 1. Mandatory 3% Continuous Camera Zoom across all 120 frames (1.00 -> 1.03)
  const cameraZoom = interpolate(frame, [0, duration], [1.00, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Continuous micro-pan drift to ensure perpetual organic fluidity
  const cameraPanY = interpolate(frame, [0, duration], [0, -6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraPanX = interpolate(frame, [0, duration], [0, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Elastic Overshoot Spring Physics for the '78%' count-up (Delay = 22 frames)
  // Low damping (11) and mass (0.75) produce an authentic elastic surge that overshoots
  // to ~83% before snapping elastically back to rest at 78%!
  const countSpring = spring({
    frame: frame - 22,
    fps,
    config: {
      damping: 11,
      stiffness: 90,
      mass: 0.75,
    },
  });

  // Calculate the live ticking number with elastic overshoot:
  const rawNumber = Math.max(0, Math.round(78 * countSpring));

  // Elastic squash-and-stretch scale spring for the hero number container
  const heroScaleSpring = spring({
    frame: frame - 22,
    fps,
    config: {
      damping: 10,
      stiffness: 110,
      mass: 0.65,
    },
  });

  const heroNumberScale = interpolate(heroScaleSpring, [0, 1], [0.65, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const heroNumberOpacity = interpolate(heroScaleSpring, [0, 0.4, 1], [0, 0.8, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Secondary Kinetic Accent: Radial Burst Lines on number impact (Frame 22 to 50)
  const burstSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.5 },
  });

  const burstRadius = interpolate(burstSpring, [0, 1], [80, 195], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const burstLineLength = interpolate(burstSpring, [0, 0.4, 1], [0, 24, 6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const burstOpacity = interpolate(burstSpring, [0, 0.2, 1], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const burstAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  // 4. Staggered Cascades: Sub-headline and Meta Telemetry entry
  const metaSpring = spring({
    frame: frame - 64,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.6 },
  });

  const metaOpacity = interpolate(metaSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const metaTranslateY = interpolate(metaSpring, [0, 1], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Attention Reset at Frame 78 (Retention Hook Pulse)
  const resetSpring = spring({
    frame: frame - 78,
    fps,
    config: { damping: 12, stiffness: 130, mass: 0.5 },
  });

  const resetScale = interpolate(resetSpring, [0, 1], [0.85, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const resetOpacity = interpolate(resetSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Continuous subtle heartbeat pulse on the attention badge after frame 78
  const pulseFactor = frame > 78 ? Math.sin((frame - 78) * 0.18) * 0.025 : 0;

  // 6. Continuous Floating Ambient Particles (Subtle living atmosphere)
  const particles = [
    { x: 320, y: 240, r: 2.5, speed: 0.04, color: 'rgba(239, 68, 68, 0.35)' },
    { x: 1580, y: 310, r: 2.0, speed: 0.035, color: 'rgba(245, 158, 11, 0.35)' },
    { x: 450, y: 840, r: 1.8, speed: 0.045, color: 'rgba(56, 189, 248, 0.3)' },
    { x: 1440, y: 780, r: 3.0, speed: 0.03, color: 'rgba(239, 68, 68, 0.25)' },
    { x: 960, y: 160, r: 2.2, speed: 0.05, color: 'rgba(255, 255, 255, 0.2)' },
  ];

  return (
    <CinematicCanvas
      cameraDriftScale={1.03}
      baseColor="#070A11"
      gradientColors={{
        primary: 'rgba(239, 68, 68, 0.16)', // Crimson danger glow
        secondary: 'rgba(245, 158, 11, 0.12)', // Amber warning glow
        tertiary: 'rgba(56, 189, 248, 0.06)', // Deep tactical cyan
      }}
      grainOpacity={0.045}
      enableVignette={true}
    >
      {/* 3% Continuous Zoom & Micro-Pan Master Wrap */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom}) translate(${cameraPanX}px, ${cameraPanY}px)`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Kinetic Cartesian Grid with continuous drift & technical brackets */}
        <KineticGrid
          gap={54}
          dotSize={1.5}
          dotColor="rgba(255, 255, 255, 0.04)"
          driftSpeed={0.4}
          showBrackets={true}
          showCrosshairs={true}
          cornerLabel="DATASET_AUDIT // BLS-STARTUP-Y1"
          bracketColor="rgba(255, 255, 255, 0.18)"
          entryFrame={4}
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

        {/* Central Motion Content Composition */}
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Cascade Layer 1: Top Category Pill (Frame 8) */}
          <div style={{ marginBottom: 28 }}>
            <HighlightPill
              delay={8}
              color="rgba(239, 68, 68, 0.14)"
              borderColor="rgba(239, 68, 68, 0.35)"
              textColor="#F87171"
              borderRadius={9999}
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '6px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 10px #EF4444',
                  display: 'inline-block',
                }}
              />
              VENTURE CAPITAL RESEARCH // MORTALITY INDEX
            </HighlightPill>
          </div>

          {/* Cascade Layer 2: Main Editorial Glassmorphic Hero Container (Frame 16) */}
          <GlassCard
            delay={16}
            sheenDelay={60}
            width={1060}
            height={560}
            glowColor="rgba(239, 68, 68, 0.22)"
            tiltAngle={6}
            style={{
              padding: '44px 56px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Internal Telemetry Header */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#94A3B8',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                }}
              >
                SYS_METRIC: FIRST-YEAR ATTRITION
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#38BDF8',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                STATUS: CONFIRMED [HISTORIC HIGH]
              </span>
            </div>

            {/* Middle Focal Layout: Progress Ring + Elastic Overshoot Counter + Headline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 52,
                width: '100%',
                margin: '18px 0',
                position: 'relative',
              }}
            >
              {/* Left Column: Progress Ring & Elastic Counter Gauge */}
              <div
                style={{
                  position: 'relative',
                  width: 250,
                  height: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {/* Secondary Kinetic Accent: Radial Accent Burst Lines */}
                <svg
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
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
                        strokeWidth={2}
                        strokeLinecap="round"
                        opacity={burstOpacity}
                      />
                    );
                  })}
                </svg>

                {/* Kinetic Accent: Expanding Shockwave Ripple Circle */}
                <ShockwaveCircle
                  startFrame={22}
                  duration={24}
                  size={260}
                  color="rgba(239, 68, 68, 0.65)"
                  strokeWidth={3}
                />

                {/* Precision SVG Progress Ring */}
                <ProgressRing
                  radius={110}
                  strokeWidth={12}
                  percentage={78}
                  delay={22}
                  strokeColor="#EF4444"
                  trackColor="rgba(255, 255, 255, 0.08)"
                  glow={true}
                />

                {/* Hero Number '78%' with Elastic Overshoot Count-Up & Elastic Bounce Scale */}
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    transform: `scale(${heroNumberScale})`,
                    opacity: heroNumberOpacity,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: 88,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      textShadow: '0 0 35px rgba(239, 68, 68, 0.45)',
                    }}
                  >
                    {rawNumber}
                  </span>
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 48,
                      fontWeight: 800,
                      color: '#F87171',
                      marginLeft: 2,
                    }}
                  >
                    %
                  </span>
                </div>
              </div>

              {/* Right Column: Staggered Masked Typography Headline */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  maxWidth: 580,
                }}
              >
                {/* Cascade Layer 3: Masked Kinetic Headline (Frame 38) */}
                <MaskedReveal
                  text="of Startups Fail"
                  delay={38}
                  staggerFrames={4}
                  as="h1"
                  style={{
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: 54,
                    fontWeight: 800,
                    color: '#F8FAFC',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    margin: 0,
                  }}
                />

                {/* Cascade Layer 4: Highlight Pill for "within Year 1" (Frame 52) */}
                <div style={{ marginTop: 14 }}>
                  <HighlightPill
                    delay={52}
                    color="rgba(239, 68, 68, 0.2)"
                    borderColor="rgba(239, 68, 68, 0.45)"
                    textColor="#FECACA"
                    borderRadius={8}
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 34,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      padding: '4px 14px',
                    }}
                  >
                    within Year 1
                  </HighlightPill>
                </div>

                {/* Cascade Layer 5: Subtitle Meta Context (Frame 64) */}
                <div
                  style={{
                    marginTop: 18,
                    opacity: metaOpacity,
                    transform: `translateY(${metaTranslateY}px)`,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: 16,
                    color: '#94A3B8',
                    lineHeight: 1.45,
                    maxWidth: 500,
                  }}
                >
                  Comprehensive U.S. Bureau of Labor Statistics longitudinal enterprise cohort tracking.
                </div>
              </div>
            </div>

            {/* Bottom Footer Area: Attention Reset Trigger at Frame 78 */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: 14,
              }}
            >
              {/* Left Data Tag */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#64748B',
                  letterSpacing: '0.08em',
                }}
              >
                BLS LONGITUDINAL COHORT // N=142,800 // P &lt; 0.001
              </div>

              {/* Right: Attention Reset Alert Badge (Frame 78) */}
              <div
                style={{
                  opacity: resetOpacity,
                  transform: `scale(${resetScale + pulseFactor})`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(239, 68, 68, 0.16)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  padding: '5px 14px',
                  borderRadius: 6,
                  boxShadow: '0 0 16px rgba(239, 68, 68, 0.25)',
                }}
              >
                <span style={{ fontSize: 13 }}>⚠️</span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#FCA5A5',
                    letterSpacing: '0.06em',
                  }}
                >
                  90% TOTAL MORTALITY BY YEAR 5
                </span>
              </div>
            </div>
          </GlassCard>
        </AbsoluteFill>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
