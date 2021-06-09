import { Action } from "../../shared";
import {
    FIELDS_ARE_FETCHED,
    FIELDS_ARE_FETCHING,
    FIELDS_FETCH_ERROR,
    REFRESH_DATA,
    FIELD_ADD_SUCCESS,
    FIELD_ADD_ERROR,
    FIELD_ADD,
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
        case FIELD_ADD_SUCCESS:
            return {
                ...state,
                fields: [...state.fields, payload],
                isFetching: false,
                isFetched: true,
            };

        case FIELD_ADD:
            return {
                ...state,
                isFetching: true
            }

        case FIELD_ADD_ERROR:
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

export default FieldsReducer;
