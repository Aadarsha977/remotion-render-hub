import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
  Easing,
} from 'remotion';
import { AndroidWallpaper } from '../components/android/AndroidWallpaper';
import { AndroidStatusBar } from '../components/android/AndroidStatusBar';
import { AndroidAtAGlance } from '../components/android/AndroidAtAGlance';
import { AndroidClockWidget } from '../components/android/AndroidClockWidget';
import { AndroidSearchBar } from '../components/android/AndroidSearchBar';
import { AndroidAppIcon } from '../components/android/AndroidAppIcon';
import { AndroidDock } from '../components/android/AndroidDock';
import { AndroidWidgetsPage } from '../components/android/AndroidWidgetsPage';
import { AndroidNotification } from '../components/android/AndroidNotification';

export const AndroidHomeScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Perpetual Camera Drift (Law 2: Continuous micro-scale/pan)
  const driftScale = interpolate(frame, [0, durationInFrames], [1, 1.045], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, durationInFrames], [0, -12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Horizontal Page Swipe Simulation (Law 1: Spring Physics)
  const swipeToWidgetsSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 14, stiffness: 85, mass: 0.6 },
  });
  const swipeBackSpring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 14, stiffness: 85, mass: 0.6 },
  });

  const page1Offset =
    interpolate(swipeToWidgetsSpring, [0, 1], [0, -1080], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }) +
    interpolate(swipeBackSpring, [0, 1], [0, 1080], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const page2Offset = page1Offset + 1080;

  // 3. Screen Unlock Flare with Bezier Easing (Law 1)
  const unlockFlash = interpolate(frame, [0, 8, 24], [0.6, 0.15, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 4. Global Specular Sheen Pass across glass (Law 9)
  const globalSheen = interpolate(frame, [250, 290], [-100, 250], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 5. Dynamic Telemetry: Live Charging Capacity Counter (Law 8)
  const batteryDynamicLevel = Math.round(interpolate(frame, [0, 300], [88, 92], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  // Dynamic SVG ProgressRing gauge (Law 8)
  const batteryGaugeCircumference = 125.6; // 2 * PI * 20
  const batteryProgressRatio = interpolate(frame, [0, 300], [0.88, 0.92], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strokeDashoffset = batteryGaugeCircumference * (1 - batteryProgressRatio);

  // 6. Kinetic Micro-Accents: Shockwave Circle ripple on unlock impact (Law 5)
  const shockwaveFrame = frame - 10;
  const shockwaveScale = interpolate(shockwaveFrame, [0, 28], [0.4, 1.8], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shockwaveOpacity = interpolate(shockwaveFrame, [0, 6, 28], [0, 0.45, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Law 4: Multi-Layer Atmospheric Depth (mesh gradient, dot matrix, grain, vignette) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 60%, #030712 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic dot grid matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      {/* SVG Fractal Noise Film Grain */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.035,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      >
        <filter id="homeScreenGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#homeScreenGrain)" />
      </svg>

      {/* Framing technical corner bracket accents (Law 5) */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          width: 20,
          height: 20,
          borderTop: '1.5px solid rgba(255, 255, 255, 0.15)',
          borderLeft: '1.5px solid rgba(255, 255, 255, 0.15)',
          pointerEvents: 'none',
          zIndex: 80,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 20,
          height: 20,
          borderTop: '1.5px solid rgba(255, 255, 255, 0.15)',
          borderRight: '1.5px solid rgba(255, 255, 255, 0.15)',
          pointerEvents: 'none',
          zIndex: 80,
        }}
      />

      {/* Peripheral edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.55) 100%)',
          pointerEvents: 'none',
          zIndex: 75,
        }}
      />

      {/* Sonic Choreography (Law 12) */}
      {frame >= 4 && frame < 20 && (
        <Audio src={staticFile('audio/android_unlock.wav')} volume={0.65} />
      )}
      {frame >= 22 && frame < 35 && (
        <Audio src={staticFile('audio/thud.wav')} volume={0.4} />
      )}
      {frame >= 28 && frame < 40 && (
        <Audio src={staticFile('audio/pop.wav')} volume={0.35} />
      )}
      {frame >= 110 && frame < 125 && (
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      )}
      {frame >= 160 && frame < 175 && (
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />
      )}
      {frame >= 185 && frame < 210 && (
        <Audio src={staticFile('audio/android_notification.wav')} volume={0.7} />
      )}
      {frame >= 230 && frame < 245 && (
        <Audio src={staticFile('audio/android_tap.wav')} volume={0.6} />
      )}

      {/* Perpetual Camera Wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${driftScale}) translateY(${panY}px)`,
          transformOrigin: '50% 50%',
          position: 'relative',
        }}
      >
        {/* Generative Material You Dynamic Wallpaper */}
        <AndroidWallpaper frame={frame} durationInFrames={durationInFrames} />

        {/* Global Unlock Flash */}
        {unlockFlash > 0.01 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              opacity: unlockFlash,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
              zIndex: 40,
            }}
          />
        )}

        {/* Shockwave Circle ripple on unlock impact (Law 5) */}
        {shockwaveOpacity > 0.01 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 300,
              height: 300,
              marginLeft: -150,
              marginTop: -150,
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.65)',
              transform: `scale(${shockwaveScale})`,
              opacity: shockwaveOpacity,
              pointerEvents: 'none',
              zIndex: 35,
            }}
          />
        )}

        {/* Persistent Android Top Status Bar */}
        <AndroidStatusBar frame={frame} fps={fps} isMediaPlaying={true} />

        {/* Incoming Android Heads-up Notification Card */}
        <AndroidNotification
          frame={frame}
          fps={fps}
          startFrame={185}
          dismissFrame={245}
        />

        {/* PAGE 1: Main Home Screen Canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${page1Offset}px)`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Section 1: At a Glance Widget */}
          <AndroidAtAGlance frame={frame} fps={fps} />

          {/* Section 2: Material You Organic Clock Widget */}
          <AndroidClockWidget frame={frame} fps={fps} />

          {/* Section 3: Primary 4x2 App Grid */}
          <div
            style={{
              margin: '32px 32px 0 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px 16px',
              justifyItems: 'center',
            }}
          >
            <AndroidAppIcon
              type="photos"
              label="Photos"
              delay={24}
              frame={frame}
              fps={fps}
            />
            <AndroidAppIcon
              type="spotify"
              label="Spotify"
              delay={27}
              frame={frame}
              fps={fps}
            />
            <AndroidAppIcon
              type="youtube"
              label="YouTube"
              delay={30}
              frame={frame}
              fps={fps}
            />
            <AndroidAppIcon
              type="gmail"
              label="Gmail"
              delay={33}
              frame={frame}
              fps={fps}
              badgeCount={4}
            />
            <AndroidAppIcon
              type="maps"
              label="Maps"
              delay={36}
              frame={frame}
              fps={fps}
            />
            <AndroidAppIcon
              type="calendar"
              label="Calendar"
              delay={39}
              frame={frame}
              fps={fps}
            />
            <AndroidAppIcon
              type="settings"
              label="Settings"
              delay={42}
              frame={frame}
              fps={fps}
            />
            <AndroidAppIcon
              type="phone"
              label="Contacts"
              delay={45}
              frame={frame}
              fps={fps}
            />
          </div>

          {/* Section 4: Google Pill Search Bar */}
          <div style={{ marginTop: 'auto', marginBottom: 150 }}>
            <AndroidSearchBar
              frame={frame}
              fps={fps}
              isTapped={frame >= 230 && frame <= 245}
            />
          </div>
        </div>

        {/* PAGE 2: Secondary Widget Canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${page2Offset}px)`,
          }}
        >
          <AndroidWidgetsPage frame={frame} fps={fps} />
        </div>

        {/* Pinned Bottom Dock (Persists across pages) */}
        <AndroidDock frame={frame} fps={fps} />

        {/* Global Specular Light Sheen sweep (Law 9) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
            transform: `translateX(${globalSheen}%)`,
            pointerEvents: 'none',
            zIndex: 70,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
