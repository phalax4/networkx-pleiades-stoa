import React, {useEffect, useRef } from "react"
import JSONData from "../../content/graph.json"
import ForceGraph2D from 'react-force-graph-2d';


function MyChartComponent() {
    const links = JSONData.links.map(d => Object.create(d));
    const nodes = JSONData.nodes.map(d => Object.create(d));

    let myGraph = { nodes: nodes, links: links };

    const fgRef = useRef();
    useEffect(() => {
        fgRef.current.zoom(-6000);

    }, [fgRef]);

    return (
        <ForceGraph2D
            nodeLabel="title"
            ref={fgRef}
            width={964}
            height={700}
            cooldownTime={11000}
            enablePointerInteraction={true}
            graphData={myGraph}
            enableNodeDrag={false}
            backgroundColor="rgba(0,0,0,0)"
            linkColor={() => 'rgba(0,0,0,0.2)'}
            nodeColor="rgba(0,0,0,1)"
            onEngineStop={() => fgRef.current.zoomToFit(600)}
        />
    )
}

export default MyChartComponent;
