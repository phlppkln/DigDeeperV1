import React, { useRef, useMemo } from 'react';
import * as d3 from 'd3';

type ScatterProps = {
  data: ScatterDataInterface;
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const ScatterPlot = ({ data, width, height, margin = { top: 20, right: 20, bottom: 30, left: 40 } }: ScatterProps) => {
  const scatterRef = useRef<SVGSVGElement | null>(null);

  useMemo(() => {
    if (!scatterRef.current) return;

    const svg = d3.select(scatterRef.current);

    const xExtent = d3.extent(data.data, d => d.x) as [number, number];
    const yExtent = d3.extent(data.data, d => d.y) as [number, number];

    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    svg.selectAll("circle")
      .data(data.data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 4)
      .attr("fill", "steelblue");

    if (data.xLabel) {
      svg.append("text")
        .attr("x", width - margin.right)
        .attr("y", height - margin.bottom / 2)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .text(data.xLabel);
    }

    if (data.yLabel) {
      svg.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .text(data.yLabel)
        .attr("transform", `rotate(-90, ${margin.left / 2}, ${margin.top / 2})`);
    }

    svg.selectAll(".label")
      .data(data.data.filter(d => d.label !== undefined))
      .enter()
      .append("text")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text(d => d.label);
  }, [data, width, height, margin]);

  return (
    <svg ref={scatterRef} width={width} height={height}></svg>
  );
};

export default ScatterPlot;