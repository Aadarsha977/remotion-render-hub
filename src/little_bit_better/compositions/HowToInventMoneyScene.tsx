import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from 'remotion';
import { PaperTextureCanvas } from '../components/canvas/PaperTextureCanvas';
import { LittleBitBetterBoy } from '../components/character/LittleBitBetterBoy';
import { LittleBitBetterFather } from '../components/character/LittleBitBetterFather';
import { CarWashSquad } from '../components/character/CarWashSquad';
import { MuddyCar } from '../components/metaphors/MuddyCar';
import { TownhouseStreet } from '../components/metaphors/TownhouseStreet';
import { DoorwayPerspective } from '../components/metaphors/DoorwayPerspective';
import { StorefrontBuilding } from '../components/metaphors/StorefrontBuilding';
import { LITTLE_BIT_BETTER_PALETTES } from '../types';

/**
 * 1:1 Forensic Recreation of Little Bit Better (hhUn8kmTfO0).
 * First Minute Master Scene (0:00 to 1:05 / 1,950 frames @ 30fps).
 * Features:
 * - Authentic tactile paper grain canvas
 * - True 2.5D modern sedan with 8-spoke alloy fan rims and clustered organic mud
 * - Authentic brownstone townhouse with 4 stoop steps, quoin stones, and hourglass curtains
 * - Cinematic extreme foreground bust staging (Shots 3, 6, and 9)
 * - Verbatim audio track synchronization with zero drift
 */
