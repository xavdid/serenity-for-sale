import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Image = path => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativeDirectory: { eq: "tour" } }
        sort: { fields: base, order: ASC }
      ) {
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
    <Layout title="Photo Tour" centered>
      <p className="text-center pb-2">
        See more on our Instagram:{" "}
        <a
          href="https://instagram.com/serenitythevan"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} /> serenitythevan
        </a>
      </p>

      <div className="d-flex flex-wrap justify-content-between">
        {data.allFile.edges.map(image => {
          const caption = image.node.base.split(".")[0].split("-")[1].trim();
          return (
            <div key={image.node.base} style={{ width: "235px" }}>
              <Img
                fluid={image.node.childImageSharp.fluid}
                alt={caption}
                style={{ border: "1px solid grey" }}
              />
              <p className="text-center">{caption}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Image;
