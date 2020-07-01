import React, { useState } from "react";

import Img from "gatsby-image";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default ({ images, order }) => {
  const numImages = order.length;

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imageByFilename = images.allFile.edges.reduce(
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
    <>
      {lightboxIsOpen && (
        <Lightbox
          mainSrc={imageByFilename[order[lightboxIndex].filename].url}
          imageCaption={order[lightboxIndex].caption}
          prevSrc={imageByFilename[order[prevIndex()].filename].url}
          onMovePrevRequest={() => {
            setLightboxIndex(prevIndex());
          }}
          nextSrc={imageByFilename[order[nextIndex()].filename].url}
          onMoveNextRequest={() => {
            setLightboxIndex(nextIndex());
          }}
          onCloseRequest={() => {
            setLightboxIsOpen(false);
          }}
          animationOnKeyInput
        />
      )}

      <div className="d-flex flex-wrap justify-content-around">
        {order.map(({ filename, caption }, index) => {
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
    </>
  );
};
