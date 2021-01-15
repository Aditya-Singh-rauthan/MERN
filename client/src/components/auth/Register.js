import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
const Landing = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });

  const { name, email, password, password1 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      props.setAlert("Passwords Do Not Match", "danger");
    } else {
      props.register({ name, email, password });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form tile">
          <h2>Register :</h2>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="name">Name*</label> */}
            <div className="set">
              <i className="fa fa-user fa-lg icon"></i>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name*"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="email">Email*</label> */}
            <div className="set">
              <i className="fa fa-envelope fa-lg icon"></i>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password">Password*</label> */}
            <div className="set">
              <i className="fa fa-key fa-lg icon"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {/* <label htmlFor="password1">Confirm Password*</label> */}
            <div className="set">
              <i className="fa fa-key fa-lg icon"></i>
              <input
                type="password"
                name="password1"
                id="password1"
                placeholder="Confirm Password*"
                value={password1}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <hr />
          <div className="form-field">
            {" "}
            <p>
              Already Have An Account?{" "}
              <Link to="/login">
                <span style={{ color: "dodgerblue", cursor: "pointer" }}>
                  SignIn
                </span>
              </Link>
            </p>
          </div>
          <div className="form-field">
            <input type="submit" name="submit" id="submit" />
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

const mapDispatchToProps = { setAlert, register };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
