import React, { useState, useEffect, useRef } from "react"
import { StaticQuery, graphql } from "gatsby";
import JSONData from "../../content/graph.json"
import { ForceGraph2D } from 'react-force-graph';


function MyChart(){
  const links = JSONData.edges.map(d => Object.create(d));
  const nodes = JSONData.nodes.map(d => Object.create(d));

  let myGraph = {nodes: nodes, links: links};

  const fgRef = useRef();
  useEffect(() => {
    console.log(fgRef);
    fgRef.current.zoom(-6000);

  }, [fgRef]);

  return (
    <div>
    <hr/>
    <div style={{
      height: 700,
      width: 964,
      // border: `1px solid`,
    }}>
      <div>
      <ForceGraph2D
          ref={fgRef}
          width={964}
          height={700}
          cooldownTime={11000}
          enablePointerInteraction={false}
          graphData={myGraph}
          enableNodeDrag={false}
          backgroundColor="rgba(0,0,0,0)"
          linkColor={() => 'rgba(0,0,0,0.2)'}
          nodeColor="rgba(0,0,0,1)"
          onEngineStop={() => fgRef.current.zoomToFit(500)}
        />
        </div>
      </div>
      <hr/>
      </div>
    
  );
}

 export default MyChart;
