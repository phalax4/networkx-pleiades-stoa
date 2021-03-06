import React, { useState, useEffect, useRef } from "react"
import { StaticQuery, graphql } from "gatsby";
import JSONData from "../../content/graph.json"
import ForceGraph2D from 'react-force-graph-2d';
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Container, Row, Col,
  CardSubtitle
} from "shards-react";
import loadable from '@loadable/component';
import { SiGraphql, SiGraphcool } from 'react-icons/si';


import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


const OtherComponent = loadable(() => import('./mychart'))

function MyChart() {


  return (
    <Container>
      <div>
        <Row style={{
          marginBottom: `1.5rem`,
        }}>
          <Col>
            <Card style={{ maxWidth: "300px" }}>
              <svg viewBox="0 0 120 120">
                <circle
                  r={42}
                  cx={60}
                  cy={60}
                  fill="transparent"
                  stroke="#133C99"
                  strokeWidth={6} />
                <text textAnchor="middle" fontSize="1rem" x="50%" y="45%" dy="0.3em">1668</text>
                <text textAnchor="middle" fontSize="0.5rem" x="50%" y="60%" dy="0.3em">Communities</text>
                <circle
                  r={36}
                  cx={60}
                  cy={60}
                  fill="transparent"
                  stroke="#133C99"
                  strokeWidth={2} />

              </svg>

            </Card>
          </Col>
          <Col><Card style={{ maxWidth: "300px" }}>
          <CardBody>
              <CardTitle><SiGraphql /> Graph Facts</CardTitle>

              <h3>  8406 Nodes </h3>
              <h3>  8116 Links  </h3>

              </CardBody>
          </Card></Col>
          <Col><Card style={{ maxWidth: "300px" }}>
            <CardBody>
              <CardTitle>PageRank</CardTitle>
              <table>
              <tbody>
                <tr>
                  <td>1. Sicilia (island)</td>
                  <td>0.0184</td>
                </tr>
                <tr>
                  <td>2. Sardinia (island)</td>
                  <td>0.0145</td>
                </tr>
                <tr>
                  <td>3. Hadrian's Wall</td>
                  <td>0.0137</td>
                </tr>
                <tr>
                  <td>4. Roma</td>
                  <td>0.0113</td>
                </tr>
                </tbody>
              </table>

            </CardBody>
          </Card></Col>
        </Row>
        <hr />
        <div style={{
          height: 700,
          width: 964,
          // border: `1px solid`,
        }}>
          <div>
          <OtherComponent/>
          </div>
        </div>
        <hr />
      </div>
    </Container>
  );
}

export default MyChart;
