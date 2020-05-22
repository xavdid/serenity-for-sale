import React from "react";

import { Link } from "gatsby";

export default ({ to, children }) => (
  <Link className="btn btn-xl btn-success" to={to} style={{ fontSize: "28px" }}>
    {children}
  </Link>
);
