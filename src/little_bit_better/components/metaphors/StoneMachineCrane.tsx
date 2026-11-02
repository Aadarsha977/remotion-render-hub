import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface StoneMachineCraneProps {
  delay?: number;
  x?: number;
  y?: number;
  active?: boolean;
}

export const StoneMachineCrane: React.FC<StoneMachineCraneProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  active = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.8 },
  });

  if (frame < delay) return null;

  // Continuous rotation of pulley gear wheels
  const gearSpin = active ? (frame - delay) * 8 : 0;
  // Up-and-down stone lift
  const stoneLift = active
    ? interpolate(Math.sin((frame - delay) / 8), [-1, 1], [0, 40])
    : 0;

  const ink = LITTLE_BIT_BETTER_THEME.inkPrimary;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${pop})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="220" height="230" viewBox="0 0 220 230" fill="none">
        {/* Ground */}
        <line x1="10" y1="210" x2="210" y2="210" stroke={ink} strokeWidth="5" strokeLinecap="round" />

        {/* Triangular Crane Derrick Mast */}
        <polygon points="50,210 110,40 170,210" fill="#FEF3C7" stroke="#92400E" strokeWidth="6" />
        <line x1="75" y1="135" x2="145" y2="135" stroke="#92400E" strokeWidth="4" />
        <line x1="90" y1="85" x2="130" y2="85" stroke="#92400E" strokeWidth="4" />

        {/* Pulley Wheel at Top Apex */}
        <g
          transform="translate(110, 40)"
          style={{
            transform: `translate(110px, 40px) rotate(${gearSpin}deg)`,
            transformOrigin: '0 0',
          }}
        >
          <circle cx="0" cy="0" r="18" fill="#D97706" stroke={ink} strokeWidth="4" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke={ink} strokeWidth="3" />
          <line x1="0" y1="-14" x2="0" y2="14" stroke={ink} strokeWidth="3" />
        </g>

        {/* Cable from Pulley to Stone */}
        <line x1="126" y1="40" x2="126" y2={100 + stoneLift} stroke="#475569" strokeWidth="3" strokeDasharray="3,2" />

        {/* Suspended Stone Block */}
        <g transform={`translate(106, ${100 + stoneLift})`}>
          <rect x="0" y="0" width="40" height="30" rx="3" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
          <text x="20" y="19" fill="#92400E" fontSize="11" fontWeight="bold" textAnchor="middle">
            STONE
          </text>
        </g>

        {/* Machine Crank / Lever on Left */}
        <g transform="translate(48, 180)">
          <circle cx="0" cy="0" r="10" fill="#94A3B8" stroke={ink} strokeWidth="3" />
          <line
            x1="0"
            y1="0"
            x2={Math.cos((gearSpin * Math.PI) / 180) * 18}
            y2={Math.sin((gearSpin * Math.PI) / 180) * 18}
            stroke={ink}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Machine Badge */}
      <div
        style={{
          marginTop: -6,
          backgroundColor: '#059669',
          color: '#ECFDF5',
          padding: '4px 14px',
          borderRadius: 14,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}
      >
        CHUMA'S ASSET SYSTEM
      </div>
    </div>
  );
};
