import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../../actions/posts";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CreatePost = (props) => {
  const [formdata, setFormdata] = useState({
    title: "",
    text: "",
  });

  // const onChange = async (e) => {
  //   setFormdata({ ...formdata, [e.target.name]: e.target.value });
  // };

  const editorConfiguration = {
    toolbar: [
      "bold",
      "italic",
      "essentials",
      "alignment",
      "paragraph",
      "codeBlock",
      "table",
      "tabletoolbar",
      "image",
      "fontcolor",
      "fontfamily",
      "fontsize",
      "fontbackgroundcolor",
      "imageupload",
      "imagetoolbar",
      "heading",
      "horizontalline",
      "link",
      "List",
      "mathtype",
      "underline",
      "texttransformation",
      "exporttoword",
      "imageCaption",
      "imageStyle",
      "imageToolbar",
      "bulletedlist",
      "numberedlist",
      "PageBreak",
      "inserttable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "left",
      "right",
      "center",
      "justify",
      "tableProperties",
      "tableCellProperties",
    ],
    height: 500,
    width: "70%",
  };
  const onChangeTitle = async (e) => {
    setFormdata({ ...formdata, title: e.target.value });
  };
  // const onChangeText = async (e) => {
  //   setFormdata({ ...formdata, text: e.target.value });
  // };
  const onSubmit = async (e) => {
    e.preventDefault();
    props.createPost(formdata, props.history);
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form tile">
          <h2>Write New Post :</h2>
          <hr />
          <div className="form-field">
            <div className="set">
              <p>Title:</p>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title of the Post*"
                value={formdata.title}
                onChange={(e) => onChangeTitle(e)}
                required
              />
            </div>
          </div>
          <hr />

          <div className="form-field">
            <div className="setPost">
              <p>Post:</p>
              {/* <textarea
                  name="text"
                  id="text"
                  placeholder="Post"
                  value={formdata.text}
                  onChange={(e) => onChange(e)}
                /> */}
              <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={formdata.text}
                width={900}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormdata({ ...formdata, text: data });
                }}
              />
            </div>
          </div>
          <hr />

          <div className="form-field">
            <input
              type="submit"
              name="submit"
              id="submit"
              value="Upload Post"
            />
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
  createPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreatePost));
