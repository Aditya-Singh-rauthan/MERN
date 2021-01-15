import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { activeNavbar, removeNavbar } from "../../actions/navbar";
import { logout } from "../../actions/auth";
const Navbar = (props) => {
  const navActive = () => {
    if (props.navbar) {
      props.removeNavbar();
    } else {
      props.activeNavbar();
    }
  };

  const authLinks = () => {
    return (
      <ul
        className="Navlinks"
        style={props.navbar ? { transform: "translate(0%)" } : {}}
      >
        <Link
          style={{ textDecoration: "none" }}
          onClick={navActive}
          to="/developers"
        >
          <li>Home</li>
        </Link>

        <Link
          style={{ textDecoration: "none" }}
          onClick={navActive}
          to="/dashboard"
        >
          <li>Dashboard</li>
        </Link>

        <Link
          style={{ textDecoration: "none" }}
          onClick={navActive}
          to="/posts"
        >
          <li>Posts</li>
        </Link>

        <li onClick={props.logout}>
          <a style={{ textDecoration: "none", color: "white" }} href="/">
            Logout
          </a>
        </li>
      </ul>
    );
  };

  const guestLinks = () => {
    return (
      <ul
        className="Navlinks"
        style={props.navbar ? { transform: "translate(0%)" } : {}}
      >
        <Link style={{ textDecoration: "none" }} onClick={navActive} to="/">
          <li>Home</li>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          onClick={navActive}
          to="/developers"
        >
          <li>Developers</li>
        </Link>
        <Link
          className="bn-login"
          style={{ textDecoration: "none" }}
          onClick={navActive}
          to="/login"
        >
          <li>Login</li>
        </Link>
        <Link
          className="bn-signup"
          style={{ textDecoration: "none" }}
          onClick={navActive}
          to="/register"
        >
          <li>SignUp</li>
        </Link>
      </ul>
    );
  };
  return (
    <Fragment>
      <div className="Header">
        <div className="Logo">
          <img src="/logo.png" width="80" height="80" />

          <h1>DevConnector</h1>
        </div>

        <div className="Navbar">
          <nav>
            {props.isAuthenticated ? authLinks() : guestLinks()}
            <div className="burger" onClick={navActive}>
              <div className="b"></div>
              <div className="b"></div>
              <div className="b"></div>
            </div>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    navbar: state.navbar.active,
    isAuthenticated: state.Register.isAuthenticated,
    loading: state.Register.isAuthenticated,
  };
};

const mapDispatchToProps = {
  activeNavbar,
  removeNavbar,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
