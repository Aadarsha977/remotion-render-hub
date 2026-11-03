import React from 'react';
import { interpolate, spring } from 'remotion';
import { Wifi, Signal, BatteryCharging, MessageCircle, Mail } from 'lucide-react';

interface AndroidStatusBarProps {
  frame: number;
  fps: number;
  isMediaPlaying?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({
  frame,
  fps,
  isMediaPlaying = true,
}) => {
  // Staggered spring slide down
  const enterSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [-50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(enterSpring, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic time flip: 09:30 -> 09:31 at frame 90
  const isAfter90 = frame >= 90;
  const timeString = isAfter90 ? '09:31' : '09:30';

  // Dynamic island / active punch hole expansion when music plays
  const dynamicRingScale = isMediaPlaying
    ? 1 + 0.12 * Math.sin(frame * 0.25)
    : 1;

  // Battery percentage live animation
  const batteryPct = Math.min(88 + Math.floor(frame / 60), 92);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 36,
        paddingRight: 36,
        zIndex: 50,
        transform: `translateY(${translateY}px)`,
        opacity,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
        color: '#ffffff',
        pointerEvents: 'none',
      }}
    >
      {/* Left: Clock & Notifications */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: '0.02em',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          {timeString}
        </span>

        {/* Small Notification Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            opacity: 0.85,
            marginLeft: 6,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mail size={12} color="#ffffff" strokeWidth={2.4} />
          </div>

          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MessageCircle size={12} color="#ffffff" strokeWidth={2.4} />
          </div>

          {/* Pulsing Spotify musical note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: '#1ed760',
                boxShadow: '0 0 6px #1ed760',
              }}
            />
          </div>
        </div>
      </div>

      {/* Center: Hole-Punch Camera Lens & Dynamic Ring */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 14,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Dynamic Privacy / Ambient Audio Glow Ring */}
        <div
          style={{
            position: 'absolute',
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1.5px solid rgba(74, 222, 128, 0.45)',
            transform: `scale(${dynamicRingScale})`,
            boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)',
            opacity: isMediaPlaying ? 0.8 : 0,
          }}
        />

        {/* Camera Bezel Outer Ring */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#0a0d14',
            border: '1.5px solid #1e2430',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          {/* Inner Glass Pupil & Lens Reflection */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 35% 35%, #1d3557 0%, #030712 85%)',
              position: 'relative',
            }}
          >
            {/* Specular White Catchlight dot */}
            <div
              style={{
                position: 'absolute',
                top: 2,
                left: 2,
                width: 3,
                height: 3,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right: Network, Wi-Fi, Battery Telemetry */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'rgba(255, 255, 255, 0.9)',
            marginRight: -2,
          }}
        >
          5G
        </span>

        {/* Cellular Signal Strength */}
        <Signal size={19} color="#ffffff" strokeWidth={2.4} />

        {/* Wi-Fi 6 */}
        <Wifi size={19} color="#ffffff" strokeWidth={2.4} />

        {/* Battery with live percentage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            padding: '2px 8px 2px 7px',
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {batteryPct}%
          </span>
          <BatteryCharging size={18} color="#4ade80" strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
};
