import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ShockwaveCircle } from './ShockwaveCircle';

export interface DossierFolderProps {
  caseNumber?: string;
  classification?: string;
  title: string;
  summaryText: string;
  redactedWords?: string[];
  delay?: number;
  stampDelay?: number;
  width?: number | string;
  style?: React.CSSProperties;
}

/**
 * DossierFolder
 * Forensic investigative document mockup for corporate breakdowns and investigative docs.
 * Features:
 * 1. Aged archival paper container with subtle paper tilt
 * 2. Heavy rubber ink stamp slam with spring overshoot and Shockwave ripple
 * 3. Animated sharpie marker redaction wipes over classified text
 */
export const DossierFolder: React.FC<DossierFolderProps> = ({
  caseNumber = 'SEC-SDNY-2021-998',
  classification = 'RESTRICTED // EYES ONLY',
  title = 'DEAL SHEET: ARCHEGOS CAPITAL MANAGEMENT',
  summaryText = 'TOTAL SYSTEMIC LEVERAGE ACROSS 5 PRIME BROKERS EXCEEDED $50 BILLION THROUGH TOTAL RETURN SWAPS WITH ZERO PUBLIC 13F DISCLOSURES.',
  redactedWords = ['TOTAL SYSTEMIC LEVERAGE', '$50 BILLION', 'ZERO PUBLIC 13F'],
  delay = 16,
  stampDelay = 38,
  width = 680,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Document entry spring
  const docProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.7 },
  });

  const docScale = interpolate(docProgress, [0, 1], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const docOpacity = interpolate(docProgress, [0, 0.3, 1], [0, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const docRotate = interpolate(docProgress, [0, 1], [-3, -0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Rubber stamp impact spring (high velocity slam with overshoot)
  const stampProgress = spring({
    frame: frame - stampDelay,
    fps,
    config: { damping: 11, stiffness: 140, mass: 0.5 },
  });

  const stampScale = interpolate(stampProgress, [0, 1], [2.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stampOpacity = interpolate(stampProgress, [0, 0.2, 1], [0, 0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Redaction wipe progress
  const redactProgress = spring({
    frame: frame - (stampDelay + 14),
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.8 },
  });

  const redactWidth = interpolate(redactProgress, [0, 1], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 8,
        padding: '36px 42px',
        background: '#f4f1ea', // Vintage aged newsprint / manila paper
        color: '#1a1a1a',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 2px 6px rgba(0,0,0,0.2)',
        border: '1px solid #dcd7cb',
        transform: `rotate(${docRotate}deg) scale(${docScale})`,
        opacity: docOpacity,
        fontFamily: '"Courier New", Courier, monospace',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Top File Classification Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #1a1a1a',
          paddingBottom: 10,
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em' }}>
          CASE NO: {caseNumber}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', letterSpacing: '0.14em' }}>
          {classification}
        </span>
      </div>

      {/* Document Title */}
      <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 18, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
        {title}
      </div>

      {/* Document Body with Redaction Bar */}
      <div style={{ position: 'relative', fontSize: 16, lineHeight: 1.6, color: '#2b2b2b', marginBottom: 20 }}>
        <p style={{ margin: 0 }}>
          {summaryText}
        </p>

        {/* Dynamic Sharpie Redaction Line Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 0,
            width: `${redactWidth}%`,
            height: 22,
            background: '#111111',
            borderRadius: 2,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Rubber Ink Stamp Slam */}
      {frame >= stampDelay && (
        <div
          style={{
            position: 'absolute',
            top: '32%',
            right: 48,
            transform: `rotate(-14deg) scale(${stampScale})`,
            opacity: stampOpacity,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Shockwave ripple on impact */}
          <div style={{ position: 'absolute' }}>
            <ShockwaveCircle startFrame={stampDelay} color="rgba(220, 38, 38, 0.5)" size={200} />
          </div>

          <div
            style={{
              padding: '8px 24px',
              border: '4px solid #dc2626',
              borderRadius: 6,
              color: '#dc2626',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              boxShadow: 'inset 0 0 10px rgba(220, 38, 38, 0.2)',
            }}
          >
            CONFIDENTIAL
          </div>
        </div>
      )}

      {/* Bottom Barcode / Tracking Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 14, borderTop: '1px dashed #a8a29e' }}>
        <div style={{ fontSize: 10, color: '#78716c', letterSpacing: '0.08em' }}>
          ARCHIVE CLASSIFICATION // DEPT OF FORENSIC AUDIT
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em' }}>
          ||| | |||| | |||||| || |
        </div>
      </div>
    </div>
  );
};
