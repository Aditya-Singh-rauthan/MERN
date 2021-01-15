import React, { Fragment, useState } from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = (props) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addEducation(formData, props.history);
  };

  if (!props.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form tile">
          <h2>Add An Education :</h2>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="name">Name*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-address-card icon"></i>
              <input
                type="text"
                name="school"
                placeholder="School*"
                value={formData.school}
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
                name="degree"
                id="degree"
                placeholder="degree"
                value={formData.degree}
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
                name="fieldofstudy"
                id="fieldofstudy"
                placeholder="Field of Study"
                value={formData.fieldofstudy}
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
                type="date"
                name="from"
                id="from"
                placeholder="from mm/dd/yyyy"
                value={formData.from}
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
                type="date"
                name="to"
                id="to"
                placeholder="to mm/dd/yyyy"
                value={formData.to}
                onChange={(e) => onChange(e)}
                required
                disabled={toDateDisabled ? "disabled" : ""}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <p>Current</p>
            <div className="set">
              <i className="fa fa-lg fa-github icon"></i>
              <input
                type="checkbox"
                name="current"
                id="current"
                placeholder="current"
                value={formData.current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !formData.current });
                  toggleDisabled(!toDateDisabled);
                }}
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-lg fa-info-circle icon"></i>
              <textarea
                name="description"
                id="description"
                placeholder="description"
                value={formData.description}
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
  };
};

const mapDispatchToProps = {
  addEducation,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
