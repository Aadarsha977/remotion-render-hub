import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';

interface AndroidWallpaperProps {
  frame: number;
  durationInFrames: number;
}

export const AndroidWallpaper: React.FC<AndroidWallpaperProps> = ({
  frame,
  durationInFrames,
}) => {
  // Continuous organic drift for gradient mesh centers
  const driftX1 = interpolate(frame, [0, durationInFrames], [25, 32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const driftY1 = interpolate(frame, [0, durationInFrames], [20, 26], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const driftX2 = interpolate(frame, [0, durationInFrames], [75, 68], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const driftY2 = interpolate(frame, [0, durationInFrames], [65, 58], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const driftX3 = interpolate(frame, [0, durationInFrames], [40, 48], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const driftY3 = interpolate(frame, [0, durationInFrames], [85, 78], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rot1 = interpolate(frame, [0, durationInFrames], [0, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rot2 = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0e1a',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Multi-Point Radial Mesh Gradients (Material You Monet Engine) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at ${driftX1}% ${driftY1}%, rgba(88, 129, 87, 0.55) 0%, rgba(58, 90, 64, 0.25) 35%, transparent 70%),
            radial-gradient(circle at ${driftX2}% ${driftY2}%, rgba(224, 122, 95, 0.45) 0%, rgba(190, 85, 60, 0.15) 40%, transparent 70%),
            radial-gradient(circle at ${driftX3}% ${driftY3}%, rgba(61, 90, 128, 0.6) 0%, rgba(41, 50, 65, 0.2) 45%, transparent 75%),
            radial-gradient(circle at 80% 15%, rgba(242, 204, 143, 0.35) 0%, transparent 50%),
            linear-gradient(180deg, #0d1322 0%, #11192b 50%, #080c16 100%)
          `,
        }}
      />

      {/* Layer 2: Organic Sculptural Vector Blobs (Android 14/15 Abstract Art) */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
          pointerEvents: 'none',
        }}
        viewBox="0 0 1080 1920"
      >
        <defs>
          <linearGradient id="blobGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70a9a1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#cf995f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f4845f" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="blobGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5390d9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#48bfe3" stopOpacity="0.05" />
          </linearGradient>

          <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>

        {/* Floating Organic Blob 1 */}
        <g
          transform={`translate(450, 600) rotate(${rot1}) translate(-450, -600)`}
          filter="url(#blurFilter)"
        >
          <path
            d="M 320,400 C 480,280 680,350 780,500 C 880,650 750,850 620,920 C 490,990 310,950 240,820 C 170,690 160,520 320,400 Z"
            fill="url(#blobGrad1)"
          />
        </g>

        {/* Floating Organic Blob 2 */}
        <g
          transform={`translate(600, 1300) rotate(${rot2}) translate(-600, -1300)`}
          filter="url(#blurFilter)"
        >
          <path
            d="M 400,1100 C 590,980 820,1050 900,1220 C 980,1390 880,1580 720,1650 C 560,1720 380,1660 300,1510 C 220,1360 210,1220 400,1100 Z"
            fill="url(#blobGrad2)"
          />
        </g>
      </svg>

      {/* Layer 3: Subtle Cartesian Dot Matrix Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 4: SVG Fractal Noise Film Grain */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.045,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      >
        <filter id="wallpaperGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#wallpaperGrain)" />
      </svg>

      {/* Layer 5: Cinematic Peripheral Edge Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(4, 7, 14, 0.65) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
