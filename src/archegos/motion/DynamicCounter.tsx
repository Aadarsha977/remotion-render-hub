import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface DynamicCounterProps {
  startValue?: number;
  endValue: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  useGrouping?: boolean;
  style?: React.CSSProperties;
}

/**
 * DynamicCounter
 * Renders a live ticking number counter animated via Remotion spring physics,
 * formatting currency, percentages, or integers cleanly.
 */
export const DynamicCounter: React.FC<DynamicCounterProps> = ({
  startValue = 0,
  endValue,
  delay = 24,
  prefix = '',
  suffix = '',
  decimals = 0,
  useGrouping = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic spring physics for number count-up
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
      mass: 0.6,
    },
  });

  const rawValue = interpolate(progress, [0, 1], [startValue, endValue], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const formattedNumber = decimals > 0
    ? rawValue.toFixed(decimals)
    : Math.round(rawValue).toLocaleString('en-US', { useGrouping });

  return (
    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
        display: 'inline-block',
        ...style,
      }}
    >
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
