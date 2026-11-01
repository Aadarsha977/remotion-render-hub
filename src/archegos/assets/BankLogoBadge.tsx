import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface BankLogoBadgeProps {
  bank: 'goldman_sachs' | 'morgan_stanley' | 'credit_suisse' | 'nomura' | 'ubs' | 'deutsche_bank' | 'archegos' | 'tiger';
  delay?: number;
  width?: number;
  tiltAngle?: number;
}

const BANK_NAMES: Record<string, string> = {
  goldman_sachs: 'GOLDMAN SACHS',
  morgan_stanley: 'MORGAN STANLEY',
  credit_suisse: 'CREDIT SUISSE',
  nomura: 'NOMURA',
  ubs: 'UBS',
  deutsche_bank: 'DEUTSCHE BANK',
  archegos: 'ARCHEGOS CAPITAL',
  tiger: 'TIGER ASIA',
};

const BANK_COLORS: Record<string, string> = {
  goldman_sachs: '#93C5FD',
  morgan_stanley: '#38BDF8',
  credit_suisse: '#EF4444',
  nomura: '#DC2626',
  ubs: '#FFFFFF',
  deutsche_bank: '#60A5FA',
  archegos: '#FCD34D',
  tiger: '#F59E0B',
};

/**
 * BankLogoBadge
 * 3D Tilted, Spring-mounted Prime Broker Badge with Transparent Background.
 */
export const BankLogoBadge: React.FC<BankLogoBadgeProps> = ({
  bank,
  delay = 10,
  width = 220,
  tiltAngle = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });

  const sheenProgress = interpolate(frame, [delay + 15, delay + 45], [-100, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const accent = BANK_COLORS[bank] || '#38BDF8';
  const name = BANK_NAMES[bank] || 'BANK';

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: width,
        background: 'rgba(18, 21, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        border: `1px solid ${accent}40`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${accent}20`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `perspective(1000px) scale(${entrance}) rotateX(${tiltAngle}deg)`,
        opacity: entrance,
        overflow: 'hidden',
      }}
    >
      {/* Specular Light Sheen */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${sheenProgress}%`,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          transform: 'skewX(-25deg)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ fontSize: width * 0.18, fontWeight: 900, color: accent, letterSpacing: '-0.02em' }}>
        {bank.split('_')[0].toUpperCase()}
      </div>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginTop: 8, letterSpacing: '0.1em' }}>
        {name}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontFamily: 'monospace' }}>
        PRIME BROKERAGE DESK
      </div>
    </div>
  );
};