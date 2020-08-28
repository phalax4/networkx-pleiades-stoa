import { forceX, forceY, forceManyBody, scaleLinear, extent, drag, forceCenter, event, forceSimulation, forceLink, create, scaleOrdinal, schemeCategory10 } from "d3";
import React, { useState, useEffect, useRef } from "react"
import { StaticQuery, graphql } from "gatsby";
import JSONData from "../../content/graph.json"
import {Sigma, RandomizeNodePositions, RelativeSize,EdgeShapes,NodeShapes,ForceAtlas2, ForceLink} from 'react-sigma';
import ForceGraph2D from 'react-force-graph-2d';
import {sigma} from 'sigma';

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

    
  function color_config() {
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
        .force("link", forceLink(links).id(d => d.id).strength(1))
        .force("charge", forceManyBody())
        .force('center', forceCenter(width / 2, height / 2))
        .stop();;

      
    const svg = create("svg")
    .attr("viewBox", [0,0, width, height]);

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
        .attr("r", 2)
        .attr("fill", d => scaleOrdinal(schemeCategory10)(d.group))
        .call(drag_config(simulation));
        
  
    node.append("title")
        .text(d => d.id);

        var loading = svg.append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .text("Simulating. One moment please…");

        // function tick() {

        //   for ( i = 0; i < nodes.length; i++ ) {
        //     var node = nodes[i];
        //     node.cx = node.x;
        //     node.cy = node.y;
        //   }
        // }

        

        function renderGraph() {
          // Run the layout a fixed number of times.
          // The ideal number of times scales with graph complexity.
          // Of course, don't run too long—you'll hang the page!
          // const NUM_ITERATIONS = 100;
          // force.tick(NUM_ITERATIONS);
          // force.stop();
        
          // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
          for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
            simulation.tick();
          }
              link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

            loading.remove();
          }
                  // Use a timeout to allow the rest of the page to load first.
        setTimeout(renderGraph, 10);

  
    // simulation.on("tick", () => {
    //   link
    //       .attr("x1", d => d.source.x)
    //       .attr("y1", d => d.source.y)
    //       .attr("x2", d => d.target.x)
    //       .attr("y2", d => d.target.y);
  
    //   node
    //       .attr("cx", d => d.x)
    //       .attr("cy", d => d.y);
    // });
  
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

  function MyVisChart() {
      // create an array with nodes


  // Let's first initialize sigma:
  var s = new sigma('container');

  // Then, let's add some data to display:
  s.graph.addNode({
    // Main attributes:
    id: 'n0',
    label: 'Hello',
    // Display attributes:
    x: 0,
    y: 0,
    size: 1,
    color: '#f00'
  }).addNode({
    // Main attributes:
    id: 'n1',
    label: 'World !',
    // Display attributes:
    x: 1,
    y: 1,
    size: 1,
    color: '#00f'
  }).addEdge({
    id: 'e0',
    // Reference extremities:
    source: 'n0',
    target: 'n1'
  });

  // Finally, let's ask our sigma instance to refresh:
  s.refresh();

  return (
    <div style={{
      height: 700,
      width: 964,
      border: `1px solid`,
    }}>
    < div  id="container"></div>
    </div>

  );
  }

function MySigmaChart(){
  const links = JSONData.edges.map(d => Object.create(d));
  const nodes = JSONData.nodes.map(d => Object.create(d));

  let myGraph = {nodes: nodes, links: links};
  return (
    <div style={{
      height: 700,
      width: 964,
      border: `1px solid`,
    }}>
      <ForceGraph2D
          zoom={10000,10}
          width="964"
          height="700"
          cooldownTime="12000"
          enablePointerInteraction={false}
          graphData={myGraph}
          enableNodeDrag={false}
        />
      </div>
    
  );
}


  
 export default MyVisChart;
