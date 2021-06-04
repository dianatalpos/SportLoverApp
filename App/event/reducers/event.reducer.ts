import { Action } from "../../shared";
import {
    EVENT_FETCH_ERROR,
    EVENT_IS_FETCHED,
    EVENT_IS_FETCHING,
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
        case EVENT_IS_FETCHING:
            return { ...state, isFetching: true };
        case EVENT_IS_FETCHED:
            return {
                ...state,
                profile: payload.profile,
                isFetching: false,
                isFetched: true,
            };
        case EVENT_FETCH_ERROR:
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
