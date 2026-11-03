import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export type LBBCharacterAction =
  | 'idle'
  | 'holding_cash'
  | 'beggar_slump'
  | 'holding_book'
  | 'pointing_up'
  | 'pointing_side'
  | 'waving'
  | 'shrugging'
  | 'asking_deal'
  | 'hands_on_hips'
  | 'walking'
  | 'scrubbing';

interface LBBUnifiedCharacterProps {
  action?: LBBCharacterAction;
  colorTheme?: 'pine' | 'tan' | 'espresso';
  x?: number;
  y?: number;
  scale?: number;
  flipHorizontal?: boolean;
  headTurn?: 'forward' | 'left' | 'right';
  showBlink?: boolean;
  idleActive?: boolean;
}

/**
 * Unified Little Bit Better Character Rig.
 * Enforces the strict 5-element design language:
 * - Canvas: #F4EEDF
 * - Primary Ink: #165046 (Deep Pine Green)
 * - Secondary Ink: #967D69 (Warm Tan)
 * - Highlight: #D4B26F (Soft Gold)
 * - Stroke: Constant 3.5px-4px Charcoal Line Width (#2A2421)
 *
 * Kinematics & Secondary Dynamics:
 * - Idle Micro-Shift: continuous 1.2s sine wave breathe/bob (prevents frozen look)
 * - Eye Blink: natural 3-4 frame blink every 3.5-4.5s
 * - Rubber-hose noodle limbs with shoulder/hip pivot rotations
 */
