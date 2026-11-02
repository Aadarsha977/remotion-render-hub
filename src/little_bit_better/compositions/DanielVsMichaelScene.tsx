import React from 'react';
import {
  AbsoluteFill,
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
import { DynamicOdometer } from '../components/metrics/DynamicOdometer';
import { BankVault } from '../components/metaphors/BankVault';
import { ShrinkingCashStack } from '../components/metaphors/ShrinkingCashStack';
import { InvestmentTree } from '../components/metaphors/InvestmentTree';
import { BalanceBeam } from '../components/metaphors/BalanceBeam';
import { LITTLE_BIT_BETTER_THEME } from '../types';

export const DanielVsMichaelScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Multi-act camera waypoints across the continuous whiteboard canvas:
  // - Act 1 (0-280f): Centered on Daniel (x = 0, y = 0, zoom = 1)
  // - Pan transition (280-340f): Moves right to Michael (x = -1920, y = 0, zoom = 1)
  // - Act 2 (340-600f): Stays on Michael (x = -1920, y = 0, zoom = 1)
  // - Zoom out (600-660f): Zooms out to overview both (x = -960, y = 0, zoom = 0.65)
  // - Act 3 (660-900f): Wide summary comparison
  const waypoints = [
    { frame: 0, x: 0, y: 0, zoom: 1.0 },
    { frame: 280, x: 0, y: 0, zoom: 1.0 },
    { frame: 335, x: -1920, y: 0, zoom: 1.0 },
    { frame: 600, x: -1920, y: 0, zoom: 1.0 },
    { frame: 655, x: -960, y: 0, zoom: 0.65 },
    { frame: 900, x: -960, y: 0, zoom: 0.65 },
  ];

  // Stamp impact frames that trigger canvas recoil shake
  const isStamp1 = frame >= 220 && frame <= 230;
  const isStamp2 = frame >= 530 && frame <= 540;
  const shakeFrame = isStamp1 ? 220 : isStamp2 ? 530 : -1;

  // Daniel mood switch when inflation is revealed at frame 150
  const danielMood = frame >= 150 ? 'worried' : 'happy';

  return (
    <WhiteboardCanvas>
      {/* ================= AUDIO CHOREOGRAPHY LAYER ================= */}
      {/* Act 1 SFX */}
      <Sequence from={15} durationInFrames={30}>
        <Audio src={staticFile('audio/pop.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={45} durationInFrames={30}>
        <Audio src={staticFile('audio/bubble.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={60} durationInFrames={45}>
        <Audio src={staticFile('audio/scribble.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={90} durationInFrames={40}>
        <Audio src={staticFile('audio/coin.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={220} durationInFrames={30}>
        <Audio src={staticFile('audio/thud.wav')} volume={0.9} />
      </Sequence>

      {/* Camera Pan Whoosh */}
      <Sequence from={285} durationInFrames={35}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.75} />
      </Sequence>

      {/* Act 2 SFX */}
      <Sequence from={340} durationInFrames={30}>
        <Audio src={staticFile('audio/pop.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={370} durationInFrames={30}>
        <Audio src={staticFile('audio/bubble.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={395} durationInFrames={45}>
        <Audio src={staticFile('audio/scribble.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={425} durationInFrames={40}>
        <Audio src={staticFile('audio/coin.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={530} durationInFrames={30}>
        <Audio src={staticFile('audio/thud.wav')} volume={0.9} />
      </Sequence>

      {/* Wide Overview Whoosh */}
      <Sequence from={605} durationInFrames={35}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.75} />
      </Sequence>

      {/* ================= INFINITE CAMERA VIEWPORT ================= */}
      <CameraRig waypoints={waypoints} shakeFrame={shakeFrame} shakeIntensity={6}>
        {/* =========================================================================
            ZONE 1: DANIEL (THE SAVER) — Coordinates: [0 to 1920]
        ========================================================================= */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080 }}>
          {/* Section Header */}
          <div style={{ position: 'absolute', top: 90, left: 0, right: 0 }}>
            <KineticHeading
              tag="SCENARIO #1"
              tagColor="#64748B"
              title={
                <span>
                  The Illusion of <HighlighterSweep delay={25}>Saving Cash</HighlighterSweep>
                </span>
              }
              subtitle="Daniel earns $5,000 a month and saves 100% of his surplus in a traditional bank."
              delay={5}
            />
          </div>

          {/* Character: Daniel */}
          <DoodleCharacter
            name="Daniel"
            role="The Hardworking Saver"
            mood={danielMood}
            prop={frame >= 150 ? 'debt_ball' : 'cash'}
            delay={15}
            x={420}
            y={480}
            scale={1.25}
          />

          {/* Dotted Arrow: Daniel -> Bank Vault */}
          <DoodleArrow
            startX={620}
            startY={610}
            endX={1120}
            endY={620}
            controlX={870}
            controlY={520}
            delay={60}
            color={LITTLE_BIT_BETTER_THEME.inkPrimary}
            label="100% TO SAVINGS"
          />

          {/* Destination: The Bank Vault */}
          <BankVault
            delay={45}
            x={1160}
            y={490}
            balanceText="$50,000 SAVINGS DEPOSIT"
          />

          {/* Bank Ledger Stat Card */}
          <div style={{ position: 'absolute', left: 1150, top: 290 }}>
            <HandDrawnBox
              delay={85}
              title="BANK BALANCE"
              titleColor="#0284C7"
              width={260}
              padding="16px 20px"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DynamicOdometer
                  from={0}
                  to={50000}
                  durationInFrames={35}
                  delay={90}
                  prefix="$"
                  fontSize={36}
                  color={LITTLE_BIT_BETTER_THEME.inkPrimary}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0284C7', marginTop: 4 }}>
                  0.4% APY INTEREST
                </span>
              </div>
            </HandDrawnBox>
          </div>

          {/* Inflation Attack Metaphor (reveals at frame 150) */}
          {frame >= 145 && (
            <div style={{ position: 'absolute', left: 810, top: 310 }}>
              <HandDrawnBox
                delay={150}
                title="THE SILENT THIEF"
                titleColor="#DC2626"
                borderColor="#EF4444"
                backgroundColor="#FEF2F2"
                width={280}
                padding="14px 18px"
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#DC2626', fontSize: 26, fontWeight: 900 }}>
                    -3.8% INFLATION
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#991B1B', marginTop: 4 }}>
                    Purchasing power quietly drains
                  </div>
                </div>
              </HandDrawnBox>
            </div>
          )}

          {/* Shrinking Cash Stack Metaphor */}
          <ShrinkingCashStack
            delay={140}
            shrinkDelay={175}
            shrinkToPercent={50}
            x={880}
            y={590}
            label="REAL VALUE IN 15 YEARS"
          />

          {/* Heavy Stamp Slam: THE SAVER'S TRAP */}
          <div style={{ position: 'absolute', left: 1130, top: 430 }}>
            <StampBadge
              text="THE SAVER'S TRAP"
              delay={220}
              color="#DC2626"
              rotation={-11}
              fontSize={30}
            />
          </div>
        </div>

        {/* =========================================================================
            ZONE 2: MICHAEL (THE INVESTOR) — Coordinates: [1920 to 3840]
        ========================================================================= */}
        <div style={{ position: 'absolute', left: 1920, top: 0, width: 1920, height: 1080 }}>
          {/* Section Header */}
          <div style={{ position: 'absolute', top: 90, left: 0, right: 0 }}>
            <KineticHeading
              tag="SCENARIO #2"
              tagColor="#10B981"
              title={
                <span>
                  The Power of <HighlighterSweep delay={350} color={LITTLE_BIT_BETTER_THEME.accentGreenBg}>Owning Assets</HighlighterSweep>
                </span>
              }
              subtitle="Michael earns the exact same income, but systematically channels surplus into compounding assets."
              delay={330}
            />
          </div>

          {/* Character: Michael */}
          <DoodleCharacter
            name="Michael"
            role="The Asset Owner"
            mood="rich"
            prop="gold_coin"
            delay={340}
            x={420}
            y={480}
            scale={1.25}
          />

          {/* Dotted Arrow: Michael -> Investment Tree */}
          <DoodleArrow
            startX={620}
            startY={610}
            endX={1120}
            endY={620}
            controlX={870}
            controlY={510}
            delay={395}
            color="#10B981"
            label="AUTOMATED ASSET ALLOCATION"
          />

          {/* Destination: The Compounding Asset Tree */}
          <InvestmentTree
            delay={370}
            x={1160}
            y={470}
            label="EQUITIES & PRODUCTIVE ASSETS"
          />

          {/* Portfolio Growth Stat Card */}
          <div style={{ position: 'absolute', left: 1140, top: 275 }}>
            <HandDrawnBox
              delay={410}
              title="15-YEAR PORTFOLIO VALUE"
              titleColor="#059669"
              borderColor="#10B981"
              backgroundColor="#F0FDF4"
              width={290}
              padding="16px 20px"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DynamicOdometer
                  from={10000}
                  to={342500}
                  durationInFrames={45}
                  delay={425}
                  prefix="$"
                  fontSize={36}
                  color="#065F46"
                />
                <span style={{ fontSize: 13, fontWeight: 800, color: '#059669', marginTop: 4 }}>
                  +8.5% ANNUAL COMPOUNDING
                </span>
              </div>
            </HandDrawnBox>
          </div>

          {/* Tilting Balance Beam Metaphor */}
          <BalanceBeam
            delay={460}
            tiltDelay={490}
            tiltAngle={15}
            leftLabel="STAGNANT CASH"
            rightLabel="PRODUCTIVE ASSETS"
            x={820}
            y={590}
          />

          {/* Heavy Stamp Slam: RULE #1: OWN ASSETS */}
          <div style={{ position: 'absolute', left: 1120, top: 430 }}>
            <StampBadge
              text="RULE #1: OWN ASSETS"
              delay={530}
              color="#059669"
              backgroundColor="rgba(240, 253, 244, 0.95)"
              rotation={-8}
              fontSize={30}
            />
          </div>
        </div>

        {/* =========================================================================
            ZONE 3: FINAL SYNTHESIS & SPLIT COMPARISON (Visible during Zoom-Out 600f+)
        ========================================================================= */}
        {frame >= 620 && (
          <div
            style={{
              position: 'absolute',
              left: 480,
              top: 860,
              width: 2880,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <HandDrawnBox
              delay={640}
              title="THE 15-YEAR VERDICT"
              titleColor="#F59E0B"
              borderColor="#F59E0B"
              backgroundColor="#FFFBEB"
              width={1600}
              padding="28px 48px"
            >
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                {/* Daniel's Result */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#64748B' }}>DANIEL (SAVER)</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: '#DC2626', marginTop: 6 }}>
                    $24,500
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#991B1B' }}>
                    Nominal $50,000 eroded by 3.8% inflation
                  </div>
                </div>

                {/* VS Divider */}
                <div
                  style={{
                    width: 4,
                    height: 100,
                    backgroundColor: '#CBD5E1',
                    borderRadius: 2,
                  }}
                />

                {/* Michael's Result */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#059669' }}>MICHAEL (INVESTOR)</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: '#059669', marginTop: 6 }}>
                    $342,500
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#047857' }}>
                    14x Wealth gap from compounding ownership
                  </div>
                </div>
              </div>
            </HandDrawnBox>
          </div>
        )}
      </CameraRig>
    </WhiteboardCanvas>
  );
};
