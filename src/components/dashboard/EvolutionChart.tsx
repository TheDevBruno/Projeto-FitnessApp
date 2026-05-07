'use client';

import React from 'react';

interface DataPoint {
  date: string;
  value: number;
}

interface EvolutionChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
}

export function EvolutionChart({ 
  data, 
  color = '#10B981', 
  height = 120 
}: EvolutionChartProps) {
  if (!data || data.length < 2) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '0.875rem' }}>
        Dados insuficientes para gerar gráfico
      </div>
    );
  }

  const width = 300;
  const padding = 20;

  // Find min/max for scaling
  const values = data.map(d => d.value);
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.02;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d.value - min) / (max - min)) * (height - padding * 2) - padding;
    return { x, y };
  });

  // Create SVG path
  const pathData = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    
    // Smooth curves (bezier)
    const prev = a[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    
    return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  const areaData = `${pathData} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <path
        d={areaData}
        fill="url(#gradient)"
      />
      
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />
      
      {/* Dots for points */}
      {points.map((p, i) => (
        <circle 
          key={i} 
          cx={p.x} 
          cy={p.y} 
          r="4" 
          fill="#fff" 
          stroke={color} 
          strokeWidth="2" 
          style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))' }}
        />
      ))}
    </svg>
  );
}
