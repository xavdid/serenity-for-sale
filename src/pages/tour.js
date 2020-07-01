import React, { useState } from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import TourVideo from "../components/tourVideo";
import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// this turned out overly complex
// basically, images come in as an unsorted array. I want to sort manually here and add a caption, but I need to lookup the filename
const orderedImages = [
  { filename: "front.jpg", caption: "The front" },
  { filename: "back.jpg", caption: "The back, it's very nice and cool" },
  {
    filename: "side.jpg",
    caption:
      "This is the side and it's the longest caption here, but that is ok fugeddaboutit"
  }
];
const numImages = orderedImages.length;

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

  // could verify that data.length === orderedImages.filter(!skip)
  // skipping is probably bad though, would through off other counts

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imageByFilename = data.allFile.edges.reduce(
    (acc, img) => ({
      ...acc,
      [img.node.base]: {
        // used for the lightbox
        url: img.node.childImageSharp.fluid.originalImg,
        // used for the little images
        fluid: img.node.childImageSharp.fluid
      }
    }),
    {}
  );

  const nextIndex = () => (lightboxIndex + 1) % numImages;
  const prevIndex = () => (lightboxIndex + numImages - 1) % numImages;

  return (
    <Layout title="Tours" centered>
      {lightboxIsOpen && (
        <Lightbox
          mainSrc={imageByFilename[orderedImages[lightboxIndex].filename].url}
          imageCaption={orderedImages[lightboxIndex].caption}
          prevSrc={imageByFilename[orderedImages[prevIndex()].filename].url}
          onMovePrevRequest={() => {
            setLightboxIndex(prevIndex());
          }}
          nextSrc={imageByFilename[orderedImages[nextIndex()].filename].url}
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
        See tons more photos on our <FontAwesomeIcon icon={faInstagram} />{" "}
        Instagram:{" "}
        <a
          href="https://instagram.com/serenitythevan"
          target="_blank"
          rel="noreferrer"
          style={{ color: "deepskyblue", textDecoration: "underline" }}
        >
          @serenitythevan
        </a>
      </p>

      <h2 className="text-center">Video Tour</h2>
      <TourVideo />

      <h2 className="pt-4 text-center">Photo Tour</h2>
      <div className="d-flex flex-wrap justify-content-around">
        {orderedImages.map(({ filename, caption }, index) => {
          if (!imageByFilename[filename]) {
            throw new Error(`${filename} not found in orderedImages!`);
          }

          return (
            // have a special break picture to show old vs new?
            <div
              key={filename}
              style={{ width: "235px" }}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxIsOpen(true);
              }}
            >
              <Img
                fluid={imageByFilename[filename].fluid}
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
