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
import { LBBUnifiedCharacter } from '../components/character/LBBUnifiedCharacter';
import { LittleBitBetterBoy } from '../components/character/LittleBitBetterBoy';
import { LittleBitBetterFather } from '../components/character/LittleBitBetterFather';
import { CarWashSquad } from '../components/character/CarWashSquad';
import { MuddyCar } from '../components/metaphors/MuddyCar';
import { TownhouseStreet } from '../components/metaphors/TownhouseStreet';
import { DoorwayPerspective } from '../components/metaphors/DoorwayPerspective';
import { StorefrontBuilding } from '../components/metaphors/StorefrontBuilding';
import { PopAsset } from '../components/physics/PopAsset';
import { PagePeelTransition } from '../components/transitions/PagePeelTransition';
import {
  LightbulbProp,
  EmptyBucketCrossedProp,
  StatAcceptanceBadge,
} from '../components/metaphors/LBBProps';
import { LBBFoleyTrack } from '../components/audio/LBBFoleyTrack';
import { LITTLE_BIT_BETTER_PALETTES } from '../types';

/**
 * 1:1 Programmatic Master Recreation of LITTLE BIT BETTER (hhUn8kmTfO0).
 * Enforces the full architectural specification:
 * 1. Micro-pacing every 1.5 - 3.0s with zero visual freeze
 * 2. Cumulative stage-building across 12-25s macro scenes
 * 3. Signature diagonal page-peel chapter wipe with suit sleeve
 * 4. Elastic overshoot spring physics on every prop pop-in
 * 5. Continuous 1.2s idle micro-shift breathe/bob and natural eye blinks
 * 6. Strict 5-element design tokens (#F4EEDF, #165046, #967D69, #D4B26F, 3.8px line)
 * 7. Programmatic Foley audio synchronization (pops, whooshes, coin chimes)
 */
