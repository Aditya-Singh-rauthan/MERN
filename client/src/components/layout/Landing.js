import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Spinner from "./spinner.js";
import { connect } from "react-redux";
const Landing = (props) => {
  if (props.loading && props.profile === null) {
    return <Spinner />;
  }
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="Home">
        <div className="LandingContent">
          <h2>Connect With the World.</h2>
          <p>
            Create a developer profile, share posts and get help from other
            developers.
          </p>
        </div>
        <div className="LandingButtons">
          <Link
            className="btn-login"
            style={{ textDecoration: "none" }}
            to="/login"
          >
            Login
          </Link>
          <Link
            className="btn-signup"
            style={{ textDecoration: "none" }}
            to="/register"
          >
            SignUp
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Register.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Landing);
