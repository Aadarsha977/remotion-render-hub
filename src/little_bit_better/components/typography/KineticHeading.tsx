import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface KineticHeadingProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  tag?: string;
  tagColor?: string;
  delay?: number;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  title,
  subtitle,
  tag,
  tagColor = LITTLE_BIT_BETTER_THEME.accentAmber,
  delay = 0,
  align = 'center',
  size = 'lg',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 180 },
  });

  const subtitleSpring = spring({
    frame: frame - (delay + 6),
    fps,
    config: { damping: 18, stiffness: 160 },
  });

  if (frame < delay) return null;

  const fontSizes = {
    sm: { title: 28, subtitle: 18 },
    md: { title: 38, subtitle: 20 },
    lg: { title: 52, subtitle: 24 },
    xl: { title: 64, subtitle: 28 },
  };

  const { title: tSize, subtitle: sSize } = fontSizes[size];

  const translateY = interpolate(titleSpring, [0, 1], [30, 0]);
  const opacity = interpolate(titleSpring, [0, 0.4], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        textAlign: align,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {tag && (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: tagColor,
            color: '#FFFFFF',
            padding: '4px 14px',
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          {tag}
        </div>
      )}

      <h1
        style={{
          margin: 0,
          fontSize: tSize,
          fontWeight: 900,
          lineHeight: 1.15,
          color: LITTLE_BIT_BETTER_THEME.inkPrimary,
          letterSpacing: -1,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            margin: '8px 0 0 0',
            fontSize: sSize,
            fontWeight: 500,
            color: LITTLE_BIT_BETTER_THEME.inkSecondary,
            opacity: subtitleSpring,
            maxWidth: 800,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
