import { Action } from "../../shared";
import {
    REFRESH_DATA,
    FRIENDS_ARE_FETCHED,
    FRIENDS_ARE_FETCHING,
    FRIENDS_FETCH_ERROR,
    FRIENDS_REQUESTS_ARE_FETCHED,
    FRIENDS_REQUESTS_ARE_FETCHING,
    FRIENDS_REQUESTS_ERROR,
    ACCEPT_FRIEND_REQUEST,
    DECLINE_FRIEND_REQUEST,
} from "./types";
import FriendsService from "../services"
import { Friend } from "../types";



export const getFriends = (userId: string) => (dispatch) => {
    console.log("Start getting Friends")
    dispatch(friendsFetching());
    const friendsService = new FriendsService();
    return friendsService
        .get(userId)
        .then((response: any) => {
            dispatch(friendsFetched(response));
        })
        .catch((err: Error) => {
            console.log("errooor", err)
            dispatch(friendsFetchError(err.message))
        });
};

export const getFriendsRequests = (userId: string) => (dispatch) => {
    console.log("Start getting Friends requests")
    dispatch(friendsRequestsFetching());
    const friendsService = new FriendsService();
    return friendsService
        .getFriendsRequests(userId)
        .then((response: any) => {
            dispatch(friendsRequestsFetched(response));
        })
        .catch((err: Error) => {
            console.log("errooor", err)
            dispatch(friendsRequestsFetchError(err.message))
        });
};

export const acceptFriendRequest = (userId: string, friend: Friend) => (dispatch)=>{
    console.log("Accept friend request", friend)
    dispatch(friendsFetching());
    const friendsService = new FriendsService();
    return friendsService
        .acceptFriendRequest(userId, friend)
        .then((response: any) => {
            console.log("Getting response from be")
            console.log(response)
            dispatch(acceptFriendRequestAction(response));
        })
        .catch((err: Error) => {
            console.log("errooor", err)
            dispatch(friendsFetchError(err.message))
        });
}

export const declineFriendRequest = (userId: string, friend: Friend) => (dispatch) => {
    console.log("Decline friend request", friend)
    dispatch(friendsFetching());
    const friendsService = new FriendsService();
    return friendsService
        .declineFriendRequest(userId, friend)
        .then((response: any) => {
            console.log("Getting response from be")
            console.log(response)
            dispatch(declineFriendRequestAction(response));
        })
        .catch((err: Error) => {
            console.log("errooor", err)
            dispatch(friendsFetchError(err.message))
        });
}

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



const friendsFetching = (): Action => {
    return {
        type: FRIENDS_ARE_FETCHING,
    };
};

const friendsRequestsFetching = (): Action => {
    return {
        type: FRIENDS_REQUESTS_ARE_FETCHING,
    };
};


const friendsFetched = (friends: Friend[]): Action => {
    return {
        type: FRIENDS_ARE_FETCHED,
        payload: friends,
    };
};

const friendsRequestsFetched = (friends: Friend[]): Action => {
    return {
        type: FRIENDS_REQUESTS_ARE_FETCHED,
        payload: friends,
    };
};


const friendsFetchError = (message: string): Action => {
    return {
        type: FRIENDS_FETCH_ERROR,
        payload: message,
    };
};

const friendsRequestsFetchError = (message: string): Action => {
    return {
        type: FRIENDS_REQUESTS_ERROR,
        payload: message,
    };
};

const acceptFriendRequestAction = (friend: Friend): Action => {
    return {
        type: ACCEPT_FRIEND_REQUEST,
        payload: friend,
    }
}
const declineFriendRequestAction = (friend: Friend): Action => {
    return {
        type: DECLINE_FRIEND_REQUEST,
        payload: friend,
    }
}

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