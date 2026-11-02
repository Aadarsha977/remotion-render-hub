import React from 'react';

interface DoorwayPerspectiveProps {
  viewMode?: 'interior' | 'exterior';
}

export const DoorwayPerspective: React.FC<DoorwayPerspectiveProps> = ({ viewMode = 'interior' }) => {
  const ink = '#3D312A';

  if (viewMode === 'interior') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          backgroundColor: '#B8837B', // Dusty Terracotta / Muted Rose Wall
          pointerEvents: 'none',
        }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          {/* Baseboard Floor line */}
          <rect x="0" y="940" width="1920" height="140" fill="#E8B896" />
          <line x1="0" y1="940" x2="1920" y2="940" stroke={ink} strokeWidth="5" />

          {/* ================= OPEN DOORWAY FRAME (Center, x = 620 to 1280) ================= */}
          {/* Outer Door Frame Trim */}
          <rect x="620" y="100" width="660" height="840" fill="#E8DFC9" stroke={ink} strokeWidth="6" />

          {/* Door Opening (Looking outside to bright porch) */}
          <rect x="640" y="120" width="370" height="820" fill="#FBF4DB" />

          {/* The Swung-Open Door (Perspective view) */}
          <polygon
            points="1010,120 1260,30 1260,990 1010,940"
            fill="#4E3B33"
            stroke={ink}
            strokeWidth="6"
          />
          {/* Door Panels on Swung Door */}
          <polygon points="1035,180 1230,110 1230,500 1035,510" fill="#3A2C26" stroke={ink} strokeWidth="3" />
          <polygon points="1035,550 1230,540 1230,920 1035,880" fill="#3A2C26" stroke={ink} strokeWidth="3" />
          {/* Brass Door Knob */}
          <circle cx="1245" cy="540" r="14" fill="#D97706" stroke={ink} strokeWidth="3" />

          {/* ================= POTTED BONSAI PLANT (Left, x = 320) ================= */}
          <g transform="translate(320, 420)">
            {/* Ceramic Pot on floor */}
            <path d="M 60 520 L 150 520 L 160 420 L 50 420 Z" fill="#524035" stroke={ink} strokeWidth="5" />
            <ellipse cx="105" cy="420" rx="55" ry="16" fill="#3D312A" stroke={ink} strokeWidth="4" />

            {/* Twisted Trunk */}
            <path
              d="M 105 420 Q 80 320 120 250 Q 80 180 100 120"
              stroke="#524035"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />

            {/* Sage Green Foliage Clouds */}
            <circle cx="90" cy="110" r="70" fill="#789D6C" stroke={ink} strokeWidth="5" />
            <circle cx="140" cy="90" r="65" fill="#88AD7C" stroke={ink} strokeWidth="4" />
            <circle cx="50" cy="140" r="50" fill="#6A8F5E" stroke={ink} strokeWidth="4" />
            <circle cx="130" cy="160" r="55" fill="#789D6C" stroke={ink} strokeWidth="4" />
          </g>

          {/* ================= COAT RACK & UMBRELLA (Right, x = 1420) ================= */}
          <g transform="translate(1420, 280)">
            {/* Wooden Wall Plaque */}
            <rect x="0" y="0" width="300" height="90" rx="8" fill="#695147" stroke={ink} strokeWidth="5" />
            <circle cx="60" cy="45" r="16" fill="#524035" stroke={ink} strokeWidth="3" />
            <circle cx="240" cy="45" r="16" fill="#524035" stroke={ink} strokeWidth="3" />

            {/* Center Hook with Umbrella */}
            <circle cx="150" cy="45" r="16" fill="#524035" stroke={ink} strokeWidth="3" />
            {/* Curved Handle */}
            <path d="M 150 45 Q 170 45 170 70 L 170 95" stroke="#3D312A" strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Folded Yellow Umbrella */}
            <polygon points="170,95 125,120 170,420 215,120" fill="#D1C765" stroke={ink} strokeWidth="4" />
            {/* Umbrella Tip */}
            <line x1="170" y1="420" x2="170" y2="445" stroke="#3D312A" strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  // ================= EXTERIOR STOOP PERSPECTIVE =================
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        backgroundColor: '#BEA78F',
        pointerEvents: 'none',
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
        {/* Exterior Townhouse Wall */}
        <rect x="0" y="0" width="1920" height="1080" fill="#BEA78F" />

        {/* Door Frame on Stoop (Center, x = 600) */}
        <rect x="600" y="100" width="440" height="840" fill="#A8907A" stroke={ink} strokeWidth="6" />

        {/* Door Opening revealing warm interior */}
        <rect x="620" y="120" width="400" height="820" fill="#B8837B" />

        {/* Open Door ajar */}
        <polygon points="620,120 780,50 780,980 620,940" fill="#4E3B33" stroke={ink} strokeWidth="6" />

        {/* Right Window with diamond curtain */}
        <g transform="translate(1260, 140)">
          <rect x="0" y="0" width="280" height="520" fill="#524035" stroke={ink} strokeWidth="6" />
          <polygon points="40,0 240,0 260,380 20,380" fill="#D4A373" />
          <line x1="0" y1="260" x2="280" y2="260" stroke={ink} strokeWidth="4" />
        </g>

        {/* Left Window */}
        <g transform="translate(100, 140)">
          <rect x="0" y="0" width="280" height="520" fill="#524035" stroke={ink} strokeWidth="6" />
          <polygon points="40,0 240,0 260,380 20,380" fill="#D4A373" />
          <line x1="0" y1="260" x2="280" y2="260" stroke={ink} strokeWidth="4" />
        </g>

        {/* Stoop Steps (Bottom) */}
        <rect x="450" y="900" width="800" height="40" fill="#9E846D" stroke={ink} strokeWidth="4" />
        <rect x="400" y="940" width="900" height="40" fill="#9E846D" stroke={ink} strokeWidth="4" />
        <rect x="350" y="980" width="1000" height="100" fill="#9E846D" stroke={ink} strokeWidth="4" />
      </svg>
    </div>
  );
};
