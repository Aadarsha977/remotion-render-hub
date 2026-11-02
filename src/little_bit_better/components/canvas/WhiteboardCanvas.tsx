import React from 'react';
import { AbsoluteFill } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface WhiteboardCanvasProps {
  children?: React.ReactNode;
  showGrid?: boolean;
  backgroundColor?: string;
}

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  children,
  showGrid = true,
  backgroundColor = LITTLE_BIT_BETTER_THEME.canvasBg,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Subtle Dot Grid */}
      {showGrid && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.35,
          }}
        >
          <defs>
            <pattern
              id="dot-grid"
              x="0"
              y="0"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="18" cy="18" r="1.2" fill={LITTLE_BIT_BETTER_THEME.inkSecondary} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      )}

      {/* Gentle Vignette for Focus Depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 65%, rgba(226, 232, 240, 0.45) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Child layers */}
      {children}
    </AbsoluteFill>
  );
};
