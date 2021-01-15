import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
//import { login } from "../../actions/auth";
import { createProfile, getCurrentProfile } from "../../actions/profile";
const EditProfile = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  useEffect(() => {
    props.getCurrentProfile();
    setFormData({
      company: props.profile.profile ? props.profile.profile.company : "",
      website: props.profile.profile ? props.profile.profile.website : "",
      location: props.profile.profile ? props.profile.profile.location : "",
      status: props.profile.profile ? props.profile.profile.status : "",
      skills: props.profile.profile
        ? props.profile.profile.skills.join(", ")
        : "",
      githubusername: props.profile.profile
        ? props.profile.profile.githubusername
        : "",
      bio: props.profile.profile ? props.profile.profile.bio : "",
      twitter: props.profile.profile
        ? props.profile.profile.social.twitter
        : "",
      facebook: props.profile.profile
        ? props.profile.profile.social.facebook
        : "",
      youtube: props.profile.profile
        ? props.profile.profile.social.youtube
        : "",
      instagram: props.profile.profile
        ? props.profile.profile.social.instagram
        : "",
    });
  }, []);

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.createProfile(formData, props.history);
  };

  if (!props.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form tile">
          <h2>Edit Profile :</h2>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="name">Name*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-address-card icon"></i>
              <input
                type="text"
                name="company"
                id="name"
                placeholder="Company*"
                value={formData.company}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="email">Email*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-globe icon"></i>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="website"
                value={formData.website}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password">Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-map-marker icon"></i>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="location"
                value={formData.location}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-bolt icon"></i>
              <input
                type="text"
                name="status"
                id="status"
                placeholder="status"
                value={formData.status}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-cogs icon"></i>
              <input
                type="text"
                name="skills"
                id="skills"
                placeholder="skills"
                value={formData.skills}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-github icon"></i>
              <input
                type="text"
                name="githubusername"
                id="githubusernam"
                placeholder="githubusername"
                value={formData.githubusername}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-info-circle icon"></i>
              <textarea
                name="bio"
                id="bio"
                placeholder="bio"
                value={formData.bio}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-twitter icon"></i>
              <input
                type="text"
                name="twitter"
                id="twitter"
                placeholder="twitter"
                value={formData.twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-facebook icon"></i>
              <input
                type="text"
                name="facebook"
                id="facebook"
                placeholder="facebook"
                value={formData.facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-youtube icon"></i>
              <input
                type="text"
                name="youtube"
                id="youtube"
                placeholder="youtube"
                value={formData.youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-instagram icon"></i>
              <input
                type="text"
                name="instagram"
                id="instagram"
                placeholder="instagram"
                value={formData.instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            <input type="submit" name="submit" id="submit" value="update" />
          </div>
        </div>
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Register.isAuthenticated,
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  createProfile,
  getCurrentProfile,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
