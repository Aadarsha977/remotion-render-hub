import React from 'react';

interface MuddyCarProps {
  x?: number;
  y?: number;
  scale?: number;
  carColor?: string;
  hasMud?: boolean;
  isClean?: boolean;
  flipHorizontal?: boolean;
}

/**
 * Authentic Modern Sedan / Crossover modeled on Little Bit Better (hhUn8kmTfO0).
 * Features:
 * - Modern aerodynamic sedan contours with contoured front hood, sleek windshield, and trunk
 * - Multi-segment angular headlights with bright reflector facets
 * - Visible interior silhouette: driver bucket seat headrest and steering wheel
 * - 8-spoke fan alloy wheels with metallic cream spokes and black rubber tires
 * - Inset door handles, gas cap door, and side mirror
 * - Layered organic mud splatters clustered along wheel arches and lower door sills
 * - Clean state sparkle gleams
 * - flipHorizontal to face left or right
 */
export const MuddyCar: React.FC<MuddyCarProps> = ({
  x = 0,
  y = 0,
  scale = 1.0,
  carColor = '#8B7355',
  hasMud = true,
  isClean = false,
  flipHorizontal = false,
}) => {
  const strokeColor = '#3D312A';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale}) ${flipHorizontal ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
      }}
    >
      <svg width="840" height="420" viewBox="0 0 840 420" fill="none">
        {/* Ground Shadow */}
        <ellipse cx="410" cy="360" rx="360" ry="22" fill="#2C231E" opacity="0.4" />

        {/* =========================================================================
            CAR MAIN BODY CONTOUR
        ========================================================================= */}
        {/* Main Body Shell */}
        <path
          d="M 60 260
             C 50 250, 48 220, 65 200
             C 80 185, 120 180, 190 160
             C 240 145, 290 100, 340 70
             C 380 48, 480 44, 570 54
             C 610 60, 650 90, 690 145
             L 745 155
             C 770 160, 785 185, 780 215
             C 775 240, 765 255, 745 270
             L 700 280
             C 690 230, 630 210, 570 210
             C 510 210, 450 230, 440 280
             L 300 280
             C 290 230, 230 210, 170 210
             C 110 210, 65 240, 60 260 Z"
          fill={carColor}
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Front Bumper & Lower Air Dam */}
        <path
          d="M 65 200 L 52 235 C 50 255, 60 275, 95 282 L 115 282"
          fill={carColor}
          stroke={strokeColor}
          strokeWidth="5"
        />
        {/* Front Grille & Fog Light Inset */}
        <polygon points="56,238 72,235 70,265 54,262" fill="#2A211B" />
        <rect x="58" y="246" width="10" height="10" rx="2" fill="#DCD5C3" />

        {/* =========================================================================
            WINDOWS & INTERIOR SILHOUETTE
        ========================================================================= */}
        {/* Window Chrome / Dark Frame */}
        <path
          d="M 215 155
             L 335 75
             C 370 56, 470 52, 555 62
             C 590 68, 625 95, 660 145
             L 560 145
             L 375 145
             Z"
          fill="#352C26"
          stroke={strokeColor}
          strokeWidth="5"
        />
        {/* Front Side Window (Tinted Glass) */}
        <path
          d="M 228 150 L 332 82 C 348 72, 360 70, 375 70 L 375 142 L 235 142 Z"
          fill="#4A3F37"
        />
        {/* Rear Side Window */}
        <path
          d="M 390 70 L 545 70 C 575 74, 605 95, 642 142 L 390 142 Z"
          fill="#4A3F37"
        />
        {/* Black B-Pillar */}
        <rect x="375" y="66" width="15" height="80" fill="#241D19" />

        {/* Visible Interior: Driver Seat Headrest & Steering Wheel */}
        <ellipse cx="320" cy="115" rx="14" ry="18" fill="#241D19" />
        <path d="M 320 133 L 334 142 L 306 142 Z" fill="#241D19" />
        <path d="M 265 140 Q 275 118 285 140" stroke="#241D19" strokeWidth="6" fill="none" />

        {/* Side Mirror */}
        <polygon points="215,152 245,146 242,166 215,164" fill={carColor} stroke={strokeColor} strokeWidth="4" />

        {/* =========================================================================
            HEADLIGHTS & TAILLIGHTS
        ========================================================================= */}
        {/* Modern Angular Multi-Segment Headlight */}
        <polygon points="66,198 128,176 142,205 84,222" fill="#EAE5D8" stroke={strokeColor} strokeWidth="4" />
        <polygon points="74,204 102,188 108,212 84,218" fill="#FFFFFF" />
        <circle cx="120" cy="195" r="7" fill="#C2BAA6" stroke={strokeColor} strokeWidth="2" />

        {/* Rear Angular Taillight */}
        <polygon points="685,152 755,160 762,192 708,188" fill="#B23B38" stroke={strokeColor} strokeWidth="4" />
        <polygon points="710,165 748,168 750,182 715,180" fill="#E05652" />

        {/* =========================================================================
            DOOR CUTLINES & DETAILS
        ========================================================================= */}
        {/* Front Door Line */}
        <path d="M 215 160 L 220 280" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        {/* Center Pillar Line */}
        <path d="M 382 145 L 380 280" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        {/* Rear Door Arch Cut */}
        <path d="M 540 145 C 555 180, 560 210, 550 280" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

        {/* Inset Door Handles */}
        <rect x="250" y="172" width="28" height="8" rx="3" fill="#2C231E" stroke={strokeColor} strokeWidth="2" />
        <rect x="420" y="172" width="28" height="8" rx="3" fill="#2C231E" stroke={strokeColor} strokeWidth="2" />

        {/* Gas Cap on Rear Quarter Panel */}
        <circle cx="670" cy="190" r="14" fill="none" stroke={strokeColor} strokeWidth="3" />

        {/* =========================================================================
            ORGANIC MUD SPLATTERS (Clustered realistic mud patches)
        ========================================================================= */}
        {hasMud && (
          <g>
            {/* Front Arch Mud Clustered Blobs */}
            <path
              d="M 90 250
                 C 100 240, 115 245, 125 235
                 C 140 220, 160 225, 175 215
                 C 185 225, 205 210, 220 230
                 C 210 250, 230 260, 210 275
                 C 180 270, 160 280, 130 270
                 C 105 280, 95 265, 90 250 Z"
              fill="#564233"
              opacity="0.88"
            />
            {/* Lower Sill & Door Mud */}
            <path
              d="M 230 250
                 C 250 245, 270 260, 290 248
                 C 310 255, 340 240, 360 260
                 C 380 250, 410 262, 430 252
                 C 450 265, 470 255, 490 275
                 L 220 275 Z"
              fill="#564233"
              opacity="0.85"
            />
            {/* Rear Wheel Arch Mud Clustered Blobs */}
            <path
              d="M 490 250
                 C 510 230, 530 235, 550 220
                 C 575 220, 600 230, 620 215
                 C 645 225, 670 220, 685 245
                 C 710 240, 735 255, 750 275
                 L 480 275 Z"
              fill="#564233"
              opacity="0.88"
            />
            {/* Organic Mud Droplets & Specks */}
            <circle cx="160" cy="180" r="5" fill="#4B392C" />
            <circle cx="190" cy="195" r="7" fill="#4B392C" />
            <circle cx="280" cy="225" r="6" fill="#4B392C" />
            <circle cx="340" cy="210" r="4" fill="#4B392C" />
            <circle cx="460" cy="215" r="6" fill="#4B392C" />
            <circle cx="510" cy="190" r="5" fill="#4B392C" />
            <circle cx="640" cy="175" r="7" fill="#4B392C" />
            <circle cx="710" cy="205" r="5" fill="#4B392C" />
            <path d="M 270 170 Q 285 180 275 190" stroke="#4B392C" strokeWidth="4" strokeLinecap="round" />
            <path d="M 580 160 Q 595 170 590 185" stroke="#4B392C" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* =========================================================================
            WHEELS: 8-SPOKE ALLOY FAN RIMS (MATCHING FRAME 020)
        ========================================================================= */}
        {/* Front Wheel Assembly (cx = 175, cy = 285) */}
        <g transform="translate(175, 285)">
          {/* Black Rubber Tire */}
          <circle cx="0" cy="0" r="65" fill="#241D19" stroke={strokeColor} strokeWidth="5" />
          {/* Inner Rim Lip */}
          <circle cx="0" cy="0" r="46" fill="#3D332A" />
          {/* 8-Spoke Fan Alloy Rims */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <polygon
              key={deg}
              points="-6,-12 0,-44 6,-12"
              fill="#E8DCC4"
              stroke="#B3A58B"
              strokeWidth="1.5"
              transform={`rotate(${deg})`}
            />
          ))}
          {/* Center Hub */}
          <circle cx="0" cy="0" r="14" fill="#241D19" stroke="#E8DCC4" strokeWidth="2.5" />
        </g>

        {/* Rear Wheel Assembly (cx = 575, cy = 285) */}
        <g transform="translate(575, 285)">
          {/* Black Rubber Tire */}
          <circle cx="0" cy="0" r="65" fill="#241D19" stroke={strokeColor} strokeWidth="5" />
          {/* Inner Rim Lip */}
          <circle cx="0" cy="0" r="46" fill="#3D332A" />
          {/* 8-Spoke Fan Alloy Rims */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <polygon
              key={deg}
              points="-6,-12 0,-44 6,-12"
              fill="#E8DCC4"
              stroke="#B3A58B"
              strokeWidth="1.5"
              transform={`rotate(${deg})`}
            />
          ))}
          {/* Center Hub */}
          <circle cx="0" cy="0" r="14" fill="#241D19" stroke="#E8DCC4" strokeWidth="2.5" />
        </g>

        {/* =========================================================================
            CLEAN STATE: SHINING SPARKLE STARS
        ========================================================================= */}
        {isClean && (
          <g>
            {/* Sparkle 1 on Front Hood */}
            <g transform="translate(130, 160)">
              <polygon points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4" fill="#FFFFFF" />
            </g>
            {/* Sparkle 2 on Roof */}
            <g transform="translate(420, 40)">
              <polygon points="0,-22 5,-5 22,0 5,5 0,22 -5,5 -22,0 -5,-5" fill="#FFFFFF" />
            </g>
            {/* Sparkle 3 on Rear Trunk */}
            <g transform="translate(720, 145)">
              <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#FFFFFF" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
