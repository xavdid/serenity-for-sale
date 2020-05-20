import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import Seo from "../components/seo";

import { lightBlue } from "../components/styles";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1
      className="text-center"
      style={{
        fontSize: 54,
        textDecorationColor: lightBlue,
        textDecorationLine: "underline"
      }}
    >
      Serenity for Sale
    </h1>
    <h2
      className="text-center"
      style={{
        fontSize: 34
      }}
    >
      $1,234
    </h2>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </Layout>
);

export default IndexPage;
