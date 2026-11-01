import React from "react";
import { Composition, Folder } from "remotion";
import { MainComposition } from "./MainComposition";
import { TOTAL_DURATION_FRAMES, FPS } from "./data/timestamps";
import { THEMES } from "./theme/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Primary Main Master alias */}
      <Composition
        id="Main"
        component={() => <MainComposition theme="cream" />}
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
    </>
  );
};
