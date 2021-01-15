import React from "react";
import { Link } from "react-router-dom";
const Comment = (props) => {
  return (
    <div className="comment">
      <Link to={`/profile/${props.comment.user}`}>
        <div style={{ width: "30px", marginRight: "1vw" }}>
          <img
            src={props.comment.avatar}
            style={{ width: "100%", borderRadius: "50%" }}
          />
        </div>
      </Link>
      <div className="commentText">
        <small>{props.comment.text}</small>
      </div>
    </div>
  );
};

export default Comment;
