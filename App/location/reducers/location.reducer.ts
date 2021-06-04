import { Action } from "../../shared";
import {
    LOCATION_FETCH_ERROR,
    LOCATION_IS_FETCHED,
    LOCATION_IS_FETCHING,
} from "../actions/types";

const INITIAL_STATE = {
    profile: null,
    isFetching: false,
    isFetched: false,
    hasError: false,
    errorMessage: null,
};

const EventReducer = (state = INITIAL_STATE, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case LOCATION_IS_FETCHING:
            return { ...state, isFetching: true };
        case LOCATION_IS_FETCHED:
            return {
                ...state,
                profile: payload.profile,
                isFetching: false,
                isFetched: true,
            };
        case LOCATION_FETCH_ERROR:
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

export default EventReducer;
