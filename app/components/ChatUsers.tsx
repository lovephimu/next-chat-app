'use client';
import { Message } from '@/database/database';
import { BrowserUsage } from '@/util/functions/countUsers';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Props = {
  agents: BrowserUsage[];
};

export default function ChatUsers(props: Props) {
  // Sates
  const router = useRouter();

  // Fetch functions to read and write Messages
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    router.refresh();
  }, [router]);

  useEffect(() => {
    const primaryPink = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary-pink')
      .trim();

    // Function to draw the chart
    const drawChart = () => {
      if (containerRef.current) {
        // Clear any existing content
        d3.select(containerRef.current).select('svg').remove();

        const data = props.agents;
        const maxCount = d3.max(data, (d) => d.count ?? 0) ?? 0;

        // Get the dimensions of the container
        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const effectiveWidth = width - margin.left - margin.right;
        const effectiveHeight = height - margin.top - margin.bottom;

        // Create the SVG element
        const svg = d3
          .select(containerRef.current)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        const defs = svg.append('defs');

        defs
          .append('pattern')
          .attr('id', 'your-pattern-id') // A unique ID for your pattern
          .attr('width', 10) // The width of your pattern tile
          .attr('height', 10) // The height of your pattern tile
          .attr('patternTransform', 'rotate(45)') // Rotate the pattern
          .attr('patternUnits', 'userSpaceOnUse')
          .append('path') // Create the cross using path
          .attr('d', 'M0,4 L8,4 M4,0 L4,8') // Two lines forming a cross
          .attr('stroke', '#ffddd280') // Color of the cross
          .attr('stroke-width', 1);

        // X-axis scale
        const x = d3
          .scaleBand()
          .range([0, effectiveWidth])
          .domain(data.map((d) => d.name))
          .padding(0.2);

        // Y-axis scale
        const y = d3
          .scaleLinear()
          .domain([0, maxCount])
          .range([effectiveHeight, 0]);

        // Calculate tick values
        const yAxisTickInterval = 1;
        const yAxisTicks = d3.range(0, maxCount + 1, yAxisTickInterval);

        // Add X-axis
        svg
          .append('g')
          .attr('transform', `translate(0,${effectiveHeight})`)
          .call(d3.axisBottom(x));

        // Add Y-axis
        const yAxis = svg
          .append('g')
          .call(
            d3.axisLeft(y).tickValues(yAxisTicks).tickFormat(d3.format('d')),
          ); // Format ticks as integers

        // yAxis
        //   .append('text')
        //   // //.attr('transform', 'rotate(-90)')
        //   // .attr('y', 0 - margin.left + 20) // Adjust this value as needed
        //   .attr('x', 30)
        //   .attr('y', -20)
        //   .attr('dy', '1em')
        //   .style('text-anchor', 'middle')
        //   .text('Number of Messages')
        //   .style('fill', primaryPink); // Ensure text color is visible

        // Add bars
        svg
          .selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', (d) => x(d.name) ?? 0) // Providing a fallback value of 0
          .attr('y', (d) => y(d.count) ?? 0)
          .attr('width', x.bandwidth())
          .attr('height', (d) => effectiveHeight - (y(d.count) ?? 0))
          .attr('fill', 'url(#your-pattern-id)')
          .attr('stroke', primaryPink) // Color of the border
          .attr('stroke-width', 2); // Thickness of the border
      }
    };

    drawChart();

    // Optional: Resize observer for dynamic resizing
    const resizeObserver = new ResizeObserver(drawChart);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [props.agents]);

  return (
    <div ref={containerRef} className="chart-container">
      {/* SVG will be appended here by D3 */}
    </div>
  );
}
