import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface CarWashSquadProps {
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
}

export const CarWashSquad: React.FC<CarWashSquadProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  if (frame < delay) return null;

  const mainColor = '#3D312A';
  const skinColor = '#FDFBF7';
  const mintColor = '#86D2C1';
  const coralColor = '#D8837A';

  // Scrubbing motion oscillations
  const scrub1 = Math.sin((frame - delay) / 3) * 12;
  const scrub2 = Math.cos((frame - delay) / 3.5) * 14;

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
      <svg width="450" height="260" viewBox="0 0 450 260" fill="none">
        {/* ================= GIRL ON LEFT (Pigtails, scrubbing trunk) ================= */}
        <g transform="translate(60, 40)">
          {/* Mint Bucket on Ground */}
          <g transform="translate(-45, 120)">
            <path d="M 0 0 L 26 0 L 22 30 L 4 30 Z" fill={mintColor} stroke={mainColor} strokeWidth="2.5" />
            <path d="M 2 0 Q 13 -12 24 0" stroke={coralColor} strokeWidth="3" fill="none" />
          </g>

          {/* Stick Legs */}
          <line x1="25" y1="120" x2="22" y2="180" stroke={mainColor} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="45" y1="120" x2="48" y2="180" stroke={mainColor} strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="20" cy="184" rx="10" ry="6" fill={mainColor} />
          <ellipse cx="50" cy="184" rx="10" ry="6" fill={mainColor} />

          {/* Torso */}
          <rect x="15" y="70" width="40" height="52" rx="14" fill={mainColor} />
          <path d="M 24 70 Q 35 80 46 70 Z" fill={skinColor} stroke={mainColor} strokeWidth="3" />

          {/* Head & Pigtails */}
          <g transform="translate(35, 45)">
            <ellipse cx="0" cy="0" rx="20" ry="24" fill={skinColor} stroke={mainColor} strokeWidth="4" />
            {/* Bangs */}
            <path d="M -18 -10 Q 0 -24 18 -10 Q 10 -2 0 -4 Z" fill={mainColor} />
            {/* Left Pigtail */}
            <ellipse cx="-24" cy="-14" rx="10" ry="8" fill={mainColor} />
            {/* Right Pigtail */}
            <ellipse cx="24" cy="-14" rx="10" ry="8" fill={mainColor} />
            {/* Eyes */}
            <circle cx="-6" cy="-2" r="3" fill={mainColor} />
            <circle cx="8" cy="-2" r="3" fill={mainColor} />
          </g>

          {/* Scrubbing Arm with Squeegee */}
          <g transform={`translate(${scrub1}, 0)`}>
            <path d="M 45 80 L 75 60" stroke={mainColor} strokeWidth="4.5" strokeLinecap="round" />
            {/* Squeegee */}
            <line x1="75" y1="60" x2="105" y2="40" stroke={mintColor} strokeWidth="4.5" strokeLinecap="round" />
            <rect x="100" y="30" width="8" height="24" rx="2" fill={coralColor} stroke={mainColor} strokeWidth="1.5" />
          </g>
        </g>

        {/* ================= BOY ON RIGHT (Scrubbing Hood) ================= */}
        <g transform="translate(320, 50)">
          {/* Mint Bucket on Ground */}
          <g transform="translate(60, 110)">
            <path d="M 0 0 L 26 0 L 22 30 L 4 30 Z" fill={mintColor} stroke={mainColor} strokeWidth="2.5" />
            <path d="M 2 0 Q 13 -12 24 0" stroke={coralColor} strokeWidth="3" fill="none" />
          </g>

          {/* Stick Legs */}
          <line x1="25" y1="110" x2="22" y2="170" stroke={mainColor} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="45" y1="110" x2="48" y2="170" stroke={mainColor} strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="20" cy="174" rx="10" ry="6" fill={mainColor} />
          <ellipse cx="50" cy="174" rx="10" ry="6" fill={mainColor} />

          {/* Torso */}
          <rect x="15" y="60" width="40" height="52" rx="14" fill={mainColor} />
          <path d="M 24 60 Q 35 70 46 60 Z" fill={skinColor} stroke={mainColor} strokeWidth="3" />

          {/* Head */}
          <g transform="translate(35, 35)">
            <ellipse cx="0" cy="0" rx="20" ry="24" fill={skinColor} stroke={mainColor} strokeWidth="4" />
            <path d="M -18 -8 Q 0 -22 18 -8 Q 8 -2 -4 -4 Z" fill={mainColor} />
            <circle cx="-6" cy="-2" r="3" fill={mainColor} />
            <circle cx="8" cy="-2" r="3" fill={mainColor} />
          </g>

          {/* Scrubbing Arm with Squeegee */}
          <g transform={`translate(${scrub2}, 0)`}>
            <path d="M 20 70 L -10 65" stroke={mainColor} strokeWidth="4.5" strokeLinecap="round" />
            {/* Squeegee */}
            <line x1="-10" y1="65" x2="-45" y2="60" stroke={mintColor} strokeWidth="4.5" strokeLinecap="round" />
            <rect x="-52" y="50" width="8" height="24" rx="2" fill={coralColor} stroke={mainColor} strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};
