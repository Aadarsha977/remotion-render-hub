import React from 'react';

interface StorefrontBuildingProps {
  x?: number;
  y?: number;
}

export const StorefrontBuilding: React.FC<StorefrontBuildingProps> = ({ x = 0, y = 0 }) => {
  const ink = '#3D312A';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 1920,
        height: 1080,
        backgroundColor: '#BEA78F',
        pointerEvents: 'none',
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
        {/* Background Skyline */}
        <rect x="0" y="240" width="220" height="500" fill="#AA927B" />
        <rect x="1700" y="240" width="220" height="500" fill="#AA927B" />

        {/* Store Center Complex (x = 320 to 1600) */}
        <g transform="translate(320, 160)">
          {/* Main Gable Roof Peak */}
          <polygon points="640,60 120,180 1160,180" fill="#C07A70" stroke={ink} strokeWidth="6" />
          {/* White Eave Molding */}
          <polygon points="640,40 80,180 120,200 640,75 1160,200 1200,180" fill="#F5ECE5" stroke={ink} strokeWidth="5" />

          {/* Center Main Building Block */}
          <rect x="180" y="200" width="920" height="540" fill="#C07A70" stroke={ink} strokeWidth="6" />

          {/* Left Wing */}
          <rect x="0" y="280" width="180" height="460" fill="#B06A60" stroke={ink} strokeWidth="5" />
          <rect x="0" y="280" width="180" height="60" fill="#F5ECE5" stroke={ink} strokeWidth="4" />

          {/* Right Wing */}
          <rect x="1100" y="280" width="180" height="460" fill="#B06A60" stroke={ink} strokeWidth="5" />
          <rect x="1100" y="280" width="180" height="60" fill="#F5ECE5" stroke={ink} strokeWidth="4" />

          {/* Center Entrance Signboard Band */}
          <rect x="170" y="380" width="940" height="75" fill="#F5ECE5" stroke={ink} strokeWidth="5" />

          {/* Glass Double-Door Entryway (x = 520, y = 500) */}
          <g transform="translate(480, 500)">
            <rect x="0" y="0" width="320" height="240" fill="#5E9898" stroke={ink} strokeWidth="6" />
            {/* Door Center Frame */}
            <line x1="160" y1="0" x2="160" y2="240" stroke={ink} strokeWidth="5" />
            <line x1="80" y1="0" x2="80" y2="240" stroke={ink} strokeWidth="4" />
            <line x1="240" y1="0" x2="240" y2="240" stroke={ink} strokeWidth="4" />
            <line x1="0" y1="80" x2="320" y2="80" stroke={ink} strokeWidth="4" />
          </g>
        </g>

        {/* Store Entrance Plaza Ground (y = 860) */}
        <polygon points="580,860 1340,860 1560,1080 360,1080" fill="#AA927B" stroke={ink} strokeWidth="4" />
        <rect x="0" y="860" width="1920" height="220" fill="#A08873" opacity="0.6" />
      </svg>
    </div>
  );
};
