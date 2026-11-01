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
  BalanceScale,
  CodeTerminal,
} from './motion';
import { RegulatoryDocument } from './assets/RegulatoryDocument';

export interface Scene002MasterProps {
  transparentBackground?: boolean;
}

/**
 * Scene002Master: The Ghost Family Office
 * Exact Audio Length: 36.04s (1081 Frames @ 30 FPS)
 * Matches scene_002.wav with sub-frame audio synchronization.
 * Seamless directional handoff from Scene 001.
 */
export const Scene002Master: React.FC<Scene002MasterProps> = ({
  transparentBackground = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 1081;

  // 1. Continuous Camera Depth & Handoff Momentum
  // Catches +50px momentum from Scene 1 in first 34 frames, then settles into continuous push
  const cameraPanX = interpolate(
    frame,
    [0, 34, 1000, 1081],
    [50, 0, -20, -45],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cameraScale = interpolate(
    frame,
    [0, 1081],
    [1.0, 1.048],
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
      <Audio src={staticFile('audio/scene_002.wav')} />

      <CinematicCanvas
        durationInFrames={durationInFrames}
        cameraDriftScale={1.0}
        baseColor={transparentBackground ? 'transparent' : '#0C0E14'}
        gradientColors={
          transparentBackground
            ? {}
            : {
                primary: 'rgba(255, 209, 102, 0.12)', // gold/amber tone for family office
                secondary: 'rgba(56, 189, 248, 0.08)',
                tertiary: 'rgba(239, 68, 68, 0.08)',
              }
        }
        grainOpacity={transparentBackground ? 0 : 0.04}
      >
        {/* Layer 1: Cartesian HUD Matrix */}
        <KineticGrid
          entryFrame={4}
          cornerLabel="SYS_FEED // SCENE 002: GHOST FAMILY OFFICE"
          bracketColor="rgba(255, 209, 102, 0.3)"
        />

        {/* 3D Moving Camera Stage */}
        <AbsoluteFill
          style={{
            transform: `perspective(1200px) scale(${cameraScale + pulse}) translateX(${cameraPanX}px)`,
            transformOrigin: 'center center',
          }}
        >
          {/* ========================================================
              BEAT 5: 0:00 - 0:08 (Frames 0 - 240)
              "This was not a hedge fund operating out of a multi-million-dollar penthouse on Park Avenue."
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
                  color="rgba(255, 209, 102, 0.16)"
                  borderColor="rgba(255, 209, 102, 0.5)"
                  textColor="#FFD166"
                >
                  ● RESTRICTED CLASSIFICATION
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 26, textAlign: 'center' }}>
                <MaskedReveal
                  text="NOT A HEDGE FUND"
                  delay={12}
                  staggerFrames={3}
                  style={{
                    fontSize: 58,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[0, 1]}
                  accentStyle={{ color: '#FFD166' }}
                />
              </div>

              <RegulatoryDocument
                title="MEMORANDUM // ENTITY STRUCTURE"
                categoryTag="CLASSIFICATION: PRIVATE FAMILY OFFICE"
                stampText="NOT A HEDGE FUND"
                stampColor="#FFD166"
                delay={20}
                width={720}
              />
            </AbsoluteFill>
          </Sequence>

          {/* ========================================================
              BEAT 6: 0:08 - 0:15 (Frames 240 - 450)
              "His operation was called Archegos Capital Management — a quiet family office tucked inside a nondescript midtown Manhattan high-rise."
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
                  color="rgba(56, 189, 248, 0.16)"
                  borderColor="rgba(56, 189, 248, 0.45)"
                  textColor="#38BDF8"
                >
                  SYS_FEED // CORPORATE REGISTRATION
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 26, textAlign: 'center' }}>
                <MaskedReveal
                  text="ARCHEGOS CAPITAL MANAGEMENT"
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
                  accentStyle={{ color: '#38BDF8' }}
                />
              </div>

              <CodeTerminal
                title="terminal - /sec/registry/888_7th_ave.log"
                delay={18}
                width={840}
                accentColor="#38BDF8"
                lines={[
                  { text: '$ lookup --entity "ARCHEGOS CAPITAL MANAGEMENT" --detailed', type: 'command', delay: 20 },
                  { text: 'ADDRESS: 888 7TH AVENUE, 38TH FLOOR, NEW YORK, NY', type: 'comment', delay: 28 },
                  { text: 'STRUCTURE: PRIVATE SINGLE-FAMILY INVESTMENT VEHICLE', type: 'warning', delay: 38 },
                  { text: 'STATUS: ACTIVE // ZERO EXTERNAL OBLIGATIONS', type: 'success', delay: 48 },
                ]}
              />
            </AbsoluteFill>
          </Sequence>

          {/* ========================================================
              BEAT 7: 0:15 - 0:22 (Frames 450 - 660)
              "Archegos had zero outside clients. No institutional investors, no pension funds to answer to."
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
                  color="rgba(239, 68, 68, 0.16)"
                  borderColor="rgba(239, 68, 68, 0.5)"
                  textColor="#EF4444"
                >
                  REGULATORY LOOPHOLE
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 26, textAlign: 'center' }}>
                <MaskedReveal
                  text="EXEMPT FROM SEC REGULATION"
                  delay={10}
                  staggerFrames={3}
                  style={{
                    fontSize: 54,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[0, 1]}
                  accentStyle={{ color: '#EF4444' }}
                />
              </div>

              <RegulatoryDocument
                title="DODD-FRANK RULE 202 EXEMPTION"
                categoryTag="STATUS: 100% PRIVATE CAPITAL"
                stampText="EXEMPT // RULE 202"
                stampColor="#EF4444"
                delay={18}
                width={740}
              />
            </AbsoluteFill>
          </Sequence>

          {/* ========================================================
              BEAT 8: 0:22 - 0:36.04 (Frames 660 - 1081)
              "It was simply one man, a handful of quantitative traders, and an invisible mountain of borrowed Wall Street leverage."
             ======================================================== */}
          <Sequence from={660} durationInFrames={421}>
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
                  color="rgba(239, 68, 68, 0.16)"
                  borderColor="rgba(239, 68, 68, 0.5)"
                  textColor="#EF4444"
                >
                  DISPROPORTIONATE RISK
                </HighlightPill>
              </div>

              <div style={{ maxWidth: 1100, marginBottom: 24, textAlign: 'center' }}>
                <MaskedReveal
                  text="THE INVISIBLE LEVERAGE WEB"
                  delay={8}
                  staggerFrames={3}
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                  accentIndices={[2, 3]}
                  accentStyle={{ color: '#EF4444' }}
                />
              </div>

              <BalanceScale
                leftLabel="TRUE EQUITY COLLATERAL"
                leftWeight="$10 BILLION"
                rightLabel="GROSS SYNTHETIC LEVERAGE"
                rightWeight="$100 BILLION"
                tiltSide="right"
                delay={16}
                width={740}
                accentColor="#38BDF8"
                alertColor="#EF4444"
              />
            </AbsoluteFill>
          </Sequence>
        </AbsoluteFill>
      </CinematicCanvas>
    </AbsoluteFill>
  );
};
