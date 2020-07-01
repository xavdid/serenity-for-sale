import React from "react";

export default ({ style = {} }) => (
  <div
    className="video"
    style={{
      ...style,
      position: "relative",
      paddingBottom: "56.25%" /* 16:9 */,
      paddingTop: 25,
      height: 0
    }}
  >
    <iframe
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
      src="https://www.youtube-nocookie.com/embed/SZwvpe5Ye0s"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);
