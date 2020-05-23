import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Speclist from "../components/speclist";
import Button from "../components/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faEnvelope,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

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
      <Carousel style={{ marginBottom: "40px" }}>
        {data.allFile.edges.map(pic => (
          <Carousel.Item key={pic.node.id}>
            <Img fluid={pic.node.childImageSharp.fluid} />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="text-center" style={{ paddingBottom: "28px" }}>
        <Button to="/images">
          <FontAwesomeIcon icon={faImages} /> More Photos
        </Button>
      </div>

      <div className="row" style={{ paddingBottom: "20px" }}>
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
              "FIXME miles",
              '159" Wheelbase',
              "High Roof",
              "Gasoline engine, 3.6L",
              "Front-wheel drive",
              "Backup camera",
              "Extended 60mo/60k warranty (good through XX/YY)",
              "Power mirrors"
            ]}
          />
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <Button to="/faq">
          <FontAwesomeIcon icon={faQuestionCircle} /> Read the FAQs
        </Button>
        <Button to="/contact">
          <FontAwesomeIcon icon={faEnvelope} /> Get in Touch
        </Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
