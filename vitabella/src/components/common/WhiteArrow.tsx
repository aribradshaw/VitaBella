import React from "react";

const WhiteArrow = ({ style = {}, ...props }) => (
  <img
    src="/brand/white-arrow.svg"
    alt=""
    style={{ width: 28, height: 28, display: "block", ...style }}
    draggable={false}
    {...props}
  />
);

export default WhiteArrow;
