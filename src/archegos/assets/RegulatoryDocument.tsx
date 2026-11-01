import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface RegulatoryDocumentProps {
  title: string;
  categoryTag?: string;
  stampText?: string;
  stampColor?: string;
  delay?: number;
  width?: number;
}

/**
 * RegulatoryDocument
 * Zero-Asset Dossier / SEC Form with Redacted Black Bars and Stamp Impact.
 */
export const RegulatoryDocument: React.FC<RegulatoryDocumentProps> = ({
  title,
  categoryTag = 'SEC FILING // CONFIDENTIAL',
  stampText = 'EXEMPT // RULE 202',
  stampColor = '#EF4444',
  delay = 10,
  width = 680,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 85, mass: 1.0 },
  });

  const stampEntrance = spring({
    frame: frame - (delay + 22),
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.5 },
  });

  return (
    <div
      style={{
        position: 'relative',
        width,
        background: 'rgba(20, 23, 33, 0.92)',
        backdropFilter: 'blur(24px)',
        borderRadius: 12,
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
        padding: '28px 36px',
        transform: `perspective(1200px) scale(${entrance}) rotateX(3deg)`,
        opacity: entrance,
      }}
    >
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#38BDF8', letterSpacing: '0.08em', marginBottom: 8 }}>
        {categoryTag}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.01em' }}>
        {title}
      </div>
      
      {/* Redacted Content Mock */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0' }}>
        <div style={{ width: '90%', height: 12, background: '#000000', borderRadius: 3 }} />
        <div style={{ width: '75%', height: 12, background: '#000000', borderRadius: 3 }} />
        <div style={{ width: '85%', height: 12, background: '#000000', borderRadius: 3 }} />
      </div>

      {/* Rubber Stamp Slam */}
      {stampEntrance > 0.05 && (
        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: 30,
            padding: '8px 18px',
            border: `3px solid ${stampColor}`,
            color: stampColor,
            fontFamily: 'monospace',
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: '0.12em',
            borderRadius: 4,
            transform: `scale(${interpolate(stampEntrance, [0, 1], [2.2, 1])}) rotate(-12deg)`,
            opacity: stampEntrance,
            boxShadow: `0 0 20px ${stampColor}40`,
          }}
        >
          {stampText}
        </div>
      )}
    </div>
  );
};