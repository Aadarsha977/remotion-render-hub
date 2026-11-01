import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  CinematicCanvas,
  KineticGrid,
  MaskedReveal,
  HighlightPill,
  StatOdometerCard,
  TimelineHorizon,
  GlassCard,
  MacOsWindow,
} from './motion';

export interface Scene001MasterProps {
  transparentBackground?: boolean;
}

/**
 * Scene001Master: The Twenty-Billion-Dollar Margin Call
 * Exact Audio Length: 29.12s (874 Frames @ 30 FPS)
 * Matches scene_001.wav with sub-frame audio synchronization.
 * Applies Spring Dynamics, Continuous Camera Depth, and Cascading Delays.
 */
export const Scene001Master: React.FC<Scene001MasterProps> = ({
  transparentBackground = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 874;

  // 1. Continuous Camera Depth & Tempo Oscillation
  const cameraScale = interpolate(
    frame,
    [0, 840, 874],
    [1.0, 1.045, 1.08],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Directional momentum handoff to Scene 2 in final 34 frames
  const cameraPanX = interpolate(
    frame,
    [0, 840, 874],
    [0, -10, -50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Tempo oscillation: subtle rhythmic pulse (110 BPM breathing)
  const pulse = Math.sin((frame * Math.PI * 2) / 32) * 0.006;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparentBackground ? 'transparent' : '#0C0E14',
      }}
    >
      {/* Audio Track */}
      <Audio src={staticFile('audio/scene_001.wav')} />

      <CinematicCanvas
        durationInFrames={durationInFrames}
        cameraDriftScale={1.0}
        baseColor={transparentBackground ? 'transparent' : '#0C0E14'}
        gradientColors={
          transparentBackground
            ? {}
            : {
                primary: 'rgba(255, 59, 48, 0.16)',
                secondary: 'rgba(56, 189, 248, 0.08)',
                tertiary: 'rgba(99, 102, 241, 0.06)',
              }
        }
        grainOpacity={transparentBackground ? 0 : 0.04}
      >
        {/* Layer 1: Cartesian HUD Matrix */}
        <KineticGrid
          entryFrame={4}
          cornerLabel="SYS_FEED // SCENE 001: COLD OPEN"
          bracketColor="rgba(255, 255, 255, 0.22)"
        />

        {/* 3D Moving Camera Stage */}
        <AbsoluteFill
          style={{
            transform: `perspective(1200px) scale(${cameraScale + pulse}) translateX(${cameraPanX}px)`,
            transformOrigin: 'center center',
          }}
        >
          {/* ========================================================
              BEAT 1: 0:00 - 0:08 (Frames 0 - 240)
              "one man lost twenty billion dollars in under thirty-six hours"
             ======================================================== */}
          <Sequence from={0} durationInFrames={240}>
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 64px',
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <HighlightPill
                  delay={8}
                  color="rgba(255, 59, 48, 0.16)"
                  borderColor="rgba(255, 59, 48, 0.5)"
                  textColor="#FF3B30"
                >
                  ▼ LIQUIDATING
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 26, textAlign: 'center' }}>
                <MaskedReveal
                  text="ONE MAN LOST $20 BILLION"
                  delay={12}
                  staggerFrames={3}
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[3, 4]}
                  accentStyle={{ color: '#FF3B30' }}
                />
              </div>

              <StatOdometerCard
                label="TOTAL CAPITAL LIQUIDATION"
                startValue={0}
                endValue={20}
                prefix="$"
                suffix="B"
                trendText="▼ -$20,000,000,000 IN 36 HOURS"
                trendType="bearish"
                accentColor="#FF3B30"
                delay={22}
                width={700}
              />
            </AbsoluteFill>
          </Sequence>

          {/* ========================================================
              BEAT 2: 0:08 - 0:15 (Frames 240 - 450)
              "It was the largest single-person trading loss in human history"
             ======================================================== */}
          <Sequence from={240} durationInFrames={210}>
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 64px',
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <HighlightPill
                  delay={6}
                  color="rgba(0, 230, 118, 0.14)"
                  borderColor="rgba(0, 230, 118, 0.45)"
                  textColor="#00E676"
                >
                  CHRONOLOGICAL HORIZON
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 26, textAlign: 'center' }}>
                <MaskedReveal
                  text="LARGEST TRADING LOSS IN HISTORY"
                  delay={10}
                  staggerFrames={3}
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.18,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[0, 1]}
                  accentStyle={{ color: '#00E676' }}
                />
              </div>

              <TimelineHorizon
                delay={18}
                width={860}
                accentColor="#00E676"
              />
            </AbsoluteFill>
          </Sequence>

          {/* ========================================================
              BEAT 3: 0:15 - 0:22 (Frames 450 - 660)
              [15s Pattern Interrupt] "Wall Street didn't even know his firm existed"
             ======================================================== */}
          <Sequence from={450} durationInFrames={210}>
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 64px',
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <HighlightPill
                  delay={6}
                  color="rgba(56, 189, 248, 0.16)"
                  borderColor="rgba(56, 189, 248, 0.5)"
                  textColor="#38BDF8"
                >
                  PREMISE // PATTERN INTERRUPT
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 26, textAlign: 'center' }}>
                <MaskedReveal
                  text="WHO IS BILL HWANG?"
                  delay={10}
                  staggerFrames={4}
                  style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[2, 3]}
                  accentStyle={{ color: '#38BDF8' }}
                />
              </div>

              <GlassCard
                delay={18}
                sheenDelay={40}
                glowColor="rgba(56, 189, 248, 0.25)"
                tiltAngle={5}
                style={{ padding: '32px 48px', maxWidth: 840, textAlign: 'center' }}
              >
                <p style={{ margin: 0, fontSize: 28, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.45 }}>
                  "Wall Street didn’t even know his firm existed. He held no press conferences. He managed no client funds."
                </p>
                <div style={{ marginTop: 16, fontFamily: 'monospace', fontSize: 12, color: '#38BDF8', letterSpacing: '0.1em' }}>
                  THE GHOST TRADER OF MIDTOWN MANHATTAN
                </div>
              </GlassCard>
            </AbsoluteFill>
          </Sequence>

          {/* ========================================================
              BEAT 4: 0:22 - 0:29.12 (Frames 660 - 874)
              "He held no press conferences. He managed no client funds."
             ======================================================== */}
          <Sequence from={660} durationInFrames={214}>
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 64px',
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <HighlightPill
                  delay={6}
                  color="rgba(56, 189, 248, 0.16)"
                  borderColor="rgba(56, 189, 248, 0.45)"
                  textColor="#38BDF8"
                >
                  SYSTEM PORTAL // SURVEILLANCE
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 24, textAlign: 'center' }}>
                <MaskedReveal
                  text="NO PRESS CONFERENCES // NO CLIENT FUNDS"
                  delay={8}
                  staggerFrames={2}
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.18,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[0, 1]}
                  accentStyle={{ color: '#38BDF8' }}
                />
              </div>

              <MacOsWindow
                delay={16}
                sheenDelay={40}
                accentColor="#38BDF8"
                glowColor="rgba(56, 189, 248, 0.25)"
                url="https://system.internal/telemetry/bill_hwang"
                width={880}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
                    SUBJECT: SUNG KOOK (BILL) HWANG // 888 7TH AVENUE
                  </div>
                  <StatOdometerCard
                    label="REPORTABLE CLIENT ASSETS"
                    startValue={0}
                    endValue={0}
                    prefix="$"
                    suffix=""
                    trendText="● ZERO PUBLIC DISCLOSURES"
                    trendType="alert"
                    accentColor="#38BDF8"
                    delay={22}
                    width="100%"
                  />
                </div>
              </MacOsWindow>
            </AbsoluteFill>
          </Sequence>
        </AbsoluteFill>
      </CinematicCanvas>
    </AbsoluteFill>
  );
};
