import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTER,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
    token: null,
    isFetching: false,
    isFetched: false,
    hasError: false,
    errorMessage: null,
};

const AuthReducer = (
    state = INITIAL_STATE,
    action: { type: string; payload: any }
) => {
    const { type, payload } = action;

    switch (type) {
        case REGISTER:
        case LOGIN:
            return { ...state, isFetching: true };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                token: payload.token,
                isFetching: false,
                isFetched: true,
            };
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                hasError: true,
                errorMessage: payload.message,
            };
        default:
            return state;
    }
};

export default AuthReducer;