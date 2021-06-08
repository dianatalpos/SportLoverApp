import { Action } from "../../shared";
import {
    LOCATIONS_FETCH_ERROR,
    LOCATIONS_ARE_FETCHED,
    LOCATIONS_ARE_FETCHING,
    SET_LOCATION,
    REFRESH_DATA,
    LOCATION_ADD_SUCCESS,
    LOCATION_ADD_ERROR,
    LOCATION_ADD,
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
            
        case REFRESH_DATA:
            return INITIAL_STATE;

        case LOCATION_ADD_SUCCESS:
            return {
                ...state,
                locations: [ ...state.locations, payload],
                isFetching: false,
                isFetched: true,
            };

        case LOCATION_ADD:
            return {
                ...state,
                isFetching: true
            }

        case LOCATION_ADD_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                hasError: true,
                errorMessage: payload,
            };
        default:
            return state;
    }
};

export default LocationReducer;
