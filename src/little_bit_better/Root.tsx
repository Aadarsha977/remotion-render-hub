import React from 'react';
import { Composition } from 'remotion';
import { DanielVsMichaelScene } from './compositions/DanielVsMichaelScene';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="DanielVsMichael"
        component={DanielVsMichaelScene}
        durationInFrames={900} // 30 seconds @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
