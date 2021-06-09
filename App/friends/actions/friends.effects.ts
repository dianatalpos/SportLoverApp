import { Action } from "../../shared";
import {
    REFRESH_DATA,
    FRIENDS_ARE_FETCHED,
    FRIENDS_ARE_FETCHING,
    FRIENDS_FETCH_ERROR
} from "./types";
import FriendsService from "../services"
import { Friend } from "../types";



export const getFriends = (userId: string) => (dispatch) => {
    dispatch(locationsFetching());
    const friendsService = new FriendsService();
    return friendsService
        .get(userId)
        .then((response: any) => {
            dispatch(locationsFetched(response));
        })
        .catch((err: Error) => dispatch(locationsFetchError(err.message)));
};

// export const addLocation = (userId: string, location: Location) => (dispatch) => {
//     dispatch(startAddLocation());
//     const locationService = new LocationService();
//     return locationService
//         .post(userId, location)
//         .then((response) => {

//             dispatch(successAddLocation(response));
//         })
//         .catch((err: Error) => dispatch(errorAddLocation(err.message)));
// }

// export const editLocation = (locationId: string, location: Location) => (dispatch) => {
//     dispatch(startEditLocation());
//     const locationService = new LocationService();
//     return locationService
//         .put(locationId, location)
//         .then((response) => {

//             dispatch(successEditLocation(response));
//         })
//         .catch((err: Error) => dispatch(errorEditLocation(err.message)));
// }

export const refreshFriendsData = () => (dispatch) => {
    dispatch(refreshData());
}



const locationsFetching = (): Action => {
    return {
        type: FRIENDS_ARE_FETCHING,
    };
};

const locationsFetched = (friends: Friend[]): Action => {
    return {
        type: FRIENDS_ARE_FETCHED,
        payload: friends,
    };
};

const locationsFetchError = (message: string): Action => {
    return {
        type: FRIENDS_FETCH_ERROR,
        payload: message,
    };
};

const refreshData = (): Action => {
    return {
        type: REFRESH_DATA,
    }
}

// const startAddLocation = (): Action => {
//     return {
//         type: LOCATION_ADD,
//     };
// };

// const successAddLocation = (location: Location): Action => {
//     return {
//         type: LOCATION_ADD_SUCCESS,
//         payload: location,
//     };
// };

// const errorAddLocation = (message: string): Action => {
//     return {
//         type: LOCATION_ADD_ERROR,
//         payload: message,
//     };
// };