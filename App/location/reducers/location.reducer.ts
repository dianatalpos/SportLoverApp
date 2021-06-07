import { LOGOUT } from "../../auth/actions/types";
import { Action } from "../../shared";
import {
    LOCATIONS_FETCH_ERROR,
    LOCATIONS_ARE_FETCHED,
    LOCATIONS_ARE_FETCHING,
    SET_LOCATION,
} from "../actions/types";

const INITIAL_STATE = {
    location: null,
    locations: null,
    isFetching: false,
    isFetched: false,
    hasError: false,
    errorMessage: null,
};

const LocationReducer = (state = INITIAL_STATE, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case LOCATIONS_ARE_FETCHING:
            return { ...state, isFetching: true };
        case LOCATIONS_ARE_FETCHED:
            return {
                ...state,
                locations: payload,
                isFetching: false,
                isFetched: true,
            };
        case LOCATIONS_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                hasError: true,
                errorMessage: payload,
            };
        case SET_LOCATION:
            return {
                ...state,
                location: payload,
            }
        case LOGOUT:
            return {
                ...state,
                ...INITIAL_STATE,
            }
        default:
            return state;
    }
};

export default LocationReducer;
