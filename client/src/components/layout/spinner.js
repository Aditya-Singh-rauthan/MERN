import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <Fragment>
      <div className="main spinner">
        <img
          src={spinner}
          style={{ width: "200px", margin: "auto", display: "block" }}
          alt="Loading"
        />
      </div>
      ;
    </Fragment>
  );
}
