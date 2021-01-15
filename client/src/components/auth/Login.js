import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
const Landing = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.login(formData);
  };

  //redirect

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form tile">
          <h2>Login :</h2>
          <div className="form-field">
            {/* <label htmlFor="email">Email*</label> */}
            <div className="set">
              <i className="fa fa-envelope fa-lg icon"></i>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="form-field">
            {/* <label htmlFor="password">Password*</label> */}
            <div className="set">
              <i className="fa fa-key fa-lg icon"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password*"
                value={formData.password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>

          <div className="form-field">
            {" "}
            <p>
              Don't Have An Account?{" "}
              <Link to="/register">
                <span style={{ color: "dodgerblue", cursor: "pointer" }}>
                  SignUp
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

const mapDispatchToProps = {
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
