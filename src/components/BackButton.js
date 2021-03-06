import React from "react";
import { Link } from "gatsby";
import back from "../assets/images/back.png";

export default (props) => {
  return (
    <Link className="backButton" to={props.url || "/"}>
      <img
        alt="Back button"
        style={{ width: "20px", height: "auto" }}
        src={back}
      />
    </Link>
  );
};
