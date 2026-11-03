import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import { Mic, Camera } from 'lucide-react';

interface AndroidSearchBarProps {
  frame: number;
  fps: number;
  isTapped?: boolean;
}

export const AndroidSearchBar: React.FC<AndroidSearchBarProps> = ({
  frame,
  fps,
  isTapped = false,
}) => {
  // Staggered spring arrival at frame 26
  const arrivalSpring = spring({
    frame: frame - 26,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  const translateY = interpolate(arrivalSpring, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(arrivalSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(arrivalSpring, [0, 1], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tap ripple effect (simulated tap at frame 230)
  const tapFrame = frame - 230;
  const rippleScale = interpolate(tapFrame, [0, 25], [0.3, 2.2], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleOpacity = interpolate(tapFrame, [0, 6, 25], [0, 0.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animated text cursor blink
  const showCursor = Math.floor(frame / 16) % 2 === 0;

  return (
    <div
      style={{
        margin: '0 32px',
        position: 'relative',
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      }}
    >
      {/* Ripple ring on simulated tap */}
      {rippleOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 100,
            height: 100,
            marginLeft: -50,
            marginTop: -50,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Pill Container */}
      <div
        style={{
          width: '100%',
          height: 60,
          borderRadius: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.32)',
          boxShadow:
            '0 8px 24px -4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
        }}
      >
        {/* Left: Google 4-Color 'G' Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.39 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>

          {/* Search Placeholder Text */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.9)',
              letterSpacing: '0.01em',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Search your phone & web
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 18,
                backgroundColor: showCursor ? '#ffffff' : 'transparent',
                marginLeft: 4,
              }}
            />
          </div>
        </div>

        {/* Right: Assistant Mic & Google Lens */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Mic with 4 color dots */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Mic size={22} color="#ffffff" strokeWidth={2.2} />
          </div>

          {/* Google Lens viewfinder camera */}
          <div
            style={{
              width: 24,
              height: 24,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Camera size={22} color="#ffffff" strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
};
