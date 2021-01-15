import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/profile";
import React, { useEffect, Fragment } from "react";
import Spinner from "../layout/spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = (props) => {
  useEffect(() => props.getCurrentProfile(), []);

  if (props.isAuthenticated) {
    return props.loading && props.profile.profile === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className="main dashboard">
          <h1>Dashboard</h1>
          <hr />
          <br />
          <br />

          {props.profile.profile !== null ? (
            <Fragment>
              <h3>Welcome {props.profile.profile.user.name}</h3>
              <br />
              <DashboardActions />
              <Experience experience={props.profile.profile.experience} />

              <Education education={props.profile.profile.education} />
              <br />

              <hr />
              <button
                onClick={() => props.deleteProfile()}
                className="btn-delete"
                style={{ margin: "2vh" }}
              >
                Delete Account
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <br />
              <p>You Have Not Setup Your Profile Yet.</p>
              <br />
              <br />
              <Link to="/create-profile" className="bn-signup">
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Register.isAuthenticated,
    user: state.Register.user,
    loading: state.profile.loading,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { deleteProfile, getCurrentProfile })(
  Dashboard
);
