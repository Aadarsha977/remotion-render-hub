import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface TimelineEvent {
  year: string;
  title: string;
  desc?: string;
  highlight?: boolean;
}

export interface TimelineHorizonProps {
  events?: TimelineEvent[];
  delay?: number;
  width?: number | string;
  accentColor?: string;
  style?: React.CSSProperties;
}

/**
 * TimelineHorizon
 * Kinetic milestone timeline representing chronological progression, historical eras,
 * or forensic sequences of events.
 */
export const TimelineHorizon: React.FC<TimelineHorizonProps> = ({
  events = [
    { year: '2012', title: 'FUND FOUNDED', desc: 'Family office formed under regulatory exemption.' },
    { year: '2019', title: 'TOTAL RETURN SWAPS', desc: 'Synthetic leverage quietly expanded across 5 banks.' },
    { year: '2021', title: 'SYSTEMIC MARGIN CALL', desc: '$20 Billion collapsed in 36 hours.', highlight: true },
  ],
  delay = 18,
  width = 780,
  accentColor = '#38bdf8',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Axis line draw animation
  const lineProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.7 },
  });

  const lineWidth = interpolate(lineProgress, [0, 1], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Central Horizontal Axis Line */}
      <div
        style={{
          position: 'absolute',
          top: 68,
          left: 30,
          right: 30,
          height: 2,
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            width: `${lineWidth}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${accentColor}, #ffffff)`,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
      </div>

      {/* Staggered Event Nodes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        {events.map((ev, idx) => {
          const evDelay = delay + 6 + idx * 10;
          const evProgress = spring({
            frame: frame - evDelay,
            fps,
            config: { damping: 12, stiffness: 105, mass: 0.6 },
          });

          const scale = interpolate(evProgress, [0, 1], [0.4, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const opacity = interpolate(evProgress, [0, 0.4, 1], [0, 0.8, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const translateY = interpolate(evProgress, [0, 1], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const isHighlight = ev.highlight;
          const markerColor = isHighlight ? '#ff3b30' : accentColor;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 220,
                textAlign: 'center',
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
              }}
            >
              {/* Year Pill Tag */}
              <div
                style={{
                  padding: '4px 12px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 800,
                  color: isHighlight ? '#ffffff' : markerColor,
                  background: isHighlight ? '#dc2626' : `${markerColor}18`,
                  border: `1px solid ${markerColor}50`,
                  marginBottom: 10,
                  letterSpacing: '0.06em',
                }}
              >
                {ev.year}
              </div>

              {/* Fulcrum Node Dot */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: isHighlight ? '#ff3b30' : '#ffffff',
                  boxShadow: `0 0 12px ${markerColor}`,
                  border: '3px solid #0f172a',
                  marginBottom: 16,
                }}
              />

              {/* Title & Desc Card */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: `1px solid ${isHighlight ? 'rgba(255, 59, 48, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', marginBottom: 4, letterSpacing: '-0.01em' }}>
                  {ev.title}
                </div>
                {ev.desc && (
                  <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                    {ev.desc}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
