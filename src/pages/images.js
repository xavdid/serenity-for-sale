import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Image = path => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "tour" } }) {
        edges {
          node {
            id
            base
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Layout title="Photo Tour">
      <p>
        For more, including great descriptions, check out our Instagram:{" "}
        <a
          href="https://instagram.com/serenitythevan"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} /> @serenitythevan
        </a>
      </p>

      {data.allFile.edges.map(image => (
        <Img
          key={image.node.base}
          fluid={image.node.childImageSharp.fluid}
          alt={image.node.base.split(".")[0]} // only use section of the file extension with the filename
        />
      ))}
    </Layout>
  );
};

export default Image;
