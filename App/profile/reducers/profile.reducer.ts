import { Action } from "../../shared";
import {
    PROFILE_FETCH_ERROR,
    PROFILE_IS_FETCHED,
    PROFILE_IS_FETCHING,
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
                profile: payload.profile,
                isFetching: false,
                isFetched: true,
            };
        case PROFILE_FETCH_ERROR:
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

export default ProfileReducer;
