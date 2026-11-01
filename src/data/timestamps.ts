export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  startMs: number;
  endMs: number;
  startFrame: number;
  endFrame: number;
}

export const WORD_TIMESTAMPS: WordTimestamp[] = [
  { word: "On", start: 0.0, end: 0.4, startMs: 0, endMs: 400, startFrame: 0, endFrame: 12 },
  { word: "a", start: 0.4, end: 0.5, startMs: 400, endMs: 500, startFrame: 12, endFrame: 15 },
  { word: "cold", start: 0.5, end: 0.96, startMs: 500, endMs: 960, startFrame: 15, endFrame: 29 },
  { word: "Friday", start: 0.96, end: 1.62, startMs: 960, endMs: 1620, startFrame: 29, endFrame: 49 },
  { word: "morning", start: 1.62, end: 2.2, startMs: 1620, endMs: 2200, startFrame: 49, endFrame: 66 },
  { word: "in", start: 2.2, end: 2.48, startMs: 2200, endMs: 2480, startFrame: 66, endFrame: 74 },
  { word: "March", start: 2.48, end: 2.72, startMs: 2480, endMs: 2720, startFrame: 74, endFrame: 82 },
  { word: "2021,", start: 2.72, end: 3.7, startMs: 2720, endMs: 3700, startFrame: 82, endFrame: 111 },
  { word: "one", start: 4.5, end: 4.8, startMs: 4500, endMs: 4800, startFrame: 135, endFrame: 144 },
  { word: "man", start: 4.8, end: 5.06, startMs: 4800, endMs: 5060, startFrame: 144, endFrame: 152 },
  { word: "lost", start: 5.06, end: 5.4, startMs: 5060, endMs: 5400, startFrame: 152, endFrame: 162 },
  { word: "$20", start: 5.4, end: 6.1, startMs: 5400, endMs: 6100, startFrame: 162, endFrame: 183 },
  { word: "billion", start: 6.1, end: 6.72, startMs: 6100, endMs: 6720, startFrame: 183, endFrame: 202 },
  { word: "in", start: 6.72, end: 7.7, startMs: 6720, endMs: 7700, startFrame: 202, endFrame: 231 },
  { word: "under", start: 7.7, end: 7.9, startMs: 7700, endMs: 7900, startFrame: 231, endFrame: 237 },
  { word: "36", start: 7.9, end: 8.5, startMs: 7900, endMs: 8500, startFrame: 237, endFrame: 255 },
  { word: "hours.", start: 8.5, end: 8.98, startMs: 8500, endMs: 8980, startFrame: 255, endFrame: 269 },
  { word: "It", start: 9.54, end: 9.82, startMs: 9540, endMs: 9820, startFrame: 286, endFrame: 295 },
  { word: "was", start: 9.82, end: 9.96, startMs: 9820, endMs: 9960, startFrame: 295, endFrame: 299 },
  { word: "the", start: 9.96, end: 10.12, startMs: 9960, endMs: 10120, startFrame: 299, endFrame: 304 },
  { word: "largest", start: 10.12, end: 10.48, startMs: 10120, endMs: 10480, startFrame: 304, endFrame: 314 },
  { word: "single", start: 10.48, end: 11.02, startMs: 10480, endMs: 11020, startFrame: 314, endFrame: 331 },
  { word: "person", start: 11.02, end: 11.48, startMs: 11020, endMs: 11480, startFrame: 331, endFrame: 344 },
  { word: "trading", start: 11.48, end: 11.92, startMs: 11480, endMs: 11920, startFrame: 344, endFrame: 358 },
  { word: "loss", start: 11.92, end: 12.22, startMs: 11920, endMs: 12220, startFrame: 358, endFrame: 367 },
  { word: "in", start: 12.22, end: 12.52, startMs: 12220, endMs: 12520, startFrame: 367, endFrame: 376 },
  { word: "human", start: 12.52, end: 12.92, startMs: 12520, endMs: 12920, startFrame: 376, endFrame: 388 },
  { word: "history,", start: 12.92, end: 13.54, startMs: 12920, endMs: 13540, startFrame: 388, endFrame: 406 },
  { word: "but", start: 14.2, end: 14.54, startMs: 14200, endMs: 14540, startFrame: 426, endFrame: 436 },
  { word: "here", start: 14.54, end: 14.98, startMs: 14540, endMs: 14980, startFrame: 436, endFrame: 449 },
  { word: "is", start: 14.98, end: 15.6, startMs: 14980, endMs: 15600, startFrame: 449, endFrame: 468 },
  { word: "the", start: 15.6, end: 15.76, startMs: 15600, endMs: 15760, startFrame: 468, endFrame: 473 },
  { word: "terrifying", start: 15.76, end: 16.32, startMs: 15760, endMs: 16320, startFrame: 473, endFrame: 490 },
  { word: "part.", start: 16.32, end: 16.8, startMs: 16320, endMs: 16800, startFrame: 490, endFrame: 504 },
  { word: "Wall", start: 17.86, end: 18.12, startMs: 17860, endMs: 18120, startFrame: 536, endFrame: 544 },
  { word: "Street", start: 18.12, end: 18.42, startMs: 18120, endMs: 18420, startFrame: 544, endFrame: 553 },
  { word: "didn't", start: 18.42, end: 18.72, startMs: 18420, endMs: 18720, startFrame: 553, endFrame: 562 },
  { word: "even", start: 18.72, end: 18.92, startMs: 18720, endMs: 18920, startFrame: 562, endFrame: 568 },
  { word: "know", start: 18.92, end: 19.12, startMs: 18920, endMs: 19120, startFrame: 568, endFrame: 574 },
  { word: "his", start: 19.12, end: 19.34, startMs: 19120, endMs: 19340, startFrame: 574, endFrame: 580 },
  { word: "firm", start: 19.34, end: 19.54, startMs: 19340, endMs: 19540, startFrame: 580, endFrame: 586 },
  { word: "existed.", start: 19.54, end: 20.12, startMs: 19540, endMs: 20120, startFrame: 586, endFrame: 604 },
  { word: "He", start: 21.3, end: 21.5, startMs: 21300, endMs: 21500, startFrame: 639, endFrame: 645 },
  { word: "held", start: 21.5, end: 21.64, startMs: 21500, endMs: 21640, startFrame: 645, endFrame: 649 },
  { word: "no", start: 21.64, end: 21.8, startMs: 21640, endMs: 21800, startFrame: 649, endFrame: 654 },
  { word: "press", start: 21.8, end: 22.04, startMs: 21800, endMs: 22040, startFrame: 654, endFrame: 661 },
  { word: "conferences,", start: 22.04, end: 22.62, startMs: 22040, endMs: 22620, startFrame: 661, endFrame: 679 },
  { word: "he", start: 23.14, end: 23.34, startMs: 23140, endMs: 23340, startFrame: 694, endFrame: 700 },
  { word: "managed", start: 23.34, end: 23.6, startMs: 23340, endMs: 23600, startFrame: 700, endFrame: 708 },
  { word: "no", start: 23.6, end: 23.96, startMs: 23600, endMs: 23960, startFrame: 708, endFrame: 719 },
  { word: "client", start: 23.96, end: 24.36, startMs: 23960, endMs: 24360, startFrame: 719, endFrame: 731 },
  { word: "funds,", start: 24.36, end: 24.82, startMs: 24360, endMs: 24820, startFrame: 731, endFrame: 745 },
  { word: "and", start: 25.32, end: 25.44, startMs: 25320, endMs: 25440, startFrame: 760, endFrame: 763 },
  { word: "his", start: 25.44, end: 25.56, startMs: 25440, endMs: 25560, startFrame: 763, endFrame: 767 },
  { word: "personal", start: 25.56, end: 25.94, startMs: 25560, endMs: 25940, startFrame: 767, endFrame: 778 },
  { word: "office", start: 25.94, end: 26.28, startMs: 25940, endMs: 26280, startFrame: 778, endFrame: 788 },
  { word: "had", start: 26.28, end: 26.68, startMs: 26280, endMs: 26680, startFrame: 788, endFrame: 800 },
  { word: "no", start: 26.68, end: 26.98, startMs: 26680, endMs: 26980, startFrame: 800, endFrame: 809 },
  { word: "company", start: 26.98, end: 27.42, startMs: 26980, endMs: 27420, startFrame: 809, endFrame: 823 },
  { word: "sign", start: 27.42, end: 27.84, startMs: 27420, endMs: 27840, startFrame: 823, endFrame: 835 },
  { word: "on", start: 27.84, end: 28.12, startMs: 27840, endMs: 28120, startFrame: 835, endFrame: 844 },
  { word: "the", start: 28.12, end: 28.24, startMs: 28120, endMs: 28240, startFrame: 844, endFrame: 847 },
  { word: "door.", start: 28.24, end: 28.54, startMs: 28240, endMs: 28540, startFrame: 847, endFrame: 856 },
];

export const TOTAL_DURATION_SECONDS = 29.12;
export const TOTAL_DURATION_FRAMES = 874;
export const FPS = 30;
