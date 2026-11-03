import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import { MessageCircle, CornerDownLeft, Check } from 'lucide-react';

interface AndroidNotificationProps {
  frame: number;
  fps: number;
  startFrame?: number;
  dismissFrame?: number;
}

export const AndroidNotification: React.FC<AndroidNotificationProps> = ({
  frame,
  fps,
  startFrame = 175,
  dismissFrame = 245,
}) => {
  // Only render during the active window
  if (frame < startFrame || frame > dismissFrame + 25) {
    return null;
  }

  // Entrance spring
  const enterSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 110, mass: 0.5 },
  });

  // Exit interpolation
  const isDismissing = frame >= dismissFrame;
  const exitProgress = interpolate(
    frame,
    [dismissFrame, dismissFrame + 20],
    [0, 1],
    {
      easing: Easing.bezier(0.4, 0, 1, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const translateY = isDismissing
    ? interpolate(exitProgress, [0, 1], [0, -180], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(enterSpring, [0, 1], [-180, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  const opacity = isDismissing
    ? interpolate(exitProgress, [0, 0.7], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(enterSpring, [0, 0.3], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  const scale = isDismissing
    ? interpolate(exitProgress, [0, 1], [1, 0.9], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(enterSpring, [0, 1], [0.85, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 24,
        right: 24,
        zIndex: 60,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
      }}
    >
      {/* Heads-up Card */}
      <div
        style={{
          background: 'rgba(30, 41, 59, 0.88)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: 28,
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          boxShadow:
            '0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
          padding: '16px 20px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Top Header: App icon + App Name + Timestamp */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageCircle size={16} color="#ffffff" strokeWidth={2.4} />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.02em',
              }}
            >
              Messages • now
            </span>
          </div>

          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#60a5fa',
              boxShadow: '0 0 8px #60a5fa',
            }}
          />
        </div>

        {/* Message Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Alex Rivera
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.35,
            }}
          >
            Hey! The new Remotion Android homepage is so smooth 🔥
          </div>
        </div>

        {/* Action Pills */}
        <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              padding: '6px 14px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.16)',
              fontSize: 13,
              fontWeight: 600,
              color: '#93c5fd',
              cursor: 'pointer',
            }}
          >
            <CornerDownLeft size={14} />
            Reply
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              padding: '6px 14px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
            }}
          >
            <Check size={14} />
            Mark read
          </div>
        </div>
      </div>
    </div>
  );
};
