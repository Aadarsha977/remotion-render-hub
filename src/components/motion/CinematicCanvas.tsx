import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface CinematicCanvasProps {
  children?: React.ReactNode;
  durationInFrames?: number;
  cameraDriftScale?: number;
  baseColor?: string;
  gradientColors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  grainOpacity?: number;
  enableVignette?: boolean;
  style?: React.CSSProperties;
}

/**
 * CinematicCanvas
 * Master root viewport wrapper enforcing:
 * 1. Perpetual Camera Drift (subtle scale + continuous micro-pan)
 * 2. Drifting Multi-Point Radial Gradients (ambient depth)
 * 3. SVG Fractal Noise Grain Overlay (eliminates digital sterile look)
 * 4. Peripheral Cinematic Vignette
 */
export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  children,
  durationInFrames: customDuration,
  cameraDriftScale = 1.045,
  baseColor = '#080a0f',
  gradientColors = {
    primary: 'rgba(56, 189, 248, 0.12)',   // subtle cyan/blue
    secondary: 'rgba(239, 68, 68, 0.08)',   // subtle crimson
    tertiary: 'rgba(99, 102, 241, 0.08)',  // subtle indigo
  },
  grainOpacity = 0.04,
  enableVignette = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const duration = customDuration || videoConfig.durationInFrames;

  // 1. Perpetual Camera Drift: continuous 4.5% scale + 8px pan across total duration
  const driftScale = interpolate(frame, [0, duration], [1, cameraDriftScale], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const panY = interpolate(frame, [0, duration], [0, -8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const panX = interpolate(frame, [0, duration], [0, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Ambient Radial Gradient Coordinates Drift
  const grad1X = interpolate(frame, [0, duration], [25, 32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const grad1Y = interpolate(frame, [0, duration], [20, 26], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const grad2X = interpolate(frame, [0, duration], [80, 72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const grad2Y = interpolate(frame, [0, duration], [85, 78], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. 12 FPS Stepped Grain Seed for biological texture
  const grainSeed = Math.floor(frame / 2.5) % 8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: baseColor,
        overflow: 'hidden',
        perspective: '1200px',
        ...style,
      }}
    >
      {/* Dynamic Drifting Radial Mesh */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(circle at ${grad1X}% ${grad1Y}%, ${gradientColors.primary} 0%, transparent 55%),
            radial-gradient(circle at ${grad2X}% ${grad2Y}%, ${gradientColors.secondary} 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${gradientColors.tertiary} 0%, transparent 65%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Main Drifting Camera Transform Layer */}
      <AbsoluteFill
        style={{
          transform: `scale(${driftScale}) translate(${panX}px, ${panY}px)`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </AbsoluteFill>

      {/* SVG Grain Noise Texture Overlay */}
      {grainOpacity > 0 && (
        <AbsoluteFill
          style={{
            pointerEvents: 'none',
            opacity: grainOpacity,
            mixBlendMode: 'overlay',
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id={`cinematic-grain-${grainSeed}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                seed={grainSeed * 17}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#cinematic-grain-${grainSeed})`} />
          </svg>
        </AbsoluteFill>
      )}

      {/* Peripheral Vignette */}
      {enableVignette && (
        <AbsoluteFill
          style={{
            background: 'radial-gradient(circle at center, transparent 45%, rgba(4, 6, 10, 0.75) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
