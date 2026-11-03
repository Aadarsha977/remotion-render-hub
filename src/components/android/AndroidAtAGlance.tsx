import React from 'react';
import { interpolate, spring } from 'remotion';
import { CloudSun, Calendar, Headphones, Wind } from 'lucide-react';

interface AndroidAtAGlanceProps {
  frame: number;
  fps: number;
}

export const AndroidAtAGlance: React.FC<AndroidAtAGlanceProps> = ({
  frame,
  fps,
}) => {
  // Staggered spring arrival at frame 10
  const enterSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 13, stiffness: 105, mass: 0.5 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(enterSpring, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic Weather Sun Rotation
  const sunRotation = interpolate(frame, [0, 300], [0, 90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Contextual smart pill switcher:
  // Phase 1 (frame < 120): Calendar meeting
  // Phase 2 (120 <= frame < 210): Connected Pixel Buds
  // Phase 3 (frame >= 210): Air Quality
  let smartIcon = <Calendar size={18} color="#93c5fd" strokeWidth={2.2} />;
  let smartLabel = 'Design Sync • in 15m';

  if (frame >= 120 && frame < 210) {
    smartIcon = <Headphones size={18} color="#86efac" strokeWidth={2.2} />;
    smartLabel = 'Pixel Buds Pro • 95%';
  } else if (frame >= 210) {
    smartIcon = <Wind size={18} color="#fde047" strokeWidth={2.2} />;
    smartLabel = 'Air Quality • 24 (Good)';
  }

  // Smart chip crossfade/bounce on switch
  const chipTransitionFrame = frame >= 210 ? frame - 210 : frame >= 120 ? frame - 120 : frame;
  const chipScale = spring({
    frame: chipTransitionFrame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.4 },
  });

  return (
    <div
      style={{
        paddingLeft: 36,
        paddingRight: 36,
        marginTop: 68,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transform: `translateY(${translateY}px)`,
        opacity,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
        color: '#ffffff',
      }}
    >
      {/* Date & Weather Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        <span>Tuesday, Nov 3</span>

        <span style={{ opacity: 0.4 }}>•</span>

        {/* Weather capsule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '3px 12px 3px 10px',
            borderRadius: 20,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <div style={{ transform: `rotate(${sunRotation}deg)` }}>
            <CloudSun size={20} color="#facc15" strokeWidth={2.2} />
          </div>
          <span style={{ fontSize: 20, fontWeight: 500 }}>24°C</span>
        </div>
      </div>

      {/* Smart Contextual Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          backgroundColor: 'rgba(26, 32, 44, 0.55)',
          padding: '6px 16px',
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          width: 'fit-content',
          transform: `scale(${Math.min(1, 0.92 + chipScale * 0.08)})`,
        }}
      >
        {smartIcon}
        <span
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.95)',
            letterSpacing: '0.01em',
          }}
        >
          {smartLabel}
        </span>
      </div>
    </div>
  );
};
