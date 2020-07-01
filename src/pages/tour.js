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
  { filename: "ext.jpg", caption: "Van Exterior" },
  { filename: "open_back.jpg", caption: "Doors open in the back" },
  {
    filename: "back_storage.jpg",
    caption: "A view of the 3 storage compartments under the bed"
  },
  {
    filename: "table_up_battery.jpg",
    caption: "Table raised, plus a view of the battery"
  },
  {
    filename: "battery.jpg",
    caption: "Close-up of the battery"
  },
  {
    filename: "under_bed_storage.jpg",
    caption: "Large storage area under the bed"
  },
  {
    filename: "safe_closed.jpg",
    caption: "Under-bed view with the safe"
  },
  {
    filename: "safe_open.jpg",
    caption: "Under-bed view with the safe"
  },
  {
    filename: "safe_closed.jpg",
    caption: "Safe opened"
  },
  {
    filename: "safe_hidden.jpg",
    caption: "Safe hidden"
  },
  {
    filename: "under_the_bed.jpg",
    caption: "Under-bed view. Good for some light storage"
  },
  {
    filename: "kitchen_area.jpg",
    caption: "Kitchen area from the door"
  },
  {
    filename: "kitchen_counter.jpg",
    caption: "Kitchen Counter"
  },
  {
    filename: "kitchen_stocked.jpg",
    caption: "Always carry plenty of spices!"
  },
  {
    filename: "overhead_fan.jpg",
    caption: "The MaxxAir fan overhead"
  },
  {
    filename: "kitchen_sink.jpg",
    caption: "Kitchen sink, big enough to wash a frying pan in!"
  },
  {
    filename: "standing_desk_folded.jpg",
    caption: "Standing desk folded up"
  },
  {
    filename: "standing_desk_closed.jpg",
    caption: "Standing desk folded & electrical panel"
  },
  {
    filename: "standing_desk_open.jpg",
    caption: "Standing desk with monitor out"
  },
  {
    filename: "behind_monitor.jpg",
    caption: "Storage behind the monitor"
  },
  {
    filename: "electrical.jpg",
    caption: "Solar input and main power switches"
  },
  {
    filename: "lightswitch_by_bed.jpg",
    caption:
      "Light-control panel above the bed (on the side of the standing desk)"
  },
  {
    filename: "storage_by_door.jpg",
    caption: "Small organizer by door"
  },
  {
    filename: "organizer_full.jpg",
    caption: "Organizer, but with stuff"
  },
  {
    filename: "hooks.jpg",
    caption: "Hooks by door"
  },
  {
    filename: "hooks_full.jpg",
    caption: "Hooks by door, with stuff"
  },
  {
    filename: "counter_folded.jpg",
    caption: "Folding counter, folded"
  },
  {
    filename: "counter_latch.jpg",
    caption: "The latch that secures the folding counter"
  },
  {
    filename: "counter_extended.jpg",
    caption: "Folding counter, raised"
  },
  {
    filename: "counter_from_above.jpg",
    caption: "Same counter, from above"
  },
  {
    filename: "cooktops.jpg",
    caption: "Cooktops out!"
  },
  {
    filename: "fridge_closed.jpg",
    caption: "The fridge"
  },
  {
    filename: "fridge_open.jpg",
    caption: "Fridge and freezer open"
  },
  {
    filename: "stocked_fridge.jpg",
    caption: "The fridge and freezer hold a surprising amount"
  },
  {
    filename: "cabinets_open.jpg",
    caption: "One set of cabinets open. Four on this side"
  },
  {
    filename: "four_cabinets_full.jpg",
    caption: "Kitchen stuff, plus an entire person worth of clothes"
  },
  {
    filename: "other_cabinets_open.jpg",
    caption: "The opposite side, with three cabinets"
  },
  {
    filename: "three_cabinets_full.jpg",
    caption: "These cabinets hold a lot!"
  },
  {
    filename: "all_cabinets.jpg",
    caption: "All seven cabinets"
  },
  {
    filename: "over_bathroom.jpg",
    caption: "Over-bathroom storange"
  },
  {
    filename: "overbathroom_full.jpg",
    caption: "This is one of the biggest storage areas in the van"
  },
  {
    filename: "towards_front.jpg",
    caption: "Towards the front of the van, from the fridge"
  },
  {
    filename: "over_cab_storage.jpg",
    caption: "Storage over the cab"
  },
  {
    filename: "mirror.jpg",
    caption: "Full-sized mirror"
  },
  {
    filename: "bathroom.jpg",
    caption: "Bathroom"
  },
  {
    filename: "bathroom_full.jpg",
    caption: "Bathroom, stocked"
  },
  {
    filename: "shoe_storage.jpg",
    caption: "Shoe storage rack next to the bathroom"
  },
  {
    filename: "overhead_lights.jpg",
    caption: "Overhead lights and fan"
  },
  {
    filename: "swivel_chair.jpg",
    caption: "Swiveling passenger chair"
  },
  {
    filename: "center_console.jpg",
    caption: "Standard car console with touch screen"
  },
  {
    filename: "table_with_pillows.jpg",
    caption: "Table with the pillows"
  },
  {
    filename: "all_pillows.jpg",
    caption: "All of the pillows that comprise the bed"
  },
  {
    filename: "bed_made.jpg",
    caption: "Bed made with everything"
  },
  {
    filename: "water_pump.jpg",
    caption: "Water pump under the sink"
  },
  {
    filename: "water_tanks.jpg",
    caption: "7 gallon tanks under the sink. One for fresh, one for grey water"
  },
  {
    filename: "under_sink_power.jpg",
    caption: "Waterproof power outlet under the sink"
  },
  {
    filename: "under_sink_stocked.jpg",
    caption: "We can hold a lot under the sink"
  },
  {
    filename: "top.jpg",
    caption: "Top view, with solar, cell antenna, and fan"
  },
  {
    filename: "sun_shades.jpg",
    caption: "Cab with the sun shades up"
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
      <p className="text-center">
        These pictures were taken by the previous owners during the build. We
        included them because they gave a good representation of what the van
        looks like empty.
      </p>
      <p className="text-center">Click a photo to enlarge!</p>
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
