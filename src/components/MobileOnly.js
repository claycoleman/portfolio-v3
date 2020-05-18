import React from "react";

export default (props) => {
  return (
    <div className={`mobileOnly ${props.className || ""}`}>
      {props.children}
    </div>
  );
};
