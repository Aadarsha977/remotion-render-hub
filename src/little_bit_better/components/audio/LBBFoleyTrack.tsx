import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

interface FoleyCue {
  frame: number;
  type: 'pop' | 'coin' | 'whoosh' | 'thud';
  volume?: number;
}

const FOLEY_CUES: FoleyCue[] = [
  // Scene 1: Intro Pops
  { frame: 1, type: 'whoosh', volume: 0.35 },
  { frame: 105, type: 'thud', volume: 0.3 }, // "That belief is wrong"
  { frame: 210, type: 'pop', volume: 0.5 }, // Beggar wall / bowl appears
  { frame: 270, type: 'pop', volume: 0.6 }, // Rich Dad book pops in

  // Scene 2: Title Card
  { frame: 300, type: 'whoosh', volume: 0.4 },
  { frame: 320, type: 'pop', volume: 0.5 }, // Gentleman & bulb pop

  // Page Peel Wipe Chapter Reset
  { frame: 405, type: 'whoosh', volume: 0.7 }, // Page peel diagonal slide

  // Scene 3: Street & Opportunity
  { frame: 420, type: 'whoosh', volume: 0.3 },
  { frame: 540, type: 'pop', volume: 0.5 }, // Dirty cars pop
  { frame: 714, type: 'pop', volume: 0.6 }, // Lightbulb idea over kid's head!

  // Scene 4 & 5: Knocking & Doorway
  { frame: 785, type: 'thud', volume: 0.5 }, // Knock impact 1
  { frame: 795, type: 'thud', volume: 0.5 }, // Knock impact 2
  { frame: 805, type: 'thud', volume: 0.5 }, // Knock impact 3
  { frame: 840, type: 'whoosh', volume: 0.35 }, // Door swings open

  // Scene 6: Stat Badge & Offer
  { frame: 972, type: 'pop', volume: 0.6 }, // 7/20 Yes stat badge
  { frame: 1020, type: 'whoosh', volume: 0.35 },
  { frame: 1074, type: 'pop', volume: 0.5 }, // Crossed-out bucket pops in

  // Scene 7: Cash Deal
  { frame: 1200, type: 'whoosh', volume: 0.35 },
  { frame: 1380, type: 'coin', volume: 0.7 }, // Cash handed over with coin chime!
  { frame: 1382, type: 'pop', volume: 0.5 },

  // Scene 8: Store Dash
  { frame: 1560, type: 'whoosh', volume: 0.4 },
  { frame: 1610, type: 'pop', volume: 0.5 },

  // Scene 9: Car Wash Squad & Clean Profit
  { frame: 1650, type: 'whoosh', volume: 0.4 },
  { frame: 1660, type: 'pop', volume: 0.5 }, // Squad pops in
  { frame: 1845, type: 'coin', volume: 0.8 }, // Pure profit coin chime!
];

/**
 * Programmatic Foley Audio Synchronization Engine.
 * Automatically triggers pops, whooshes, and coin chimes at the exact micro-beat frames.
 */
export const LBBFoleyTrack: React.FC = () => {
  return (
    <>
      {FOLEY_CUES.map((cue, idx) => {
        const soundFile =
          cue.type === 'pop'
            ? 'audio/pop.wav'
            : cue.type === 'coin'
            ? 'audio/coin.wav'
            : cue.type === 'thud'
            ? 'audio/thud.wav'
            : 'audio/whoosh.wav';

        return (
          <Sequence
            key={`foley-${cue.frame}-${idx}`}
            from={cue.frame}
            durationInFrames={30}
          >
            <Audio
              src={staticFile(soundFile)}
              volume={cue.volume ?? 0.5}
            />
          </Sequence>
        );
      })}
    </>
  );
};
