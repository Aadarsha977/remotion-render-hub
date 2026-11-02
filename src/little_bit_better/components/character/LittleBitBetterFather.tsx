import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

interface LittleBitBetterFatherProps {
  delay?: number;
  scale?: number;
  x?: number;
  y?: number;
  handingCash?: boolean;
}

export const LittleBitBetterFather: React.FC<LittleBitBetterFatherProps> = ({
  delay = 0,
  scale = 1.25,
  x = 0,
  y = 0,
  handingCash = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 190 },
  });

  if (frame < delay) return null;

  const mainColor = '#3D312A';
  const skinColor = '#FDFBF7';
  const strokeW = 5.5;

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
      <svg width="280" height="460" viewBox="0 0 280 460" fill="none">
        {/* Extra Long Stick Legs */}
        <line x1="120" y1="230" x2="114" y2="425" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="160" y1="230" x2="166" y2="425" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="108" cy="432" rx="18" ry="10" fill={mainColor} />
        <ellipse cx="172" cy="432" rx="18" ry="10" fill={mainColor} />

        {/* Torso */}
        <g>
          <rect x="95" y="130" width="90" height="105" rx="30" fill={mainColor} />

          {/* White Pointed Collar & Necktie */}
          <polygon points="120,130 140,150 160,130 140,140" fill="#FFFFFF" />
          {/* Tie Knot & Blade */}
          <polygon points="135,142 145,142 148,150 132,150" fill="#FFFFFF" />
          <polygon points="132,150 148,150 152,195 140,210 128,195" fill="#FFFFFF" stroke={mainColor} strokeWidth="1.5" />
        </g>

        {/* Head & Mustache */}
        <g transform="translate(140, 78)">
          <ellipse cx="0" cy="0" rx="40" ry="46" fill={skinColor} stroke={mainColor} strokeWidth={strokeW} />

          {/* Combed Side-Part Hair */}
          <path
            d="M -38 -14 C -28 -46 20 -44 40 -12 C 44 8 36 24 34 28 C 24 10 18 8 10 14 Q 28 -24 -16 -16 Z"
            fill={mainColor}
          />
          {/* Side part clip */}
          <path d="M -20 -35 Q 0 -42 25 -32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

          {/* Eyes & Brows */}
          <circle cx="-12" cy="-6" r="4.5" fill={mainColor} />
          <circle cx="18" cy="-6" r="4.5" fill={mainColor} />
          <path d="M -18 -16 Q -12 -20 -6 -16" stroke={mainColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M 12 -16 Q 18 -20 24 -16" stroke={mainColor} strokeWidth="3" strokeLinecap="round" />

          {/* Nose */}
          <polygon points="4,-1 0,10 6,9" fill={mainColor} />

          {/* Distinctive Dark Mustache */}
          <path
            d="M -18 16 Q -6 10 4 15 Q 14 10 26 16 Q 14 24 4 19 Q -6 24 -18 16 Z"
            fill={mainColor}
          />
        </g>

        {/* Arms */}
        {!handingCash ? (
          <>
            <path d="M 98 145 Q 65 185 70 215" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            <path d="M 182 145 Q 215 185 210 215" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 98 145 Q 65 185 70 215" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            {/* Right Arm Reaching Forward with Cash Bills */}
            <path d="M 182 145 Q 215 170 245 170" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            {/* Dollar Bills in hand */}
            <g transform="translate(245, 155) rotate(12)">
              <rect x="0" y="0" width="55" height="30" rx="4" fill="#86EFAC" stroke={mainColor} strokeWidth="2.5" />
              <circle cx="27" cy="15" r="7" fill="#4ADE80" />
              <text x="27" y="20" fill={mainColor} fontSize="14" fontWeight="900" textAnchor="middle">$</text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
