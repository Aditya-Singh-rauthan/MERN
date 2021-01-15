import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { deletePost } from "../../actions/posts";
const PostItem = (props) => {
  return (
    <Fragment>
      <div className="postTile tile">
        <Link
          to={`/profile/${props.post.user}`}
          style={{ textDecoration: "none", color: "gray" }}
        >
          <div
            style={{
              padding: "1vh",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid gray",
              marginBottom: "1vh",
            }}
          >
            <div style={{ width: "30px", marginRight: "1vw" }}>
              <img
                src={props.post.avatar}
                style={{ width: "100%", borderRadius: "50%" }}
              />
            </div>
            <small>{props.post.name}</small>
          </div>
        </Link>
        <div className="postTileHead">
          <Link
            to={`/posts/${props.post._id}`}
            style={{ textDecoration: "none" }}
          >
            <div>
              {props.post.title ? (
                <h3>{parse(props.post.title)}</h3>
              ) : (
                <h3>Untitled Post...</h3>
              )}
            </div>
          </Link>
          <small style={{ color: "gray" }}>
            {props.post.date.slice(0, 10)}
          </small>
        </div>
        <br />
        {/* <small>By: {props.post.name}</small>
        <br /> */}
        <div className="like">
          <div style={{ marginRight: "1vh", padding: "1vh" }}>
            <i className="fa fa-thumbs-up fa-sm" style={{ color: "gray" }}></i>
            {props.post.likes.length}
          </div>

          <div style={{ padding: "1vh" }}>
            <i className="fa fa-comment fa-sm" style={{ color: "gray" }}></i>
            {props.post.comments.length}
          </div>
          {props.post.user === props.user.user._id ? (
            <button
              className="btn-delete"
              onClick={() => props.deletePost(props.post._id)}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>

      <br />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.Register,
  };
};
export default connect(mapStateToProps, { deletePost })(PostItem);
