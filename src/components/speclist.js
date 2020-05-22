import React from "react";

export default ({ heading, items = [] }) => (
  <>
    <h3>{heading}</h3>
    <ul style={{ listStyle: "circle", paddingLeft: "18px", fontSize: "18px" }}>
      {items.map(feature => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  </>
);
