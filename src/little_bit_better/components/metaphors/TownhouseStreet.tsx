import React from 'react';

interface TownhouseStreetProps {
  x?: number;
  y?: number;
}

export const TownhouseStreet: React.FC<TownhouseStreetProps> = ({ x = 0, y = 0 }) => {
  const ink = '#3D312A';
  const facade = '#C4AA93';
  const trim = '#A8907A';
  const roof = '#8E735D';
  const curtain = '#D4A373';
  const glass = '#524035';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
        {/* Distant City Skyline Silhouettes */}
        <rect x="0" y="320" width="180" height="420" fill="#B39880" />
        <rect x="220" y="360" width="140" height="380" fill="#B39880" />
        <rect x="1560" y="340" width="180" height="400" fill="#B39880" />
        <rect x="1780" y="380" width="140" height="360" fill="#B39880" />

        {/* ================= BROWNSTONE #1 (Left, x = 380) ================= */}
        <g transform="translate(380, 120)">
          {/* Main Facade */}
          <rect x="0" y="160" width="460" height="600" fill={facade} stroke={ink} strokeWidth="5" />

          {/* Mansard Roof */}
          <polygon points="0,160 40,30 420,30 460,160" fill={roof} stroke={ink} strokeWidth="5" />
          {/* Dormer Windows on Roof */}
          <rect x="140" y="60" width="45" height="70" fill={glass} stroke={ink} strokeWidth="4" />
          <rect x="275" y="60" width="45" height="70" fill={glass} stroke={ink} strokeWidth="4" />

          {/* Decorative Cornice */}
          <rect x="-10" y="150" width="480" height="24" rx="4" fill={trim} stroke={ink} strokeWidth="4" />

          {/* 2nd Floor Windows (3 Windows) */}
          {[60, 205, 350].map((wx, i) => (
            <g key={i} transform={`translate(${wx}, 210)`}>
              <rect x="0" y="0" width="55" height="110" fill={glass} stroke={ink} strokeWidth="4" />
              {/* Triangular / Diamond Curtain */}
              <polygon points="12,0 43,0 50,75 5,75" fill={curtain} />
              <line x1="0" y1="55" x2="55" y2="55" stroke={ink} strokeWidth="3" />
            </g>
          ))}

          {/* 1st Floor Windows (2 Windows) */}
          <g transform="translate(60, 390)">
            <rect x="0" y="0" width="55" height="110" fill={glass} stroke={ink} strokeWidth="4" />
            <polygon points="12,0 43,0 50,75 5,75" fill={curtain} />
            <line x1="0" y1="55" x2="55" y2="55" stroke={ink} strokeWidth="3" />
          </g>
          <g transform="translate(350, 390)">
            <rect x="0" y="0" width="55" height="110" fill={glass} stroke={ink} strokeWidth="4" />
            <polygon points="12,0 43,0 50,75 5,75" fill={curtain} />
            <line x1="0" y1="55" x2="55" y2="55" stroke={ink} strokeWidth="3" />
          </g>

          {/* Front Entrance Door & Stone Stoop */}
          <g transform="translate(180, 370)">
            <rect x="0" y="0" width="100" height="190" rx="4" fill="#4E3B33" stroke={ink} strokeWidth="5" />
            {/* Door Panels */}
            <rect x="12" y="18" width="34" height="65" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />
            <rect x="54" y="18" width="34" height="65" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />
            <rect x="12" y="95" width="34" height="75" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />
            <rect x="54" y="95" width="34" height="75" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />

            {/* Stoop Stairs */}
            <rect x="-25" y="190" width="150" height="25" fill={trim} stroke={ink} strokeWidth="3.5" />
            <rect x="-35" y="215" width="170" height="25" fill={trim} stroke={ink} strokeWidth="3.5" />
            <rect x="-45" y="240" width="190" height="25" fill={trim} stroke={ink} strokeWidth="3.5" />
          </g>
        </g>

        {/* ================= BROWNSTONE #2 (Right, x = 1060) ================= */}
        <g transform="translate(1060, 120)">
          <rect x="0" y="160" width="460" height="600" fill={facade} stroke={ink} strokeWidth="5" />
          <polygon points="0,160 40,30 420,30 460,160" fill={roof} stroke={ink} strokeWidth="5" />
          <rect x="140" y="60" width="45" height="70" fill={glass} stroke={ink} strokeWidth="4" />
          <rect x="275" y="60" width="45" height="70" fill={glass} stroke={ink} strokeWidth="4" />
          <rect x="-10" y="150" width="480" height="24" rx="4" fill={trim} stroke={ink} strokeWidth="4" />

          {[60, 205, 350].map((wx, i) => (
            <g key={i} transform={`translate(${wx}, 210)`}>
              <rect x="0" y="0" width="55" height="110" fill={glass} stroke={ink} strokeWidth="4" />
              <polygon points="12,0 43,0 50,75 5,75" fill={curtain} />
              <line x1="0" y1="55" x2="55" y2="55" stroke={ink} strokeWidth="3" />
            </g>
          ))}

          <g transform="translate(60, 390)">
            <rect x="0" y="0" width="55" height="110" fill={glass} stroke={ink} strokeWidth="4" />
            <polygon points="12,0 43,0 50,75 5,75" fill={curtain} />
            <line x1="0" y1="55" x2="55" y2="55" stroke={ink} strokeWidth="3" />
          </g>
          <g transform="translate(350, 390)">
            <rect x="0" y="0" width="55" height="110" fill={glass} stroke={ink} strokeWidth="4" />
            <polygon points="12,0 43,0 50,75 5,75" fill={curtain} />
            <line x1="0" y1="55" x2="55" y2="55" stroke={ink} strokeWidth="3" />
          </g>

          <g transform="translate(180, 370)">
            <rect x="0" y="0" width="100" height="190" rx="4" fill="#4E3B33" stroke={ink} strokeWidth="5" />
            <rect x="12" y="18" width="34" height="65" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />
            <rect x="54" y="18" width="34" height="65" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />
            <rect x="12" y="95" width="34" height="75" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />
            <rect x="54" y="95" width="34" height="75" fill="#3A2C26" stroke={ink} strokeWidth="2.5" />

            <rect x="-25" y="190" width="150" height="25" fill={trim} stroke={ink} strokeWidth="3.5" />
            <rect x="-35" y="215" width="170" height="25" fill={trim} stroke={ink} strokeWidth="3.5" />
            <rect x="-45" y="240" width="190" height="25" fill={trim} stroke={ink} strokeWidth="3.5" />
          </g>
        </g>

        {/* Sidewalk & Street Ground (y = 750) */}
        <rect x="0" y="750" width="1920" height="330" fill="#B39880" />
        <line x1="0" y1="750" x2="1920" y2="750" stroke={ink} strokeWidth="6" />
        <line x1="0" y1="840" x2="1920" y2="840" stroke="#9E846D" strokeWidth="4" />
      </svg>
    </div>
  );
};
