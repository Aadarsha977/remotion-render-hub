import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface PyramidBuilderProps {
  delay?: number;
  progressPercent?: number; // 0 to 100%
  label?: string;
  speedMultiplier?: number;
  x?: number;
  y?: number;
  builderType?: 'manual' | 'machine';
}

export const PyramidBuilder: React.FC<PyramidBuilderProps> = ({
  delay = 0,
  progressPercent = 100,
  label,
  speedMultiplier = 1,
  x = 0,
  y = 0,
  builderType = 'manual',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  if (frame < delay) return null;

  // Calculate how many blocks are placed based on progress
  const animatedProgress = interpolate(
    frame - delay,
    [0, 60 / speedMultiplier],
    [0, progressPercent],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const ink = LITTLE_BIT_BETTER_THEME.inkPrimary;
  const stoneFill = builderType === 'machine' ? '#FDE68A' : '#E2E8F0'; // Gold tint for Chuma's pyramid
  const stoneBorder = builderType === 'machine' ? '#B45309' : ink;

  // 9 stone blocks total:
  // Layer 1 (bottom): 5 blocks (y = 120)
  // Layer 2 (middle): 3 blocks (y = 85)
  // Layer 3 (top apex): 1 block (y = 50)
  const blocks = [
    // Bottom layer (thresholds: 10, 20, 30, 40, 50)
    { x: 30, y: 120, w: 40, h: 32, req: 10 },
    { x: 74, y: 120, w: 40, h: 32, req: 20 },
    { x: 118, y: 120, w: 40, h: 32, req: 30 },
    { x: 162, y: 120, w: 40, h: 32, req: 40 },
    { x: 206, y: 120, w: 40, h: 32, req: 50 },
    // Middle layer (thresholds: 65, 75, 85)
    { x: 52, y: 84, w: 40, h: 32, req: 65 },
    { x: 96, y: 84, w: 40, h: 32, req: 75 },
    { x: 140, y: 84, w: 40, h: 32, req: 85 },
    // Top apex (threshold: 95)
    { x: 96, y: 48, w: 40, h: 32, req: 95 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${pop})`,
        transformOrigin: 'bottom center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg width="280" height="190" viewBox="0 0 280 190" fill="none">
        {/* Ground baseline */}
        <line x1="10" y1="155" x2="270" y2="155" stroke={ink} strokeWidth="5" strokeLinecap="round" />

        {/* Stone blocks rendered sequentially */}
        {blocks.map((b, idx) => {
          const isPlaced = animatedProgress >= b.req;
          if (!isPlaced) return null;

          const blockScale = spring({
            frame: (animatedProgress - b.req) * 2,
            fps,
            config: { damping: 12, stiffness: 240 },
          });

          return (
            <g
              key={idx}
              transform={`translate(${b.x}, ${b.y}) scale(${blockScale})`}
              style={{ transformOrigin: 'center bottom' }}
            >
              <rect
                x="0"
                y="0"
                width={b.w}
                height={b.h}
                rx="3"
                fill={stoneFill}
                stroke={stoneBorder}
                strokeWidth="3"
              />
              {/* Inner stone texture lines */}
              <line x1="8" y1="10" x2="22" y2="10" stroke={stoneBorder} strokeWidth="1.5" opacity="0.6" />
              <line x1="14" y1="20" x2="32" y2="20" stroke={stoneBorder} strokeWidth="1.5" opacity="0.6" />
            </g>
          );
        })}

        {/* Golden Capstone & Crown on full completion */}
        {animatedProgress >= 98 && (
          <g transform="translate(101, 16)">
            {/* Golden Star/Crown */}
            <polygon
              points="15,0 20,10 30,12 22,20 25,30 15,24 5,30 8,20 0,12 10,10"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      {/* Status Label */}
      {label && (
        <div
          style={{
            marginTop: 4,
            backgroundColor: builderType === 'machine' ? '#065F46' : '#64748B',
            color: '#FFFFFF',
            padding: '4px 14px',
            borderRadius: 14,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
