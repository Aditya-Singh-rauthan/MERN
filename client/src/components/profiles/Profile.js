import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/spinner.js";
import { getProfileById } from "../../actions/profile";
const Profile = (props) => {
  const userId = props.match.params.id;
  useEffect(() => {
    props.getProfileById(userId);
  }, [props.getProfileById]);

  console.log(props.profile.profile);
  return (
    <Fragment>
      {props.profile.profile === null || props.profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="main">
            {" "}
            <div className="headImg">
              <div className="profileImgm">
                <img className="img" src={props.profile.profile.user.avatar} />
              </div>
              <div>
                <h2>{props.profile.profile.user.name}</h2>
              </div>
              <div>{props.profile.profile.bio}</div>
            </div>
            <div className="Info">
              <div className="field">
                <h3>Company</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.company}</h3>
              </div>
              <div className="field">
                <h3>Status</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.status}</h3>
              </div>
              <div className="field">
                <h3>Location</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.location}</h3>
              </div>
              <div className="field">
                <h3>Website</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.website}</h3>
              </div>
              <div className="field">
                <h3>Github Username</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.githubusername}</h3>
              </div>
              <div className="field">
                <h3>Youtube</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.social.youtube}</h3>
              </div>
              <div className="field">
                <h3>Twitter</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.social.twitter}</h3>
              </div>
              <div className="field">
                <h3>Facebook</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.social.facebook}</h3>
              </div>
              <div className="field">
                <h3>Instagram</h3>
                <h3>:</h3>
                <h3>{props.profile.profile.social.instagram}</h3>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    isAuthenticated: state.Register,
  };
};
const mapDispatchToprops = {
  getProfileById,
};
export default connect(mapStateToProps, mapDispatchToprops)(Profile);
