import React from 'react';
import { useCurrentFrame } from 'remotion';

interface CarWashSquadProps {
  x?: number;
  y?: number;
  scale?: number;
}

/**
 * Authentic Car Wash Squad Rigs for Little Bit Better (hhUn8kmTfO0).
 * Matches frame_060.png & frame_065.png:
 * - Girl with pigtails and bobbles perched near rear wheel on left, scrubbing glass with coral squeegee
 * - Mint wash bucket (#86D2C1) on ground to the left of girl
 * - Boy leaning over front hood on right scrubbing windshield
 * - Mint wash bucket on ground to the right of boy
 * - Harmonic sinusoidal scrubbing motion
 */
export const CarWashSquad: React.FC<CarWashSquadProps> = ({
  x = 0,
  y = 0,
  scale = 1.0,
}) => {
  const frame = useCurrentFrame();
  const outlineColor = '#322620';
  const skinColor = '#FDFBF7';
  const shirtColor = '#3D312A';

  // Harmonic scrubbing offsets
  const scrubOffset1 = Math.sin(frame * 0.45) * 16;
  const scrubOffset2 = Math.cos(frame * 0.45) * 14;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
      }}
    >
      <svg width="1100" height="500" viewBox="0 0 1100 500" fill="none">
        {/* =========================================================================
            BUCKET 1 (NEXT TO GIRL - X = 90, Y = 320)
        ========================================================================= */}
        <g transform="translate(90, 320)">
          <polygon points="10,20 70,20 62,90 18,90" fill="#86D2C1" stroke={outlineColor} strokeWidth="4" />
          <ellipse cx="40" cy="20" rx="30" ry="8" fill="#A8E4D7" stroke={outlineColor} strokeWidth="3.5" />
          <ellipse cx="40" cy="24" rx="25" ry="6" fill="#58B8A5" />
          <path d="M 10 20 Q 40 -15 70 20" stroke="#B0655E" strokeWidth="4" fill="none" />
        </g>

        {/* =========================================================================
            GIRL WITH PIGTAILS (SCRUBBING REAR WINDOW - X = 150, Y = 130)
        ========================================================================= */}
        <g transform="translate(140, 130)">
          {/* Floating Head with Pigtails */}
          <g transform="translate(20, 0)">
            {/* Pigtail Left */}
            <circle cx="8" cy="18" r="14" fill="#322620" />
            <rect x="18" y="14" width="8" height="8" rx="2" fill="#B0655E" />
            {/* Pigtail Right */}
            <circle cx="72" cy="18" r="14" fill="#322620" />
            <rect x="54" y="14" width="8" height="8" rx="2" fill="#B0655E" />

            {/* Head Contour */}
            <ellipse cx="40" cy="38" rx="26" ry="28" fill={skinColor} stroke={outlineColor} strokeWidth="5" />
            {/* Bangs */}
            <path d="M 16 30 C 25 18, 55 18, 64 30 Z" fill="#322620" />
            {/* Eyes */}
            <circle cx="30" cy="42" r="3.5" fill={outlineColor} />
            <circle cx="50" cy="42" r="3.5" fill={outlineColor} />
            <polyline points="40,44 41,50 38,50" stroke={outlineColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Torso / Dress */}
          <path
            d="M 30 76
               C 15 85, 20 120, 20 160
               C 20 190, 80 190, 80 160
               C 80 120, 85 85, 70 76 Z"
            fill={shirtColor}
            stroke={outlineColor}
            strokeWidth="4"
          />

          {/* Legs standing next to rear wheel */}
          <line x1="38" y1="180" x2="35" y2="280" stroke={outlineColor} strokeWidth="8" strokeLinecap="round" />
          <line x1="62" y1="180" x2="65" y2="280" stroke={outlineColor} strokeWidth="8" strokeLinecap="round" />
          <path d="M 22 280 L 48 280 C 48 266, 22 266, 22 280 Z" fill={outlineColor} />
          <path d="M 52 280 L 78 280 C 78 266, 52 266, 52 280 Z" fill={outlineColor} />

          {/* Arms holding Coral Squeegee extending to rear window */}
          <g transform={`translate(${scrubOffset1}, ${scrubOffset1 * 0.5})`}>
            {/* Arms reaching right/up to rear window */}
            <path d="M 68 105 Q 110 90 145 60" stroke={outlineColor} strokeWidth="9" strokeLinecap="round" fill="none" />
            {/* Squeegee Handle */}
            <line x1="100" y1="100" x2="185" y2="35" stroke="#5A8D86" strokeWidth="6" strokeLinecap="round" />
            {/* Coral Squeegee Head */}
            <line x1="172" y1="20" x2="198" y2="50" stroke="#D8837A" strokeWidth="10" strokeLinecap="round" />
            <line x1="170" y1="18" x2="196" y2="48" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* =========================================================================
            BOY SCRUBBING FRONT HOOD & WINDSHIELD (X = 760, Y = 115)
        ========================================================================= */}
        <g transform="translate(760, 115)">
          {/* Floating Head */}
          <g transform="translate(10, 0)">
            <ellipse cx="36" cy="36" rx="24" ry="26" fill={skinColor} stroke={outlineColor} strokeWidth="5" />
            {/* Bowl cut hair */}
            <path d="M 12 30 C 15 12, 55 12, 60 30 Z" fill="#322620" />
            <circle cx="28" cy="38" r="3.5" fill={outlineColor} />
            <circle cx="44" cy="38" r="3.5" fill={outlineColor} />
            <polyline points="36,40 37,46 34,46" stroke={outlineColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Torso leaning forward toward hood */}
          <path
            d="M 15 72
               C 0 95, 20 140, 50 145
               C 80 140, 90 95, 65 72 Z"
            fill={shirtColor}
            stroke={outlineColor}
            strokeWidth="4"
          />

          {/* Legs standing behind car */}
          <line x1="45" y1="140" x2="45" y2="295" stroke={outlineColor} strokeWidth="8" strokeLinecap="round" />
          <path d="M 32 295 L 58 295 C 58 282, 32 282, 32 295 Z" fill={outlineColor} />

          {/* Arms holding Squeegee scrubbing windshield (reaching leftward to windshield) */}
          <g transform={`translate(${scrubOffset2}, 0)`}>
            <path d="M 25 90 Q -25 95 -75 105" stroke={outlineColor} strokeWidth="9" strokeLinecap="round" fill="none" />
            <line x1="-30" y1="100" x2="-130" y2="108" stroke="#5A8D86" strokeWidth="6" strokeLinecap="round" />
            <line x1="-132" y1="92" x2="-128" y2="124" stroke="#D8837A" strokeWidth="10" strokeLinecap="round" />
          </g>
        </g>

        {/* =========================================================================
            BUCKET 2 (TO THE RIGHT OF FRONT BUMPER - X = 840, Y = 360)
        ========================================================================= */}
        <g transform="translate(840, 360)">
          <polygon points="10,20 70,20 62,90 18,90" fill="#86D2C1" stroke={outlineColor} strokeWidth="4" />
          <ellipse cx="40" cy="20" rx="30" ry="8" fill="#A8E4D7" stroke={outlineColor} strokeWidth="3.5" />
          <ellipse cx="40" cy="24" rx="25" ry="6" fill="#58B8A5" />
          <path d="M 10 20 Q 40 -15 70 20" stroke="#B0655E" strokeWidth="4" fill="none" />
        </g>
      </svg>
    </div>
  );
};
