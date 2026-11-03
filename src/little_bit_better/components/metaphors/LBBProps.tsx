import React from 'react';

const strokeColor = '#2A2421';
const strokeWidth = 3.8;

/**
 * Thought-Bubble / Idea Lightbulb with soft gold accent #D4B26F.
 * Matches Little Bit Better icon styling at [00:25].
 */
export const LightbulbProp: React.FC<{ scale?: number }> = ({ scale = 1.0 }) => {
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
        {/* Glow halo */}
        <circle cx="60" cy="55" r="50" fill="#D4B26F" opacity="0.22" />
        {/* Yellow/Gold Bulb Body */}
        <path
          d="M 60 15
             C 35 15, 20 35, 20 60
             C 20 80, 36 95, 42 110
             L 78 110
             C 84 95, 100 80, 100 60
             C 100 35, 85 15, 60 15 Z"
          fill="#D4B26F"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        {/* Inner Filament */}
        <path d="M 46 70 L 52 45 L 68 45 L 74 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
        <line x1="52" y1="45" x2="68" y2="45" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        {/* Screw Base Bands */}
        <rect x="42" y="112" width="36" height="8" rx="2" fill="#B3A38E" stroke={strokeColor} strokeWidth="2.5" />
        <rect x="45" y="122" width="30" height="8" rx="2" fill="#B3A38E" stroke={strokeColor} strokeWidth="2.5" />
        <path d="M 50 132 Q 60 142 70 132" fill="#2A2421" stroke={strokeColor} strokeWidth="2.5" />

        {/* Radiating Idea Rays */}
        <line x1="60" y1="0" x2="60" y2="8" stroke="#D4B26F" strokeWidth="4" strokeLinecap="round" />
        <line x1="18" y1="18" x2="25" y2="25" stroke="#D4B26F" strokeWidth="4" strokeLinecap="round" />
        <line x1="102" y1="18" x2="95" y2="25" stroke="#D4B26F" strokeWidth="4" strokeLinecap="round" />
        <line x1="2" y1="60" x2="10" y2="60" stroke="#D4B26F" strokeWidth="4" strokeLinecap="round" />
        <line x1="110" y1="60" x2="118" y2="60" stroke="#D4B26F" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/**
 * Empty Bucket Crossed Out with Red Slash.
 * Modeled on "The kid doesn't even own a bucket" at [00:37].
 */
export const EmptyBucketCrossedProp: React.FC<{ scale?: number }> = ({ scale = 1.0 }) => {
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        {/* Bucket in muted cardboard tan */}
        <g transform="translate(45, 45)">
          <polygon points="12,25 78,25 68,95 22,95" fill="#967D69" stroke={strokeColor} strokeWidth={strokeWidth} />
          <ellipse cx="45" cy="25" rx="33" ry="10" fill="#B39B85" stroke={strokeColor} strokeWidth="3" />
          <path d="M 12 25 Q 45 -18 78 25" stroke="#4A3B31" strokeWidth="4" fill="none" />
        </g>
        {/* Red Circle & Diagonal Prohibitory Slash */}
        <circle cx="90" cy="90" r="70" fill="none" stroke="#D9534F" strokeWidth="10" />
        <line x1="40" y1="40" x2="140" y2="140" stroke="#D9534F" strokeWidth="10" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/**
 * Acceptance Stat Badge ("7 / 20" or "YES!").
 * Modeled on "Seven out of 20 people say yes" at [00:32].
 */
export const StatAcceptanceBadge: React.FC<{ text?: string; scale?: number }> = ({
  text = '7 / 20 YES',
  scale = 1.0,
}) => {
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      <svg width="260" height="90" viewBox="0 0 260 90" fill="none">
        {/* Green pill card */}
        <rect x="5" y="5" width="250" height="80" rx="40" fill="#165046" stroke={strokeColor} strokeWidth={strokeWidth} />
        <rect x="12" y="12" width="236" height="66" rx="33" fill="none" stroke="#2BA84A" strokeWidth="2.5" strokeDasharray="6 4" />
        {/* Checkmark icon */}
        <circle cx="50" cy="45" r="22" fill="#52D172" stroke={strokeColor} strokeWidth="2.5" />
        <polyline points="40,46 47,53 60,38" stroke="#165046" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Label */}
        <text
          x="150"
          y="54"
          textAnchor="middle"
          fontSize="26"
          fontWeight="900"
          fontFamily="Impact, sans-serif"
          letterSpacing="1"
          fill="#FAF5DE"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};
