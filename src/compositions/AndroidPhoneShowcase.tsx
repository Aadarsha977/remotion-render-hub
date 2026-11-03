import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { AndroidPhoneFrame } from '../components/android/AndroidPhoneFrame';
import { AndroidHomeScreen } from './AndroidHomeScreen';
import { Sparkles, Cpu, Palette, Zap } from 'lucide-react';

export const AndroidPhoneShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Perpetual Camera Drift (Law 2: Perpetual Camera Drift)
  const cameraScale = interpolate(frame, [0, durationInFrames], [1, 1.045], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraPanY = interpolate(frame, [0, durationInFrames], [0, -10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Staggered arrival for left hero info (frame 12)
  const leftSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 95, mass: 0.6 },
  });
  const leftX = interpolate(leftSpring, [0, 1], [-80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const leftOpacity = interpolate(leftSpring, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Staggered arrival for right telemetry info (frame 22)
  const rightSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12, stiffness: 95, mass: 0.6 },
  });
  const rightX = interpolate(rightSpring, [0, 1], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightOpacity = interpolate(rightSpring, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic Telemetry: Live refresh rate counter (Law 8)
  const refreshRate = Math.round(interpolate(frame, [25, 80], [60, 120], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  // Dynamic SVG ProgressRing gauge (Law 8)
  const gaugeCircumference = 188.5; // 2 * PI * 30
  const gaugeProgress = interpolate(frame, [25, 80], [0.5, 1.0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strokeDashoffset = gaugeCircumference * (1 - gaugeProgress);

  // Kinetic Micro-Accents: Shockwave Circle ripple on device slam (Law 5)
  const shockwaveFrame = frame - 18;
  const shockwaveScale = interpolate(shockwaveFrame, [0, 30], [0.6, 2.0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shockwaveOpacity = interpolate(shockwaveFrame, [0, 6, 30], [0, 0.5, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Specular sheen sweep across studio cards
  const sheenProgress = interpolate(frame, [40, 85], [-120, 220], { easing: Easing.bezier(0.2, 0.8, 0.4, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070b14',
        overflow: 'hidden',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
      }}
    >
      {/* Studio Background: Ambient Depth & Mesh Gradients (Law 4) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 45%, rgba(61, 90, 128, 0.35) 0%, rgba(20, 30, 50, 0.2) 40%, transparent 75%),
            radial-gradient(circle at 20% 80%, rgba(46, 125, 50, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 85% 25%, rgba(224, 122, 95, 0.25) 0%, transparent 55%),
            linear-gradient(180deg, #090e18 0%, #03060b 100%)
          `,
        }}
      />

      {/* Kinetic Dot Matrix Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Framing Technical Corner Brackets and Crosshairs (Law 5) */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 36,
          width: 32,
          height: 32,
          borderTop: '2px solid rgba(255, 255, 255, 0.2)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 32,
          right: 36,
          width: 32,
          height: 32,
          borderTop: '2px solid rgba(255, 255, 255, 0.2)',
          borderRight: '2px solid rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 36,
          width: 32,
          height: 32,
          borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 36,
          width: 32,
          height: 32,
          borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
          borderRight: '2px solid rgba(255, 255, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Center crosshair */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.25)',
          fontSize: 12,
          letterSpacing: '0.2em',
        }}
      >
        + FLAGSHIP ANDROID SYSTEM +
      </div>

      {/* SVG Fractal Noise Film Grain Overlay */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      >
        <filter id="studioNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#studioNoise)" />
      </svg>

      {/* Cinematic Vignette Edge Darkening */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(2, 4, 8, 0.8) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Perpetual Camera Wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translateY(${cameraPanY}px)`,
          transformOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Left Side: Brand Narrative & Feature Highlight Pills */}
        <div
          style={{
            position: 'absolute',
            left: 90,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            transform: `translateX(${leftX}px)`,
            opacity: leftOpacity,
            maxWidth: 380,
            zIndex: 10,
          }}
        >
          {/* Highlight Pill (Law 5) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(59, 130, 246, 0.18)',
              padding: '6px 16px',
              borderRadius: 20,
              border: '1px solid rgba(59, 130, 246, 0.35)',
              width: 'fit-content',
            }}
          >
            <Sparkles size={16} color="#60a5fa" />
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#93c5fd',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Android 15 Experience
            </span>
          </div>

          {/* Headline Typography */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textShadow: '0 4px 18px rgba(0,0,0,0.5)',
            }}
          >
            Material You.
            <br />
            <span
              style={{
                background:
                  'linear-gradient(90deg, #60a5fa 0%, #34d399 50%, #facc15 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Expressive & Alive.
            </span>
          </div>

          <p
            style={{
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Intelligent dynamic theming, live telemetry widgets, and fluid
            physics animations rendered natively in Remotion.
          </p>

          {/* Feature Glass Cards with Specular Sheen Pass */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                padding: '12px 16px',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  transform: `translateX(${sheenProgress}%) skewX(-20deg)`,
                  pointerEvents: 'none',
                }}
              />
              <Palette size={20} color="#34d399" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>
                  Monet Color Extraction
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                  Generative organic palette matching
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                padding: '12px 16px',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Cpu size={20} color="#60a5fa" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>
                  Fluid Gestures & Physics
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                  Spring overshoot & staggered cascade
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shockwave Circle ripple on device mount */}
        {shockwaveOpacity > 0.01 && (
          <div
            style={{
              position: 'absolute',
              width: 500,
              height: 1000,
              borderRadius: 64,
              border: '2px solid rgba(96, 165, 250, 0.6)',
              transform: `scale(${shockwaveScale})`,
              opacity: shockwaveOpacity,
              pointerEvents: 'none',
              zIndex: 15,
            }}
          />
        )}

        {/* Center: 3D Floating Android Device Chassis */}
        <div style={{ zIndex: 20 }}>
          <AndroidPhoneFrame frame={frame} durationInFrames={durationInFrames}>
            <AndroidHomeScreen />
          </AndroidPhoneFrame>
        </div>

        {/* Right Side: Live Telemetry & Dynamic Specs */}
        <div
          style={{
            position: 'absolute',
            right: 90,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            transform: `translateX(${rightX}px)`,
            opacity: rightOpacity,
            width: 320,
            zIndex: 10,
          }}
        >
          {/* Card 1: Display Telemetry with SVG ProgressRing Gauge */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(24px)',
              borderRadius: 24,
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.65)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Dynamic Display Telemetry
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: '#60a5fa',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {refreshRate}
                </span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>
                  Hz LTPO
                </span>
              </div>

              {/* ProgressRing circular gauge */}
              <svg width="56" height="56" viewBox="0 0 70 70" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="35"
                  cy="35"
                  r="30"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="35"
                  cy="35"
                  r="30"
                  stroke="#60a5fa"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={gaugeCircumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
            </div>

            <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)' }}>
              Adaptive refresh rate with ultra-low latency touch response
            </div>
          </div>

          {/* Card 2: Fast Charge Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(24px)',
              borderRadius: 24,
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={18} color="#facc15" />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#facc15',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Fast Charging
              </span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff' }}>
              88% Active Charge
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)' }}>
              Full day battery life with smart adaptive battery optimization
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
