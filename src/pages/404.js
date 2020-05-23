import React from "react";

import Layout from "../components/layout";
import { Link } from "gatsby";

const NotFoundPage = () => (
  <Layout title="404: Not found">
    <p>Not all who wander are lost... but you are.</p>

    <Link to="/">Head Home</Link>
  </Layout>
);

export default NotFoundPage;
