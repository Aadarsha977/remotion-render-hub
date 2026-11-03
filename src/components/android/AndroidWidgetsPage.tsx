import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import {
  Play,
  SkipForward,
  SkipBack,
  Heart,
  CheckCircle2,
  Circle,
  Headphones,
  Watch,
  Smartphone,
} from 'lucide-react';

interface AndroidWidgetsPageProps {
  frame: number;
  fps: number;
}

export const AndroidWidgetsPage: React.FC<AndroidWidgetsPageProps> = ({
  frame,
  fps,
}) => {
  // Waveform heights animated by frame
  const bars = [14, 28, 42, 22, 35, 48, 30, 18, 38, 25, 45, 20];

  // Dynamic scrub bar progress
  const scrubProgress = interpolate(frame, [0, 300], [25, 42], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '110px 32px 140px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Google Sans", "Roboto", sans-serif',
        color: '#ffffff',
      }}
    >
      {/* 1. Spotify Media Player Widget (Material You 4x2) */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(30, 215, 96, 0.2) 0%, rgba(18, 18, 18, 0.75) 70%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 36,
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.5)',
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Album Cover Art */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background:
                'linear-gradient(45deg, #ff007f 0%, #7928ca 50%, #4338ca 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.05em',
              }}
            >
              RAM
            </div>
          </div>

          {/* Track Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: '#ffffff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Instant Crush
            </div>
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: 2,
              }}
            >
              Daft Punk • Julian Casablancas
            </div>

            {/* Live Audio Visualizer Bars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 3,
                height: 20,
                marginTop: 8,
              }}
            >
              {bars.map((b, i) => {
                const dynamicHeight = Math.max(
                  4,
                  b * Math.abs(Math.sin((frame + i * 8) * 0.2))
                );
                return (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: dynamicHeight,
                      backgroundColor: '#1ed760',
                      borderRadius: 1.5,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <Heart size={22} color="#1ed760" fill="#1ed760" />
        </div>

        {/* Scrub Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            style={{
              width: '100%',
              height: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${scrubProgress}%`,
                height: '100%',
                backgroundColor: '#1ed760',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              color: 'rgba(255, 255, 255, 0.55)',
            }}
          >
            <span>1:42</span>
            <span>5:37</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <SkipBack size={24} color="#ffffff" />
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#1ed760',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(30, 215, 96, 0.4)',
            }}
          >
            <Play size={24} color="#000000" fill="#000000" style={{ marginLeft: 3 }} />
          </div>
          <SkipForward size={24} color="#ffffff" />
        </div>
      </div>

      {/* 2. Connected Device Battery Widget */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 32,
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          padding: '18px 22px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {/* Device 1: Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Smartphone size={24} color="#60a5fa" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Phone</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#4ade80' }}>88%</span>
        </div>

        <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Device 2: Pixel Buds */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Headphones size={24} color="#a78bfa" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Buds Pro</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#4ade80' }}>95%</span>
        </div>

        <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Device 3: Watch */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Watch size={24} color="#fbbf24" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Watch 2</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24' }}>74%</span>
        </div>
      </div>

      {/* 3. Google Keep Checklist Widget */}
      <div
        style={{
          background: 'rgba(254, 240, 138, 0.16)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 32,
          border: '1.5px solid rgba(254, 240, 138, 0.3)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fef08a' }}>
          📌 Focus Today
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle2 size={18} color="#4ade80" />
            <span style={{ fontSize: 15, textDecoration: 'line-through', opacity: 0.7 }}>
              Remotion Android UI build
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle2 size={18} color="#4ade80" />
            <span style={{ fontSize: 15, textDecoration: 'line-through', opacity: 0.7 }}>
              Dynamic Material You widgets
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Circle size={18} color="rgba(255,255,255,0.6)" />
            <span style={{ fontSize: 15 }}>Production MP4 render</span>
          </div>
        </div>
      </div>
    </div>
  );
};
