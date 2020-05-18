import React from "react";
import { Link, graphql } from "gatsby";
import back from "../assets/images/back.png";
import BackButton from "./BackButton";

export default (props) => {
  return (
    <div className={`subpageTitleBar ${props.className || ""}`}>
      <h2 className="subpageTitle">{props.title}</h2>
      <BackButton url={props.url} />
    </div>
  );
};
