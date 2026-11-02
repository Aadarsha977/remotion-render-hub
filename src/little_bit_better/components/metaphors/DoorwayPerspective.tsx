import React from 'react';

interface DoorwayPerspectiveProps {
  viewMode?: 'interior' | 'knock_closeup' | 'exterior';
  doorOpenProgress?: number; // 0 (closed) to 1 (fully open)
  showKnockEffect?: boolean;
}

/**
 * Authentic Doorway Scenes for Little Bit Better (hhUn8kmTfO0).
 * Supports:
 * - 'interior': Dusty rose terracotta hallway with potted curved topiary bonsai,
 *               coat rack with folded yellow umbrella, and open door framing the outside porch.
 * - 'knock_closeup': Extreme close-up on door panel with arm knocking and impact dashes.
 * - 'exterior': Stoop doorstep view with open door showing interior and sash window with amber curtain.
 */
export const DoorwayPerspective: React.FC<DoorwayPerspectiveProps> = ({
  viewMode = 'interior',
  showKnockEffect = false,
}) => {
  const terracottaWall = '#AF746E';
  const floorColor = '#D5A77B';
  const doorColor = '#4E3B33';
  const darkOutline = '#322620';

  if (viewMode === 'knock_closeup') {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          {/* Wall trim */}
          <rect x="0" y="0" width="1920" height="1080" fill="#9E8C78" />
          {/* Door Frame */}
          <rect x="360" y="0" width="1200" height="1080" fill={doorColor} stroke={darkOutline} strokeWidth="12" />
          {/* 4 Large Beveled Door Panels */}
          <rect x="420" y="60" width="500" height="440" fill="#3E2E27" stroke={darkOutline} strokeWidth="8" />
          <rect x="980" y="60" width="500" height="440" fill="#3E2E27" stroke={darkOutline} strokeWidth="8" />
          <rect x="420" y="560" width="500" height="480" fill="#3E2E27" stroke={darkOutline} strokeWidth="8" />
          <rect x="980" y="560" width="500" height="480" fill="#3E2E27" stroke={darkOutline} strokeWidth="8" />

          {/* Kid's Arm Reaching diagonally from bottom right to knock */}
          <g>
            <path
              d="M 2100 1200 L 1320 620"
              stroke="#3D312A"
              strokeWidth="32"
              strokeLinecap="round"
            />
            {/* Hand Knocking */}
            <circle cx="1320" cy="620" r="22" fill="#3D312A" />

            {/* 3 Impact Burst Dashes */}
            {showKnockEffect && (
              <g stroke="#FAF5DE" strokeWidth="8" strokeLinecap="round">
                <line x1="1285" y1="590" x2="1270" y2="575" />
                <line x1="1310" y1="570" x2="1305" y2="550" />
                <line x1="1335" y1="575" x2="1350" y2="560" />
              </g>
            )}
          </g>
        </svg>
      </div>
    );
  }

  if (viewMode === 'exterior') {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          {/* Brownstone Facade Wall */}
          <rect x="0" y="0" width="1920" height="1080" fill="#9E8C78" />

          {/* Left Window */}
          <g transform="translate(-40, 140)">
            <rect x="0" y="0" width="220" height="520" fill="#443A32" stroke={darkOutline} strokeWidth="8" />
            <polygon points="15,10 205,10 120,260 100,260" fill="#C89456" />
            <polygon points="100,260 120,260 205,510 15,510" fill="#C89456" />
            <rect x="96" y="250" width="28" height="20" rx="4" fill="#8E5E28" />
            <line x1="0" y1="270" x2="220" y2="270" stroke={darkOutline} strokeWidth="8" />
          </g>

          {/* Center Recessed Stoop Entrance */}
          {/* Open Doorway Opening (revealing pink hallway inside) */}
          <rect x="800" y="0" width="340" height="880" fill="#C58C87" />

          {/* Open Walnut Door swung to the left */}
          <g transform="translate(540, 20)">
            <rect x="0" y="0" width="280" height="860" fill={doorColor} stroke={darkOutline} strokeWidth="8" />
            {/* Panels */}
            <rect x="25" y="40" width="105" height="360" fill="#3E2E27" stroke={darkOutline} strokeWidth="5" />
            <rect x="150" y="40" width="105" height="360" fill="#3E2E27" stroke={darkOutline} strokeWidth="5" />
            <rect x="25" y="440" width="105" height="360" fill="#3E2E27" stroke={darkOutline} strokeWidth="5" />
            <rect x="150" y="440" width="105" height="360" fill="#3E2E27" stroke={darkOutline} strokeWidth="5" />
          </g>

          {/* Right Window with Hourglass Curtain */}
          <g transform="translate(1260, 80)">
            <rect x="-10" y="-14" width="380" height="24" rx="3" fill="#756453" stroke={darkOutline} strokeWidth="4" />
            <rect x="0" y="10" width="360" height="640" fill="#443A32" stroke={darkOutline} strokeWidth="8" />
            <polygon points="20,20 340,20 195,330 165,330" fill="#C89456" />
            <polygon points="165,330 195,330 340,630 20,630" fill="#C89456" />
            <rect x="160" y="320" width="40" height="24" rx="4" fill="#8E5E28" />
            <line x1="0" y1="340" x2="360" y2="340" stroke={darkOutline} strokeWidth="8" />
            <rect x="-14" y="650" width="388" height="24" rx="3" fill="#756453" stroke={darkOutline} strokeWidth="4" />
          </g>

          {/* Stoop Stairs at Bottom */}
          <rect x="280" y="870" width="1050" height="60" fill="#7D6B5A" stroke={darkOutline} strokeWidth="6" />
          <rect x="240" y="930" width="1130" height="65" fill="#756453" stroke={darkOutline} strokeWidth="6" />
          <rect x="200" y="995" width="1210" height="85" fill="#6E5D4D" stroke={darkOutline} strokeWidth="6" />
        </svg>
      </div>
    );
  }

  // DEFAULT: viewMode === 'interior' (MATCHING FRAME 030)
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
        {/* =========================================================================
            WALL & FLOOR (MATCHING FRAME 030)
        ========================================================================= */}
        {/* Dusty Rose / Terracotta Wallpaper */}
        <rect x="0" y="0" width="1920" height="970" fill={terracottaWall} />
        {/* Baseboard Trim */}
        <rect x="0" y="960" width="1920" height="18" fill="#8C5E58" stroke={darkOutline} strokeWidth="2" />
        {/* Wooden Floor */}
        <rect x="0" y="978" width="1920" height="102" fill={floorColor} stroke={darkOutline} strokeWidth="4" />

        {/* =========================================================================
            POTTED TOPIARY BONSAI PLANT (LEFT SIDE)
        ========================================================================= */}
        <g transform="translate(140, 420)">
          {/* Ceramic Pot */}
          <polygon points="80,420 180,420 195,540 65,540" fill="#52453F" stroke={darkOutline} strokeWidth="5" />
          <ellipse cx="130" cy="420" rx="55" ry="14" fill="#3D322D" stroke={darkOutline} strokeWidth="4" />
          {/* Rim */}
          <rect x="70" y="410" width="120" height="18" rx="4" fill="#62544D" stroke={darkOutline} strokeWidth="3" />

          {/* Curved Organic S-Shaped Trunk */}
          <path
            d="M 130 420
               C 135 340, 85 280, 115 220
               C 135 180, 155 140, 145 100"
            stroke="#4A3B33"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lush Green Topiary Canopy with Individual Leaf Silhouettes */}
          <g transform="translate(145, 100)">
            {/* Base foliage volume */}
            <circle cx="0" cy="0" r="130" fill="#869D68" stroke={darkOutline} strokeWidth="5" />
            <circle cx="-40" cy="-30" r="90" fill="#8EAA6E" />
            <circle cx="45" cy="20" r="80" fill="#7C9460" />

            {/* Individual Leaf Silhouettes Sticking Out */}
            {[
              { lx: -130, ly: 0, rot: -80 },
              { lx: -110, ly: -70, rot: -45 },
              { lx: -40, ly: -130, rot: -10 },
              { lx: 50, ly: -120, rot: 35 },
              { lx: 120, ly: -50, rot: 75 },
              { lx: 130, ly: 30, rot: 110 },
              { lx: 80, ly: 100, rot: 145 },
              { lx: -30, ly: 125, rot: 190 },
              { lx: -100, ly: 80, rot: 230 },
            ].map((leaf, idx) => (
              <g key={idx} transform={`translate(${leaf.lx}, ${leaf.ly}) rotate(${leaf.rot})`}>
                <path d="M 0 0 C 15 -10, 30 -5, 35 10 C 25 20, 10 15, 0 0 Z" fill="#8EAA6E" stroke={darkOutline} strokeWidth="2.5" />
              </g>
            ))}
          </g>
        </g>

        {/* =========================================================================
            CENTER DOORWAY: REVEALING PORCH LIGHT (X = 540 TO 1080)
        ========================================================================= */}
        {/* Exterior Porch Daylight visible through doorway opening */}
        <rect x="540" y="110" width="540" height="868" fill="#FAF5DE" stroke={darkOutline} strokeWidth="10" />

        {/* Door Sill Threshold */}
        <rect x="520" y="968" width="580" height="20" fill="#8C7A68" stroke={darkOutline} strokeWidth="4" />

        {/* Door Swung Open Into Room (In Perspective on Right Side of Opening) */}
        <g transform="translate(1040, 30)">
          {/* Perspective Trapezoid for Open Door */}
          <polygon
            points="0,80 340,0 340,948 0,948"
            fill={doorColor}
            stroke={darkOutline}
            strokeWidth="8"
          />
          {/* Beveled Door Panels in Perspective */}
          <polygon points="35,160 145,130 145,460 35,460" fill="#3E2E27" stroke={darkOutline} strokeWidth="4" />
          <polygon points="180,120 305,85 305,460 180,460" fill="#3E2E27" stroke={darkOutline} strokeWidth="4" />
          <polygon points="35,500 145,500 145,860 35,860" fill="#3E2E27" stroke={darkOutline} strokeWidth="4" />
          <polygon points="180,500 305,500 305,860 180,860" fill="#3E2E27" stroke={darkOutline} strokeWidth="4" />

          {/* Brass Doorknob */}
          <circle cx="45" cy="560" r="16" fill="#C89D42" stroke={darkOutline} strokeWidth="4" />
          <rect x="55" y="552" width="20" height="16" rx="3" fill="#A88132" stroke={darkOutline} strokeWidth="3" />
        </g>

        {/* =========================================================================
            COAT RACK & YELLOW UMBRELLA (RIGHT WALL)
        ========================================================================= */}
        <g transform="translate(1440, 280)">
          {/* Horizontal Wooden Rail */}
          <rect x="0" y="0" width="380" height="100" rx="6" fill="#5A473C" stroke={darkOutline} strokeWidth="6" />

          {/* Peg 1 */}
          <circle cx="80" cy="50" r="24" fill="#4B3A31" stroke={darkOutline} strokeWidth="4" />
          <circle cx="80" cy="50" r="10" fill="#755E50" />

          {/* Peg 2 with Hanging Yellow Umbrella */}
          <circle cx="280" cy="50" r="24" fill="#4B3A31" stroke={darkOutline} strokeWidth="4" />
          <circle cx="280" cy="50" r="10" fill="#755E50" />

          {/* Folded Yellow Umbrella */}
          <g transform="translate(170, 20)">
            {/* Curved Cane Handle Hooked on Peg */}
            <path
              d="M 110 32
                 C 110 5, 80 5, 80 32
                 L 80 120"
              stroke="#3D312A"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            {/* Folded Umbrella Canopy (Yellow/Gold) */}
            <polygon
              points="45,120 115,120 80,480"
              fill="#E5C358"
              stroke={darkOutline}
              strokeWidth="5"
            />
            {/* Rib Shading */}
            <polygon points="45,120 80,120 80,480" fill="#D4B043" />
            {/* Pointed Metal Tip */}
            <line x1="80" y1="480" x2="80" y2="520" stroke="#3D312A" strokeWidth="8" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};
