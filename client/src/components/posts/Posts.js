import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/posts";
import PostItem from "./PostItem";
import Spinner from "../layout/spinner";
import { Link, Redirect } from "react-router-dom";
const Posts = (props) => {
  useEffect(() => {
    props.getPosts();
  }, []);

  return (
    <Fragment>
      <div className="tile sidebar">
        <Link to="/create-post">
          <button
            style={{
              width: "100%",
              backgroundColor: "dodgerblue",
              color: "white",
              padding: "2vh",
              border: "none",
              borderRadius: "5px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            Create A Post
          </button>
        </Link>
        <div className="analysis">
          <h2>Most Visited Posts:</h2>
          <br />{" "}
          {props.posts.posts.length === 0 || props.posts.loading ? (
            <Spinner />
          ) : (
            props.posts.posts.posts.slice(0, 5).map((post) => {
              return (
                <Link
                  to={`/posts/${post._id}`}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <div
                    style={{
                      width: "100%",
                      padding: "1vh",
                      border: "1px solid rgb(214, 214, 214)",
                      marginBottom: "1vh",
                      borderRadius: "5px",
                    }}
                  >
                    <h4>{post.title}</h4>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <div className="main">
        {props.posts.posts.length === 0 || props.posts.loading ? (
          <Spinner />
        ) : (
          props.posts.posts.posts.map((post) => <PostItem post={post} />)
        )}
      </div>
      <br />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { getPosts })(Posts);
