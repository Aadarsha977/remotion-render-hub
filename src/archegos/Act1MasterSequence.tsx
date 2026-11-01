import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { Scene001Master } from './Scene001Master';
import { Scene002Master } from './Scene002Master';

export interface Act1MasterSequenceProps {
  transparentBackground?: boolean;
}

/**
 * Act1MasterSequence: The Cold Open & The Ghost Family Office
 * Total Length: 65.16s (1955 Frames @ 30 FPS)
 * Seamlessly connects Scene 001 (874 frames) and Scene 002 (1081 frames).
 * Enforces logical spatial handoffs and zero empty frame intervals.
 */
export const Act1MasterSequence: React.FC<Act1MasterSequenceProps> = ({
  transparentBackground = false,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: transparentBackground ? 'transparent' : '#0C0E14' }}>
      <Series>
        <Series.Sequence durationInFrames={874}>
          <Scene001Master transparentBackground={transparentBackground} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={1081}>
          <Scene002Master transparentBackground={transparentBackground} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
