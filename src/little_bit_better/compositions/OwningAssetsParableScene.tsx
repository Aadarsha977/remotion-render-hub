import React from 'react';
import {
  Sequence,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { WhiteboardCanvas } from '../components/canvas/WhiteboardCanvas';
import { CameraRig } from '../components/canvas/CameraRig';
import { DoodleCharacter } from '../components/character/DoodleCharacter';
import { DoodleArrow } from '../components/strokes/DoodleArrow';
import { HandDrawnBox } from '../components/strokes/HandDrawnBox';
import { KineticHeading } from '../components/typography/KineticHeading';
import { HighlighterSweep } from '../components/typography/HighlighterSweep';
import { StampBadge } from '../components/typography/StampBadge';
import { PyramidBuilder } from '../components/metaphors/PyramidBuilder';
import { StoneMachineCrane } from '../components/metaphors/StoneMachineCrane';
import { CashFlowQuadrant } from '../components/metaphors/CashFlowQuadrant';
import { LITTLE_BIT_BETTER_THEME } from '../types';

export const OwningAssetsParableScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Multi-act camera waypoints across the continuous 2D whiteboard sheet:
  // - Act 1 (0-270f): Zone 1 - The Hard Work Myth (x = 0)
  // - Act 2 (270-620f): Zone 2 - The Pyramid Parable: Azer vs Chuma (x = -1920)
  // - Act 3 (620-900f): Zone 3 - The Rich Dad Cashflow Quadrant (x = -3840)
  const waypoints = [
    { frame: 0, x: 0, y: 0, zoom: 1.0 },
    { frame: 250, x: 0, y: 0, zoom: 1.0 },
    { frame: 295, x: -1920, y: 0, zoom: 1.0 },
    { frame: 590, x: -1920, y: 0, zoom: 1.0 },
    { frame: 640, x: -3840, y: 0, zoom: 1.0 },
    { frame: 900, x: -3840, y: 0, zoom: 1.0 },
  ];

  // Screen recoil camera shakes on heavy stamp impacts
  const isStamp1 = frame >= 200 && frame <= 210;
  const isStamp2 = frame >= 540 && frame <= 550;
  const isStamp3 = frame >= 810 && frame <= 820;
  const shakeFrame = isStamp1 ? 200 : isStamp2 ? 540 : isStamp3 ? 810 : -1;

  return (
    <WhiteboardCanvas>
      {/* ================= AUDIO CHOREOGRAPHY LAYER ================= */}
      {/* Act 1 SFX */}
      <Sequence from={15} durationInFrames={30}>
        <Audio src={staticFile('audio/pop.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={55} durationInFrames={45}>
        <Audio src={staticFile('audio/stone_drag.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={200} durationInFrames={30}>
        <Audio src={staticFile('audio/thud.wav')} volume={0.9} />
      </Sequence>

      {/* Act 2 Transition & SFX */}
      <Sequence from={265} durationInFrames={35}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={310} durationInFrames={30}>
        <Audio src={staticFile('audio/pop.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={350} durationInFrames={45}>
        <Audio src={staticFile('audio/pulley_gear.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={420} durationInFrames={40}>
        <Audio src={staticFile('audio/coin.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={540} durationInFrames={30}>
        <Audio src={staticFile('audio/thud.wav')} volume={0.9} />
      </Sequence>

      {/* Act 3 Transition & SFX */}
      <Sequence from={605} durationInFrames={35}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={650} durationInFrames={30}>
        <Audio src={staticFile('audio/bubble.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={710} durationInFrames={45}>
        <Audio src={staticFile('audio/scribble.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={810} durationInFrames={30}>
        <Audio src={staticFile('audio/thud.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={820} durationInFrames={40}>
        <Audio src={staticFile('audio/coin.wav')} volume={0.85} />
      </Sequence>

      {/* ================= 2D INFINITE CAMERA VIEWPORT ================= */}
      <CameraRig waypoints={waypoints} shakeFrame={shakeFrame} shakeIntensity={6}>
        {/* =========================================================================
            ZONE 1: THE HARD WORK ILLUSION (0 to 1920)
        ========================================================================= */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080 }}>
          {/* Main Title */}
          <div style={{ position: 'absolute', top: 90, left: 0, right: 0 }}>
            <KineticHeading
              tag="PART #3: HOW MONEY WORKS"
              tagColor="#DC2626"
              title={
                <span>
                  Money Isn't Earned by Working Hard — It's Earned by{' '}
                  <HighlighterSweep delay={25} color={LITTLE_BIT_BETTER_THEME.accentGreenBg}>
                    Owning Assets
                  </HighlighterSweep>
                </span>
              }
              subtitle="If manual effort dictated wealth, construction workers would be the wealthiest people on Earth."
              delay={5}
            />
          </div>

          {/* Character: Azer Laboring Manually */}
          <DoodleCharacter
            name="Azer"
            role="Manual Laborer"
            mood="worried"
            prop="debt_ball"
            delay={15}
            x={440}
            y={480}
            scale={1.25}
          />

          {/* Dotted Cable dragging a huge stone */}
          <DoodleArrow
            startX={590}
            startY={610}
            endX={1050}
            endY={620}
            controlX={820}
            controlY={560}
            delay={45}
            color="#DC2626"
            label="TRADING 100% OF TIME FOR MONEY"
          />

          {/* Heavy Stone Block */}
          <div style={{ position: 'absolute', left: 1080, top: 480 }}>
            <HandDrawnBox
              delay={50}
              title="THE LABOR TRAP"
              titleColor="#DC2626"
              borderColor="#DC2626"
              backgroundColor="#FEF2F2"
              width={340}
              padding="24px 28px"
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: '#DC2626' }}>24 HOURS</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#991B1B', marginTop: 4 }}>
                  Maximum daily capacity. You cannot scale human hours.
                </div>
              </div>
            </HandDrawnBox>
          </div>

          {/* Heavy Stamp: THE HARD WORK MYTH */}
          <div style={{ position: 'absolute', left: 760, top: 380 }}>
            <StampBadge
              text="THE HARD WORK MYTH"
              delay={200}
              color="#DC2626"
              rotation={-10}
              fontSize={32}
            />
          </div>
        </div>

        {/* =========================================================================
            ZONE 2: THE PYRAMID PARABLE (AZER VS CHUMA) (1920 to 3840)
        ========================================================================= */}
        <div style={{ position: 'absolute', left: 1920, top: 0, width: 1920, height: 1080 }}>
          {/* Parable Title */}
          <div style={{ position: 'absolute', top: 80, left: 0, right: 0 }}>
            <KineticHeading
              tag="THE PARABLE OF THE TWO BUILDERS"
              tagColor="#D97706"
              title={
                <span>
                  Azer (The Hustler) vs{' '}
                  <HighlighterSweep delay={310} color={LITTLE_BIT_BETTER_THEME.accentGreenBg}>
                    Chuma (The System Builder)
                  </HighlighterSweep>
                </span>
              }
              subtitle="Pharaoh commands: Whoever builds their pyramid first becomes King and never works again."
              delay={280}
            />
          </div>

          {/* Left Side: Azer dragging stones (Stagnant Pyramid) */}
          <div style={{ position: 'absolute', left: 180, top: 400 }}>
            <DoodleCharacter
              name="Azer"
              role="Hauling stones by hand"
              mood="worried"
              delay={310}
              x={0}
              y={80}
              scale={1.1}
            />
            <PyramidBuilder
              delay={330}
              progressPercent={30}
              speedMultiplier={0.4}
              label="AZER: 30-YEAR ESTIMATE"
              x={220}
              y={220}
              builderType="manual"
            />
          </div>

          {/* Center VS Divider */}
          <div
            style={{
              position: 'absolute',
              left: 955,
              top: 300,
              width: 4,
              height: 420,
              backgroundColor: '#CBD5E1',
              borderRadius: 2,
            }}
          />

          {/* Right Side: Chuma with his Machine (Complete Pyramid) */}
          <div style={{ position: 'absolute', left: 1040, top: 400 }}>
            <DoodleCharacter
              name="Chuma"
              role="Built a Lever Machine"
              mood="rich"
              prop="gold_coin"
              delay={320}
              x={0}
              y={80}
              scale={1.1}
            />
            {/* The Machine Crane */}
            <StoneMachineCrane delay={340} x={230} y={150} active={frame >= 350} />
            {/* Chuma's Pyramid Rapidly Built to 100% with Crown */}
            <PyramidBuilder
              delay={360}
              progressPercent={100}
              speedMultiplier={1.8}
              label="CHUMA: FINISHED IN 8 YEARS (KING)"
              x={480}
              y={220}
              builderType="machine"
            />
          </div>

          {/* Heavy Stamp Slam: LEVERAGE WINS */}
          <div style={{ position: 'absolute', left: 770, top: 460 }}>
            <StampBadge
              text="SYSTEMS & LEVERAGE WIN"
              delay={540}
              color="#059669"
              backgroundColor="rgba(236, 253, 245, 0.95)"
              rotation={-6}
              fontSize={30}
            />
          </div>
        </div>

        {/* =========================================================================
            ZONE 3: THE RICH DAD CASHFLOW QUADRANT (3840 to 5760)
        ========================================================================= */}
        <div style={{ position: 'absolute', left: 3840, top: 0, width: 1920, height: 1080 }}>
          {/* Quadrant Title */}
          <div style={{ position: 'absolute', top: 80, left: 0, right: 0 }}>
            <KineticHeading
              tag="THE RICH DAD CASHFLOW MAP"
              tagColor="#059669"
              title={
                <span>
                  The Definitive Rule:{' '}
                  <HighlighterSweep delay={660} color={LITTLE_BIT_BETTER_THEME.accentGreenBg}>
                    Assets vs Liabilities
                  </HighlighterSweep>
                </span>
              }
              subtitle="An asset puts money in your pocket. A liability takes money out. That single rule changes everything."
              delay={640}
            />
          </div>

          {/* Left Diagram: Middle-Class Trap */}
          <CashFlowQuadrant
            delay={660}
            mode="laborer"
            x={340}
            y={320}
          />

          {/* Right Diagram: The Wealthy Compounding Asset Loop */}
          <CashFlowQuadrant
            delay={690}
            mode="asset_owner"
            x={1040}
            y={320}
          />

          {/* Golden Definition Stamp Slam */}
          <div style={{ position: 'absolute', left: 630, top: 720 }}>
            <StampBadge
              text="RULE #1: BUY ASSETS FIRST"
              delay={810}
              color="#059669"
              backgroundColor="rgba(240, 253, 244, 0.95)"
              rotation={-7}
              fontSize={32}
            />
          </div>
        </div>
      </CameraRig>
    </WhiteboardCanvas>
  );
};
