import axios from "axios";
import { setAlert } from "./alert";
import { io } from 'socket.io-client'

const socket = io.connect('My-Heroku-server-address');
import {
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

export const getPostById = (postid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postid}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

export const createPost = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const res = await axios.post("/api/posts", formdata, config);

    history.push("/posts");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

export const deletePost = (postid) => async (dispatch) => {
  socket.emit('postDeleted')
  if (window.confirm("Are You Sure??")) {
    try {
      const res = await axios.delete(`/api/posts/${postid}`);

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
      dispatch(setAlert("Post Deleted", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, "danger"));
        });
      }
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.data },
      });
    }
  }
};

export const likePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "primary"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

export const unlikePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "primary"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

export const addComment = (formdata, postid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/posts/comment/${postid}`,
      formdata,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "primary"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};
