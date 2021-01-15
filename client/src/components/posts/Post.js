import React, { Fragment, useEffect, useState } from "react";
import { getPostById, likePost, unlikePost } from "../../actions/posts";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import parse from "html-react-parser";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/comment";
const Post = (props) => {
  const postid = props.match.params.id;
  useEffect(() => props.getPostById(postid), []);

  return (
    <Fragment>
      {props.posts.post === null || props.posts.loading === true ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="main">
            <div className="post">
              <div className="postDate">
                <p>{props.posts.post.post.date.slice(0, 10)}</p>
              </div>
              <div className="postHead">
                {props.posts.post.post.title ? (
                  <h2>{props.posts.post.post.title}</h2>
                ) : (
                  <h2>Untitled Post</h2>
                )}
              </div>
              <div className="postAuth">
                <small>By:{props.posts.post.post.name}</small>
              </div>
              <hr />
              <br />
              <div className="postText">
                <p>{parse(props.posts.post.post.text)}</p>
              </div>
              <br />
              <hr />
              <br />
              <div className="like">
                <button
                  onClick={() => {
                    props.likePost(postid);
                  }}
                  style={{ backgroundColor: "dodgerblue" }}
                >
                  <i className="fa fa-thumbs-up fa-sm"></i>
                  Like {props.posts.post.post.likes.length}
                </button>
                <button
                  onClick={() => props.unlikePost(postid)}
                  style={{ backgroundColor: "red" }}
                >
                  <i className="fa fa-thumbs-down fa-sm"></i>
                  Unlike
                </button>
                <button style={{ backgroundColor: "gray" }}>
                  <i className="fa fa-share fa-sm"></i>
                  Share
                </button>
              </div>
              <br />
              <hr />
              <div className="commentSection">
                <h3>Comments:</h3>

                {props.posts.post.post.comments.map((comment) => {
                  return <Comment comment={comment} />;
                })}
              </div>
              <CommentForm postid={postid} />
            </div>
          </div>
          <br />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  getPostById,
  likePost,
  unlikePost,
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
