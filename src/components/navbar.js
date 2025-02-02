import React, { Fragment } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import { lightBlue, michiganBlue } from "./styles";

const Logo = () => {
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
    <Link to="/">
      <img src={data.file.childImageSharp.fixed.src} />
    </Link>
  );
};

const NavButton = ({ to, label, classes = [] }) => (
  <Link
    partiallyActive
    getProps={({ href, location: { pathname } }) => {
      const bootstrapButtonClass = "warning";
      const pathWithoutTrailingSlash = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

      return {
        className: [
          href === pathWithoutTrailingSlash ||
          (href === "/" && pathWithoutTrailingSlash === "")
            ? `btn-${bootstrapButtonClass}`
            : `btn-outline-${bootstrapButtonClass}`,
          ...["btn", ...classes]
        ].join(" ")
      };
    }}
    to={`/${to === undefined ? label.toLowerCase() : to}`}
  >
    {label}
  </Link>
);

const buttons = [
  { to: "", label: "Home" },
  { label: "Tour" },
  { label: "FAQ" },
  { label: "Contact" }
];
const ButtonsBuilder = ({ classes, includeLogo = false }) => (
  <>
    {buttons.map(({ to, label }, index) => (
      <Fragment key={`${to}-${label}`}>
        {includeLogo && index === 2 ? <Logo /> : null}
        <NavButton classes={classes} to={to} label={label} />
      </Fragment>
    ))}
  </>
);

const MobileNavButtonRow = () => (
  <div
    style={{ width: "90%" }}
    className="d-flex justify-content-around d-md-none pb-3"
  >
    <ButtonsBuilder />
  </div>
);

const DesktopNavButtonsRow = () => (
  <ButtonsBuilder
    classes={["btn-lg", "d-none", "d-md-inline-block", "mx-4"]}
    includeLogo
  />
);

const Navbar = ({ siteTitle }) => {
  return (
    <div
      className="row justify-content-center"
      style={{
        backgroundColor: lightBlue,
        borderBottom: `1px solid ${michiganBlue}`
      }}
    >
      {/* there's probably a better way to do this but it works ¯\_(ツ)_/¯ */}
      <div className="navbar">
        <DesktopNavButtonsRow />
      </div>
      <MobileNavButtonRow />
    </div>
  );
};

export default Navbar;
