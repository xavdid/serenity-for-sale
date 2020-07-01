import React from "react";
import Layout from "../components/layout";
import ContactButton from "../components/contactButton";

export default () => (
  <Layout title="Contact">
    <ul style={{ listStyle: "circle" }}>
      <li>Have a quesiton?</li>
      <li>Want to schedule a (virtual) showing?</li>
      <li>Just want to say hi?</li>
    </ul>

    <p>Shoot us a line via the button below and we'll get right back to you!</p>

    <div style={{ paddingTop: "20px" }}>
      <ContactButton />
    </div>
  </Layout>
);
