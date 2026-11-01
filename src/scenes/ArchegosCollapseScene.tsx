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
 * ArchegosCollapseScene
 * 
 * 4-second (120 frames @ 30 fps) broadcast-grade Remotion motion graphics scene.
 * Highlights the stat: "$20 Billion Archegos Trading Collapse"
 * 
 * Requirements Enforced:
 * 1. Zero static dead-frames (perpetual camera zoom, drifting gradients, drifting grid, floating particles).
 * 2. Subtle continuous ambient background motion (radial mesh drift, stepped noise, particle oscillation).
 * 3. The number '$20 Billion' counts up with an authentic elastic overshoot spring (0 -> -$21.4B -> -$20.0B).
 * 4. Staggered entry cascades across frames 0, 4, 8, 14, 22, 38, 52, 64, and 78.
 * 5. Kinetic accents: SVG coordinate grid drift, radial accent burst lines, highlight pill cards, 
 *    shockwave impact ripples, and specular light sheen.
 * 6. Continuous 3% camera zoom (scale 1.00 -> 1.03) across all 120 frames.
 * 7. Frame 78 attention reset for retention optimization.
 */
export const ArchegosCollapseScene: React.FC = () => {
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

  // 2. Elastic Overshoot Spring Physics for the '$20B' count-up (Delay = 22 frames)
  // Low damping (11) and mass (0.75) produce an authentic elastic surge that overshoots
  // to ~$21.4B before snapping elastically back to rest at $20B!
  const countSpring = spring({
    frame: frame - 22,
    fps,
    config: {
      damping: 11,
      stiffness: 90,
      mass: 0.75,
    },
  });

  // Calculate live ticking billion number with elastic overshoot:
  // e.g. 0.0 -> 21.4 -> 20.0
  const rawNumber = Math.max(0, Math.round(20 * countSpring * 10) / 10);
  const formattedBillion = rawNumber.toFixed(rawNumber % 1 === 0 && rawNumber >= 20 ? 0 : 1);

  // Elastic squash-and-stretch scale spring for hero number container
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

  // 3. Secondary Kinetic Accent: Radial Burst Lines on -$20B impact (Frame 22 to 50)
  const burstSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.5 },
  });

  const burstRadius = interpolate(burstSpring, [0, 1], [85, 205], {
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

  // 6. Continuous Floating Ambient Particles (Subtle living financial atmosphere)
  const particles = [
    { x: 320, y: 220, r: 2.5, speed: 0.04, color: 'rgba(239, 68, 68, 0.4)' },
    { x: 1560, y: 280, r: 2.2, speed: 0.035, color: 'rgba(245, 158, 11, 0.4)' },
    { x: 420, y: 820, r: 1.8, speed: 0.045, color: 'rgba(56, 189, 248, 0.35)' },
    { x: 1480, y: 760, r: 3.0, speed: 0.03, color: 'rgba(239, 68, 68, 0.3)' },
    { x: 960, y: 150, r: 2.0, speed: 0.05, color: 'rgba(255, 255, 255, 0.25)' },
    { x: 820, y: 920, r: 2.4, speed: 0.038, color: 'rgba(245, 158, 11, 0.3)' },
  ];

  return (
    <CinematicCanvas
      cameraDriftScale={1.03}
      baseColor="#070A11"
      gradientColors={{
        primary: 'rgba(239, 68, 68, 0.22)', // Crimson danger glow
        secondary: 'rgba(245, 158, 11, 0.16)', // Amber warning glow
        tertiary: 'rgba(56, 189, 248, 0.08)', // Deep tactical cyan
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
          cornerLabel="SEC_SDNY // ARCHEGOS_MARGIN_CALL"
          bracketColor="rgba(239, 68, 68, 0.35)"
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
              color="rgba(239, 68, 68, 0.16)"
              borderColor="rgba(239, 68, 68, 0.45)"
              textColor="#F87171"
              borderRadius={9999}
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '6px 20px',
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
              TERMINAL MARGIN CALL // UNPRECEDENTED LIQUIDATION
            </HighlightPill>
          </div>

          {/* Cascade Layer 2: Main Editorial Glassmorphic Hero Container (Frame 16) */}
          <GlassCard
            delay={16}
            sheenDelay={55}
            width={1120}
            height={560}
            glowColor="rgba(239, 68, 68, 0.25)"
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
                TARGET: ARCHEGOS CAPITAL MANAGEMENT
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#EF4444',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                }}
              >
                COLLAPSE DURATION: UNDER 36 HOURS
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
                        strokeWidth={2.5}
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
                  color="rgba(239, 68, 68, 0.75)"
                  strokeWidth={3}
                />

                {/* Precision SVG Progress Ring: 100% Margin Call Wipeout */}
                <ProgressRing
                  radius={110}
                  strokeWidth={12}
                  percentage={100}
                  delay={22}
                  strokeColor="#EF4444"
                  trackColor="rgba(255, 255, 255, 0.08)"
                  glow={true}
                />

                {/* Hero Number '-$20B' with Elastic Overshoot Count-Up & Elastic Bounce Scale */}
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
                      fontFamily: 'monospace',
                      fontSize: 40,
                      fontWeight: 800,
                      color: '#EF4444',
                      marginRight: 2,
                    }}
                  >
                    -$
                  </span>
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: 82,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      textShadow: '0 0 35px rgba(239, 68, 68, 0.55)',
                    }}
                  >
                    {formattedBillion}
                  </span>
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 44,
                      fontWeight: 900,
                      color: '#EF4444',
                      marginLeft: 4,
                    }}
                  >
                    B
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
                  maxWidth: 620,
                }}
              >
                {/* Cascade Layer 3: Masked Kinetic Headline (Frame 38) */}
                <MaskedReveal
                  text="Trading Collapse"
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

                {/* Cascade Layer 4: Highlight Pill for "in Under 36 Hours" (Frame 52) */}
                <div style={{ marginTop: 14 }}>
                  <HighlightPill
                    delay={52}
                    color="rgba(239, 68, 68, 0.22)"
                    borderColor="rgba(239, 68, 68, 0.5)"
                    textColor="#FECACA"
                    borderRadius={8}
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 32,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      padding: '4px 16px',
                    }}
                  >
                    Lost in Under 36 Hours
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
                    maxWidth: 540,
                  }}
                >
                  The largest single-person trading loss in human history. Bill Hwang's $20B personal wealth vanished in a catastrophic margin call.
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
              <div style={{ display: 'flex', gap: 12 }}>
                <HighlightPill
                  delay={56}
                  color="rgba(255, 255, 255, 0.05)"
                  borderColor="rgba(255, 255, 255, 0.12)"
                  textColor="#94A3B8"
                  style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 600 }}
                >
                  LEVERAGE: 5X - 10X SWAPS
                </HighlightPill>
                <HighlightPill
                  delay={62}
                  color="rgba(245, 158, 11, 0.15)"
                  borderColor="rgba(245, 158, 11, 0.35)"
                  textColor="#FCD34D"
                  style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 600 }}
                >
                  BURN RATE: $555M / HOUR
                </HighlightPill>
              </div>

              {/* Dynamic Retention Attention Reset Badge (Frame 78) */}
              <div
                style={{
                  opacity: resetOpacity,
                  transform: `scale(${resetScale + pulseFactor})`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(239, 68, 68, 0.18)',
                  border: '1px solid #EF4444',
                  padding: '5px 14px',
                  borderRadius: 6,
                  boxShadow: '0 0 16px rgba(239, 68, 68, 0.3)',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    boxShadow: '0 0 8px #EF4444',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#FECACA',
                    letterSpacing: '0.08em',
                  }}
                >
                  WALL STREET IMPACT: CS & NOMURA -$10B
                </span>
              </div>
            </div>
          </GlassCard>
        </AbsoluteFill>
      </AbsoluteFill>
    </CinematicCanvas>
  );
};
