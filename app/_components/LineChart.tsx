'use client';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

type LineData = {
  id: string;
  values: number[];
};

type Props= {
  title: string;
  data: LineData[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
};


const LineChart: React.FC<Props> = ({ title, data, width = 640, height = 400, color='steelblue', strokeWidth=2,fill='none' }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // グラフをリセット

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.values.length - 1) ?? 0])
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(d.values) ?? 0) ?? 0])
      .range([height, 0]);

    const lineGenerator = d3.line<number>()
      .x((_d, i) => xScale(i))
      .y(d => yScale(d));

    const lines = svg.selectAll<SVGRectElement, LineData>('.line-path')
      .data(data, d => d.id);

    lines.enter()
      .append('path')
      .attr('class', 'line-path')
      .attr('d', d => lineGenerator(d.values))
      .attr('stroke', 'steelblue') // ここで線ごとに色を動的に設定することも可能
      .attr('stroke-width', strokeWidth)
      .attr('fill', 'none');

    // アップデートされた線のパスを再描画
    lines.attr('d', d => lineGenerator(d.values));

    // 不要になった線を削除
    lines.exit().remove();
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

export default LineChart;
