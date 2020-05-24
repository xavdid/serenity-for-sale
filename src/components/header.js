import React from "react";
import { lightBlue } from "./styles";

export default ({ children, big = true, centered }) => {
  const CustomTag = `h${big ? 1 : 2}`;
  return (
    <CustomTag
      className={centered ? "text-center" : ""}
      style={{
        fontSize: big ? 54 : 34,
        textDecorationColor: lightBlue,
        textDecorationLine: big ? "underline" : "none"
      }}
    >
      {children}
    </CustomTag>
  );
};
