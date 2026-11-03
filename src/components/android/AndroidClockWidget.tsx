import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import { Sparkles } from 'lucide-react';

interface AndroidClockWidgetProps {
  frame: number;
  fps: number;
}

export const AndroidClockWidget: React.FC<AndroidClockWidgetProps> = ({
  frame,
  fps,
}) => {
  // Staggered arrival at frame 16
  const arrivalSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 11, stiffness: 95, mass: 0.6 },
  });

  const scale = interpolate(arrivalSpring, [0, 1], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(arrivalSpring, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(arrivalSpring, [0, 1], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shockwave impact ripple at arrival (frames 20 to 50)
  const shockwaveFrame = frame - 22;
  const shockwaveScale = interpolate(shockwaveFrame, [0, 25], [0.8, 1.8], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(shockwaveFrame, [0, 5, 25], [0, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Specular sheen sweep (frames 45 to 80)
  const sheenProgress = interpolate(frame, [45, 80], [-120, 220], {
    easing: Easing.bezier(0.2, 0.8, 0.4, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gentle perpetual breathing
  const breathingScale = 1 + 0.015 * Math.sin(frame * 0.08);

  // Time flip at frame 90
  const isAfter90 = frame >= 90;
  const minutes = isAfter90 ? '31' : '30';

  // Dynamic step count telemetry (Law 8)
  const stepCount = Math.round(
    interpolate(frame, [25, 110], [1200, 7480], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // SVG Progress Ring circumference (r = 24 => circumference = 2 * PI * 24 ≈ 150.8)
  const ringCircumference = 150.8;
  const ringProgress = interpolate(frame, [25, 110], [0.15, 0.78], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const strokeDashoffset = ringCircumference * (1 - ringProgress);

  return (
    <div
      style={{
        position: 'relative',
        margin: '22px 36px 0 36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${translateY}px) scale(${scale * breathingScale})`,
        opacity,
      }}
    >
      {/* Shockwave Ripple Ring on arrival */}
      {shockwaveOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: 56,
            border: '2px solid rgba(242, 204, 143, 0.8)',
            transform: `scale(${shockwaveScale})`,
            opacity: shockwaveOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Hero Clock Container (Material You Organic Scalloped Pill) */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background:
            'linear-gradient(135deg, rgba(230, 214, 190, 0.22) 0%, rgba(138, 177, 160, 0.28) 50%, rgba(224, 122, 95, 0.25) 100%)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: 48,
          border: '1.5px solid rgba(255, 255, 255, 0.28)',
          boxShadow:
            '0 20px 40px -12px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Specular Diagonal Sheen Pass */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 80,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
            transform: `translateX(${sheenProgress}%) skewX(-25deg)`,
            pointerEvents: 'none',
          }}
        />

        {/* Left: Material You Stacked Bold Numerals */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 0.88,
          }}
        >
          <span
            style={{
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#fdf6ec',
              textShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            09
          </span>
          <span
            style={{
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#eed7a1',
              textShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            {minutes}
          </span>
        </div>

        {/* Divider Bar */}
        <div
          style={{
            width: 2,
            height: 90,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
          }}
        />

        {/* Right: Activity Telemetry & Daily Ring */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Animated SVG Progress Ring */}
          <div style={{ position: 'relative', width: 68, height: 68 }}>
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Background track */}
              <circle
                cx="34"
                cy="34"
                r="24"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="6"
                fill="none"
              />
              {/* Dynamic progress stroke */}
              <circle
                cx="34"
                cy="34"
                r="24"
                stroke="url(#ringGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={ringCircumference}
                strokeDashoffset={strokeDashoffset}
              />
              <defs>
                <linearGradient
                  id="ringGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>

            {/* Sparkles icon in center of ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={18} color="#4ade80" />
            </div>
          </div>

          {/* Dynamic Counter text */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.01em',
                color: '#ffffff',
              }}
            >
              {stepCount.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Steps Today
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
