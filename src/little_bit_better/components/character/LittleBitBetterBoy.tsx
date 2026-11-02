import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export type BoyPose =
  | 'standing_idle'
  | 'holding_cash'
  | 'slumped_broke'
  | 'holding_book'
  | 'hands_on_hips'
  | 'asking_for_cash'
  | 'waving'
  | 'close_up';

interface LittleBitBetterBoyProps {
  pose?: BoyPose;
  colorTheme?: 'teal' | 'brown'; // Teal for intro, brown for street/doorway
  delay?: number;
  scale?: number;
  x?: number;
  y?: number;
  flipHorizontal?: boolean;
}

export const LittleBitBetterBoy: React.FC<LittleBitBetterBoyProps> = ({
  pose = 'standing_idle',
  colorTheme = 'teal',
  delay = 0,
  scale = 1,
  x = 0,
  y = 0,
  flipHorizontal = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.7 },
  });

  if (frame < delay) return null;

  const mainColor = colorTheme === 'teal' ? '#045B63' : '#3D312A';
  const skinColor = '#FDFBF7';
  const strokeW = 5.5;

  // Gentle subtle breathing float
  const idleBob = Math.sin((frame + delay) / 10) * 3;

  // =========================================================================
  // POSE: SLUMPED BROKE (Sitting against wall with cracked bowl)
  // =========================================================================
  if (pose === 'slumped_broke') {
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          transform: `scale(${pop * scale})`,
          transformOrigin: 'bottom center',
          pointerEvents: 'none',
        }}
      >
        <svg width="340" height="300" viewBox="0 0 340 300" fill="none">
          {/* Head (tilted sad) */}
          <g transform="translate(145, 75) rotate(-6)">
            {/* Oval Face */}
            <ellipse cx="0" cy="0" rx="36" ry="42" fill={skinColor} stroke={mainColor} strokeWidth={strokeW} />
            {/* Hair with side tufts */}
            <path
              d="M -35 -14 Q -20 -44 15 -38 Q 38 -32 40 -6 Q 30 -14 20 -10 Q 38 6 36 24 C 28 8 20 6 12 12 Q 2 -25 -20 -18 Z"
              fill={mainColor}
            />
            {/* Sad Eyes & Brows */}
            <circle cx="-12" cy="-4" r="4" fill={mainColor} />
            <circle cx="16" cy="-4" r="4" fill={mainColor} />
            {/* Slanted sad brows */}
            <path d="M -18 -14 Q -12 -12 -6 -16" stroke={mainColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 10 -16 Q 16 -12 22 -14" stroke={mainColor} strokeWidth="3" strokeLinecap="round" />
            {/* Nose & Slanted Mouth */}
            <polygon points="4,2 0,10 5,9" fill={mainColor} />
            <path d="M -6 20 Q 2 16 10 20" stroke={mainColor} strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Neck Scoop */}
          <path d="M 125 108 Q 145 125 165 108" fill={skinColor} stroke={mainColor} strokeWidth={strokeW} />

          {/* Torso with Patches */}
          <rect x="105" y="112" width="80" height="75" rx="22" fill={mainColor} />
          {/* Patch 1 */}
          <rect x="110" y="130" width="16" height="16" fill="#087B86" opacity="0.8" rx="2" stroke={skinColor} strokeWidth="1.5" strokeDasharray="3,2" />
          {/* Patch 2 */}
          <rect x="156" y="145" width="18" height="16" fill="#087B86" opacity="0.8" rx="2" stroke={skinColor} strokeWidth="1.5" strokeDasharray="3,2" />

          {/* Arms hanging limply */}
          <path d="M 108 130 Q 90 170 95 210" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          <path d="M 182 130 Q 192 170 190 200" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />

          {/* Bent Stick Legs sitting on ground */}
          <path d="M 125 185 Q 160 195 220 200" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          <path d="M 190 185 Q 230 190 260 260" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          <ellipse cx="260" cy="265" rx="14" ry="9" fill={mainColor} />
          <ellipse cx="225" cy="265" rx="14" ry="9" fill={mainColor} />

          {/* Cracked Begging Bowl in front */}
          <g transform="translate(145, 230)">
            <ellipse cx="0" cy="0" rx="24" ry="12" fill={mainColor} />
            <path d="M -24 0 Q 0 24 24 0" fill={mainColor} />
            {/* Crack in bowl */}
            <path d="M -2 0 L 2 8 L -1 14" stroke={skinColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // STANDARD STANDING RIG (Poses: idle, holding_cash, holding_book, etc.)
  // =========================================================================
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + idleBob,
        transform: `scale(${pop * scale * (flipHorizontal ? -1 : 1)}, ${pop * scale})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="260" height="420" viewBox="0 0 260 420" fill="none">
        {/* ================= EXTRA LONG STICK LEGS (220px long!) ================= */}
        <line x1="112" y1="210" x2="104" y2="385" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
        <line x1="148" y1="210" x2="156" y2="385" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
        {/* Flat Capsule Shoes */}
        <ellipse cx="98" cy="392" rx="16" ry="10" fill={mainColor} />
        <ellipse cx="162" cy="392" rx="16" ry="10" fill={mainColor} />

        {/* ================= ROUNDED PLUMP BEAN TORSO ================= */}
        <g>
          {/* Main Body */}
          <rect x="85" y="112" width="90" height="98" rx="34" fill={mainColor} />
          {/* Wide Scoop Neckline revealing skin/collar */}
          <path
            d="M 102 112 Q 130 134 158 112 Z"
            fill={skinColor}
            stroke={mainColor}
            strokeWidth={strokeW - 1}
          />
        </g>

        {/* ================= HEAD & HAIR ================= */}
        <g transform="translate(130, 68)">
          {/* Oval White Face */}
          <ellipse cx="0" cy="0" rx="38" ry="44" fill={skinColor} stroke={mainColor} strokeWidth={strokeW} />

          {/* Swept Hair with 3 Right Side Tufts */}
          <path
            d="M -36 -16 C -24 -46 16 -44 38 -12 C 44 2 40 18 38 24 C 30 10 24 8 16 14 Q 28 -22 -14 -16 Z"
            fill={mainColor}
          />
          {/* Fringe Tufts */}
          <path d="M 38 -12 Q 48 -6 44 8 Q 40 2 34 2" fill={mainColor} />
          <path d="M 40 8 Q 48 16 42 24 Q 38 18 34 14" fill={mainColor} />

          {/* Two Dot Eyes */}
          <circle cx="-10" cy="-4" r="4.5" fill={mainColor} />
          <circle cx="18" cy="-4" r="4.5" fill={mainColor} />

          {/* Arched Brows */}
          <path d="M -16 -14 Q -10 -18 -4 -13" stroke={mainColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M 12 -13 Q 18 -18 24 -14" stroke={mainColor} strokeWidth="3" strokeLinecap="round" />

          {/* Sharp Triangular Nose */}
          <polygon points="5,1 0,11 6,10" fill={mainColor} />

          {/* Mouth */}
          {pose === 'waving' ? (
            <path d="M -6 18 Q 4 28 14 18" stroke={mainColor} strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <path d="M -4 20 L 10 20" stroke={mainColor} strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>

        {/* ================= ARMS & PROPS (Driven by Pose) ================= */}
        {/* 1. Idle Pose */}
        {pose === 'standing_idle' && (
          <>
            <path d="M 90 128 Q 65 170 68 200" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            <path d="M 170 128 Q 195 170 192 200" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          </>
        )}

        {/* 2. Holding Cash (Fan of 3 Mint Dollar Bills in Left Hand) */}
        {pose === 'holding_cash' && (
          <>
            <path d="M 90 128 Q 65 170 60 190" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            {/* Raised Left Arm */}
            <path d="M 170 128 Q 200 160 195 125" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            {/* Fan of 3 Dollar Bills */}
            <g transform="translate(175, 80)">
              {/* Bill 1 (Tilted Left) */}
              <g transform="rotate(-18) translate(-10, 0)">
                <rect x="0" y="0" width="55" height="30" rx="4" fill="#86EFAC" stroke={mainColor} strokeWidth="2.5" />
                <circle cx="27" cy="15" r="7" fill="#4ADE80" />
                <text x="27" y="20" fill={mainColor} fontSize="14" fontWeight="900" textAnchor="middle">$</text>
              </g>
              {/* Bill 2 (Center) */}
              <g transform="rotate(-4) translate(4, -4)">
                <rect x="0" y="0" width="55" height="30" rx="4" fill="#4ADE80" stroke={mainColor} strokeWidth="2.5" />
                <circle cx="27" cy="15" r="7" fill="#22C55E" />
                <text x="27" y="20" fill={mainColor} fontSize="14" fontWeight="900" textAnchor="middle">$</text>
              </g>
              {/* Bill 3 (Tilted Right) */}
              <g transform="rotate(10) translate(14, 2)">
                <rect x="0" y="0" width="55" height="30" rx="4" fill="#34D399" stroke={mainColor} strokeWidth="2.5" />
                <circle cx="27" cy="15" r="7" fill="#10B981" />
                <text x="27" y="20" fill={mainColor} fontSize="14" fontWeight="900" textAnchor="middle">$</text>
              </g>
            </g>
          </>
        )}

        {/* 3. Holding Rich Dad Book */}
        {pose === 'holding_book' && (
          <>
            <path d="M 90 128 Q 65 170 68 200" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            <path d="M 170 128 Q 195 160 165 130" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            {/* Rich Dad Book */}
            <g transform="translate(25, 95) rotate(-6)">
              <rect x="0" y="0" width="70" height="95" rx="6" fill="#9333EA" stroke={mainColor} strokeWidth="3.5" />
              <rect x="0" y="65" width="70" height="30" fill="#374151" />
              <text x="35" y="28" fill="#FACC15" fontSize="14" fontWeight="900" textAnchor="middle">RICH</text>
              <text x="35" y="46" fill="#FACC15" fontSize="14" fontWeight="900" textAnchor="middle">DAD</text>
              <text x="35" y="60" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">POOR DAD</text>
              {/* Book Spine */}
              <line x1="8" y1="0" x2="8" y2="95" stroke="#7E22CE" strokeWidth="2" />
            </g>
          </>
        )}

        {/* 4. Hands on Hips (Car Wash Boss Pose) */}
        {pose === 'hands_on_hips' && (
          <>
            <path d="M 90 128 Q 50 150 82 175" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            <path d="M 170 128 Q 210 150 178 175" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          </>
        )}

        {/* 5. Asking for Cash (Hand Held Out) */}
        {pose === 'asking_for_cash' && (
          <>
            <path d="M 90 128 Q 70 160 65 180" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            <path d="M 170 128 Q 190 150 220 150" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          </>
        )}

        {/* 6. Waving */}
        {pose === 'waving' && (
          <>
            <path d="M 90 128 Q 65 170 68 200" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
            <path d="M 170 128 Q 200 130 195 90" stroke={mainColor} strokeWidth={strokeW} strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
};
