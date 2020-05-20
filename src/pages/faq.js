import React, { Fragment } from "react";

import Layout from "../components/layout";
// import Image from "../components/image";
import Seo from "../components/seo";
import { useStaticQuery, graphql } from "gatsby";

const FaqPage = () => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark {
        id
        html
        headings {
          value
          depth
        }
        tableOfContents(absolute: false)
      }
    }
  `);
  return (
    <Layout>
      <Seo title="FAQ" />
      <div
        className="faqs"
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html
        }}
      />
    </Layout>
  );
};

export default FaqPage;
