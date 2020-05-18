import React, { Fragment } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

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
  return <img src={data.file.childImageSharp.fixed.src} />;
};

const NavButton = ({ to, label, classes = [] }) => (
  <Link
    partiallyActive
    getProps={({ isCurrent }) => {
      const bootstrapButtonClass = "warning";
      return {
        className: [
          isCurrent
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
  { to: "images", label: "Pictures" },
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
        backgroundColor: "deepskyblue",
        borderBottom: "1px solid #00274C"
      }}
    >
      <div className="navbar">
        <DesktopNavButtonsRow />
      </div>
      <MobileNavButtonRow />
    </div>
  );
};

export default Navbar;