export const HowToInventMoneyScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#FBF4DB' }}>
      {/* =========================================================================
          AUTHENTIC AUDIO TRACK (0:00 TO 1:05)
      ========================================================================= */}
      <Audio src={staticFile('audio/minute1_audio.wav')} volume={1.0} />

      {/* =========================================================================
          SHOT 1: THE INTRO / PARCHMENT & PETROL TEAL (Frames 0 to 300 / 0s - 10s)
          "Most people think it takes money to make money. That belief is wrong..."
      ========================================================================= */}
      {frame < 300 && (
        <PaperTextureCanvas backgroundColor={LITTLE_BIT_BETTER_PALETTES.ivoryTeal.canvasBg}>
          {/* Poverty Brick Wall (Visible during 210f - 270f) */}
          {frame >= 210 && frame < 270 && (
            <svg
              style={{
                position: 'absolute',
                top: 220,
                left: 160,
                width: 1600,
                height: 520,
                opacity: 0.45,
              }}
            >
              {[0, 60, 120, 180, 240, 300, 360].map((by) => (
                <g key={by}>
                  <line x1="0" y1={by} x2="1600" y2={by} stroke="#045B63" strokeWidth="6" />
                  {[0, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((bx) => (
                    <line
                      key={bx}
                      x1={bx + (by % 120 === 0 ? 0 : 80)}
                      y1={by}
                      x2={bx + (by % 120 === 0 ? 0 : 80)}
                      y2={by + 60}
                      stroke="#045B63"
                      strokeWidth="6"
                    />
                  ))}
                </g>
              ))}
            </svg>
          )}

          {/* Dynamic Camera Punch-In Container */}
          {(() => {
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
              'holding_cash';
            if (frame < 90) boyPose = 'holding_cash';
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
                    x={780}
                    y={280}
                    scale={1.5}
                  />
                ) : (
                  <LittleBitBetterBoy
                    pose={boyPose}
                    colorTheme="teal"
                    x={810}
                    y={320}
                    scale={1.5}
                  />
                )}
              </div>
            );
          })()}
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 2: INVERTED TITLE CARD / SOLID DEEP TEAL (Frames 300 to 420 / 10s - 14s)
          "#1 - Rich Dad's first lessons is how to invent money. Here is how."
      ========================================================================= */}
      {frame >= 300 && frame < 420 && (
        <PaperTextureCanvas backgroundColor={LITTLE_BIT_BETTER_PALETTES.invertedTeal.canvasBg}>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Hand-drawn "#1" */}
            <div
              style={{
                fontSize: 160,
                fontWeight: 900,
                color: '#FDF5DC',
                fontFamily: 'Georgia, serif, monospace',
                letterSpacing: -4,
                marginTop: -80,
              }}
            >
              #1
            </div>

            {/* Gentleman Silhouette with Top Hat, Monocle, Bow Tie, and Lightbulb */}
            <svg width="240" height="260" viewBox="0 0 220 240" fill="none">
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

              {/* Gesturing Arm toward Lightbulb */}
              <path d="M 125 150 Q 155 155 175 130" stroke="#FDF5DC" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Lightbulb */}
              <g transform="translate(165, 80)">
                <circle cx="18" cy="18" r="16" stroke="#FDF5DC" strokeWidth="4" fill="none" />
                <path d="M 10 32 L 26 32 L 23 42 L 13 42 Z" fill="#FDF5DC" />
                <line x1="18" y1="10" x2="18" y2="24" stroke="#FDF5DC" strokeWidth="3" />
              </g>
            </svg>
          </div>
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 3: THE STREET PAN & DIRTY CARS (Frames 420 to 780 / 14s - 26s)
          "A kid is walking around his neighborhood, and he notices that almost
           every car parked on his street is dirty..."
          MATCHING FRAME 020 1:1 WITH EXTREME FOREGROUND BUST SHOT
      ========================================================================= */}
      {frame >= 420 && frame < 780 && (
        <PaperTextureCanvas backgroundColor="#B8A18C">
          {(() => {
            // Horizontal world pan
            const trackX = interpolate(frame, [420, 780], [0, -320], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                style={{
                  position: 'absolute',
                  width: 2500,
                  height: 1080,
                  transform: `translateX(${trackX}px)`,
                }}
              >
                {/* Midground & Background: Townhouses, stoop, and street */}
                <TownhouseStreet x={0} y={0} />

                {/* Parked Modern Muddy Sedans along the curb */}
                {/* Car 1: Left */}
                <MuddyCar x={-60} y={490} scale={1.22} carColor="#8B7355" hasMud={true} />
                {/* Car 2: Right (Flipped facing left) */}
                <MuddyCar x={1750} y={490} scale={1.22} carColor="#7A6652" hasMud={true} flipHorizontal={true} />
              </div>
            );
          })()}

          {/* CRITICAL FOREGROUND CINEMATIC DEPTH: Kid bust shot on left glancing back */}
          <LittleBitBetterBoy
            pose="bust_glance_back"
            colorTheme="brown"
            x={-10}
            y={350}
            scale={2.7}
          />
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 4: DOOR KNOCK CLOSE-UP (Frames 780 to 840 / 26s - 28s)
          "So he knocks on a neighbor's door..."
      ========================================================================= */}
      {frame >= 780 && frame < 840 && (
        <PaperTextureCanvas backgroundColor="#9E8C78">
          <DoorwayPerspective
            viewMode="knock_closeup"
            showKnockEffect={frame % 8 < 5}
          />
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 5: INTERIOR HALLWAY PERSPECTIVE (Frames 840 to 1020 / 28s - 34s)
          "...and asks: 'Do you want your car washed?' Seven out of 20 people say yes."
          MATCHING FRAME 030 1:1
      ========================================================================= */}
      {frame >= 840 && frame < 1020 && (
        <PaperTextureCanvas backgroundColor="#AF746E">
          <DoorwayPerspective viewMode="interior" />

          {/* Father Standing Inside (Right) - Tall build matching frame 030 */}
          <LittleBitBetterFather x={1040} y={190} scale={1.48} />

          {/* Kid Standing Outside in Open Doorway (Framed in daylight, waving) */}
          <LittleBitBetterBoy
            pose="waving"
            colorTheme="brown"
            x={650}
            y={380}
            scale={1.38}
          />
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 6: EXTERIOR STOOP REVERSE ANGLE (Frames 1020 to 1200 / 34s - 40s)
          "The kid doesn't even own a bucket, a sponge, or soap..."
          MATCHING FRAME 038 1:1 WITH FOREGROUND KID LOOKING BACK AT STOOP CUSTOMER
      ========================================================================= */}
      {frame >= 1020 && frame < 1200 && (
        <PaperTextureCanvas backgroundColor="#B8A18C">
          {/* Background: Townhouse with customer on stoop */}
          <TownhouseStreet x={-200} y={-30} scale={1.05} showStoopCustomer={true} />

          {/* Foreground Kid looking back at neighbor on stoop */}
          <LittleBitBetterBoy
            pose="bust_stoop_look"
            colorTheme="brown"
            x={20}
            y={360}
            scale={2.4}
          />
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 7: THE UPFRONT CASH DEAL (Frames 1200 to 1560 / 40s - 52s)
          "...so he tells them he needs half upfront. And they hand him the cash."
          MATCHING FRAME 045 & FRAME 050 1:1
      ========================================================================= */}
      {frame >= 1200 && frame < 1560 && (
        <PaperTextureCanvas backgroundColor="#9E8C78">
          <DoorwayPerspective viewMode="exterior" />

          {/* Father at Doorway (Left) - Hands cash at frame 1380+ */}
          <LittleBitBetterFather
            x={640}
            y={420}
            scale={1.35}
            isInsideDoor={true}
            handingCash={frame >= 1380}
          />

          {/* Kid on Stoop Step (Right) - asks upfront with open hand receiving cash */}
          <LittleBitBetterBoy
            pose="asking_upfront"
            colorTheme="brown"
            x={960}
            y={470}
            scale={1.25}
          />
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 8: STOREFRONT DASH (Frames 1560 to 1650 / 52s - 55s)
          "He takes that money straight to the store, buys everything he needs..."
          MATCHING FRAME 053 1:1
      ========================================================================= */}
      {frame >= 1560 && frame < 1650 && (
        <PaperTextureCanvas backgroundColor="#B8A18C">
          <StorefrontBuilding />

          {/* Kid running into store holding cash */}
          {(() => {
            const runX = interpolate(frame, [1560, 1650], [920, 1140], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <LittleBitBetterBoy
                pose="holding_cash"
                colorTheme="brown"
                x={runX}
                y={580}
                scale={0.85}
              />
            );
          })()}
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SHOT 9: THE CAR WASH SQUAD / PURE PROFIT (Frames 1650 to 1950 / 55s - 65s)
          "...and hires a few friends from school to do the actual work.
           His customers paid for equipment, friends did the washing...
           pure profit."
          MATCHING FRAME 060 & FRAME 065 1:1 WITH EXTREME FOREGROUND PRESENTER
      ========================================================================= */}
      {frame >= 1650 && (
        <PaperTextureCanvas backgroundColor="#CBB29C">
          {/* Subtle warm gradient ground */}
          <div
            style={{
              position: 'absolute',
              top: 590,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, #BFA38D 0%, #A88B75 100%)',
              borderTop: '6px solid #3D312A',
            }}
          />

          {/* MIDGROUND & BACKGROUND: Car being washed & Boss kid */}
          {/* Modern Sedan facing right (rear on left, hood on right) */}
          <MuddyCar
            x={650}
            y={120}
            scale={1.22}
            carColor="#8B7355"
            hasMud={frame < 1850}
            isClean={frame >= 1850}
            flipHorizontal={true}
          />

          {/* The Car Wash Squad (Girl with pigtails on rear tire & Boy on front hood) */}
          <CarWashSquad x={210} y={110} scale={1.22} />

          {/* Boss Kid in mid-distance on the far left standing with hands on hips */}
          <LittleBitBetterBoy
            pose="hands_on_hips"
            colorTheme="brown"
            x={10}
            y={240}
            scale={1.05}
          />

          {/* CRITICAL FOREGROUND PRESENTER: Narrator kid bust shot on the right */}
          {(() => {
            // Camera push-in on narrator kid at "pure profit" payoff
            const zoomIn = interpolate(frame, [1820, 1920], [1.0, 1.15], {
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            // Head turns from glancing back at squad to facing viewer directly
            const headTurn: 'left' | 'forward' = frame >= 1840 ? 'forward' : 'left';

            return (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: `scale(${zoomIn})`,
                  transformOrigin: '75% 75%',
                }}
              >
                <LittleBitBetterBoy
                  pose="bust_presenter"
                  colorTheme="brown"
                  headTurn={headTurn}
                  x={1040}
                  y={250}
                  scale={2.5}
                />
              </div>
            );
          })()}
        </PaperTextureCanvas>
      )}
    </AbsoluteFill>
  );
};
