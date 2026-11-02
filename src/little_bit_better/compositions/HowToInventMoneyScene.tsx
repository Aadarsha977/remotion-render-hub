import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from 'remotion';
import { LittleBitBetterBoy } from '../components/character/LittleBitBetterBoy';
import { LittleBitBetterFather } from '../components/character/LittleBitBetterFather';
import { CarWashSquad } from '../components/character/CarWashSquad';
import { MuddyCar } from '../components/metaphors/MuddyCar';
import { TownhouseStreet } from '../components/metaphors/TownhouseStreet';
import { DoorwayPerspective } from '../components/metaphors/DoorwayPerspective';
import { StorefrontBuilding } from '../components/metaphors/StorefrontBuilding';
import { LITTLE_BIT_BETTER_PALETTES } from '../types';

export const HowToInventMoneyScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#FBF4DB' }}>
      {/* =========================================================================
          VERBATIM AUTHENTIC MASTER AUDIO TRACK (0:00 to 1:05)
      ========================================================================= */}
      <Audio src={staticFile('audio/minute1_audio.wav')} volume={1.0} />

      {/* =========================================================================
          SCENE 1: THE INTRO / PARCHMENT & PETROL TEAL (Frames 0 to 300 / 0s - 10s)
          "Most people think it takes money to make money. That belief is wrong..."
      ========================================================================= */}
      {frame < 300 && (
        <AbsoluteFill style={{ backgroundColor: LITTLE_BIT_BETTER_PALETTES.ivoryTeal.canvasBg }}>
          {/* Subtle parchment texture dots */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(rgba(4, 91, 99, 0.08) 1.5px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Poverty Brick Wall (Visible during 210f - 270f) */}
          {frame >= 210 && frame < 270 && (
            <svg
              style={{
                position: 'absolute',
                top: 240,
                left: 160,
                width: 1600,
                height: 500,
                opacity: 0.35,
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((by) => (
                <g key={by}>
                  <line x1="0" y1={by} x2="1600" y2={by} stroke="#045B63" strokeWidth="5" />
                  {[0, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((bx) => (
                    <line
                      key={bx}
                      x1={bx + (by % 120 === 0 ? 0 : 80)}
                      y1={by}
                      x2={bx + (by % 120 === 0 ? 0 : 80)}
                      y2={by + 60}
                      stroke="#045B63"
                      strokeWidth="5"
                    />
                  ))}
                </g>
              ))}
            </svg>
          )}

          {/* Dynamic Camera Punch-In Container */}
          {(() => {
            // 0 - 90f: Full body (zoom: 1.0)
            // 90 - 180f: Upper body holding cash (zoom: 1.5)
            // 180 - 210f: Face close-up (zoom: 2.2)
            // 210 - 270f: Broke slumped mode (zoom: 1.0)
            // 270 - 300f: Holding Rich Dad book (zoom: 1.35)
            let zoom = 1.0;
            let translateY = 0;

            if (frame >= 90 && frame < 180) {
              zoom = interpolate(frame, [90, 110], [1.0, 1.48], {
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              translateY = interpolate(frame, [90, 110], [0, 140], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
            } else if (frame >= 180 && frame < 210) {
              zoom = 2.2;
              translateY = 320;
            } else if (frame >= 270 && frame < 300) {
              zoom = 1.35;
              translateY = 110;
            }

            let boyPose: 'standing_idle' | 'holding_cash' | 'slumped_broke' | 'holding_book' =
              'standing_idle';
            if (frame >= 90 && frame < 210) boyPose = 'holding_cash';
            if (frame >= 210 && frame < 270) boyPose = 'slumped_broke';
            if (frame >= 270) boyPose = 'holding_book';

            return (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: `scale(${zoom}) translateY(${translateY}px)`,
                  transformOrigin: '50% 45%',
                }}
              >
                {boyPose === 'slumped_broke' ? (
                  <LittleBitBetterBoy
                    pose="slumped_broke"
                    colorTheme="teal"
                    x={790}
                    y={520}
                    scale={1.5}
                  />
                ) : (
                  <LittleBitBetterBoy
                    pose={boyPose}
                    colorTheme="teal"
                    x={830}
                    y={520}
                    scale={1.5}
                  />
                )}
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 2: INVERTED TITLE CARD / SOLID DEEP TEAL (Frames 300 to 420 / 10s - 14s)
          "#1 - Rich Dad's first lessons is how to invent money. Here is how."
      ========================================================================= */}
      {frame >= 300 && frame < 420 && (
        <AbsoluteFill
          style={{
            backgroundColor: LITTLE_BIT_BETTER_PALETTES.invertedTeal.canvasBg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Hand-drawn "#1" */}
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: LITTLE_BIT_BETTER_PALETTES.invertedTeal.textIvory,
              fontFamily: 'serif, monospace',
              letterSpacing: -4,
              marginTop: -60,
            }}
          >
            #1
          </div>

          {/* Gentleman Silhouette with Top Hat, Monocle, Bow Tie, and Lightbulb */}
          <svg width="220" height="240" viewBox="0 0 220 240" fill="none">
            {/* Top Hat */}
            <path d="M 60 70 L 140 70 L 132 20 L 68 20 Z" fill="#FDF5DC" />
            <rect x="45" y="66" width="110" height="12" rx="4" fill="#FDF5DC" />

            {/* Head & Monocle */}
            <ellipse cx="100" cy="100" rx="28" ry="30" fill="#FDF5DC" />
            <circle cx="88" cy="98" r="8" fill="none" stroke="#055C64" strokeWidth="3" />
            <line x1="88" y1="106" x2="88" y2="120" stroke="#055C64" strokeWidth="2" />

            {/* Bow Tie */}
            <polygon points="90,132 100,138 90,144" fill="#FDF5DC" />
            <polygon points="110,132 100,138 110,144" fill="#FDF5DC" />
            <circle cx="100" cy="138" r="3" fill="#055C64" />

            {/* Body */}
            <rect x="75" y="142" width="50" height="60" rx="16" fill="#FDF5DC" />

            {/* Legs */}
            <line x1="90" y1="202" x2="90" y2="235" stroke="#FDF5DC" strokeWidth="5" strokeLinecap="round" />
            <line x1="110" y1="202" x2="110" y2="235" stroke="#FDF5DC" strokeWidth="5" strokeLinecap="round" />

            {/* Left Arm Gesture toward Lightbulb */}
            <path d="M 125 150 Q 155 155 175 130" stroke="#FDF5DC" strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* Lightbulb */}
            <g transform="translate(165, 80)">
              <circle cx="18" cy="18" r="16" stroke="#FDF5DC" strokeWidth="4" fill="none" />
              <path d="M 10 32 L 26 32 L 23 42 L 13 42 Z" fill="#FDF5DC" />
              <line x1="18" y1="10" x2="18" y2="24" stroke="#FDF5DC" strokeWidth="3" />
            </g>
          </svg>
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 3: THE STREET & DIRTY CARS (Frames 420 to 840 / 14s - 28s)
          "A kid is walking around his neighborhood, and he notices that almost
           every car parked on his street is dirty..."
      ========================================================================= */}
      {frame >= 420 && frame < 840 && (
        <AbsoluteFill style={{ backgroundColor: LITTLE_BIT_BETTER_PALETTES.kraftStreet.skyBg }}>
          {/* Horizontal tracking pan: camera translates left as kid walks */}
          {(() => {
            const trackX = interpolate(frame, [420, 780], [0, -420], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            // Zoom into door at 780f - 840f
            const doorZoom = interpolate(frame, [780, 840], [1.0, 2.4], {
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const doorTranslateY = interpolate(frame, [780, 840], [0, 200], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                style={{
                  position: 'absolute',
                  width: 2500,
                  height: 1080,
                  transform: `translateX(${trackX}px) scale(${doorZoom}) translateY(${doorTranslateY}px)`,
                  transformOrigin: '50% 50%',
                }}
              >
                {/* Townhouse Facades */}
                <TownhouseStreet x={0} y={0} />

                {/* Parked Cars on the Street */}
                {/* Car 1: Muddy Sedan Left */}
                <MuddyCar x={260} y={750} scale={1.2} carColor="#8B7355" hasMud={true} />
                {/* Car 2: Muddy Sedan Center */}
                <MuddyCar x={820} y={750} scale={1.2} carColor="#7A6652" hasMud={true} />
                {/* Car 3: Green Convertible Right */}
                <MuddyCar x={1440} y={750} scale={1.2} carColor="#7B997E" hasMud={false} />

                {/* The Kid Walking (Espresso Brown clothes, moving along sidewalk) */}
                <LittleBitBetterBoy
                  pose="standing_idle"
                  colorTheme="brown"
                  x={920}
                  y={680}
                  scale={1.35}
                />
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 4: INTERIOR DOORWAY PERSPECTIVE (Frames 840 to 1020 / 28s - 34s)
          "Do you want your car washed? Seven out of 20 people say yes."
      ========================================================================= */}
      {frame >= 840 && frame < 1020 && (
        <AbsoluteFill>
          <DoorwayPerspective viewMode="interior" />

          {/* Father Standing Inside (Right) */}
          <LittleBitBetterFather x={1080} y={540} scale={1.35} />

          {/* Kid Standing Outside in Open Doorway (Left, Waving) */}
          <LittleBitBetterBoy
            pose="waving"
            colorTheme="brown"
            x={750}
            y={590}
            scale={1.15}
          />
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 5: EXTERIOR STOOP CONVERSATION & CASH HANDOFF (Frames 1020 to 1560 / 34s - 52s)
          "The kid doesn't even own a bucket... so he tells them he needs half upfront.
           And they hand him the cash."
      ========================================================================= */}
      {frame >= 1020 && frame < 1560 && (
        <AbsoluteFill>
          <DoorwayPerspective viewMode="exterior" />

          {/* Father at Doorway (Left) - Hands cash at frame 1380+ */}
          <LittleBitBetterFather
            x={690}
            y={520}
            scale={1.25}
            handingCash={frame >= 1380}
          />

          {/* Kid on Stoop (Right) */}
          <LittleBitBetterBoy
            pose={frame >= 1380 ? 'holding_cash' : 'asking_for_cash'}
            colorTheme="brown"
            x={920}
            y={580}
            scale={1.2}
          />
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 6: STOREFRONT DASH (Frames 1560 to 1650 / 52s - 55s)
          "He takes that money straight to the store, buys everything he needs..."
      ========================================================================= */}
      {frame >= 1560 && frame < 1650 && (
        <AbsoluteFill>
          <StorefrontBuilding x={0} y={0} />

          {/* Kid running out of store doors holding cash & supplies */}
          {(() => {
            const runX = interpolate(frame, [1560, 1650], [920, 1150], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <LittleBitBetterBoy
                pose="holding_cash"
                colorTheme="brown"
                x={runX}
                y={680}
                scale={0.9}
              />
            );
          })()}
        </AbsoluteFill>
      )}

      {/* =========================================================================
          SCENE 7: THE CAR WASH SQUAD / PURE PROFIT (Frames 1650 to 1950 / 55s - 65s)
          "...and hires a few friends from school to do the actual work.
           His customers paid for equipment, friends did the washing...
           pure profit."
      ========================================================================= */}
      {frame >= 1650 && (
        <AbsoluteFill style={{ backgroundColor: LITTLE_BIT_BETTER_PALETTES.carWash.canvasBg }}>
          {/* Ground */}
          <div
            style={{
              position: 'absolute',
              top: 740,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#C5A98F',
              borderTop: '5px solid #3D312A',
            }}
          />

          {/* Dynamic Final Zoom into Boss Kid in Foreground (frame 1820+) */}
          {(() => {
            const finalZoom = interpolate(frame, [1820, 1900], [1.0, 1.35], {
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const finalX = interpolate(frame, [1820, 1900], [0, 120], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: `scale(${finalZoom}) translateX(${finalX}px)`,
                  transformOrigin: '40% 60%',
                }}
              >
                {/* Muddy Car being washed in Background (x = 750, y = 620) */}
                <MuddyCar
                  x={750}
                  y={620}
                  scale={1.3}
                  carColor="#8B7355"
                  hasMud={frame < 1850}
                  isClean={frame >= 1850}
                />

                {/* The Car Wash Squad (Girl with pigtails & Boy with squeegees) */}
                <CarWashSquad x={730} y={600} scale={1.25} />

                {/* The Kid: Boss Overseer in Foreground with Hands on Hips */}
                <LittleBitBetterBoy
                  pose="hands_on_hips"
                  colorTheme="brown"
                  x={360}
                  y={650}
                  scale={1.5}
                />
              </div>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
