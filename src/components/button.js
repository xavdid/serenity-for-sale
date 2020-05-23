import React from "react";

import { Link } from "gatsby";

export default ({ to, children, style = {} }) => (
  <Link
    className="btn btn-xl btn-success"
    to={to}
    style={{ fontSize: "28px", ...style }}
  >
    {children}
  </Link>
);
