import React from 'react';
import { interpolate } from 'remotion';

interface AndroidPhoneFrameProps {
  children: React.ReactNode;
  frame: number;
  durationInFrames: number;
}

export const AndroidPhoneFrame: React.FC<AndroidPhoneFrameProps> = ({
  children,
  frame,
  durationInFrames,
}) => {
  // Continuous cinematic 3D perspective floating tilt
  const tiltX = interpolate(frame, [0, durationInFrames], [4, -3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tiltY = interpolate(frame, [0, durationInFrames], [-8, 6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const floatY = Math.sin(frame * 0.05) * 8;

  return (
    <div
      style={{
        perspective: 1400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Outer Floating Chassis Container */}
      <div
        style={{
          position: 'relative',
          width: 480,
          height: 980,
          transform: `translateY(${floatY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Soft Ground Studio Shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: '5%',
            width: '90%',
            height: 60,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(16px)',
            transform: 'rotateX(80deg) translateZ(-60px)',
            pointerEvents: 'none',
          }}
        />

        {/* Physical Titanium/Aluminum Device Border Rim */}
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: 56,
            background:
              'linear-gradient(145deg, #4b5563 0%, #1f2937 30%, #374151 70%, #111827 100%)',
            boxShadow:
              '0 25px 60px -15px rgba(0, 0, 0, 0.75), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          {/* Right Edge: Volume Rocker & Power Button */}
          {/* Volume Rocker */}
          <div
            style={{
              position: 'absolute',
              right: -12,
              top: 240,
              width: 5,
              height: 95,
              backgroundColor: '#374151',
              borderRadius: '0 4px 4px 0',
              boxShadow: '1px 2px 4px rgba(0,0,0,0.5)',
            }}
          />
          {/* Power Button */}
          <div
            style={{
              position: 'absolute',
              right: -12,
              top: 360,
              width: 5,
              height: 55,
              backgroundColor: '#4b5563',
              borderRadius: '0 4px 4px 0',
              boxShadow: '1px 2px 4px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {/* Inner Black Bezel Frame */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 48,
            backgroundColor: '#000000',
            padding: 10,
            boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* Active OLED Display Screen Content */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 38,
              overflow: 'hidden',
              backgroundColor: '#000000',
            }}
          >
            {/* Screen Scaled Representation */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1080,
                height: 1920,
                transform: `scale(${460 / 1080})`,
                transformOrigin: '0 0',
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* Specular Edge Glass Glint Reflection */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 48,
            border: '1px solid rgba(255, 255, 255, 0.22)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
