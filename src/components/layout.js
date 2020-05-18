/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Navbar from "./navbar";
import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mw-50 p-3">{children}</div>
    </>
  );
};

export default Layout;
