import React from "react";
import { Composition, Folder } from "remotion";
import { MainComposition } from "./MainComposition";
import { StartupFailureScene } from "./scenes/StartupFailureScene";
import { ArchegosCollapseScene } from "./scenes/ArchegosCollapseScene";
import { TOTAL_DURATION_FRAMES, FPS } from "./data/timestamps";
import { THEMES } from "./theme/theme";
import { Scene001Master } from "./archegos/Scene001Master";
import { Scene002Master } from "./archegos/Scene002Master";
import { Act1MasterSequence } from "./archegos/Act1MasterSequence";
import { DanielVsMichaelScene } from "./little_bit_better/compositions/DanielVsMichaelScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 4-Second $20 Billion Archegos Trading Collapse Benchmark Scene */}
      <Composition
        id="ArchegosCollapse"
        component={ArchegosCollapseScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 4-Second High-Retention Startup Failure Metric Scene */}
      <Composition
        id="StartupFailureStat"
        component={StartupFailureScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Primary Main Master alias (Dark Broadcast Master) */}
      <Composition
        id="Main"
        component={() => <MainComposition theme="chocolate" />}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Folder name="WarmWhiteEditorial">
        {/* 16:9 Landscape - Warm White / Pip Cream FT Editorial Master */}
        <Composition
          id="ArchegosWarmCream"
          component={() => <MainComposition theme="cream" />}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
        />

        {/* 9:16 Portrait - Warm White / Pip Cream Shorts & TikTok */}
        <Composition
          id="ArchegosPortraitCream"
          component={() => (
            <div
              style={{
                width: 1080,
                height: 1920,
                backgroundColor: THEMES.cream.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 1920,
                  height: 1080,
                  transform: `scale(${1080 / 1920})`,
                  transformOrigin: "center center",
                }}
              >
                <MainComposition theme="cream" />
              </div>
            </div>
          )}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={FPS}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="VelvetyChocolate">
        {/* 16:9 Landscape - Velvety Dark Roast Chocolate & Champagne Gold Master */}
        <Composition
          id="ArchegosVelvetyChocolate"
          component={() => <MainComposition theme="chocolate" />}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
        />

        {/* 9:16 Portrait - Velvety Chocolate Shorts & TikTok */}
        <Composition
          id="ArchegosPortraitChocolate"
          component={() => (
            <div
              style={{
                width: 1080,
                height: 1920,
                backgroundColor: THEMES.chocolate.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 1920,
                  height: 1080,
                  transform: `scale(${1080 / 1920})`,
                  transformOrigin: "center center",
                }}
              >
                <MainComposition theme="chocolate" />
              </div>
            </div>
          )}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={FPS}
          width={1080}
          height={1920}
        />
      </Folder>

      {/* ========================================================
          Archegos 20B Documentary - Act 1 Compositions
         ======================================================== */}
      <Composition
        id="Archegos-Scene001"
        component={Scene001Master}
        durationInFrames={874}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ transparentBackground: false }}
      />
      <Composition
        id="Archegos-Scene002"
        component={Scene002Master}
        durationInFrames={1081}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ transparentBackground: false }}
      />
      <Composition
        id="Archegos-Act1-Master"
        component={Act1MasterSequence}
        durationInFrames={1955}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ transparentBackground: false }}
      />

      {/* ========================================================
          Little Bit Better - Daniel vs Michael 30s Benchmark
         ======================================================== */}
      <Composition
        id="DanielVsMichael"
        component={DanielVsMichaelScene}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
