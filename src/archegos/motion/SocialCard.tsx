import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ProceduralAvatar } from './ProceduralAvatar';
import { DynamicCounter } from './DynamicCounter';

export interface SocialCardProps {
  authorName: string;
  handle: string;
  avatarSeed?: string;
  verified?: boolean;
  timeAgo?: string;
  content: string;
  likes?: number;
  reposts?: number;
  views?: number;
  delay?: number;
  width?: number | string;
  accentColor?: string;
  style?: React.CSSProperties;
}

/**
 * SocialCard
 * Faux-UI social media post component (X / Twitter, LinkedIn, Threads style).
 * 100% vector and code-built: uses ProceduralAvatar to eliminate external image dependencies.
 * Features live engagement metric counters, verified badge, and spring entrance physics.
 */
export const SocialCard: React.FC<SocialCardProps> = ({
  authorName,
  handle,
  avatarSeed,
  verified = true,
  timeAgo = '2h',
  content,
  likes = 14200,
  reposts = 3840,
  views = 280000,
  delay = 20,
  width = 620,
  accentColor = '#1d9bf0',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy entrance spring
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 105, mass: 0.65 },
  });

  const scale = interpolate(progress, [0, 1], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 20,
        padding: '24px 28px',
        background: 'rgba(15, 20, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {/* Top Header: Avatar + Author Info + Verified Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <ProceduralAvatar
          seed={avatarSeed || handle}
          size={52}
          delay={delay + 2}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              {authorName}
            </span>

            {/* Verified Badge */}
            {verified && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill={accentColor}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}

            <span style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>
              @{handle}
            </span>
          </div>

          <span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.4)' }}>
            {timeAgo}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div
        style={{
          fontSize: 20,
          lineHeight: 1.45,
          color: 'rgba(255, 255, 255, 0.92)',
          marginBottom: 20,
          fontWeight: 400,
        }}
      >
        {content}
      </div>

      {/* Engagement Telemetry Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 14,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          color: 'rgba(255, 255, 255, 0.55)',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {/* Reposts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <DynamicCounter endValue={reposts} delay={delay + 10} />
        </div>

        {/* Likes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f43f5e' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <DynamicCounter endValue={likes} delay={delay + 14} />
        </div>

        {/* Views */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <DynamicCounter endValue={views} delay={delay + 18} />
        </div>
      </div>
    </div>
  );
};
