'use client';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

type Data = {
  name: string;
  value: number;
};


type Props= {
  title: string;
  data: Data[];
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
    svg.selectAll('*').remove();
    const margin = {top: 20, right: 30, bottom: 40, left: 90}
    const xScale = d3.scaleBand().domain(data.map(d=>d.name)).range([0, width]).padding(0.3);
    const yScale = d3.scaleLinear().domain([0, d3.max(data.map(d=>d.value))??0]).range([height, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').call(d3.axisLeft(yScale));

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));

    const bars = g.selectAll<SVGRectElement, Data>('.bar').data(data, d => d.name);

    bars
      .exit()
      .transition().duration(500)
      .attr('y', innerHeight)
      .attr('height', 0)
      .remove();

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name)??0)
      .attr('y', innerHeight) // 初期値をグラフの底から開始
      .attr('width', xScale.bandwidth())
      .attr('height', 0) // 初期高さを0に設定
      .attr('fill', color)
      .transition().duration(750) // アニメーションで高さとy位置を変更
      .attr('y', d => yScale(d.value))
      .attr('height', d => innerHeight - yScale(d.value));

    bars
      .transition()
      .duration(750)
      .attr('x', d => xScale(d.name)??0)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value));


  }, [data, width, height, color, strokeWidth, fill]);

  return (
    <div>
      <h2>{title}</h2>
      <svg ref={ref} width={width} height={height} />
    </div>
  );
};

export default BarChart;