export const HowToInventMoneyScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#F4EEDF' }}>
      {/* =========================================================================
          VERBATIM AUTHENTIC MASTER AUDIO & SYNCHRONIZED FOLEY TRACK
      ========================================================================= */}
      <Audio src={staticFile('audio/minute1_audio.wav')} volume={1.0} />
      <LBBFoleyTrack />

      {/* =========================================================================
          CHAPTER RESET: SIGNATURE PAGE-PEEL WIPE TRANSITION (Frames 400 to 428)
      ========================================================================= */}
      <PagePeelTransition startFrame={400} durationInFrames={26} />

      {/* =========================================================================
          SCENE 1: THE INTRO / PARCHMENT & PINE TEAL (Frames 0 to 300 / 0s - 10s)
          "Most people think it takes money to make money. That belief is wrong..."
      ========================================================================= */}
      {frame < 300 && (
        <PaperTextureCanvas backgroundColor="#F4EEDF">
          {/* Poverty Brick Wall (Visible during 210f - 270f) */}
          {frame >= 210 && frame < 270 && (
            <PopAsset popFrame={210} origin="center center">
              <svg
                style={{
                  position: 'absolute',
                  top: 210,
                  left: 160,
                  width: 1600,
                  height: 520,
                  opacity: 0.45,
                }}
              >
                {[0, 60, 120, 180, 240, 300, 360].map((by) => (
                  <g key={by}>
                    <line x1="0" y1={by} x2="1600" y2={by} stroke="#165046" strokeWidth={5} />
                    {[0, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((bx) => (
                      <line
                        key={bx}
                        x1={bx + (by % 120 === 0 ? 0 : 80)}
                        y1={by}
                        x2={bx + (by % 120 === 0 ? 0 : 80)}
                        y2={by + 60}
                        stroke="#165046"
                        strokeWidth={5}
                      />
                    ))}
                  </g>
                ))}
              </svg>
            </PopAsset>
          )}

          {/* Dynamic Camera Punch-In Container */}
          {(() => {
            let zoom = 1.0;
            let translateY = 0;

            if (frame >= 90 && frame < 180) {
              zoom = interpolate(frame, [90, 110], [1.0, 1.45], {
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              translateY = interpolate(frame, [90, 110], [0, 130], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
            } else if (frame >= 180 && frame < 210) {
              zoom = 2.1;
              translateY = 300;
            } else if (frame >= 270 && frame < 300) {
              zoom = 1.35;
              translateY = 100;
            }

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
                {/* Character Actions synchronized with speech micro-beats */}
                {frame < 105 && (
                  <LBBUnifiedCharacter
                    action="holding_cash"
                    colorTheme="pine"
                    x={840}
                    y={320}
                    scale={1.45}
                  />
                )}

                {frame >= 105 && frame < 210 && (
                  // "That belief is wrong" -> shrugging with arms tilted outward 25°
                  <LBBUnifiedCharacter
                    action="shrugging"
                    colorTheme="pine"
                    x={840}
                    y={320}
                    scale={1.45}
                  />
                )}

                {frame >= 210 && frame < 270 && (
                  // "And it can keep you broke" -> slumped beggar against brick wall with chipped bowl
                  <LBBUnifiedCharacter
                    action="beggar_slump"
                    colorTheme="pine"
                    x={810}
                    y={280}
                    scale={1.45}
                  />
                )}

                {frame >= 270 && (
                  // "In Rich Dad Poor Dad" -> holding purple book
                  <LBBUnifiedCharacter
                    action="holding_book"
                    colorTheme="pine"
                    x={840}
                    y={320}
                    scale={1.45}
                  />
                )}
              </div>
            );
          })()}
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SCENE 2: INVERTED TITLE CARD / DEEP PINE TEAL (Frames 300 to 410 / 10s - 13.5s)
          "#1 - Rich Dad's first lessons is how to invent money. Here is how."
      ========================================================================= */}
      {frame >= 300 && frame < 410 && (
        <PaperTextureCanvas backgroundColor="#165046">
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
            {/* Pop-In Hand-drawn "#1" */}
            <PopAsset popFrame={302} origin="center center">
              <div
                style={{
                  fontSize: 160,
                  fontWeight: 900,
                  color: '#F4EEDF',
                  fontFamily: 'Georgia, serif, monospace',
                  letterSpacing: -4,
                  marginTop: -80,
                }}
              >
                #1
              </div>
            </PopAsset>

            {/* Gentleman Silhouette with Top Hat, Monocle, Bow Tie & Popping Lightbulb */}
            <PopAsset popFrame={315} origin="center center">
              <svg width="240" height="260" viewBox="0 0 220 240" fill="none">
                <path d="M 60 70 L 140 70 L 132 20 L 68 20 Z" fill="#F4EEDF" />
                <rect x="45" y="66" width="110" height="12" rx="4" fill="#F4EEDF" />
                <ellipse cx="100" cy="100" rx="28" ry="30" fill="#F4EEDF" />
                <circle cx="88" cy="98" r="8" fill="none" stroke="#165046" strokeWidth={3} />
                <line x1="88" y1="106" x2="88" y2="120" stroke="#165046" strokeWidth={2} />
                <polygon points="90,132 100,138 90,144" fill="#F4EEDF" />
                <polygon points="110,132 100,138 110,144" fill="#F4EEDF" />
                <circle cx="100" cy="138" r="3" fill="#165046" />
                <rect x="75" y="142" width="50" height="60" rx="16" fill="#F4EEDF" />
                <line x1="90" y1="202" x2="90" y2="235" stroke="#F4EEDF" strokeWidth={5} strokeLinecap="round" />
                <line x1="110" y1="202" x2="110" y2="235" stroke="#F4EEDF" strokeWidth={5} strokeLinecap="round" />
                <path d="M 125 150 Q 155 155 175 130" stroke="#F4EEDF" strokeWidth={5} strokeLinecap="round" fill="none" />
                {/* Popping Lightbulb with Soft Gold Accent */}
                <g transform="translate(165, 80)">
                  <circle cx="18" cy="18" r="16" stroke="#F4EEDF" strokeWidth={4} fill="#D4B26F" />
                  <path d="M 10 32 L 26 32 L 23 42 L 13 42 Z" fill="#F4EEDF" />
                  <line x1="18" y1="10" x2="18" y2="24" stroke="#165046" strokeWidth={3} />
                </g>
              </svg>
            </PopAsset>
          </div>
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SCENE 3: THE STREET PAN & DIRTY CARS (Frames 410 to 780 / 13.5s - 26s)
          "A kid is walking around his neighborhood, and he notices that almost
           every car parked on his street is dirty... This kid sees an opportunity."
          CUMULATIVE STAGE-BUILDING WITH PERSISTENT 2D HORIZON LINE
      ========================================================================= */}
      {frame >= 410 && frame < 780 && (
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

                {/* Pop-In Dirty Sedans along the curb at Frame 540 */}
                <PopAsset popFrame={540} origin="bottom center">
                  <MuddyCar x={-60} y={490} scale={1.22} carColor="#8B7355" hasMud={true} />
                </PopAsset>
                <PopAsset popFrame={560} origin="bottom center">
                  <MuddyCar x={1750} y={490} scale={1.22} carColor="#7A6652" hasMud={true} flipHorizontal={true} />
                </PopAsset>
              </div>
            );
          })()}

          {/* Opportunity Thought Lightbulb pops in over kid's head at frame 714 */}
          {frame >= 714 && (
            <div style={{ position: 'absolute', left: 240, top: 220, zIndex: 10 }}>
              <PopAsset popFrame={714} origin="bottom center">
                <LightbulbProp scale={1.3} />
              </PopAsset>
            </div>
          )}

          {/* CRITICAL FOREGROUND CINEMATIC DEPTH: Kid bust shot on left glancing back */}
          <LittleBitBetterBoy
            pose={frame >= 714 ? 'standing_idle' : 'bust_glance_back'}
            colorTheme="brown"
            x={-10}
            y={350}
            scale={2.7}
          />
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SCENE 4: DOOR KNOCK CLOSE-UP (Frames 780 to 840 / 26s - 28s)
          "So he knocks on about 20 doors..."
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
          SCENE 5: INTERIOR HALLWAY & ACCEPTANCE STAT (Frames 840 to 1020 / 28s - 34s)
          "...and asks: 'Do you want your car washed?' Seven out of 20 people say yes."
      ========================================================================= */}
      {frame >= 840 && frame < 1020 && (
        <PaperTextureCanvas backgroundColor="#AF746E">
          <DoorwayPerspective viewMode="interior" />

          {/* Father Standing Inside (Right) with Idle Breathe & Bob */}
          <LittleBitBetterFather x={1040} y={190} scale={1.48} />

          {/* Kid Standing Outside in Open Doorway (Framed in daylight, waving) */}
          <LittleBitBetterBoy
            pose="waving"
            colorTheme="brown"
            x={650}
            y={380}
            scale={1.38}
          />

          {/* Pop-In "7 / 20 YES" Stat Badge at frame 972 ("Seven out of 20 people say yes") */}
          {frame >= 972 && (
            <div style={{ position: 'absolute', left: 780, top: 180, zIndex: 20 }}>
              <PopAsset popFrame={972} origin="center center">
                <StatAcceptanceBadge text="7 / 20 SAY YES" scale={1.25} />
              </PopAsset>
            </div>
          )}
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SCENE 6: THE DILEMMA / NO BUCKET (Frames 1020 to 1200 / 34s - 40s)
          "The kid doesn't even own a bucket. He has no money to buy one."
      ========================================================================= */}
      {frame >= 1020 && frame < 1200 && (
        <PaperTextureCanvas backgroundColor="#B8A18C">
          {/* Background: Townhouse with customer on stoop */}
          <TownhouseStreet x={-200} y={-30} scale={1.05} showStoopCustomer={true} />

          {/* Empty Crossed-Out Bucket pops in at frame 1074 */}
          {frame >= 1074 && (
            <div style={{ position: 'absolute', left: 320, top: 220, zIndex: 20 }}>
              <PopAsset popFrame={1074} origin="center center">
                <EmptyBucketCrossedProp scale={1.3} />
              </PopAsset>
            </div>
          )}

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
          SCENE 7: THE UPFRONT CASH DEAL (Frames 1200 to 1560 / 40s - 52s)
          "...so he tells them he needs half upfront. And they hand him the cash."
      ========================================================================= */}
      {frame >= 1200 && frame < 1560 && (
        <PaperTextureCanvas backgroundColor="#9E8C78">
          <DoorwayPerspective viewMode="exterior" />

          {/* Father at Doorway (Left) - Hands cash at frame 1380+ with coin chime */}
          <LittleBitBetterFather
            x={640}
            y={420}
            scale={1.35}
            isInsideDoor={true}
            handingCash={frame >= 1380}
          />

          {/* Kid on Stoop Step (Right) - asks upfront, receives cash into hand */}
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
          SCENE 8: STOREFRONT DASH (Frames 1560 to 1650 / 52s - 55s)
          "He takes that money straight to the store, buys everything he needs..."
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
              <LBBUnifiedCharacter
                action="walking"
                colorTheme="espresso"
                x={runX}
                y={530}
                scale={0.88}
              />
            );
          })()}
        </PaperTextureCanvas>
      )}

      {/* =========================================================================
          SCENE 9: THE CAR WASH SQUAD / PURE PROFIT (Frames 1650 to 1950 / 55s - 65s)
          "...and hires a few friends from school to do the actual work.
           His customers paid for equipment, friends did the washing...
           pure profit."
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
              borderTop: '6px solid #2A2421',
            }}
          />

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

          {/* The Car Wash Squad pops in at frame 1660 */}
          <PopAsset popFrame={1660} origin="bottom center">
            <CarWashSquad x={210} y={110} scale={1.22} />
          </PopAsset>

          {/* Boss Kid in mid-distance on the far left standing proudly with hands on hips */}
          <LBBUnifiedCharacter
            action="hands_on_hips"
            colorTheme="espresso"
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
