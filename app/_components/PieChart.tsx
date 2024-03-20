'use client';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

type PieData = {
  name: string;
  value: number;
}

type Props= {
  title: string;
  data: PieData[];
  radius?: number;
};

const PieChart:React.FC<Props> = ({ title, data, radius = 320}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(()=>{
    if(!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // グラフをリセット
    const g = svg.append('g').attr('transform', `translate(${radius},${radius})`);
    const colorScale = d3.scaleOrdinal<PieData['name'],string>()
      .domain(data.map(d => d.name))
      .range(['#DC3912', '#3366CC', '#109618', '#FF9900', '#990099']);
    const pie = d3.pie<PieData>().value(function(d) { return d.value; }).sort(null);
    const arc = d3.arc<d3.PieArcDatum<PieData>>()
      .outerRadius(radius)
      .innerRadius(0);
    g.selectAll('path')
      .data(pie(data))
      .enter().append('path')
      .attr('fill', d => colorScale(d.data.name))
      .attr('stroke', 'white')
      .attr('d', arc)
      .transition()
      .duration(750)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
          return arc(interpolate(t))??'';
        };
      });
    g.selectAll('text')
      .data(pie(data))
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '20px')
      .text(d => d.data.name);
  },[data, radius])

  return (
    <div>
      <h2>{title}</h2>
      <svg ref={ref} width={radius*2} height={radius*2}>
        <path className="pie-path" />
      </svg>
    </div>
  );

}

export default PieChart;
