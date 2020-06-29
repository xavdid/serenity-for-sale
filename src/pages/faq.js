import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";

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
    <Layout title="FAQs">
      <div
        className="toc"
        id="toc"
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.tableOfContents
        }}
      />

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