export const LBBUnifiedCharacter: React.FC<LBBUnifiedCharacterProps> = ({
  action = 'idle',
  colorTheme = 'pine',
  x = 0,
  y = 0,
  scale = 1.0,
  flipHorizontal = false,
  headTurn = 'forward',
  showBlink = true,
  idleActive = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Color tokens
  const shirtColor =
    colorTheme === 'pine'
      ? '#165046'
      : colorTheme === 'tan'
      ? '#967D69'
      : '#3D312A';
  const hairColor = colorTheme === 'pine' ? '#165046' : '#2D231E';
  const skinColor = '#FDFBF7';
  const strokeColor = '#2A2421';
  const strokeWidth = 3.8;

  // =========================================================================
  // 1. IDLE MICRO-SHIFT (CONTINUOUS ~1.2s SINE WAVE BREATHE & BOB)
  // =========================================================================
  const idleBob = idleActive
    ? Math.sin((frame / fps) * 2 * Math.PI * 0.8) * 3.5
    : 0;
  const torsoBreath = idleActive
    ? 1.0 + Math.sin((frame / fps) * 2 * Math.PI * 0.4) * 0.018
    : 1.0;

  // =========================================================================
  // 2. EYE BLINK CYCLE (LASTS 3 FRAMES EVERY 110-130 FRAMES)
  // =========================================================================
  const blinkCycle = frame % 120;
  const isBlinking = showBlink && blinkCycle >= 105 && blinkCycle <= 108;

  // Walking cycle oscillation
  const walkSwing =
    action === 'walking' ? Math.sin((frame / fps) * 2 * Math.PI * 2.2) * 22 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale}) ${flipHorizontal ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="400" height="700" viewBox="0 0 400 700" fill="none">
        {/* =========================================================================
            SLUMPED BEGGAR MODE (BROKE AT BRICK WALL)
        ========================================================================= */}
        {action === 'beggar_slump' ? (
          <g transform={`translate(100, ${180 + idleBob * 0.5})`}>
            {/* Torso Sitting on Ground */}
            <path
              d="M 40 180
                 C 30 110, 60 70, 100 60
                 C 120 55, 160 55, 180 60
                 C 220 70, 250 110, 240 180
                 C 240 210, 40 210, 40 180 Z"
              fill={shirtColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            {/* Jagged Sawtooth Torn Collar */}
            <path
              d="M 100 62 L 110 80 L 120 68 L 130 84 L 140 68 L 150 82 L 160 68 L 170 80 L 180 62 Z"
              fill={skinColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            {/* Patches with Stitches */}
            <rect x="55" y="90" width="28" height="22" rx="3" fill="#2E7E88" opacity="0.8" />
            <line x1="52" y1="94" x2="86" y2="94" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="52" y1="108" x2="86" y2="108" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />

            <rect x="195" y="120" width="30" height="24" rx="3" fill="#2E7E88" opacity="0.8" />
            <line x1="191" y1="125" x2="227" y2="125" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="191" y1="138" x2="227" y2="138" stroke="#FAF5DE" strokeWidth="2" strokeDasharray="3 3" />

            {/* Limp Drooping Noodle Arms */}
            <path d="M 60 90 Q 30 160 30 230" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M 220 90 Q 230 150 225 205" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />

            {/* Bent Legs Loop */}
            <path d="M 180 180 C 220 140, 260 140, 280 190 L 280 280" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M 150 180 C 200 130, 240 130, 250 200 L 240 280" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M 225 280 L 265 280 C 265 264, 225 264, 225 280 Z" fill={strokeColor} />
            <path d="M 265 280 L 305 280 C 305 264, 265 264, 265 280 Z" fill={strokeColor} />

            {/* Floating Sad Head (~15px detached) */}
            <g transform="translate(65, -45)">
              <ellipse cx="75" cy="50" rx="42" ry="46" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
              <path d="M 33 50 C 32 20, 65 10, 105 10 C 120 10, 125 35, 122 50 Z" fill={hairColor} />
              {/* Sad Eyebrows & Eyes */}
              <path d="M 52 42 Q 62 48 70 46" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 90 46 Q 98 48 108 42" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {isBlinking ? (
                <>
                  <line x1="58" y1="52" x2="68" y2="52" stroke={strokeColor} strokeWidth="3" />
                  <line x1="94" y1="52" x2="104" y2="52" stroke={strokeColor} strokeWidth="3" />
                </>
              ) : (
                <>
                  <circle cx="63" cy="52" r="4" fill={strokeColor} />
                  <circle cx="99" cy="52" r="4" fill={strokeColor} />
                </>
              )}
              <polyline points="80,52 82,62 77,62" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 72 78 Q 80 72 88 78" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>

            {/* Chipped Broken Bowl on Ground */}
            <g transform="translate(100, 250)">
              <ellipse cx="40" cy="12" rx="35" ry="10" fill="#034B52" stroke={strokeColor} strokeWidth="3" />
              <path d="M 5 12 Q 40 45 75 12 C 68 12, 65 18, 62 14 C 58 10, 55 12, 5 12 Z" fill="#045B63" stroke={strokeColor} strokeWidth="3" />
            </g>
          </g>
        ) : (
          /* =========================================================================
              STANDARD ACTIVE RIG: IDLE / CASH / GESTURING / WALKING / WAVING
          ========================================================================= */
          <g transform={`translate(100, ${70 + idleBob})`}>
            {/* =========================================================================
                FLOATING ALMOND HEAD (DETACHED ~15px ABOVE SCOOP COLLAR)
            ========================================================================= */}
            <g transform={`translate(35, ${-25 + (action === 'walking' ? Math.abs(idleBob) * 0.8 : 0)})`}>
              {/* Head Contour */}
              <ellipse cx="65" cy="50" rx="42" ry="46" fill={skinColor} stroke={strokeColor} strokeWidth={strokeWidth} />
              {/* Ear */}
              <path d="M 23 48 Q 14 53 23 64" fill={skinColor} stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />

              {/* 3-Tuft Swooping Hair */}
              <path
                d="M 22 45
                   C 20 18, 52 8, 85 8
                   C 105 8, 118 20, 118 36
                   C 114 30, 108 26, 100 24
                   C 110 20, 118 22, 120 18
                   C 112 14, 98 12, 88 18
                   C 75 10, 52 10, 42 18
                   C 32 26, 24 34, 22 45 Z"
                fill={hairColor}
              />
              {/* The 3 Signature Rightward Tufts */}
              <path d="M 98 16 Q 116 16 120 23 Q 108 27 98 25" fill={hairColor} stroke={hairColor} strokeWidth="1.5" />
              <path d="M 104 27 Q 120 32 118 40 Q 107 38 102 34" fill={hairColor} stroke={hairColor} strokeWidth="1.5" />
              <path d="M 92 10 Q 108 8 114 14 Q 102 18 94 16" fill={hairColor} stroke={hairColor} strokeWidth="1.5" />

              {/* Facial Features (Eyes, Eyebrows, Nose, Mouth) */}
              {action === 'waving' ? (
                // Happy Squint Eyes (^ ^)
                <>
                  <path d="M 45 46 Q 52 38 59 46" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 75 46 Q 82 38 89 46" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
                  <polyline points="66,48 67,58 62,58" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 58 68 Q 67 78 76 68" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : (
                // Normal Gaze / Blinking
                <>
                  <path d="M 44 38 Q 52 34 60 38" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M 74 38 Q 82 34 90 38" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  {isBlinking ? (
                    <>
                      <line x1="48" y1="48" x2="56" y2="48" stroke={strokeColor} strokeWidth="3" />
                      <line x1="78" y1="48" x2="86" y2="48" stroke={strokeColor} strokeWidth="3" />
                    </>
                  ) : headTurn === 'right' ? (
                    <>
                      <circle cx="56" cy="48" r="4.2" fill={strokeColor} />
                      <circle cx="86" cy="48" r="4.2" fill={strokeColor} />
                    </>
                  ) : headTurn === 'left' ? (
                    <>
                      <circle cx="48" cy="48" r="4.2" fill={strokeColor} />
                      <circle cx="78" cy="48" r="4.2" fill={strokeColor} />
                    </>
                  ) : (
                    <>
                      <circle cx="52" cy="48" r="4.2" fill={strokeColor} />
                      <circle cx="82" cy="48" r="4.2" fill={strokeColor} />
                    </>
                  )}
                  <polyline points="66,48 67,58 62,58" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </>
              )}
            </g>

            {/* =========================================================================
                BEAN / CAPSULE TORSO WITH WIDE SCOOPED NECKLINE
            ========================================================================= */}
            <g transform={`scale(1, ${torsoBreath})`}>
              <path
                d="M 35 150
                   C 20 115, 45 85, 80 78
                   C 100 75, 125 75, 145 78
                   C 180 85, 205 115, 190 150
                   C 180 205, 45 205, 35 150 Z"
                fill={shirtColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
              {/* Wide Scooped Collar Line */}
              <path
                d="M 80 80 Q 112 135 145 80"
                fill={skinColor}
                stroke={strokeColor}
                strokeWidth="4"
              />
            </g>

            {/* =========================================================================
                NOODLE LEGS & FLAT PILL SHOES (2.5x TORSO HEIGHT)
            ========================================================================= */}
            {/* Left Leg */}
            <g style={{ transformOrigin: '75px 200px', transform: `rotate(${-walkSwing}deg)` }}>
              <line x1="75" y1="200" x2="70" y2="430" stroke={strokeColor} strokeWidth="9" strokeLinecap="round" />
              <path d="M 50 430 L 92 430 C 92 414, 50 414, 50 430 Z" fill={strokeColor} />
            </g>
            {/* Right Leg */}
            <g style={{ transformOrigin: '150px 200px', transform: `rotate(${walkSwing}deg)` }}>
              <line x1="150" y1="200" x2="155" y2="430" stroke={strokeColor} strokeWidth="9" strokeLinecap="round" />
              <path d="M 135 430 L 177 430 C 177 414, 135 414, 135 430 Z" fill={strokeColor} />
            </g>

            {/* =========================================================================
                RUBBER-HOSE NOODLE ARMS (SHOULDER PIVOTS)
            ========================================================================= */}
            {/* Left Arm (Shoulder Pivot at x: 45, y: 110) */}
            {action === 'holding_cash' ? (
              <g style={{ transformOrigin: '45px 110px' }}>
                <path d="M 45 110 Q 15 170 10 210" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            ) : action === 'pointing_up' ? (
              <g style={{ transformOrigin: '45px 110px', transform: 'rotate(-40deg)' }}>
                <path d="M 45 110 Q 20 60 15 0" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            ) : action === 'shrugging' ? (
              <g style={{ transformOrigin: '45px 110px', transform: 'rotate(25deg)' }}>
                <path d="M 45 110 Q 0 140 -20 120" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            ) : action === 'hands_on_hips' ? (
              <path d="M 45 110 Q 10 145 42 175" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
            ) : action === 'asking_deal' ? (
              <path d="M 45 110 Q -10 135 -45 110" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
            ) : (
              // Idle / Walking natural swing
              <g style={{ transformOrigin: '45px 110px', transform: `rotate(${walkSwing * 0.8}deg)` }}>
                <path d="M 45 110 Q 20 160 15 205" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Right Arm (Shoulder Pivot at x: 180, y: 110) */}
            {action === 'holding_cash' ? (
              <g style={{ transformOrigin: '180px 110px' }}>
                {/* Arm holding cash upright */}
                <path d="M 180 110 Q 215 160 225 90" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
                {/* 3 Fan-Folded Cash Bills in Hand */}
                <g transform="translate(190, 30)">
                  <g transform="rotate(-12, 50, 30)">
                    <rect x="0" y="0" width="95" height="50" rx="6" fill="#52D172" stroke={strokeColor} strokeWidth="3.5" />
                  </g>
                  <g transform="rotate(-4, 50, 30)">
                    <rect x="4" y="2" width="95" height="50" rx="6" fill="#5CE580" stroke={strokeColor} strokeWidth="3.5" />
                  </g>
                  <g transform="rotate(4, 50, 30)">
                    <rect x="8" y="4" width="98" height="52" rx="6" fill="#69F58F" stroke={strokeColor} strokeWidth="3.5" />
                    <circle cx="57" cy="30" r="13" fill="#8CF8A8" stroke="#165046" strokeWidth="2" />
                    <text x="57" y="37" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#165046">$</text>
                  </g>
                </g>
              </g>
            ) : action === 'holding_book' ? (
              <g style={{ transformOrigin: '180px 110px' }}>
                <path d="M 180 110 Q 220 150 210 90" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
                {/* Rich Dad Poor Dad Book */}
                <g transform="translate(160, -35) rotate(-14)">
                  <polygon points="0,15 18,0 18,190 0,205" fill="#2E1B4E" stroke={strokeColor} strokeWidth="3.5" />
                  <rect x="18" y="0" width="135" height="190" rx="5" fill="#9344BA" stroke={strokeColor} strokeWidth="3.8" />
                  <rect x="18" y="140" width="135" height="50" fill="#2D3136" />
                  <polygon points="0,205 18,190 153,190 140,212 0,212" fill="#F8F6EF" stroke={strokeColor} strokeWidth="3" />
                  <text x="85" y="55" textAnchor="middle" fontSize="28" fontWeight="900" fontFamily="Impact" fill="#FFC72C">RICH</text>
                  <text x="85" y="95" textAnchor="middle" fontSize="28" fontWeight="900" fontFamily="Impact" fill="#FFC72C">DAD</text>
                  <text x="85" y="130" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#FFFFFF">POOR DAD</text>
                </g>
              </g>
            ) : action === 'waving' ? (
              <g style={{ transformOrigin: '180px 110px' }}>
                <path d="M 180 110 Q 220 100 230 50" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            ) : action === 'hands_on_hips' ? (
              <path d="M 180 110 Q 215 145 182 175" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
            ) : action === 'shrugging' ? (
              <g style={{ transformOrigin: '180px 110px', transform: 'rotate(-25deg)' }}>
                <path d="M 180 110 Q 225 140 245 120" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              // Idle / Walking swing
              <g style={{ transformOrigin: '180px 110px', transform: `rotate(${-walkSwing * 0.8}deg)` }}>
                <path d="M 180 110 Q 205 160 210 205" stroke={strokeColor} strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
