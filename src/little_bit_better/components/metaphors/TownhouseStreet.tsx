import React from 'react';

interface TownhouseStreetProps {
  x?: number;
  y?: number;
  scale?: number;
  showStoopCustomer?: boolean;
}

/**
 * Authentic Brownstone Townhouse Street Environment (hhUn8kmTfO0).
 * Features:
 * - Multi-tier brownstone facade with corner quoin masonry blocks
 * - 4-step elevated stoop stairs with cheek walls and landing
 * - 4 sash windows with stone sills, lintels, and amber hourglass-pinched curtains
 * - Double-panel dark walnut entrance door in recessed entryway
 * - Distant background city silhouette buildings providing cinematic urban depth
 * - Sidewalk and street curb
 */
export const TownhouseStreet: React.FC<TownhouseStreetProps> = ({
  x = 0,
  y = 0,
  scale = 1.0,
  showStoopCustomer = false,
}) => {
  const brownstoneColor = '#9E8C78';
  const quoinColor = '#8A7865';
  const trimColor = '#3D312A';
  const curtainColor = '#C89456';
  const windowGlass = '#443A32';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      <svg width="2200" height="1080" viewBox="0 0 2200 1080" fill="none">
        {/* =========================================================================
            BACKGROUND CITY SILHOUETTES (DISTANT URBAN DEPTH)
        ========================================================================= */}
        {/* Distant building left */}
        <rect x="0" y="80" width="380" height="700" fill="#786756" />
        <rect x="50" y="140" width="70" height="90" fill="#625345" />
        <rect x="160" y="140" width="70" height="90" fill="#625345" />
        <rect x="50" y="270" width="70" height="90" fill="#625345" />
        <rect x="160" y="270" width="70" height="90" fill="#625345" />

        {/* Distant building right */}
        <rect x="1550" y="100" width="650" height="680" fill="#786756" />
        <rect x="1620" y="160" width="75" height="100" fill="#625345" />
        <rect x="1750" y="160" width="75" height="100" fill="#625345" />
        <rect x="1880" y="160" width="75" height="100" fill="#625345" />

        {/* =========================================================================
            CENTRAL BROWNSTONE TOWNHOUSE (WIDTH 1100, FROM X = 420 TO 1520)
        ========================================================================= */}
        {/* Main Facade */}
        <rect x="420" y="0" width="1100" height="780" fill={brownstoneColor} />

        {/* Cornice Roofline Molding */}
        <rect x="400" y="0" width="1140" height="36" fill="#756453" stroke={trimColor} strokeWidth="4" />
        <rect x="410" y="36" width="1120" height="16" fill="#887664" />

        {/* Corner Quoin Blocks (Left Edge) */}
        {[60, 140, 220, 300, 380, 460, 540, 620].map((qy, idx) => (
          <rect
            key={`ql-${qy}`}
            x="420"
            y={qy}
            width={idx % 2 === 0 ? 55 : 35}
            height="32"
            fill={quoinColor}
            stroke="#736250"
            strokeWidth="2"
          />
        ))}

        {/* Corner Quoin Blocks (Right Edge) */}
        {[60, 140, 220, 300, 380, 460, 540, 620].map((qy, idx) => (
          <rect
            key={`qr-${qy}`}
            x={idx % 2 === 0 ? 1520 - 55 : 1520 - 35}
            y={qy}
            width={idx % 2 === 0 ? 55 : 35}
            height="32"
            fill={quoinColor}
            stroke="#736250"
            strokeWidth="2"
          />
        ))}

        {/* Subtle Brick Accent Groups */}
        <g stroke="#8A7966" strokeWidth="2" opacity="0.65">
          <line x1="720" y1="210" x2="770" y2="210" />
          <line x1="745" y1="210" x2="745" y2="225" />
          <line x1="710" y1="225" x2="780" y2="225" />
          <line x1="1160" y1="180" x2="1220" y2="180" />
          <line x1="1190" y1="180" x2="1190" y2="195" />
          <line x1="1150" y1="195" x2="1230" y2="195" />
          <line x1="880" y1="480" x2="940" y2="480" />
          <line x1="910" y1="480" x2="910" y2="495" />
          <line x1="870" y1="495" x2="950" y2="495" />
        </g>

        {/* =========================================================================
            WINDOWS WITH HOURGLASS AMBER CURTAINS (MATCHING FRAME 020)
        ========================================================================= */}
        {/* Render Sash Window Function */}
        {[
          { wx: 540, wy: 90 }, // Upper Left
          { wx: 1220, wy: 90 }, // Upper Right
          { wx: 540, wy: 340 }, // Lower Left
          { wx: 1220, wy: 340 }, // Lower Right
        ].map((win, i) => (
          <g key={i} transform={`translate(${win.wx}, ${win.wy})`}>
            {/* Stone Lintel Above Window */}
            <rect x="-10" y="-14" width="180" height="16" rx="2" fill="#756453" stroke={trimColor} strokeWidth="3" />
            {/* Outer Window Frame */}
            <rect x="0" y="0" width="160" height="210" fill={windowGlass} stroke={trimColor} strokeWidth="6" />

            {/* Hourglass Pinched Amber Curtain */}
            {/* Upper Drape */}
            <polygon points="12,8 148,8 86,105 74,105" fill={curtainColor} />
            {/* Lower Flare */}
            <polygon points="74,105 86,105 148,198 12,198" fill={curtainColor} stroke="#B27E40" strokeWidth="2" />
            {/* Tie-back Ribbon */}
            <rect x="70" y="100" width="20" height="10" rx="3" fill="#8E5E28" />

            {/* Center Sash Wooden Mullion */}
            <line x1="0" y1="110" x2="160" y2="110" stroke={trimColor} strokeWidth="6" />
            <line x1="80" y1="0" x2="80" y2="210" stroke={trimColor} strokeWidth="4" />

            {/* Stone Sill Below Window */}
            <rect x="-14" y="210" width="188" height="18" rx="2" fill="#756453" stroke={trimColor} strokeWidth="3" />
          </g>
        ))}

        {/* =========================================================================
            FRONT STOOP & ENTRANCE (MATCHING FRAME 020 & 038)
        ========================================================================= */}
        {/* Recessed Doorway Alcove (x = 880, y = 320) */}
        <rect x="880" y="300" width="200" height="270" fill="#3D312A" />

        {/* Double-Panel Dark Walnut Door */}
        <g transform="translate(895, 315)">
          <rect x="0" y="0" width="170" height="255" fill="#5A473C" stroke={trimColor} strokeWidth="5" />
          {/* Top Left Panel */}
          <rect x="14" y="14" width="62" height="105" fill="#4B3B32" stroke={trimColor} strokeWidth="3" />
          {/* Top Right Panel */}
          <rect x="94" y="14" width="62" height="105" fill="#4B3B32" stroke={trimColor} strokeWidth="3" />
          {/* Bottom Left Panel */}
          <rect x="14" y="135" width="62" height="105" fill="#4B3B32" stroke={trimColor} strokeWidth="3" />
          {/* Bottom Right Panel */}
          <rect x="94" y="135" width="62" height="105" fill="#4B3B32" stroke={trimColor} strokeWidth="3" />
          {/* Door Handle */}
          <circle cx="24" cy="130" r="6" fill="#C89D42" stroke={trimColor} strokeWidth="2" />
        </g>

        {/* 4-Step Concrete Stoop Stairs */}
        {/* Step 1 (Top Landing) */}
        <rect x="840" y="570" width="280" height="40" fill="#7D6B5A" stroke={trimColor} strokeWidth="4" />
        {/* Step 2 */}
        <rect x="800" y="610" width="360" height="40" fill="#756453" stroke={trimColor} strokeWidth="4" />
        {/* Step 3 */}
        <rect x="760" y="650" width="440" height="40" fill="#6E5D4D" stroke={trimColor} strokeWidth="4" />
        {/* Step 4 (Bottom) */}
        <rect x="720" y="690" width="520" height="45" fill="#655546" stroke={trimColor} strokeWidth="4" />

        {/* Left Cheek Wall */}
        <polygon points="720,735 840,570 810,570 690,735" fill="#5A4B3D" stroke={trimColor} strokeWidth="3" />
        {/* Right Cheek Wall */}
        <polygon points="1240,735 1120,570 1150,570 1270,735" fill="#5A4B3D" stroke={trimColor} strokeWidth="3" />

        {/* Optional Neighbor standing on stoop in Shot 6 */}
        {showStoopCustomer && (
          <g transform="translate(940, 360) scale(0.65)">
            <ellipse cx="60" cy="40" rx="30" ry="34" fill="#FDFBF7" stroke="#322620" strokeWidth="6" />
            <path d="M 32 40 C 30 18, 55 12, 60 12 C 75 12, 90 18, 88 40 Z" fill="#322620" />
            <circle cx="50" cy="45" r="4" fill="#322620" />
            <circle cx="70" cy="45" r="4" fill="#322620" />
            <path d="M 50 62 Q 60 66 70 62" stroke="#322620" strokeWidth="4" fill="none" />
            <path d="M 30 90 C 20 70, 35 60, 60 55 C 85 60, 100 70, 90 90 C 85 130, 35 130, 30 90 Z" fill="#3D312A" />
            <line x1="45" y1="125" x2="40" y2="250" stroke="#322620" strokeWidth="8" />
            <line x1="75" y1="125" x2="80" y2="250" stroke="#322620" strokeWidth="8" />
            <path d="M 28 250 L 52 250 C 52 238, 28 238, 28 250 Z" fill="#322620" />
            <path d="M 68 250 L 92 250 C 92 238, 68 238, 68 250 Z" fill="#322620" />
          </g>
        )}

        {/* =========================================================================
            SIDEWALK & STREET (FOREGROUND GROUND PLANE)
        ========================================================================= */}
        {/* Sidewalk */}
        <rect x="0" y="735" width="2200" height="95" fill="#B3A28F" stroke={trimColor} strokeWidth="4" />
        {/* Curb Line */}
        <line x1="0" y1="830" x2="2200" y2="830" stroke="#4A3D32" strokeWidth="8" />
        {/* Street Asphalt */}
        <rect x="0" y="834" width="2200" height="246" fill="#998774" />
      </svg>
    </div>
  );
};
