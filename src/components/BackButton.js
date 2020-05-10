import React from "react";
import { Link, graphql } from "gatsby";
import back from "../assets/images/back.png";

export default (props) => {
  return (
    <Link className="backButton" to="/">
      <img
        alt="Back button"
        style={{ width: "20px", height: "auto" }}
        src={back}
      />
    </Link>
  );
};
