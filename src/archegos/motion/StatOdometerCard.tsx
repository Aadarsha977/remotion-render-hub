import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DynamicCounter } from './DynamicCounter';

export interface StatOdometerCardProps {
  label: string;
  startValue?: number;
  endValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trendText?: string;
  trendType?: 'bullish' | 'bearish' | 'neutral' | 'alert';
  sparklineData?: number[];
  delay?: number;
  accentColor?: string;
  width?: number | string;
  style?: React.CSSProperties;
}

/**
 * StatOdometerCard
 * High-impact analytical metric card that animates numbers, trend pills,
 * and vector sparklines with organic spring physics.
 * Replaces static PowerPoint data blocks with dynamic financial telemetry.
 */
export const StatOdometerCard: React.FC<StatOdometerCardProps> = ({
  label,
  startValue = 0,
  endValue,
  prefix = '$',
  suffix = '',
  decimals = 0,
  trendText,
  trendType = 'bullish',
  sparklineData = [12, 18, 15, 24, 32, 28, 45, 68, 95],
  delay = 20,
  accentColor,
  width = 460,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Color scheme derived from trend
  const trendColors = {
    bullish: { text: '#00e676', bg: 'rgba(0, 230, 118, 0.12)', border: 'rgba(0, 230, 118, 0.35)' },
    bearish: { text: '#ff3b30', bg: 'rgba(255, 59, 48, 0.12)', border: 'rgba(255, 59, 48, 0.35)' },
    neutral: { text: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.35)' },
    alert: { text: '#ffd166', bg: 'rgba(255, 209, 102, 0.12)', border: 'rgba(255, 209, 102, 0.35)' },
  };

  const activeColor = accentColor || trendColors[trendType].text;

  // Staggered spring animations
  const cardProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 100, mass: 0.6 },
  });

  const cardScale = interpolate(cardProgress, [0, 1], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardOpacity = interpolate(cardProgress, [0, 0.3, 1], [0, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sparkline draw animation
  const sparkProgress = spring({
    frame: frame - (delay + 8),
    fps,
    config: { damping: 15, stiffness: 70, mass: 0.8 },
  });

  const drawRatio = interpolate(sparkProgress, [0, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Generate SVG path for sparkline
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const svgWidth = 260;
  const svgHeight = 60;

  const points = sparklineData.map((val, idx) => {
    const x = (idx / (sparklineData.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / range) * (svgHeight - 12) - 6;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 16,
        padding: '24px 28px',
        background: 'rgba(15, 20, 30, 0.82)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: `0 18px 45px rgba(0, 0, 0, 0.6), 0 0 40px ${activeColor}15`,
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        ...style,
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: `${activeColor}20`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header: Label + Trend Pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {label}
        </span>

        {trendText && (
          <div
            style={{
              padding: '3px 10px',
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: trendColors[trendType].text,
              background: trendColors[trendType].bg,
              border: `1px solid ${trendColors[trendType].border}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {trendText}
          </div>
        )}
      </div>

      {/* Hero Metric Number Display */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
        <span style={{ fontSize: 52, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
          <DynamicCounter
            startValue={startValue}
            endValue={endValue}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            delay={delay + 4}
          />
        </span>
      </div>

      {/* Animated SVG Sparkline */}
      <div style={{ width: '100%', height: svgHeight, position: 'relative' }}>
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={pathD}
            stroke={activeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset={drawRatio * 400}
          />
          {/* Pulsing endpoint dot */}
          {sparkProgress > 0.95 && (
            <circle
              cx={points[points.length - 1].split(',')[0]}
              cy={points[points.length - 1].split(',')[1]}
              r="4.5"
              fill={activeColor}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
