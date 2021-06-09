import { Action } from "../../shared";
import { Friend } from "../types"
import {
    FRIENDS_FETCH_ERROR,
    FRIENDS_ARE_FETCHED,
    FRIENDS_ARE_FETCHING,
    REFRESH_DATA
} from "../actions/types";

const INITIAL_STATE = {
    friends: null,
    areFetching: false,
    areFetched: false,
    hasError: false,
    errorMessage: null,
};

const FriendsReducer = (state = INITIAL_STATE, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case FRIENDS_ARE_FETCHING:
            return { ...state, areFetching: true };
        case FRIENDS_ARE_FETCHED:
            return {
                ...state,
                friends: payload,
                areFetching: false,
                areFetched: true,
            };
        case FRIENDS_FETCH_ERROR:
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

export default FriendsReducer;
