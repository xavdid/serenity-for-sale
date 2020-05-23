/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";

import Navbar from "./navbar";
import Header from "./header";
import Seo from "./seo";

import "./layout.scss";

const Layout = ({
  children,
  title = "Title Goes Here",
  subtitle,
  centered
}) => {
  return (
    <>
      <Seo title={title} />
      <Navbar />
      <div className="container mx-auto p-3" style={{ maxWidth: "800px" }}>
        <div
          style={{
            paddingBottom: "40px"
          }}
        >
          <Header centered={centered}>{title}</Header>
          {subtitle ? (
            <Header centered={centered} big={false}>
              {subtitle}
            </Header>
          ) : null}
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
