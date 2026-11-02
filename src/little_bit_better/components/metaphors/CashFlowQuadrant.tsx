import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LITTLE_BIT_BETTER_THEME } from '../../types';

interface CashFlowQuadrantProps {
  delay?: number;
  mode?: 'laborer' | 'asset_owner'; // Shows red leak vs green loop
  x?: number;
  y?: number;
}

export const CashFlowQuadrant: React.FC<CashFlowQuadrantProps> = ({
  delay = 0,
  mode = 'asset_owner',
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 190 },
  });

  if (frame < delay) return null;

  const ink = LITTLE_BIT_BETTER_THEME.inkPrimary;
  const isOwner = mode === 'asset_owner';

  // Dash offset animation for flowing cash line
  const dashOffset = (frame - delay) * 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${pop})`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 540,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          border: `4px solid ${ink}`,
          boxShadow: '0 12px 36px rgba(30, 41, 59, 0.08)',
          padding: '24px 28px',
          position: 'relative',
        }}
      >
        {/* Title Tag */}
        <div
          style={{
            position: 'absolute',
            top: -16,
            left: 28,
            backgroundColor: isOwner ? '#059669' : '#DC2626',
            color: '#FFFFFF',
            padding: '3px 16px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}
        >
          {isOwner ? 'THE ASSET CASHFLOW LOOP' : 'THE LABORER TRAP'}
        </div>

        {/* 2x2 Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: 10 }}>
          {/* Box 1: INCOME */}
          <div
            style={{
              border: '2.5px solid #0284C7',
              backgroundColor: '#F0F9FF',
              borderRadius: 12,
              padding: '12px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0369A1' }}>1. INCOME</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: ink, marginTop: 4 }}>
              {isOwner ? 'Dividends & Rent' : 'Active Salary'}
            </div>
          </div>

          {/* Box 2: EXPENSES */}
          <div
            style={{
              border: '2.5px solid #EF4444',
              backgroundColor: '#FEF2F2',
              borderRadius: 12,
              padding: '12px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#DC2626' }}>2. EXPENSES</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: ink, marginTop: 4 }}>
              Taxes & Daily Bills
            </div>
          </div>

          {/* Box 3: ASSETS */}
          <div
            style={{
              border: `3px solid ${isOwner ? '#10B981' : '#CBD5E1'}`,
              backgroundColor: isOwner ? '#ECFDF5' : '#F8FAFC',
              borderRadius: 12,
              padding: '14px 16px',
              textAlign: 'center',
              boxShadow: isOwner ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'none',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: isOwner ? '#059669' : '#64748B' }}>
              3. ASSETS
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: isOwner ? '#065F46' : '#94A3B8', marginTop: 4 }}>
              {isOwner ? 'Systems & Equities' : 'None (No Capital)'}
            </div>
          </div>

          {/* Box 4: LIABILITIES */}
          <div
            style={{
              border: '2.5px solid #F59E0B',
              backgroundColor: '#FFFBEB',
              borderRadius: 12,
              padding: '12px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#D97706' }}>4. LIABILITIES</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: ink, marginTop: 4 }}>
              Car Loans & Cards
            </div>
          </div>
        </div>

        {/* Dynamic Animated Flowing Arrow Lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {isOwner ? (
            /* ASSET -> INCOME loop (Green) */
            <path
              d="M 130 190 Q 50 140 130 80"
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray="8,6"
              strokeDashoffset={-dashOffset}
              strokeLinecap="round"
            />
          ) : (
            /* INCOME -> EXPENSES leak (Red) */
            <path
              d="M 230 75 L 310 75"
              fill="none"
              stroke="#EF4444"
              strokeWidth="4"
              strokeDasharray="8,6"
              strokeDashoffset={-dashOffset}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Bottom Rule Statement */}
        <div
          style={{
            marginTop: 16,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 800,
            color: isOwner ? '#065F46' : '#DC2626',
          }}
        >
          {isOwner
            ? '✅ Assets put money in your pocket automatically.'
            : '❌ Trading time for money leads to a lifetime treadmill.'}
        </div>
      </div>
    </div>
  );
};
