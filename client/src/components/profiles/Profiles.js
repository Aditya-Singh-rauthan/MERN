import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
const Profiles = (props) => {
  useEffect(() => {
    props.getProfiles();
  }, []);
  // console.log(props.profile.profiles.length);
  return (
    <Fragment>
      {props.profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="main">
            <h2>Developers</h2>
            <div className="profiles">
              {props.profile.profiles.profiles ? (
                props.profile.profiles.profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h2>No Profiles Found</h2>
              )}
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
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
