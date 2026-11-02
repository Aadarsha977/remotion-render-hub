import React from 'react';

interface StorefrontBuildingProps {
  x?: number;
  y?: number;
}

/**
 * Authentic Department Store Facade (Shot 8 / 0:52 - 0:55).
 * Modeled on frame_053.png of Little Bit Better (hhUn8kmTfO0).
 * Features:
 * - Terracotta pediment roof with cream roofline eaves
 * - Bold white architectural frieze bands
 * - Glass entrance doors with teal glass panels and brown mullions
 * - Perspective trapezoidal walkway leading to the entrance doors
 */
export const StorefrontBuilding: React.FC<StorefrontBuildingProps> = () => {
  const terracottaColor = '#B87569';
  const bandColor = '#F2ECE1';
  const glassColor = '#6EA89E';
  const trimColor = '#3D312A';

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
        {/* Background Sky */}
        <rect x="0" y="0" width="1920" height="1080" fill="#B8A18C" />

        {/* Distant Background Silhouette Buildings */}
        <rect x="0" y="90" width="220" height="650" fill="#786756" />
        <rect x="1700" y="90" width="220" height="650" fill="#786756" />

        {/* =========================================================================
            STOREFRONT MAIN STRUCTURE (CENTERED SYMMETRICAL)
        ========================================================================= */}
        {/* Left Wing */}
        <rect x="90" y="260" width="340" height="500" fill={terracottaColor} />
        <rect x="90" y="260" width="340" height="60" fill={bandColor} stroke={trimColor} strokeWidth="3" />
        <rect x="90" y="440" width="340" height="60" fill={bandColor} stroke={trimColor} strokeWidth="3" />

        {/* Right Wing */}
        <rect x="1490" y="260" width="340" height="500" fill={terracottaColor} />
        <rect x="1490" y="260" width="340" height="60" fill={bandColor} stroke={trimColor} strokeWidth="3" />
        <rect x="1490" y="440" width="340" height="60" fill={bandColor} stroke={trimColor} strokeWidth="3" />
        {/* Side Service Door */}
        <rect x="1530" y="580" width="90" height="180" fill="#70433C" stroke={trimColor} strokeWidth="4" />

        {/* Center Main Building Mass */}
        <polygon points="360,280 960,150 1560,280 1560,760 360,760" fill={terracottaColor} />

        {/* Pediment Triangular Roof Eaves (Cream Architrave) */}
        <polygon points="340,285 960,140 1580,285 1560,315 960,175 360,315" fill={bandColor} stroke={trimColor} strokeWidth="4" />

        {/* Center Horizontal Overhang Awning */}
        <polygon points="380,400 1540,400 1510,470 410,470" fill={bandColor} stroke={trimColor} strokeWidth="5" />
        <polygon points="410,470 1510,470 1480,510 440,510" fill="#CBB7A2" stroke={trimColor} strokeWidth="3" />

        {/* Center Glass Entrance Doors (x = 760 to 1160, y = 530 to 760) */}
        <rect x="760" y="530" width="400" height="230" fill="#3D312A" />

        {/* 4 Teal Glass Panes */}
        {/* Top Transom Panes */}
        <rect x="770" y="540" width="100" height="60" fill={glassColor} stroke={trimColor} strokeWidth="3" />
        <rect x="880" y="540" width="75" height="60" fill={glassColor} stroke={trimColor} strokeWidth="3" />
        <rect x="965" y="540" width="75" height="60" fill={glassColor} stroke={trimColor} strokeWidth="3" />
        <rect x="1050" y="540" width="100" height="60" fill={glassColor} stroke={trimColor} strokeWidth="3" />

        {/* Main Double Doors Glass */}
        <rect x="770" y="610" width="90" height="150" fill={glassColor} stroke={trimColor} strokeWidth="3" />
        <rect x="870" y="610" width="90" height="150" fill="#794841" stroke={trimColor} strokeWidth="4" />
        <rect x="960" y="610" width="90" height="150" fill="#794841" stroke={trimColor} strokeWidth="4" />
        <rect x="1060" y="610" width="90" height="150" fill={glassColor} stroke={trimColor} strokeWidth="3" />
        {/* Door Handles */}
        <line x1="945" y1="670" x2="945" y2="710" stroke="#F2ECE1" strokeWidth="5" strokeLinecap="round" />
        <line x1="975" y1="670" x2="975" y2="710" stroke="#F2ECE1" strokeWidth="5" strokeLinecap="round" />

        {/* =========================================================================
            PERSPECTIVE WALKWAY & PAVEMENT
        ========================================================================= */}
        {/* Main Pavement */}
        <rect x="0" y="760" width="1920" height="320" fill="#998774" stroke={trimColor} strokeWidth="5" />
        {/* Perspective Trapezoidal Walkway leading to the entrance */}
        <polygon points="760,760 1160,760 1440,940 480,940" fill="#786756" stroke={trimColor} strokeWidth="4" />
      </svg>
    </div>
  );
};
