import React from "react";
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
import { Scene1_ColdMorning } from "./scenes/Scene1_ColdMorning";
import { Scene2_Wipeout } from "./scenes/Scene2_Wipeout";
import { Scene3_HistoricScale } from "./scenes/Scene3_HistoricScale";
import { Scene4_TerrifyingPart } from "./scenes/Scene4_TerrifyingPart";
import { Scene5_WallStreetNetwork } from "./scenes/Scene5_WallStreetNetwork";
import { Scene6_GhostOffice } from "./scenes/Scene6_GhostOffice";
import { CaptionsOverlay } from "./components/motion/CaptionsOverlay";
import { ThemeMode, THEMES } from "./theme/theme";

export interface MainCompositionProps {
  theme?: ThemeMode;
}

export const MainComposition: React.FC<MainCompositionProps> = ({
  theme = "cream",
}) => {
  const currentTheme = THEMES[theme] || THEMES.cream;

  return (
    <AbsoluteFill style={{ backgroundColor: currentTheme.bg }}>
      {/* Primary Voiceover Audio Track */}
      <Audio
        src={staticFile("audio/voiceover.wav")}
        volume={1.0}
      />

      {/* Layered Tactile Sound Effects (SFX Choreography) */}
      {/* Frame 0: Camera shutter click on opening broadsheet */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/camera_click.wav")} volume={0.6} />
      </Sequence>

      {/* Frame 132: Paper slide whoosh into Wipeout */}
      <Sequence from={132} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/paper_whoosh.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 138: Heavy Sub-Bass Impact on $20 BILLION slam */}
      <Sequence from={138} durationInFrames={60}>
        <Audio src={staticFile("audio/sfx/bass_drop.wav")} volume={0.85} />
      </Sequence>

      {/* Frame 165: Fast Ticker Click */}
      <Sequence from={165} durationInFrames={15}>
        <Audio src={staticFile("audio/sfx/ticker_tick.wav")} volume={0.5} />
      </Sequence>

      {/* Frame 278: Transition Whoosh into Historic Scale */}
      <Sequence from={278} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/paper_whoosh.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 320: Heavy Stamp Slam on World Record */}
      <Sequence from={320} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/stamp_thud.wav")} volume={0.75} />
      </Sequence>

      {/* Frame 422: Transition Whoosh into Classified Dossier */}
      <Sequence from={422} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/paper_whoosh.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 438: Heavy Stamp Slam on "RESTRICTED" */}
      <Sequence from={438} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/stamp_thud.wav")} volume={0.8} />
      </Sequence>

      {/* Frame 524: Transition Whoosh into Wall Street Radar */}
      <Sequence from={524} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/paper_whoosh.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 634: Transition Whoosh into 3 Clues */}
      <Sequence from={634} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/paper_whoosh.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 648: Stamp Thud 1 - NO PRESS */}
      <Sequence from={648} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/stamp_thud.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 692: Stamp Thud 2 - NO CLIENTS */}
      <Sequence from={692} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/stamp_thud.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 736: Stamp Thud 3 - NO SIGN */}
      <Sequence from={736} durationInFrames={25}>
        <Audio src={staticFile("audio/sfx/stamp_thud.wav")} volume={0.7} />
      </Sequence>

      {/* Frame 800: Final Sub-Bass Impact on A $20 BILLION GHOST */}
      <Sequence from={800} durationInFrames={60}>
        <Audio src={staticFile("audio/sfx/bass_drop.wav")} volume={0.8} />
      </Sequence>

      {/* Visual Scenes Sequenced Seamlessly Back-to-Back */}
      <Series>
        {/* Scene 1: Cold Friday Morning in March 2021 (0s - 4.5s) */}
        <Series.Sequence durationInFrames={135}>
          <Scene1_ColdMorning theme={theme} />
        </Series.Sequence>

        {/* Scene 2: One man lost $20 Billion in under 36 hours (4.5s - 9.33s) */}
        <Series.Sequence durationInFrames={145}>
          <Scene2_Wipeout theme={theme} />
        </Series.Sequence>

        {/* Scene 3: Largest single person trading loss in human history (9.33s - 14.10s) */}
        <Series.Sequence durationInFrames={143}>
          <Scene3_HistoricScale theme={theme} />
        </Series.Sequence>

        {/* Scene 4: But here is the terrifying part (14.10s - 17.53s) */}
        <Series.Sequence durationInFrames={103}>
          <Scene4_TerrifyingPart theme={theme} />
        </Series.Sequence>

        {/* Scene 5: Wall Street didn't even know his firm existed (17.53s - 21.20s) */}
        <Series.Sequence durationInFrames={110}>
          <Scene5_WallStreetNetwork theme={theme} />
        </Series.Sequence>

        {/* Scene 6: No press conferences, no client funds, no sign on door (21.20s - 29.12s) */}
        <Series.Sequence durationInFrames={238}>
          <Scene6_GhostOffice theme={theme} />
        </Series.Sequence>
      </Series>

      {/* Synchronized Word-by-Word Karaoke Subtitles */}
      <CaptionsOverlay theme={theme} />
    </AbsoluteFill>
  );
};
