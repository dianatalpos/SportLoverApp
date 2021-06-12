import { Action } from "../../shared";
import { Friend } from "../types"
import {
    FRIENDS_FETCH_ERROR,
    FRIENDS_ARE_FETCHED,
    FRIENDS_ARE_FETCHING,
    REFRESH_DATA,
    ACCEPT_FRIEND_REQUEST, 
    FRIENDS_REQUESTS_ARE_FETCHED,
    FRIENDS_REQUESTS_ARE_FETCHING,
    FRIENDS_REQUESTS_ERROR
} from "../actions/types";

const INITIAL_STATE = {
    friends: null,
    friendsRequests: null,
    requestsAreFetching: false,
    requestsAreFetched: false,
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
        case FRIENDS_REQUESTS_ARE_FETCHING:
            return { ...state, requestsAreFetching: true };

        case FRIENDS_REQUESTS_ARE_FETCHED:
            return {
                ...state,
                friendsRequests: payload,
                requestsAreFetching: false,
                requestsAreFetched: true,
            };

        case FRIENDS_REQUESTS_ERROR:
            return {
                ...state,
                requestsAreFetching: false,
                requestsAreFetched: false,
                hasError: true,
                errorMessage: payload,
            };
       
        case ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                areFetched: true,
                areFetching: false,
                requestsAreFetching: false,
                requestsAreFetched: true,
                friendsRequest: state.friendsRequests.filter((friend: Friend) => friend.id != payload.id),
                friends: {
                    ...state.friends,
                    payload
                }
            }

        case REFRESH_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default FriendsReducer;
