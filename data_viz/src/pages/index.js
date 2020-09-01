import React from "react"
import { Link } from "gatsby"
// import Scatter from "../components/visual"
import MyChart from "../components/visual"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Graph Networks</h1>
    <p>Dataset from Pleiades</p>
    <p>Now go build something great.</p>
    <MyChart/>
  </Layout>
)

export default IndexPage
