import React from "react";

export default (props) => {
  return (
    <div style={props.style} className={`desktopOnly ${props.className || ""}`}>
      {props.children}
    </div>
  );
};
