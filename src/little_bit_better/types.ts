export type CharacterMood = 'happy' | 'thinking' | 'worried' | 'rich' | 'shocked' | 'confident';

export type CharacterProp = 'none' | 'cash' | 'laptop' | 'coffee' | 'debt_ball' | 'growth_chart' | 'gold_coin';

export interface ThemeColors {
  canvasBg: string;
  gridDot: string;
  inkPrimary: string;
  inkSecondary: string;
  accentGreen: string;
  accentGreenBg: string;
  accentRed: string;
  accentRedBg: string;
  accentAmber: string;
  accentAmberBg: string;
  cardBorder: string;
  cardBg: string;
}

export const LITTLE_BIT_BETTER_THEME: ThemeColors = {
  canvasBg: '#FAF9F6', // Warm alabaster / clean whiteboard
  gridDot: '#E2E8F0',  // Subtle dot grid (3% opacity)
  inkPrimary: '#1E293B', // Deep Charcoal Slate
  inkSecondary: '#64748B', // Muted slate
  accentGreen: '#10B981', // Emerald for wealth/assets
  accentGreenBg: '#D1FAE5', // Soft mint highlight
  accentRed: '#EF4444', // Crimson for inflation/debt/loss
  accentRedBg: '#FEE2E2', // Soft pastel red
  accentAmber: '#F59E0B', // Warm Amber/Gold for takeaways/rules
  accentAmberBg: '#FEF3C7', // Highlighter yellow/gold
  cardBorder: '#CBD5E1',
  cardBg: '#FFFFFF',
};
