import React from "react";
import { useMediaQuery } from "react-responsive";
import SubpageTitleBar from "./SubpageTitleBar";

export default (props) => {
  const isMini = useMediaQuery(
    props.md
      ? { query: "(max-width: 768px)" }
      : { query: "(max-width: 576px)" },
  );
  return (
    <div id={props.id} className={`page ${isMini ? "mini" : ""}`}>
      {props.subpageTitle && (
        <SubpageTitleBar title={props.subpageTitle} url={props.parent} />
      )}
      {props.children}
    </div>
  );
};
