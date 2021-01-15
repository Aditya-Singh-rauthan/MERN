import { SET_ACTIVE, REMOVE_ACTIVE } from "./types";

export const activeNavbar = () => (dispatch) => {
  dispatch({
    type: SET_ACTIVE,
  });
};

export const removeNavbar = () => (dispatch) => {
  dispatch({
    type: REMOVE_ACTIVE,
  });
};
