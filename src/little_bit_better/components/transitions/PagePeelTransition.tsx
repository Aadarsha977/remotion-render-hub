import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

interface PagePeelTransitionProps {
  startFrame: number;
  durationInFrames?: number;
}

/**
 * Signature Little Bit Better Page-Peel Wipe Transition.
 * A stylized suit sleeve with white cuff reaches down, grabs the bottom-right corner of the page,
 * and peels it back diagonally toward top-left, revealing the new clean canvas underneath.
 */
export const PagePeelTransition: React.FC<PagePeelTransitionProps> = ({
  startFrame,
  durationInFrames = 26,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + durationInFrames) {
    return null;
  }

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // The diagonal peel corner moves from (2200, 1300) to (-600, -400)
  const cornerX = interpolate(progress, [0, 1], [2200, -600]);
  const cornerY = interpolate(progress, [0, 1], [1300, -400]);

  // Hand position tracks the corner
  const handX = cornerX + 40;
  const handY = cornerY + 40;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
        zIndex: 999,
        overflow: 'hidden',
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
        {/* Drop shadow cast by the peeled page */}
        <polygon
          points={`${cornerX - 60},${cornerY + 60} 2400,${cornerY + 600} 2400,1600 ${cornerX - 200},1600`}
          fill="#000000"
          opacity="0.25"
          filter="blur(14px)"
        />

        {/* Curled back of the page (Reverse cream paper) */}
        <polygon
          points={`${cornerX},${cornerY} ${cornerX + 800},${cornerY + 1200} ${cornerX + 1600},${cornerY - 300}`}
          fill="#E6DCBF"
          stroke="#3D312A"
          strokeWidth="3.5"
        />
        {/* Curl gradient highlight */}
        <polygon
          points={`${cornerX},${cornerY} ${cornerX + 300},${cornerY + 600} ${cornerX + 700},${cornerY - 100}`}
          fill="#F5EDD5"
          opacity="0.6"
        />

        {/* Stylized Suit Arm dragging the corner */}
        <g transform={`translate(${handX}, ${handY}) rotate(-35)`}>
          {/* Dark Charcoal Suit Sleeve */}
          <path
            d="M 60 -100 L 110 -100 L 130 180 L 40 180 Z"
            fill="#2B2625"
            stroke="#1A1615"
            strokeWidth="3.5"
          />
          {/* Crisp White Shirt Cuff */}
          <rect x="42" y="175" width="86" height="24" rx="3" fill="#FFFFFF" stroke="#3D312A" strokeWidth="2.5" />
          {/* Cufflink Gold Button */}
          <circle cx="85" cy="187" r="4" fill="#D4B26F" stroke="#3D312A" strokeWidth="1.5" />

          {/* Hand Pinching the Corner */}
          <ellipse cx="85" cy="216" rx="22" ry="18" fill="#FDFBF7" stroke="#3D312A" strokeWidth="3.5" />
          {/* Thumb & Index Finger pinching */}
          <path d="M 72 216 Q 85 235 98 216" stroke="#3D312A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};
