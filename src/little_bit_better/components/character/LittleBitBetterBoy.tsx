import React from 'react';

export type BoyPose =
  | 'standing_idle'
  | 'bust_glance_back'
  | 'bust_stoop_look'
  | 'bust_presenter'
  | 'holding_cash'
  | 'slumped_broke'
  | 'holding_book'
  | 'asking_upfront'
  | 'waving'
  | 'hands_on_hips';

interface LittleBitBetterBoyProps {
  pose?: BoyPose;
  colorTheme?: 'teal' | 'brown';
  x?: number;
  y?: number;
  scale?: number;
  headTurn?: 'forward' | 'left' | 'right';
  opacity?: number;
}

/**
 * Authentic Character Rig for Little Bit Better.
 * Features:
 * - Strictly floating almond head (~15px detached from torso)
 * - 3 sharp tufts of sweeping forehead hair
 * - Deep wide scooped neck collar
 * - Organic plump rounded torso
 * - Ultra-long thin stick legs (2.5x torso height) with flat capsule shoes
 * - Authentic poses: Extreme foreground bust shots, cash holding, beggar slump, presenter
 */
export const LittleBitBetterBoy: React.FC<LittleBitBetterBoyProps> = ({
  pose = 'standing_idle',
  colorTheme = 'brown',
  x = 0,
  y = 0,
  scale = 1.0,
  headTurn = 'forward',
  opacity = 1.0,
}) => {
  const shirtColor = colorTheme === 'teal' ? '#045B63' : '#3D312A';
  const hairColor = colorTheme === 'teal' ? '#045B63' : '#322620';
  const skinColor = '#FDFBF7';
  const outlineColor = colorTheme === 'teal' ? '#045B63' : '#322620';

  // =========================================================================
  // RENDER HEAD (DETACHED & FLOATING)
  // =========================================================================
  const renderHead = (cx: number, cy: number, turn: 'forward' | 'left' | 'right', mood = 'normal') => {
    return (
      <g transform={`translate(${cx}, ${cy})`}>
        {/* Floating Almond Head Contour */}
        <path
          d="M 60 40 C 60 12, 100 10, 115 28 C 130 10, 170 12, 170 40 C 172 75, 160 115, 115 118 C 70 115, 58 75, 60 40 Z"
          fill={skinColor}
          stroke={outlineColor}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Left Ear */}
        <path
          d="M 61 58 Q 50 63 60 76"
          fill={skinColor}
          stroke={outlineColor}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 3-Tuft Swooping Hair */}
        <path
          d="M 58 54
             C 54 26, 85 8, 120 8
             C 145 8, 170 16, 172 44
             L 174 56
             C 170 48, 165 42, 158 40
             C 168 32, 176 34, 178 30
             C 170 24, 156 22, 145 28
             C 130 18, 105 18, 92 28
             C 80 38, 70 46, 68 56
             Z"
          fill={hairColor}
        />
        {/* The 3 signature rightward pointed tufts */}
        <path
          d="M 155 24 Q 174 25 178 33 Q 166 38 156 36
             M 160 38 Q 178 44 176 54 Q 165 52 158 48
             M 148 18 Q 166 14 172 20 Q 160 26 150 24"
          fill={hairColor}
          stroke={hairColor}
          strokeWidth="2"
        />

        {/* Facial Features */}
        {mood === 'sad' ? (
          // Broke beggar sad expression
          <>
            {/* Sad downturned eyebrows */}
            <path d="M 82 45 Q 92 52 100 50" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 130 50 Q 138 52 148 45" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Sad eyes */}
            <circle cx="92" cy="56" r="4.5" fill={outlineColor} />
            <circle cx="138" cy="56" r="4.5" fill={outlineColor} />
            {/* Nose tick */}
            <polyline points="115,58 116,68 111,68" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Sad mouth */}
            <path d="M 108 86 Q 115 80 122 86" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'smiling' ? (
          // Happy smiling eyes (^ ^)
          <>
            <path d="M 84 54 Q 92 46 100 54" stroke={outlineColor} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 130 54 Q 138 46 146 54" stroke={outlineColor} strokeWidth="5" strokeLinecap="round" fill="none" />
            <polyline points="115,56 116,66 111,66" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 106 80 Q 115 90 124 80" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        ) : turn === 'right' ? (
          // Glancing back over shoulder (Shot 3)
          <>
            <path d="M 88 42 Q 98 38 108 42" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 134 42 Q 144 38 152 42" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Pupils shifted to bottom-right */}
            <circle cx="102" cy="53" r="5" fill={outlineColor} />
            <circle cx="146" cy="53" r="5" fill={outlineColor} />
            <polyline points="126,56 128,68 122,68" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        ) : turn === 'left' ? (
          // Looking back left toward car wash (Shot 9 start)
          <>
            <path d="M 82 42 Q 90 38 100 42" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 126 42 Q 134 38 144 42" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="86" cy="53" r="5" fill={outlineColor} />
            <circle cx="130" cy="53" r="5" fill={outlineColor} />
            <polyline points="106,56 108,68 102,68" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        ) : (
          // Calm forward gaze
          <>
            <path d="M 84 40 Q 94 36 104 40" stroke={outlineColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 128 40 Q 138 36 148 40" stroke={outlineColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="94" cy="52" r="5" fill={outlineColor} />
            <circle cx="138" cy="52" r="5" fill={outlineColor} />
            <polyline points="115,56 117,68 111,68" stroke={outlineColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        )}
      </g>
    );
  };

  // =========================================================================
  // RENDER CASH BILLS (AUTHENTIC FAN FOLD)
  // =========================================================================
  const renderCashBills = (bx: number, by: number, count = 3) => {
    return (
      <g transform={`translate(${bx}, ${by})`}>
        {/* Bill 3 (Back) */}
        {count >= 3 && (
          <g transform="rotate(-12, 60, 40)">
            <rect x="0" y="0" width="115" height="60" rx="8" fill="#52D172" stroke="#045B63" strokeWidth="4.5" />
            <rect x="6" y="5" width="103" height="50" rx="5" fill="none" stroke="#2BA84A" strokeWidth="2" strokeDasharray="5 3" />
          </g>
        )}
        {/* Bill 2 (Middle) */}
        {count >= 2 && (
          <g transform="rotate(-4, 60, 40)">
            <rect x="5" y="4" width="115" height="60" rx="8" fill="#5CE580" stroke="#045B63" strokeWidth="4.5" />
            <circle cx="62" cy="34" r="14" fill="#75F496" stroke="#2BA84A" strokeWidth="2" />
          </g>
        )}
        {/* Bill 1 (Front) */}
        <g transform="rotate(4, 60, 40)">
          <rect x="10" y="8" width="120" height="62" rx="8" fill="#69F58F" stroke="#045B63" strokeWidth="5" />
          <rect x="16" y="13" width="108" height="52" rx="5" fill="none" stroke="#2BA84A" strokeWidth="2.5" />
          <circle cx="70" cy="39" r="16" fill="#8CF8A8" stroke="#2BA84A" strokeWidth="2.5" />
          {/* Dollar Sign */}
          <text
            x="70"
            y="47"
            textAnchor="middle"
            fontSize="26"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            fill="#045B63"
          >
            $
          </text>
          <circle cx="26" cy="39" r="4.5" fill="#2BA84A" />
          <circle cx="114" cy="39" r="4.5" fill="#2BA84A" />
        </g>
      </g>
    );
  };

  // =========================================================================
  // RENDER RICH DAD POOR DAD BOOK
  // =========================================================================
  const renderRichDadBook = (bx: number, by: number) => {
    return (
      <g transform={`translate(${bx}, ${by}) rotate(-14)`}>
        {/* 3D Spine */}
        <polygon points="0,20 22,0 22,230 0,250" fill="#2E1B4E" stroke="#1F1335" strokeWidth="4" />
        {/* Front Cover */}
        <rect x="22" y="0" width="165" height="230" rx="6" fill="#9344BA" stroke="#1F1335" strokeWidth="5" />
        {/* Lower Charcoal Band */}
        <path d="M 22 170 L 187 170 L 187 230 L 22 230 Z" fill="#2D3136" />
        {/* White Pages at Bottom */}
        <polygon points="0,250 22,230 187,230 170,256 0,256" fill="#F8F6EF" stroke="#1F1335" strokeWidth="4" />
        <line x1="24" y1="237" x2="168" y2="237" stroke="#C2BDB0" strokeWidth="2" />
        <line x1="20" y1="244" x2="164" y2="244" stroke="#C2BDB0" strokeWidth="2" />
        <line x1="16" y1="250" x2="160" y2="250" stroke="#C2BDB0" strokeWidth="2" />

        {/* Text: RICH DAD */}
        <text
          x="105"
          y="68"
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fontFamily="Impact, sans-serif"
          letterSpacing="1"
          fill="#FFC72C"
        >
          RICH
        </text>
        <text
          x="105"
          y="114"
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fontFamily="Impact, sans-serif"
          letterSpacing="1"
          fill="#FFC72C"
        >
          DAD
        </text>
        {/* Text: POOR DAD */}
        <text
          x="105"
          y="156"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          letterSpacing="1"
          fill="#FFFFFF"
        >
          POOR DAD
        </text>
      </g>
    );
  };

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
      <svg width="600" height="750" viewBox="0 0 600 750" fill="none">
        {/* =========================================================================
            POSE 1: BUST GLANCE BACK (SHOT 3 FOREGROUND - STREET PAN)
            Huge foreground bust looking back over shoulder at parked cars.
        ========================================================================= */}
        {pose === 'bust_glance_back' && (
          <g>
            {/* Upper Torso (cut off at bottom) */}
            <path
              d="M 60 480
                 C 50 360, 110 260, 190 240
                 C 220 232, 270 232, 300 240
                 C 380 260, 440 360, 430 480
                 Z"
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="4"
            />
            {/* Scooped Neckline exposing skin space */}
            <path
              d="M 180 242 Q 245 320 310 242"
              fill={skinColor}
              stroke={outlineColor}
              strokeWidth="5"
            />
            {/* Left Arm at side */}
            <path
              d="M 110 320 Q 50 380 40 480"
              stroke={outlineColor}
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            {/* Floating Almond Head (looking back/right) */}
            {renderHead(135, 110, 'right', 'normal')}
          </g>
        )}

        {/* =========================================================================
            POSE 2: BUST PRESENTER (SHOT 9 FOREGROUND - CAR WASH CLIMAX)
            Huge foreground bust on right side gesturing left, turning to viewer.
        ========================================================================= */}
        {pose === 'bust_presenter' && (
          <g>
            {/* Upper Torso */}
            <path
              d="M 60 480
                 C 50 360, 110 260, 190 240
                 C 220 232, 270 232, 300 240
                 C 380 260, 440 360, 430 480
                 Z"
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="4"
            />
            {/* Scooped Neckline */}
            <path
              d="M 180 242 Q 245 320 310 242"
              fill={skinColor}
              stroke={outlineColor}
              strokeWidth="5"
            />
            {/* Gesturing Arm pointing back toward car wash squad (leftwards) */}
            <path
              d="M 120 310 Q 30 310 -80 270"
              stroke={outlineColor}
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Arm hanging */}
            <path
              d="M 370 310 Q 420 370 430 480"
              stroke={outlineColor}
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            {/* Floating Almond Head (headTurn prop controls glance) */}
            {renderHead(135, 110, headTurn, 'normal')}
          </g>
        )}

        {/* =========================================================================
            POSE 3: BUST STOOP LOOK (SHOT 6 FOREGROUND - LOOKING AT NEIGHBOR ON STOOP)
        ========================================================================= */}
        {pose === 'bust_stoop_look' && (
          <g>
            <path
              d="M 60 480 C 50 360, 110 260, 190 240 C 220 232, 270 232, 300 240 C 380 260, 440 360, 430 480 Z"
              fill={shirtColor}
            />
            <path d="M 180 242 Q 245 320 310 242" fill={skinColor} stroke={outlineColor} strokeWidth="5" />
            {/* Arm gesturing up towards stoop */}
            <path d="M 360 310 Q 430 330 480 250" stroke={outlineColor} strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 110 320 Q 50 380 40 480" stroke={outlineColor} strokeWidth="18" strokeLinecap="round" fill="none" />
            {renderHead(135, 110, 'right', 'normal')}
          </g>
        )}

        {/* =========================================================================
            POSE 4: SLUMPED BROKE (BEGGAR AT BRICK WALL - SHOT 1)
        ========================================================================= */}
        {pose === 'slumped_broke' && (
          <g transform="translate(60, 100)">
            {/* Torso sitting on ground with patched tears */}
            <path
              d="M 60 270
                 C 55 200, 85 160, 125 150
                 C 145 145, 185 145, 205 150
                 C 245 160, 275 200, 270 270
                 C 270 300, 60 300, 60 270 Z"
              fill={shirtColor}
            />
            {/* Jagged ripped collar */}
            <path
              d="M 125 152
                 L 135 170 L 145 158 L 155 174 L 165 158 L 175 172 L 185 158 L 195 170 L 205 152 Z"
              fill={skinColor}
              stroke={outlineColor}
              strokeWidth="4"
            />
            {/* Left Patch */}
            <rect x="75" y="180" width="28" height="24" rx="3" fill="#2E7E88" opacity="0.8" />
            <line x1="72" y1="184" x2="106" y2="184" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="72" y1="200" x2="106" y2="200" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />
            {/* Right Patch */}
            <rect x="220" y="210" width="30" height="26" rx="3" fill="#2E7E88" opacity="0.8" />
            <line x1="216" y1="216" x2="252" y2="216" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="216" y1="230" x2="252" y2="230" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />

            {/* Drooping arms */}
            <path d="M 80 180 Q 50 250 50 320" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M 250 180 Q 260 240 255 295" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />

            {/* Slumped Bent Legs */}
            <path
              d="M 210 270
                 C 250 230, 290 230, 310 280
                 L 310 370"
              stroke={outlineColor}
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 180 270
                 C 230 220, 270 220, 280 290
                 L 270 370"
              stroke={outlineColor}
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            {/* Shoes */}
            <path d="M 255 370 L 295 370 C 295 350, 255 350, 255 370 Z" fill={outlineColor} />
            <path d="M 295 370 L 335 370 C 335 350, 295 350, 295 370 Z" fill={outlineColor} />

            {/* Floating Sad Head */}
            {renderHead(50, 30, 'forward', 'sad')}

            {/* Broken chipped bowl on ground in front */}
            <g transform="translate(130, 340)">
              <ellipse cx="40" cy="12" rx="35" ry="10" fill="#034B52" stroke="#023237" strokeWidth="3" />
              <path
                d="M 5 12 Q 40 45 75 12
                   C 68 12, 65 18, 62 14
                   C 58 10, 55 12, 5 12 Z"
                fill="#045B63"
                stroke="#023237"
                strokeWidth="3"
              />
            </g>
          </g>
        )}

        {/* =========================================================================
            POSE 5: FULL BODY (IDLE / CASH / BOOK / ASKING / WAVING / HANDS ON HIPS)
        ========================================================================= */}
        {pose !== 'bust_glance_back' &&
          pose !== 'bust_presenter' &&
          pose !== 'bust_stoop_look' &&
          pose !== 'slumped_broke' && (
            <g transform="translate(110, 80)">
              {/* Plump Torso */}
              <path
                d="M 50 160
                   C 35 125, 65 95, 105 88
                   C 125 85, 155 85, 175 88
                   C 215 95, 245 125, 230 160
                   C 220 220, 60 220, 50 160 Z"
                fill={shirtColor}
              />
              {/* Scooped Neckline */}
              <path
                d="M 105 89 Q 140 145 175 89"
                fill={skinColor}
                stroke={outlineColor}
                strokeWidth="5"
              />

              {/* Ultra-Long Stick Legs (2.5x torso height) */}
              <line x1="95" y1="210" x2="88" y2="440" stroke={outlineColor} strokeWidth="10" strokeLinecap="round" />
              <line x1="185" y1="210" x2="192" y2="440" stroke={outlineColor} strokeWidth="10" strokeLinecap="round" />
              {/* Shoes */}
              <path d="M 68 440 L 112 440 C 112 422, 68 422, 68 440 Z" fill={outlineColor} />
              <path d="M 172 440 L 216 440 C 216 422, 172 422, 172 440 Z" fill={outlineColor} />

              {/* Arms based on Pose */}
              {pose === 'holding_cash' && (
                <>
                  <path d="M 60 120 Q 30 180 20 220" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  {/* Left Arm holding cash upright */}
                  <path d="M 220 120 Q 255 180 270 95" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  {renderCashBills(225, 30, 3)}
                </>
              )}

              {pose === 'holding_book' && (
                <>
                  <path d="M 60 120 Q 30 180 20 220" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  <path d="M 220 120 Q 260 160 250 100" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  {renderRichDadBook(180, -30)}
                </>
              )}

              {pose === 'asking_upfront' && (
                <>
                  {/* Right hand on hip */}
                  <path d="M 220 125 Q 265 155 225 185" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  {/* Left hand gesturing out to the left towards neighbor */}
                  <path d="M 60 125 Q -10 145 -60 120" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                </>
              )}

              {pose === 'waving' && (
                <>
                  <path d="M 60 125 Q 30 180 20 220" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  {/* Arm curved up waving */}
                  <path d="M 220 125 Q 260 120 270 65" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                </>
              )}

              {pose === 'hands_on_hips' && (
                <>
                  <path d="M 60 125 Q 15 155 55 185" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  <path d="M 220 125 Q 265 155 225 185" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                </>
              )}

              {pose === 'standing_idle' && (
                <>
                  <path d="M 60 125 Q 30 180 20 220" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                  <path d="M 220 125 Q 250 180 260 220" stroke={outlineColor} strokeWidth="11" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Floating Head */}
              {renderHead(
                25,
                -30,
                headTurn,
                pose === 'waving' ? 'smiling' : 'normal'
              )}
            </g>
          )}
      </svg>
    </div>
  );
};
