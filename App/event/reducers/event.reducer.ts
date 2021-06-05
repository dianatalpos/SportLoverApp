import { Action } from "../../shared";
import {
    EVENT_FETCH_ERROR,
    EVENT_IS_FETCHED,
    EVENT_IS_FETCHING,
    EVENTS_FETCH_ERROR,
    EVENTS_ARE_FETCHED,
    EVENTS_ARE_FETCHING,
    SET_EVENT,
} from "../actions/types";

const INITIAL_STATE = {
    event: null,
    events: null,
    areFetching: false,
    areFetched: false,
    hasError: false,
    errorMessage: null,
};

const EventReducer = (state = INITIAL_STATE, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case EVENT_IS_FETCHING:
            return { ...state, areFetching: true };
        case EVENT_IS_FETCHED:
            return {
                ...state,
                event: payload.event,
                areFetching: false,
                areFetched: true,
            };
        case EVENT_FETCH_ERROR:
            return {
                ...state,
                areFetching: false,
                areFetched: false,
                hasError: true,
                errorMessage: payload.message,
            };
        case EVENTS_ARE_FETCHING:
            return { ...state, isFetching: true };
        case EVENTS_ARE_FETCHED:
            return {
                ...state,
                events: payload,
                areFetching: false,
                areFetchedL: true,
            };
        case EVENTS_FETCH_ERROR:
            return {
                ...state,
                areFetching: false,
                areFetched: false,
                hasError: true,
                errorMessage: payload.message,
            };
        case SET_EVENT:
            return {
                ...state,
                event: payload,
            }
        default:
            return state;
    }
};

export default EventReducer;
