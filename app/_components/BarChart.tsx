'use client';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

type Props= {
  title: string;
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
};


const BarChart: React.FC<Props> = ({ title, data, width = 640, height = 400, color='steelblue', strokeWidth=2,fill='none' }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data) ?? 0]).range([height, 0]);

    const lineGenerator = d3.line<number>()
      .x((_d, i) => xScale(i))
      .y(d => yScale(d));

    svg.select('.line-path')
      .attr('d', lineGenerator(data))
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth)
      .attr('fill', fill);

    // アニメーションの追加
    svg.select('.line-path')
      .attr('stroke-dasharray', function() {
        const path = this as SVGPathElement;
        const length = path.getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke-dashoffset', function() {
        const path = this as SVGPathElement;
        return path.getTotalLength();
      })
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);
  }, [data, width, height, color, strokeWidth, fill]);

  return (
    <div>
      <h2>{title}</h2>
      <svg ref={ref} width={width} height={height}>
        <path className="line-path" />
      </svg>
    </div>
  );
};

export default BarChart;
