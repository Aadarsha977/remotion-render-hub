import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface CameraWaypoint {
  frame: number;
  x: number;
  y: number;
  zoom?: number;
}

interface CameraRigProps {
  children: React.ReactNode;
  shakeFrame?: number; // Frame where an impact shake triggers
  shakeIntensity?: number; // Default 4px
  waypoints?: CameraWaypoint[]; // Keyframe waypoints for multi-scene tour
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  shakeFrame = -1,
  shakeIntensity = 5,
  waypoints = [],
}) => {
  const frame = useCurrentFrame();

  // 1. Calculate base camera translation and zoom from waypoints
  let camX = 0;
  let camY = 0;
  let camZoom = 1;

  if (waypoints.length >= 2) {
    const sorted = [...waypoints].sort((a, b) => a.frame - b.frame);
    const framePoints = sorted.map((w) => w.frame);
    const xPoints = sorted.map((w) => w.x);
    const yPoints = sorted.map((w) => w.y);
    const zoomPoints = sorted.map((w) => w.zoom ?? 1);

    camX = interpolate(frame, framePoints, xPoints, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    camY = interpolate(frame, framePoints, yPoints, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    camZoom = interpolate(frame, framePoints, zoomPoints, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // 2. Physical impact recoil shake (when stamps or big elements slam down)
  let shakeX = 0;
  let shakeY = 0;
  if (shakeFrame >= 0 && frame >= shakeFrame && frame <= shakeFrame + 8) {
    const shakeProgress = (frame - shakeFrame) / 8;
    const decay = Math.exp(-shakeProgress * 4);
    shakeX = Math.sin(frame * 12) * shakeIntensity * decay;
    shakeY = Math.cos(frame * 15) * shakeIntensity * decay;
  }

  // 3. Perpetual micro-drift (ensures video never feels completely dead/frozen)
  const driftX = Math.sin(frame / 60) * 1.5;
  const driftY = Math.cos(frame / 75) * 1.5;

  const finalX = camX + shakeX + driftX;
  const finalY = camY + shakeY + driftY;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translate(${finalX}px, ${finalY}px) scale(${camZoom})`,
        transformOrigin: '50% 50%',
        transition: 'none',
      }}
    >
      {children}
    </div>
  );
};
