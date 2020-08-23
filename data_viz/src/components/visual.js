import { forceManyBody, scaleLinear, extent, drag, forceCenter, event, forceSimulation, forceLink, create, scaleOrdinal, schemeCategory10 } from "d3";
import React, { useState, useEffect, useRef } from "react"
import { StaticQuery, graphql } from "gatsby";
import JSONData from "../../content/miserables.json"


// graphql`
// query VisualItemsQuery {
//   jsonData {
//     edges {
//       node {
//         label
//         link
//       }
//     }
//   }
// }

// `
function RandomData() {
    const data = [...Array(100)].map((e, i) => {
      return {
        x: Math.random() * 40,
        y: Math.random() * 40,
        temparature: Math.random() * 500
      };
    });
    return data;
  }

  function drag_config(simulation) {
       
    function dragstarted(d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

    
  function color_config(d) {
    const scale = scaleOrdinal(schemeCategory10);
    return d => scale(d.group);
  }

  function Chart (){

    const svg_element = useRef(null);


    const height = 600;
    const width = 954;
    const data = {
      "nodes":[
        {"name":"node1","id":1},
        {"name":"node2","id":2},
        {"name":"node3","id":3},
        {"name":"node4","id":4}
      ],
      "links":[
        {"source":2,"target":1,"weight":1},
        {"source":2,"target":4,"weight":3},
        {"source":4,"target":3,"weight":3}

      ]
    }

    const links = JSONData.links.map(d => Object.create(d));
    const nodes = JSONData.nodes.map(d => Object.create(d));
  
    const simulation = forceSimulation(nodes)
        .force("link", forceLink(links).id(d => d.id))
        .force("charge", forceManyBody().strength(-10))
        .force("center", forceCenter(width / 2, height / 2));
  
    const svg = create("svg")
        .attr("viewBox", [0, 0, width, height]);

        useEffect(()=>{
          if(svg_element.current){
            svg_element.current.appendChild(svg.node())
          } 
      }, [svg]);
      
  
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));
  
    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", 5)
        .attr("fill", (d) =>{
          const scale = scaleOrdinal(schemeCategory10);
          return d => scale(d.group);
        })
        .call(drag_config(simulation));
  
    node.append("title")
        .text(d => d.id);
  
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });
  
    // invalidation.then(() => simulation.stop());
  
    return (
      <div style={{
        height: 600,
        width: 954,
        border: `1px solid`,
        padding: `10px`,
        boxShadow: `5px 10px 8px #888888`,
      }}>
          <div ref={svg_element}/>
      </div>
  );
  }


   

  
  
function Scatter() {
    const data = RandomData(),
      w = 600,
      h = 600,
      margin = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      };
  
    const width = w - margin.right - margin.left,
      height = h - margin.top - margin.bottom;
  
    const xScale = scaleLinear()
      .domain(extent(data, d => d.x))
      .range([0, width]);
  
    const yScale = scaleLinear()
      .domain(extent(data, d => d.y))
      .range([height, 0]);
  
  const circles = data.map((d, i) => (
      <circle
        key={i}
        r={5}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        style={{ fill: "lightblue"}}
      />
    ));
  
    return (
      <div>
        <svg width={w} height={h}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {circles}
          </g>
        </svg>
      </div>
    );
  }
  
  export default Chart;
