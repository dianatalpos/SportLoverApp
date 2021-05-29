import {LOGIN, LOGOUT} from "./constants";

const INITIAL_STATE = {
  user: null,
  token: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return { ...state, user: payload.user, token: payload.user.token };
    case LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;