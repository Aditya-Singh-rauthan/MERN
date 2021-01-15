import {
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case DELETE_POST:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        post: {
          post: { ...state.post.post, likes: action.payload },
        },
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: {
          post: {
            ...state.post.post,
            comments: action.payload.comments,
          },
        },
      };
    default:
      return state;
  }
}
