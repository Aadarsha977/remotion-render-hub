import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface MuddyCarProps {
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  isClean?: boolean;
  carColor?: string;
  hasMud?: boolean;
}

export const MuddyCar: React.FC<MuddyCarProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  scale = 1,
  isClean = false,
  carColor = '#8B7355', // Default muddy bronze/tan
  hasMud = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  if (frame < delay) return null;

  const outline = '#3D312A';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${pop * scale})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="420" height="190" viewBox="0 0 420 190" fill="none">
        {/* Wheels (Bottom y = 145) */}
        {/* Front Wheel */}
        <g transform="translate(105, 145)">
          <circle cx="0" cy="0" r="28" fill="#3D312A" />
          <circle cx="0" cy="0" r="19" fill="#F5EBDE" stroke={outline} strokeWidth="2.5" />
          <circle cx="0" cy="0" r="6" fill="#3D312A" />
          {/* Spokes */}
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1={-18 * Math.cos((deg * Math.PI) / 180)}
              y1={-18 * Math.sin((deg * Math.PI) / 180)}
              x2={18 * Math.cos((deg * Math.PI) / 180)}
              y2={18 * Math.sin((deg * Math.PI) / 180)}
              stroke={outline}
              strokeWidth="2"
            />
          ))}
        </g>

        {/* Rear Wheel */}
        <g transform="translate(325, 145)">
          <circle cx="0" cy="0" r="28" fill="#3D312A" />
          <circle cx="0" cy="0" r="19" fill="#F5EBDE" stroke={outline} strokeWidth="2.5" />
          <circle cx="0" cy="0" r="6" fill="#3D312A" />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1={-18 * Math.cos((deg * Math.PI) / 180)}
              y1={-18 * Math.sin((deg * Math.PI) / 180)}
              x2={18 * Math.cos((deg * Math.PI) / 180)}
              y2={18 * Math.sin((deg * Math.PI) / 180)}
              stroke={outline}
              strokeWidth="2"
            />
          ))}
        </g>

        {/* Car Body Shell */}
        <path
          d="M 40 140 L 75 140 Q 105 110 135 140 L 295 140 Q 325 110 355 140 L 390 140 C 405 130 405 105 385 95 L 365 90 L 305 45 C 285 30 185 30 145 55 L 75 95 C 45 105 30 120 40 140 Z"
          fill={carColor}
          stroke={outline}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Windows */}
        {/* Front Windshield & Front Side Glass */}
        <path
          d="M 148 58 L 88 95 L 210 95 L 210 50 Q 175 48 148 58 Z"
          fill="#E2E8F0"
          stroke={outline}
          strokeWidth="3.5"
        />
        {/* Rear Window Glass */}
        <path
          d="M 218 50 L 218 95 L 350 95 L 300 50 Q 255 48 218 50 Z"
          fill="#E2E8F0"
          stroke={outline}
          strokeWidth="3.5"
        />

        {/* Door Lines & Handles */}
        <line x1="214" y1="50" x2="214" y2="140" stroke={outline} strokeWidth="3" />
        <rect x="228" y="105" width="16" height="5" rx="2" fill={outline} />
        <rect x="160" y="105" width="16" height="5" rx="2" fill={outline} />

        {/* Headlight & Taillight */}
        <path d="M 42 110 Q 55 105 60 120 L 40 125 Z" fill="#FEF08A" stroke={outline} strokeWidth="2" />
        <path d="M 388 105 Q 380 115 385 125 L 395 120 Z" fill="#EF4444" stroke={outline} strokeWidth="2" />

        {/* Procedural Mud Splatters (if not clean) */}
        {hasMud && !isClean && (
          <g fill="#5C4533" opacity="0.85">
            {/* Splatter clusters */}
            <circle cx="85" cy="120" r="14" />
            <circle cx="70" cy="130" r="9" />
            <circle cx="95" cy="132" r="11" />
            <circle cx="160" cy="125" r="16" />
            <circle cx="145" cy="115" r="10" />
            <circle cx="180" cy="135" r="12" />
            <circle cx="260" cy="120" r="18" />
            <circle cx="280" cy="135" r="12" />
            <circle cx="245" cy="130" r="9" />
            <circle cx="360" cy="120" r="15" />
            <circle cx="375" cy="130" r="10" />
            {/* Window mud splashes */}
            <ellipse cx="120" cy="85" rx="14" ry="7" opacity="0.6" />
            <ellipse cx="320" cy="80" rx="16" ry="8" opacity="0.6" />
          </g>
        )}

        {/* Shiny Clean Sparkles (if cleaned) */}
        {isClean && (
          <g transform="translate(180, 40)">
            <polygon points="10,0 12,8 20,10 12,12 10,20 8,12 0,10 8,8" fill="#FACC15" />
          </g>
        )}
      </svg>
    </div>
  );
};
