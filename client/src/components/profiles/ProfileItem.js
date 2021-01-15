import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const ProfileItem = (props) => {
  return (
    <Fragment>
      <div className="profileItem tile">
        <div className="profileImg">
          <img
            className="img"
            src={props.profile.user.avatar}
            alt={`${props.profile.user.name}.jpg`}
          />
        </div>
        <div className="profileInfo">
          <h2 className="profileName">{props.profile.user.name}</h2>
          <p className="profileStatus">
            {props.profile.status} at {props.profile.company}
          </p>
          <h4 className="profileLocation">{props.profile.location}</h4>
          <br />
          <Link
            to={`/profile/${props.profile.user._id}`}
            style={{ textDecoration: "none" }}
            className="bn-signup"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileItem;
