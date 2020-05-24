import React, { useState } from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ImagesPage = path => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativeDirectory: { eq: "tour" } }
        sort: { fields: base, order: ASC }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                originalImg
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const captionFromImage = image =>
    image.node.base.split(".")[0].split("-")[1].trim();

  const imageInfo = data.allFile.edges.map(image => ({
    url: image.node.childImageSharp.fluid.originalImg,
    caption: captionFromImage(image)
  }));

  const nextIndex = () => (lightboxIndex + 1) % imageInfo.length;
  const prevIndex = () =>
    (lightboxIndex + imageInfo.length - 1) % imageInfo.length;

  return (
    <Layout title="Photo Tour" centered>
      {lightboxIsOpen && (
        <Lightbox
          mainSrc={imageInfo[lightboxIndex].url}
          imageCaption={imageInfo[lightboxIndex].caption}
          prevSrc={imageInfo[prevIndex()].url}
          onMovePrevRequest={() => {
            setLightboxIndex(prevIndex());
          }}
          nextSrc={imageInfo[nextIndex()].url}
          onMoveNextRequest={() => {
            setLightboxIndex(nextIndex());
          }}
          onCloseRequest={() => {
            setLightboxIsOpen(false);
          }}
          animationOnKeyInput
        />
      )}
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

      <div className="d-flex flex-wrap justify-content-around">
        {data.allFile.edges.map((image, index) => {
          const caption = image.node.base.split(".")[0].split("-")[1].trim();
          return (
            <div
              key={image.node.base}
              style={{ width: "235px" }}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxIsOpen(true);
              }}
            >
              <Img
                fluid={image.node.childImageSharp.fluid}
                alt={caption}
                style={{ border: "1px solid grey", cursor: "pointer" }}
              />
              <p className="text-center">{caption}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ImagesPage;
