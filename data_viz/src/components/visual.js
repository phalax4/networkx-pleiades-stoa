import React, { useState, useEffect, useRef } from "react"
import { StaticQuery, graphql } from "gatsby";
import JSONData from "../../content/graph.json"
import { ForceGraph2D } from 'react-force-graph';
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Container, Row, Col
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

function MyChart() {
  const links = JSONData.edges.map(d => Object.create(d));
  const nodes = JSONData.nodes.map(d => Object.create(d));

  let myGraph = { nodes: nodes, links: links };

  const fgRef = useRef();
  useEffect(() => {
    console.log(fgRef);
    fgRef.current.zoom(-6000);

  }, [fgRef]);

  return (
    <Container>
      <div>
        <Row style={{
      marginBottom: `1.5rem`,
    }}>
          <Col><Card style={{ maxWidth: "300px"}}>
            <CardBody >
<svg viewBox="0 0 120 120">
                <circle
                  r={32}
                  cx={60}
                  cy={60}
                  fill="transparent"
                  stroke="#133C99"
                  strokeWidth={5}/>
                  <text textAnchor="middle" fontSize="1rem" x="50%" y="50%" dy="0.3em">8406</text>
                  <text textAnchor="middle" fontSize="0.5rem" x="50%" y="60%" dy="0.3em">Nodes</text>

                  <circle
                  r={24}
                  cx={60}
                  cy={60}
                  fill="transparent"
                  stroke="#133C99"
                  strokeWidth={2}/>


              </svg>
              <svg viewBox="0 0 120 120">
                <circle
                  r={32}
                  cx={60}
                  cy={60}
                  fill="transparent"
                  stroke="#133C99"
                  strokeWidth={5}/>
                  <text textAnchor="middle" fontSize="1rem" x="50%" y="50%" dy="0.3em">8406</text>
                  <text textAnchor="middle" fontSize="0.5rem" x="50%" y="60%" dy="0.3em">Nodes</text>

                  <circle
                  r={24}
                  cx={60}
                  cy={60}
                  fill="transparent"
                  stroke="#133C99"
                  strokeWidth={2}/>


              </svg>
            
            </CardBody>
          </Card></Col>
          <Col><Card style={{ maxWidth: "300px" }}>
            <CardHeader>Card header</CardHeader>
            <CardBody>
              <CardTitle>Lorem Ipsum</CardTitle>
              <p>Lorem ipsum dolor sit amet.</p>
              <Button>Read more &rarr;</Button>
            </CardBody>
            <CardFooter>Card footer</CardFooter>
          </Card></Col>
          <Col><Card style={{ maxWidth: "300px" }}>
            <CardHeader>Card header</CardHeader>
            <CardBody>
              <CardTitle>Lorem Ipsum</CardTitle>
              <p>Lorem ipsum dolor sit amet.</p>
              <Button>Read more &rarr;</Button>
            </CardBody>
            <CardFooter>Card footer</CardFooter>
          </Card></Col>


        </Row>
        <hr />
        <div style={{
          height: 700,
          width: 964,
          // border: `1px solid`,
        }}>
          <div>
            <ForceGraph2D
              nodeLabel="id"
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
          </div>
        </div>
        <hr />
      </div>
    </Container>
  );
}

export default MyChart;
