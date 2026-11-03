import React from 'react';
import { interpolate, spring } from 'remotion';
import { AndroidAppIcon } from './AndroidAppIcon';

interface AndroidDockProps {
  frame: number;
  fps: number;
}

export const AndroidDock: React.FC<AndroidDockProps> = ({ frame, fps }) => {
  // Staggered arrival at frame 30
  const arrivalSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 13, stiffness: 100, mass: 0.6 },
  });

  const translateY = interpolate(arrivalSpring, [0, 1], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(arrivalSpring, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Navigation gesture bar subtle breathing
  const gestureBarWidth = 140 + 4 * Math.sin(frame * 0.1);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 20,
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* 5 Docked Hotseat Apps */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <AndroidAppIcon
          type="phone"
          label=""
          delay={32}
          frame={frame}
          fps={fps}
        />
        <AndroidAppIcon
          type="messages"
          label=""
          delay={34}
          frame={frame}
          fps={fps}
          badgeCount={3}
        />
        <AndroidAppIcon
          type="chrome"
          label=""
          delay={36}
          frame={frame}
          fps={fps}
        />
        <AndroidAppIcon
          type="camera"
          label=""
          delay={38}
          frame={frame}
          fps={fps}
        />
        <AndroidAppIcon
          type="playstore"
          label=""
          delay={40}
          frame={frame}
          fps={fps}
        />
      </div>

      {/* Android 15 Gesture Navigation Bar Pill */}
      <div
        style={{
          width: gestureBarWidth,
          height: 5,
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  );
};
