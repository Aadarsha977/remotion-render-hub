import React from 'react';
import { AbsoluteFill } from 'remotion';

interface PaperTextureCanvasProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Authentic tactile paper texture canvas modeled on Little Bit Better.
 * Provides subtle organic fibrous flecks and a multi-octave fractal noise filter
 * that gives the entire composition a warm, hand-crafted paper finish.
 */
export const PaperTextureCanvas: React.FC<PaperTextureCanvasProps> = ({
  backgroundColor = '#FBF4DB',
  children,
  style,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* SVG Fractal Paper Grain Filter */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.055,
          mixBlendMode: 'multiply',
          zIndex: 1,
        }}
      >
        <defs>
          <filter id="lbb-paper-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.15
                0 0 0 0 0.12
                0 0 0 0 0.10
                0 0 0 0.7 0"
              result="coloredNoise"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#lbb-paper-noise)" />
      </svg>

      {/* Subtle organic fiber specks scattered across canvas */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.22,
          zIndex: 1,
        }}
      >
        <circle cx="140" cy="95" r="1.5" fill="#3D312A" />
        <line x1="380" y1="220" x2="384" y2="223" stroke="#3D312A" strokeWidth="0.8" />
        <circle cx="720" cy="160" r="1.2" fill="#3D312A" />
        <circle cx="1120" cy="80" r="1.5" fill="#3D312A" />
        <line x1="1480" y1="310" x2="1483" y2="314" stroke="#3D312A" strokeWidth="0.7" />
        <circle cx="1780" cy="190" r="1.2" fill="#3D312A" />
        <circle cx="290" cy="620" r="1.4" fill="#3D312A" />
        <circle cx="610" cy="840" r="1.2" fill="#3D312A" />
        <line x1="950" y1="710" x2="953" y2="713" stroke="#3D312A" strokeWidth="0.8" />
        <circle cx="1320" cy="640" r="1.5" fill="#3D312A" />
        <circle cx="1690" cy="810" r="1.2" fill="#3D312A" />
        <circle cx="840" cy="460" r="1.3" fill="#3D312A" />
        <line x1="1200" y1="920" x2="1204" y2="923" stroke="#3D312A" strokeWidth="0.7" />
      </svg>

      {/* Foreground Content */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
