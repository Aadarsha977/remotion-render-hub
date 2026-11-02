import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface DynamicOdometerProps {
  from?: number;
  to: number;
  durationInFrames?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
  fontSize?: number;
}

export const DynamicOdometer: React.FC<DynamicOdometerProps> = ({
  from = 0,
  to,
  durationInFrames = 40,
  delay = 0,
  prefix = '$',
  suffix = '',
  decimals = 0,
  color = LITTLE_BIT_BETTER_THEME.inkPrimary,
  fontSize = 36,
}) => {
  const frame = useCurrentFrame();

  if (frame < delay) {
    return (
      <span style={{ fontSize, fontWeight: 900, color, fontFamily: 'monospace' }}>
        {prefix}
        {from.toLocaleString()}
        {suffix}
      </span>
    );
  }

  const currentVal = interpolate(
    frame,
    [delay, delay + durationInFrames],
    [from, to],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const formatted =
    decimals > 0
      ? currentVal.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.floor(currentVal).toLocaleString('en-US');

  return (
    <span
      style={{
        fontSize,
        fontWeight: 900,
        color,
        fontFamily: "'Inter', monospace",
        letterSpacing: -0.5,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
