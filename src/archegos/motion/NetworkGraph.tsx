import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface NetworkNode {
  id: string;
  label: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  isHub?: boolean;
}

export interface NetworkEdge {
  from: string;
  to: string;
  alert?: boolean;
}

export interface NetworkGraphProps {
  nodes?: NetworkNode[];
  edges?: NetworkEdge[];
  delay?: number;
  width?: number | string;
  height?: number | string;
  accentColor?: string;
  alertColor?: string;
  style?: React.CSSProperties;
}

/**
 * NetworkGraph
 * Kinetic metaphor component for network effects, systemic contagion,
 * prime broker interconnections, or neural brain webs.
 * Features staggered node reveals, vector connection lines, and traveling data pulses.
 */
export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes = [
    { id: 'hub', label: 'OFFSHORE HUB', x: 50, y: 50, isHub: true },
    { id: 'node1', label: 'CREDIT SUISSE', x: 20, y: 25 },
    { id: 'node2', label: 'NOMURA', x: 80, y: 25 },
    { id: 'node3', label: 'MORGAN STANLEY', x: 18, y: 75 },
    { id: 'node4', label: 'GOLDMAN SACHS', x: 82, y: 75 },
  ],
  edges = [
    { from: 'hub', to: 'node1', alert: true },
    { from: 'hub', to: 'node2', alert: true },
    { from: 'hub', to: 'node3' },
    { from: 'hub', to: 'node4' },
    { from: 'node1', to: 'node2' },
  ],
  delay = 18,
  width = 680,
  height = 380,
  accentColor = '#38bdf8',
  alertColor = '#ff3b30',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Map nodes by id for coordinate lookup
  const nodeMap = new Map<string, NetworkNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Pulse loop for traveling packets
  const pulseLoop = (frame % 45) / 45;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: 16,
        background: 'rgba(10, 15, 24, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Background Cartesian Matrix Rulers */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 14,
          fontSize: 10,
          fontFamily: 'ui-monospace, monospace',
          color: 'rgba(255, 255, 255, 0.35)',
          letterSpacing: '0.1em',
        }}
      >
        TOPOLOGY MAPPING // PRIME CONTAGION WEB
      </div>

      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Draw Connection Edges */}
        {edges.map((edge, idx) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const edgeDelay = delay + 8 + idx * 4;
          const edgeProgress = spring({
            frame: frame - edgeDelay,
            fps,
            config: { damping: 15, stiffness: 80, mass: 0.6 },
          });

          const drawRatio = interpolate(edgeProgress, [0, 1], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const strokeColor = edge.alert ? alertColor : accentColor;

          // Packet position coordinates
          const packetX = interpolate(pulseLoop, [0, 1], [fromNode.x, toNode.x], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const packetY = interpolate(pulseLoop, [0, 1], [fromNode.y, toNode.y], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <g key={idx}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={edge.alert ? "0.8" : "0.5"}
                strokeOpacity={edge.alert ? "0.85" : "0.4"}
                strokeDasharray="100"
                strokeDashoffset={drawRatio * 100}
              />
              {/* Traveling Data Pulse Dot */}
              {edgeProgress > 0.8 && (
                <circle
                  cx={packetX}
                  cy={packetY}
                  r={edge.alert ? "0.9" : "0.7"}
                  fill={strokeColor}
                  opacity="0.9"
                />
              )}
            </g>
          );
        })}

        {/* Draw Interactive Nodes */}
        {nodes.map((node, idx) => {
          const nodeDelay = delay + idx * 5;
          const nodeProgress = spring({
            frame: frame - nodeDelay,
            fps,
            config: { damping: 12, stiffness: 110, mass: 0.5 },
          });

          const scale = interpolate(nodeProgress, [0, 1], [0.2, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const opacity = interpolate(nodeProgress, [0, 0.4, 1], [0, 0.8, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const isHub = node.isHub;
          const color = isHub ? alertColor : accentColor;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y}) scale(${scale}) translate(${-node.x}, ${-node.y})`}
              opacity={opacity}
            >
              {/* Outer Glow Halo */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHub ? "4.5" : "3.0"}
                fill={color}
                opacity={isHub ? "0.3" : "0.15"}
              />

              {/* Node Center Solid */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHub ? "2.6" : "1.8"}
                fill={color}
                stroke="#ffffff"
                strokeWidth="0.4"
              />

              {/* Label */}
              <text
                x={node.x}
                y={node.y + (isHub ? 5.5 : 4.8)}
                fill="#ffffff"
                fontSize={isHub ? "2.4" : "1.9"}
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                textAnchor="middle"
                opacity="0.85"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
