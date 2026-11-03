import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import {
  Phone,
  MessageCircle,
  Camera,
  Settings,
  Play,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';

export type AndroidIconType =
  | 'phone'
  | 'messages'
  | 'chrome'
  | 'camera'
  | 'photos'
  | 'spotify'
  | 'youtube'
  | 'gmail'
  | 'maps'
  | 'settings'
  | 'playstore'
  | 'calendar';

interface AndroidAppIconProps {
  type: AndroidIconType;
  label: string;
  delay: number;
  frame: number;
  fps: number;
  badgeCount?: number;
  isTapped?: boolean;
}

export const AndroidAppIcon: React.FC<AndroidAppIconProps> = ({
  type,
  label,
  delay,
  frame,
  fps,
  badgeCount,
  isTapped = false,
}) => {
  // Cascaded spring arrival
  const springProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, stiffness: 100, mass: 0.5 },
  });

  const scale = interpolate(springProgress, [0, 1], [0.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(springProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(springProgress, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tap compression effect if tapped
  const tapScale = isTapped ? 0.9 : 1;

  // Custom Icon Rendering
  const renderIconContent = () => {
    switch (type) {
      case 'chrome':
        return (
          // Authentic Google Chrome 4-color pinwheel SVG
          <svg width="40" height="40" viewBox="0 0 100 100">
            {/* Center Blue Circle */}
            <circle cx="50" cy="50" r="22" fill="#4285F4" />
            <circle cx="50" cy="50" r="23" fill="none" stroke="#ffffff" strokeWidth="6" />
            {/* Red Section */}
            <path
              d="M 50 4 A 46 46 0 0 1 89.8 27 L 67.5 40 A 23 23 0 0 0 50 27 Z"
              fill="#EA4335"
            />
            {/* Green Section */}
            <path
              d="M 89.8 27 A 46 46 0 0 1 50 96 L 61.5 76 A 23 23 0 0 0 73 50 Z"
              fill="#34A853"
            />
            {/* Yellow Section */}
            <path
              d="M 50 96 A 46 46 0 0 1 10.2 27 L 32.5 40 A 23 23 0 0 0 50 73 Z"
              fill="#FBBC05"
            />
          </svg>
        );

      case 'photos':
        return (
          // Authentic Google Photos Pinwheel
          <svg width="42" height="42" viewBox="0 0 100 100">
            {/* Red petal */}
            <path d="M 50 10 C 62 10 72 20 72 32 L 50 32 Z" fill="#EA4335" />
            {/* Yellow petal */}
            <path d="M 90 50 C 90 62 80 72 68 72 L 68 50 Z" fill="#FBBC05" />
            {/* Green petal */}
            <path d="M 50 90 C 38 90 28 80 28 68 L 50 68 Z" fill="#34A853" />
            {/* Blue petal */}
            <path d="M 10 50 C 10 38 20 28 32 28 L 32 50 Z" fill="#4285F4" />
          </svg>
        );

      case 'spotify':
        // Spotify icon with live audio equalizer bars!
        const b1 = Math.sin(frame * 0.4) * 8 + 14;
        const b2 = Math.cos(frame * 0.35) * 10 + 16;
        const b3 = Math.sin(frame * 0.5 + 1) * 7 + 12;
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#121212',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <div
              style={{
                width: 4,
                height: b1,
                backgroundColor: '#1ed760',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: 4,
                height: b2,
                backgroundColor: '#1ed760',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: 4,
                height: b3,
                backgroundColor: '#1ed760',
                borderRadius: 2,
              }}
            />
          </div>
        );

      case 'playstore':
        return (
          <svg width="38" height="38" viewBox="0 0 100 100">
            <path d="M 18 10 L 62 50 L 18 90 Z" fill="#4285F4" />
            <path d="M 18 10 L 76 34 L 62 50 Z" fill="#EA4335" />
            <path d="M 18 90 L 76 66 L 62 50 Z" fill="#34A853" />
            <path d="M 76 34 L 88 44 C 92 48 92 52 88 56 L 76 66 L 62 50 Z" fill="#FBBC05" />
          </svg>
        );

      case 'phone':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#2e7d32',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Phone size={30} color="#ffffff" strokeWidth={2.4} />
          </div>
        );

      case 'messages':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1976d2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MessageCircle size={32} color="#ffffff" strokeWidth={2.4} />
          </div>
        );

      case 'camera':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#263238',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.15)',
            }}
          >
            <Camera size={32} color="#80deea" strokeWidth={2.2} />
          </div>
        );

      case 'youtube':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ff0000',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play size={28} color="#ffffff" fill="#ffffff" />
          </div>
        );

      case 'gmail':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f9fa',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <Mail size={30} color="#ea4335" strokeWidth={2.4} />
          </div>
        );

      case 'maps':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#e8f5e9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <MapPin size={32} color="#34a853" strokeWidth={2.4} />
          </div>
        );

      case 'settings':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#455a64',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Settings size={32} color="#eceff1" strokeWidth={2.2} />
          </div>
        );

      case 'calendar':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#d93025',
                textTransform: 'uppercase',
                marginTop: -2,
              }}
            >
              NOV
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#1f2937',
                lineHeight: 1,
              }}
            >
              3
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transform: `translateY(${translateY}px) scale(${scale * tapScale})`,
        opacity,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Icon Squircle/Circle Base Tile */}
      <div
        style={{
          width: 66,
          height: 66,
          borderRadius: 24,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow:
            '0 8px 18px -4px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {renderIconContent()}

        {/* Specular glassy top highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '42%',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Unread Badge Counter Pill */}
      {badgeCount !== undefined && badgeCount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: -4,
            right: 4,
            backgroundColor: '#ea4335',
            color: '#ffffff',
            borderRadius: 12,
            minWidth: 20,
            height: 20,
            padding: '0 5px',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            border: '2px solid #ffffff',
            zIndex: 10,
          }}
        >
          {badgeCount}
        </div>
      )}

      {/* App Label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#ffffff',
          textAlign: 'center',
          textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)',
          letterSpacing: '0.01em',
          maxWidth: 76,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
        }}
      >
        {label}
      </span>
    </div>
  );
};
