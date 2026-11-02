import React from 'react';

interface LittleBitBetterFatherProps {
  x?: number;
  y?: number;
  scale?: number;
  handingCash?: boolean;
  opacity?: number;
  isInsideDoor?: boolean;
}

/**
 * Authentic Adult Neighbor / Father Rig.
 * Features:
 * - Floating head with dark combed pompadour hair and thick handlebar mustache
 * - Plump dark brown torso with crisp white triangular collar and pointed white necktie
 * - Ultra-long straight stick legs
 * - Handing cash pose extending arm across doorway threshold with 2 green bills
 */
export const LittleBitBetterFather: React.FC<LittleBitBetterFatherProps> = ({
  x = 0,
  y = 0,
  scale = 1.0,
  handingCash = false,
  opacity = 1.0,
  isInsideDoor = false,
}) => {
  const shirtColor = '#3D312A';
  const hairColor = '#322620';
  const skinColor = '#FDFBF7';
  const outlineColor = '#322620';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg width="550" height="780" viewBox="0 0 550 780" fill="none">
        {/* Floating Head */}
        <g transform="translate(130, 20)">
          {/* Head Contour */}
          <path
            d="M 40 45 C 40 15, 80 12, 95 30 C 110 12, 150 15, 150 45 C 152 80, 140 120, 95 124 C 50 120, 38 80, 40 45 Z"
            fill={skinColor}
            stroke={outlineColor}
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* Pompadour Hair */}
          <path
            d="M 38 52
               C 34 24, 65 10, 95 10
               C 125 10, 152 24, 152 50
               C 148 40, 135 34, 120 34
               C 95 34, 75 44, 48 46
               Z"
            fill={hairColor}
          />
          <path
            d="M 38 48 C 30 32, 50 14, 75 12 C 60 22, 45 35, 38 48 Z"
            fill={hairColor}
          />

          {/* Eyes & Eyebrows */}
          <path d="M 68 46 Q 78 44 88 47" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 112 47 Q 122 44 132 46" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="78" cy="55" r="4.5" fill={outlineColor} />
          <circle cx="122" cy="55" r="4.5" fill={outlineColor} />

          {/* Nose */}
          <polyline points="100,56 102,68 96,68" stroke={outlineColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Thick Handlebar Mustache */}
          <path
            d="M 80 82
               C 90 76, 110 76, 120 82
               C 126 86, 116 92, 100 88
               C 84 92, 74 86, 80 82 Z"
            fill={hairColor}
          />
        </g>

        {/* Plump Torso */}
        <g transform="translate(130, 160)">
          <path
            d="M 30 50
               C 15 15, 45 -15, 85 -20
               C 105 -22, 135 -22, 155 -20
               C 195 -15, 225 15, 210 50
               C 200 120, 40 120, 30 50 Z"
            fill={shirtColor}
          />

          {/* White Collar & White Pointed Necktie */}
          <polygon points="100,-22 120,-22 135,15 85,15" fill="#FDFBF7" />
          <polygon points="110,10 130,10 125,75 110,105 95,75" fill="#FDFBF7" stroke="#ECE8DC" strokeWidth="1" />
          <polygon points="102,5 118,5 115,22 105,22" fill="#DCD7C9" />

          {/* Legs */}
          {isInsideDoor ? (
            // Single visible stick leg when door is partially ajar
            <>
              <line x1="120" y1="110" x2="115" y2="440" stroke={outlineColor} strokeWidth="10" strokeLinecap="round" />
              <path d="M 95 440 L 140 440 C 140 422, 95 422, 95 440 Z" fill={outlineColor} />
            </>
          ) : (
            // Both long stick legs
            <>
              <line x1="75" y1="110" x2="68" y2="440" stroke={outlineColor} strokeWidth="10" strokeLinecap="round" />
              <line x1="165" y1="110" x2="172" y2="440" stroke={outlineColor} strokeWidth="10" strokeLinecap="round" />
              <path d="M 48 440 L 92 440 C 92 422, 48 422, 48 440 Z" fill={outlineColor} />
              <path d="M 152 440 L 196 440 C 196 422, 152 422, 152 440 Z" fill={outlineColor} />
            </>
          )}

          {/* Arms */}
          {handingCash ? (
            <>
              {/* Left arm resting */}
              <path d="M 40 25 Q 10 70 20 115" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
              {/* Right arm extended across doorway handing 2 cash bills to the right */}
              <path
                d="M 180 25 Q 210 40 230 65"
                stroke={outlineColor}
                strokeWidth="11"
                strokeLinecap="round"
                fill="none"
              />
              {/* 2 Cash Bills in hand (in open gap between father and kid) */}
              <g transform="translate(190, 40) rotate(-10)">
                <rect x="0" y="0" width="85" height="44" rx="5" fill="#52D172" stroke="#045B63" strokeWidth="3.5" />
                <rect x="4" y="4" width="77" height="36" rx="4" fill="none" stroke="#2BA84A" strokeWidth="1.5" />
                <circle cx="42" cy="22" r="10" fill="#75F496" />
                <text x="42" y="28" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#045B63">$</text>
              </g>
            </>
          ) : (
            <>
              {/* Natural resting arms */}
              <path d="M 40 25 Q 10 70 20 115" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
              <path d="M 200 25 Q 230 70 220 115" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
