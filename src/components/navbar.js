import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";

const NavButton = ({ to, children }) => (
  <Link
    partiallyActive
    getProps={({ isCurrent }) => {
      const classes = ["btn", "btn-lg", "d-none", "d-md-inline-block", "mx-4"];
      const bootstrapButtonClass = "warning";
      return {
        className: [
          isCurrent
            ? `btn-${bootstrapButtonClass}`
            : `btn-outline-${bootstrapButtonClass}`,
          ...classes
        ].join(" ")
      };
    }}
    to={to}
  >
    {children}
  </Link>
);

const Navbar = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "SERENITY-02.png" }) {
        childImageSharp {
          fixed(height: 150) {
            src
          }
        }
      }
    }
  `);

  return (
    <div
      className="row justify-content-center"
      style={{
        backgroundColor: "deepskyblue",
        borderBottom: "1px solid #00274C"
      }}
    >
      <div className="navbar">
        <NavButton to="/">Home</NavButton>
        <NavButton to="/images">Pictures</NavButton>
        <img src={data.file.childImageSharp.fixed.src} />
        <NavButton to="/faq">FAQ</NavButton>
        <NavButton to="/contact">Contact</NavButton>
      </div>
    </div>
  );
};

export default Navbar;
