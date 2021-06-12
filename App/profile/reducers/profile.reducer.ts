import { LOGOUT } from "../../auth/actions/types";
import { Action } from "../../shared";
import {
    PROFILE_FETCH_ERROR,
    PROFILE_IS_FETCHED,
    PROFILE_IS_FETCHING,
    PROFILE_EDIT,
    PROFILE_EDIT_ERROR,
    PROFILE_EDIT_SUCCESS,
    REFRESH_DATA
} from "../actions/types";

const INITIAL_STATE = {
    profile: null,
    isFetching: false,
    isFetched: false,
    hasError: false,
    errorMessage: null,
};

const ProfileReducer = (state = INITIAL_STATE, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_IS_FETCHING:
            return { ...state, isFetching: true };
        case PROFILE_IS_FETCHED:
            return {
                ...state,
                profile: payload,
                isFetching: false,
                isFetched: true,
            };
        case PROFILE_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                hasError: true,
                errorMessage: payload,
            };
        case PROFILE_EDIT:
            return {
                ...state,
                isFetching: true,
                isFetched: false
            }
        case PROFILE_EDIT_SUCCESS:
            return {
                ...state,
                profile: payload,
                isFetching: false,
                isFetched: true,
            };
        case PROFILE_EDIT_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                hasError: true,
                errorMessage: payload,
            };
        case REFRESH_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default ProfileReducer;
