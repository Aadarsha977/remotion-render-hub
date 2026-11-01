import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface PressureGaugeProps {
  label?: string;
  value: number; // 0 to 100
  criticalThreshold?: number; // e.g. 75
  delay?: number;
  size?: number;
  unit?: string;
  accentColor?: string;
  alertColor?: string;
  style?: React.CSSProperties;
}

/**
 * PressureGauge
 * Parametric kinetic metaphor dial representing stress, debt, emotional overload, or systemic pressure.
 * Mechanics:
 * - Animated needle sweeping from baseline (0%) to value (%)
 * - When crossing criticalThreshold, needle develops high-frequency vibration jitter
 * - Dynamic SVG arc with color-coded safety, warning, and alert zones
 * - Pulsing alert backlight
 */
export const PressureGauge: React.FC<PressureGaugeProps> = ({
  label = 'SYSTEMIC STRESS LEVEL',
  value = 88,
  criticalThreshold = 75,
  delay = 20,
  size = 320,
  unit = 'PSI',
  accentColor = '#38bdf8',
  alertColor = '#ff3b30',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy needle spring sweep
  const sweepProgress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
      mass: 0.7,
    },
  });

  const animatedValue = interpolate(sweepProgress, [0, 1], [0, Math.min(100, Math.max(0, value))], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isCritical = animatedValue >= criticalThreshold;

  // High-frequency vibration jitter when in critical overload zone
  const jitter = isCritical && frame > delay + 15
    ? Math.sin(frame * 1.2) * 2.8 * (animatedValue / 100)
    : 0;

  // Dial needle angle: -120deg (at 0) to +120deg (at 100)
  const needleAngle = interpolate(animatedValue, [0, 100], [-120, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }) + jitter;

  // Pulse opacity for red alert glow
  const alertPulse = isCritical
    ? interpolate(Math.sin((frame - delay) * 0.25), [-1, 1], [0.35, 0.85], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Critical Overload Volumetric Glow */}
      {isCritical && (
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            background: alertColor,
            filter: 'blur(45px)',
            opacity: alertPulse * 0.45,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Main Gauge SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Arc Track */}
        <circle
          cx="100"
          cy="100"
          r="75"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="360"
          strokeDashoffset="120"
          transform="rotate(150 100 100)"
        />

        {/* Safety Zone (Green) */}
        <circle
          cx="100"
          cy="100"
          r="75"
          stroke="#10b981"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="360"
          strokeDashoffset="280"
          transform="rotate(150 100 100)"
          opacity="0.4"
        />

        {/* Critical Danger Zone (Red) */}
        <circle
          cx="100"
          cy="100"
          r="75"
          stroke={alertColor}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="360"
          strokeDashoffset="310"
          transform="rotate(265 100 100)"
          opacity={isCritical ? "0.9" : "0.3"}
        />

        {/* Active Value Progress Stroke */}
        <circle
          cx="100"
          cy="100"
          r="75"
          stroke={isCritical ? alertColor : accentColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="360"
          strokeDashoffset={interpolate(animatedValue, [0, 100], [360, 120], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}
          transform="rotate(150 100 100)"
        />

        {/* Center Pivot Hub */}
        <circle cx="100" cy="100" r="14" fill="#0f172a" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" />
        <circle cx="100" cy="100" r="6" fill={isCritical ? alertColor : accentColor} />

        {/* Kinetic Animated Needle */}
        <g transform={`rotate(${needleAngle} 100 100)`}>
          <polygon
            points="97,100 100,32 103,100"
            fill={isCritical ? alertColor : '#ffffff'}
            filter="drop-shadow(0px 2px 6px rgba(0,0,0,0.8))"
          />
        </g>
      </svg>

      {/* Numerical Telemetry Display */}
      <div
        style={{
          marginTop: -40,
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
          <span style={{ fontSize: 38, fontWeight: 900, color: isCritical ? alertColor : '#ffffff', lineHeight: 1 }}>
            {Math.round(animatedValue)}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)' }}>
            {unit}
          </span>
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: isCritical ? alertColor : 'rgba(255, 255, 255, 0.6)',
            marginTop: 4,
          }}
        >
          {isCritical ? '⚠️ OVERLOAD CRITICAL' : label}
        </div>
      </div>
    </div>
  );
};
