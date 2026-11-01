import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface MaskedRevealProps {
  text: string;
  delay?: number;
  staggerFrames?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
  accentIndices?: number[];
  accentStyle?: React.CSSProperties;
  enableTrackingDecel?: boolean;
}

/**
 * MaskedReveal
 * Splits text into individual words, each masked inside an overflow:hidden
 * bounding box, executing staggered spring slide-ups with letter-spacing settle.
 */
export const MaskedReveal: React.FC<MaskedRevealProps> = ({
  text,
  delay = 12,
  staggerFrames = 4,
  as: Component = 'h1',
  style = {},
  wordStyle = {},
  accentIndices = [],
  accentStyle = { color: '#38bdf8' },
  enableTrackingDecel = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  // Global tracking deceleration across the phrase
  const tracking = enableTrackingDecel
    ? interpolate(frame, [delay, delay + 28], [0.08, -0.02], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <Component
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        letterSpacing: `${tracking}em`,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * staggerFrames;
        
        // Spring physics for snappy slide-up
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: {
            damping: 13,
            stiffness: 110,
            mass: 0.5,
          },
        });

        const translateY = interpolate(progress, [0, 1], [115, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.9, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const isAccent = accentIndices.includes(i);

        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              padding: '0 0.18em 0.08em 0.18em',
              margin: '0 -0.04em',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${translateY}%)`,
                opacity,
                ...wordStyle,
                ...(isAccent ? accentStyle : {}),
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
};
