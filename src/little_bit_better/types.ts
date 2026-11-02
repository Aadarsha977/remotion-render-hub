export type CharacterMood = 'happy' | 'thinking' | 'worried' | 'rich' | 'shocked' | 'confident';

export type CharacterProp = 'none' | 'cash' | 'laptop' | 'coffee' | 'debt_ball' | 'growth_chart' | 'gold_coin';

// The 5 Exact Color Palettes Extracted from "Money isn't Earned by Working Hard (hhUn8kmTfO0)"
export const LITTLE_BIT_BETTER_PALETTES = {
  // Theme A: The Intro (0:00 - 0:10)
  ivoryTeal: {
    canvasBg: '#FBF4DB',       // Aged Ivory Parchment
    inkPrimary: '#045B63',     // Deep Sea Petrol Teal
    skin: '#FDFBF7',           // Pure White/Ivory skin
    cashGreen: '#4ADE80',      // Mint Green Cash body
    cashDark: '#045B63',       // Cash outlines
    brickLine: 'rgba(4, 91, 99, 0.22)', // Poverty brick background
    purpleBook: '#9333EA',     // Rich Dad book cover
    bookYellow: '#FACC15',     // Title text
  },
  // Theme B: The Inverted Slate (0:10 - 0:14)
  invertedTeal: {
    canvasBg: '#055C64',       // Solid Deep Petrol Teal
    textIvory: '#FDF5DC',      // Warm Ivory Chalk
    silhouette: '#FDF5DC',     // Top-hat gentleman
  },
  // Theme C: Street & Cars (0:14 - 0:28)
  kraftStreet: {
    skyBg: '#D5BBA2',          // Warm Kraft Paper / Cardboard
    skyGradientBottom: '#BEA78F',
    townhouseBrick: '#C4AA93', // Muted Sandstone Facade
    windowFrame: '#A8907A',
    windowGlass: '#524035',
    curtains: '#D4A373',
    clothesBrown: '#3D312A',   // Espresso Brown Clothes
    mudSplatters: '#735F4C',   // Dirt camouflage on cars
    cleanCarGreen: '#86A789',
    rims: '#F5EBDE',
  },
  // Theme D: Interior Doorway & Porch (0:28 - 0:52)
  terracottaPorch: {
    wallColor: '#B8837B',      // Dusty Muted Terracotta / Old Rose
    doorWood: '#4E3B33',       // Dark Walnut Wood
    doorPanel: '#3A2C26',
    doorKnob: '#D97706',       // Brass Knob
    plantPot: '#524035',
    plantLeaves: '#789D6C',    // Sage Olive Leaves
    umbrella: '#D1C765',       // Muted Golden Yellow
    fatherTie: '#FFFFFF',
    fatherShirt: '#3D312A',
  },
  // Theme E: The Car Wash Squad (0:55 - 1:05)
  carWash: {
    canvasBg: '#D7BDA4',
    bucketMint: '#86D2C1',     // Pastel Mint Teal
    bucketHandle: '#D8837A',   // Muted Coral
    squeegeeSponge: '#D8837A',
    squeegeeHandle: '#86D2C1',
    waterSplash: '#67E8F9',
  },
};

export const LITTLE_BIT_BETTER_THEME = {
  canvasBg: '#FBF4DB',
  gridDot: '#E2E8F0',
  inkPrimary: '#045B63',
  inkSecondary: '#524035',
  accentGreen: '#10B981',
  accentGreenBg: '#D1FAE5',
  accentRed: '#EF4444',
  accentRedBg: '#FEE2E2',
  accentAmber: '#F59E0B',
  accentAmberBg: '#FEF3C7',
  cardBorder: '#CBD5E1',
  cardBg: '#FFFFFF',
};
