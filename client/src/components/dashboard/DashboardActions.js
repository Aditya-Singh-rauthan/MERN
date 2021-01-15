import React, { Fragment } from "react";
import { Link } from "react-router-dom";
export default function DashboardActions() {
  return (
    <Fragment>
      <div className="dashboardActions">
        <Link
          className="bn-profile"
          style={{ textDecoration: "none" }}
          to="/edit-profile"
        >
          Edit Profile
        </Link>
        <Link
          className="bn-profile"
          style={{ textDecoration: "none" }}
          to="/add-education"
        >
          Add Education
        </Link>
        <Link
          className="bn-profile"
          style={{ textDecoration: "none" }}
          to="/add-experience"
        >
          Add Experience
        </Link>
        <Link
          className="bn-profile"
          style={{ textDecoration: "none" }}
          to="/create-post"
        >
          Create New Post
        </Link>
      </div>
    </Fragment>
  );
}
