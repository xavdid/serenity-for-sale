import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { graphql, useStaticQuery, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Speclist from "../components/speclist";
import Button from "../components/button";
import TourVideo from "../components/tourVideo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faEnvelope,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

const Block = ({ children }) => (
  <p style={{ padding: "0 0 20px 0" }}>{children}</p>
);

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { relativeDirectory: { eq: "carousel" } }
        sort: { order: ASC, fields: base }
      ) {
        edges {
          node {
            id
            childImageSharp {
              fluid(maxWidth: 600, maxHeight: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Layout
      title="Serenity For Sale"
      subtitle="A Luxurious Camper Van | $64,500"
      centered
    >
      <h3 style={{ textAlign: "center", paddingBottom: "20px" }}>
        Status: <span style={{ color: "green" }}>Available</span>
      </h3>
      <Carousel style={{ marginBottom: "40px" }}>
        {data.allFile.edges.map(pic => (
          <Carousel.Item key={pic.node.id}>
            <Img fluid={pic.node.childImageSharp.fluid} />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="text-center" style={{ paddingBottom: "28px" }}>
        <Button to="/tour">
          <FontAwesomeIcon icon={faImages} /> More Photos
        </Button>
      </div>

      <Block>
        Serenity the Van is more than a van -- it’s a home! Our 2017 Dodge Ram
        Promaster 2500 has just 47k miles on it, but we made the most of them.
        This is a van for full-time adventurers, whether that’s stealth camping
        in Chicago and New Orleans, setting up chairs and a campfire in
        Shenandoah or Joshua Tree, or boondocking on Lake Michigan or the Snake
        River.
      </Block>

      <Block>
        The van comes equipped with plenty of cabinets, a standing desk, new
        soft-close drawers, a waterproofed bathroom cabinet (complete with
        Nature’s Head composting toilet), and a near full-sized bed that
        converts into a dinette. A good-sized refrigerator, two strong fans and
        two induction cooktops, plus LED lighting and plenty of outlets are all
        powered by 600W of solar panels up top. For one or two explorers, it’s
        an intimate and comfortable way to make “home” anywhere you care to go.
      </Block>

      <Block>
        For more than six months, Serenity was our full-time abode. (We have
        owned the van for longer, but our real road trip was half a year in
        length.) In that time we visited <strong>26 states</strong>, working and
        living in a new city every week or so. We visited 9 national parks,
        countless museums, and a host of wonderful friends and family all across
        the US, and always had our own sheets and pillows to snuggle into at
        night. We’d love to pass this adventure along to a new full-time person
        or couple -- see more of our travels at{" "}
        <a
          href="https://www.instagram.com/serenitythevan/"
          target="_blank"
          rel="noreferrer"
        >
          @serenitythevan on Instagram
        </a>
        , check out <Link to="/faq">the FAQ</Link> for more information, and{" "}
        <Link to="/contact">get in touch</Link> if you’re interested in buying!
      </Block>

      <h2>Take a Tour</h2>

      <TourVideo />

      <div
        className="row"
        style={{ paddingBottom: "20px", paddingTop: "30px" }}
      >
        <div className="col-md">
          <Speclist
            heading="Features"
            items={[
              "Nature's Head toilet",
              "MaxxAir roof vent/fan",
              "WeBoost cell signal booster",
              "Swivel passenger seat",
              "Convertible bed/table",
              "Slide-out pantry drawers",
              "Open/close RV window",
              "Rear & cargo door windows",
              "Modern electrical system",
              "Two induction cooktops",
              "Running water",
              "Spacious fridge w/ freezer",
              "Collapsible counter",
              "Standing desk and monitor",
              "Well-insulated for hot or cold",
              "Great stealth camper",
              "Ample storage space"
            ]}
          />
        </div>
        <div className="col-md">
          <Speclist
            heading="Specs"
            items={[
              "2017 RAM ProMaster 2500",
              "47k miles",
              '159" Wheelbase',
              "High Roof",
              "Gasoline engine, 3.6L",
              "Front-wheel drive",
              "600W of solar panels on the roof",
              "Backup camera",
              "Extended 60mo/60k warranty (good through 11/2022)",
              "Power mirrors"
            ]}
          />
        </div>
      </div>
      <div className="d-flex justify-content-around flex-wrap">
        <Button to="/faq" style={{ marginBottom: "20px" }}>
          <FontAwesomeIcon icon={faQuestionCircle} /> Tons More Info
        </Button>
        <Button to="/contact" style={{ height: "fit-content" }}>
          <FontAwesomeIcon icon={faEnvelope} /> Get in Touch
        </Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
