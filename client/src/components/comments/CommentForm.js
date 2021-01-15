import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/posts";
const CommentForm = (props) => {
  const [formdata, setFormdata] = useState({ text: "" });

  const onChange = (e) => {
    setFormdata({ ...formdata, text: e.target.value });
  };

  const onSubmit = () => {
    props.addComment(formdata, props.postid);
    setFormdata({ text: "" });
  };
  return (
    <Fragment>
      <div className="commentForm">
        <div className="commentBox">
          <textarea value={formdata.text} onChange={(e) => onChange(e)} />
          <input type="submit" value="Comment" onClick={() => onSubmit()} />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};
const mapDispatchToProps = {
  addComment,
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
