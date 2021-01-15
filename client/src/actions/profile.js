import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";

//get the current user's profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

//get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

//get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

// create or update the profile

export const createProfile = (formdata, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formdata, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

//Add experience

export const addExperience = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formdata, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

//Add education

export const addEducation = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formdata, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

//delete experience

export const deleteExperience = (exp_id, history) => async (dispatch) => {
  if (window.confirm("Are You Sure?")) {
    try {
      const res = await axios.delete(`api/profile/experience/${exp_id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, "danger"));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.data },
      });
    }
  }
};

//delete education

export const deleteEducation = (edu_id, history) => async (dispatch) => {
  if (window.confirm("Are You Sure")) {
    try {
      const res = await axios.delete(`api/profile/education/${edu_id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, "danger"));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.data },
      });
    }
  }
};

//delete profile and account
export const deleteProfile = () => async (dispatch) => {
  if (window.confirm("Are You sure? This can' be undone")) {
    try {
      const res = await axios.delete(`api/profile/`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_PROFILE,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, "danger"));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.data },
      });
    }
  }
};
