import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default () => (
  <a
    target="_blank"
    rel="noreferrer"
    className="btn btn-xl btn-success"
    href="mailto:serenitythevan@gmail.com"
    style={{
      fontSize: "36px",
      width: "100%"
    }}
  >
    <FontAwesomeIcon icon={faEnvelope} /> serenitythevan@gmail.com
  </a>
);
