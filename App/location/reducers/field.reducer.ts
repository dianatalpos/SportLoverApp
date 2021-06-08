import { Action } from "../../shared";
import {
    FIELDS_ARE_FETCHED,
    FIELDS_ARE_FETCHING,
    FIELDS_FETCH_ERROR,
    REFRESH_DATA,
    SET_LOCATION,
} from "../actions/types";

const INITIAL_STATE = {
    fields: null,
    areFetching: false,
    areFetched: false,
    hasError: false,
    errorMessage: null,
};

const FieldsReducer = (state = INITIAL_STATE, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case FIELDS_ARE_FETCHING:
            return { ...state, areFetching: true };
        case FIELDS_ARE_FETCHED:
            return {
                ...state,
                fields: payload,
                areFetching: false,
                areFetched: true,
            };
        case FIELDS_FETCH_ERROR:
            return {
                ...state,
                areFetching: false,
                areFetched: false,
                hasError: true,
                errorMessage: payload,
            };
        case REFRESH_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default FieldsReducer;
