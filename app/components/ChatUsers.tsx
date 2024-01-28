'use client';
import { Message } from '@/database/database';
import { BrowserUsage } from '@/util/functions/countUsers';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

type Props = {
  agents: BrowserUsage[];
};

export default function ChatUsers(props: Props) {
  // Sates

  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch functions to read and write Messages

  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (d3Container.current) {
      const data = props.agents;

      // Calculate max count safely
      const maxCount = d3.max(data, (d) => d.count ?? 0) ?? 0;

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(d3Container.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // X-axis scale
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.name))
        .padding(0.2);

      // Y-axis scale
      const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);

      // Add X-axis
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add Y-axis
      svg.append('g').call(d3.axisLeft(y));

      // Add bars
      svg
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => y(d.count ?? 0))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.count ?? 0))
        .attr('fill', '#69b3a2');
    }
  }, []);

  return (
    <div>
      <h1>Most active browsers</h1>
      <svg ref={d3Container} />
    </div>
  );
}
