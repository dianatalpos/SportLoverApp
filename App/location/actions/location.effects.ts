import { Action } from "../../shared";
import { LocationService } from "../services";
import { Location } from "../types";
import {
    LOCATIONS_FETCH_ERROR,
    LOCATIONS_ARE_FETCHED,
    LOCATIONS_ARE_FETCHING,
    SET_LOCATION,
    REFRESH_DATA,
    LOCATION_ADD,
    LOCATION_ADD_ERROR,
    LOCATION_ADD_SUCCESS,
} from "./types";

// export const getLocation = (locationId: string, id: string) => (dispatch) => {
//     dispatch(locationFetching());
//     const locationService = new LocationService();
//     return locationService
//         .get(id)
//         .then((response: any) => {
//             const mockLocation: Location = {
//                 id: "1",
//                 name: "Baza Sportiva Gheorgheni",
//                 latitude: 0,
//                 longitude: 0,
//                 startTime: "10:00",
//                 endTime: "19:00",
//                 sports: ["Football", "Dance"],
//             };
//             dispatch(locationFetched(mockLocation));
//             // dispatch(locationFetched(response.profile));
//         })
//         .catch((err: Error) => dispatch(locationFetchError(err.message)));
// };

export const getLocations = (userId: string) => (dispatch) => {
    dispatch(locationsFetching());
    const locationService = new LocationService();
    return locationService
        .get(userId)
        .then((response: any) => {
            dispatch(locationsFetched(response));
        })
        .catch((err: Error) => dispatch(locationsFetchError(err.message)));
};

export const addLocation = (userId: string, location: Location) => (dispatch) => {
console.log("AddLocation")
    dispatch(startAddLocation());
    const locationService = new LocationService();
    return locationService
        .post(userId, location)
        .then((response) => {
            console.log(response, "After getting response from be")

            dispatch(successAddLocation(response));
        })
        .catch((err: Error) => dispatch(errorAddLocation(err.message)));
}

export const refreshLocationData = () => (dispatch) => {
    dispatch(refreshData());
}



export const setLocation = (location: Location): Action => {
    return {
        type: SET_LOCATION,
        payload: location,
    };
};

const locationsFetching = (): Action => {
    return {
        type: LOCATIONS_ARE_FETCHING,
    };
};

const locationsFetched = (locations: Location[]): Action => {
    return {
        type: LOCATIONS_ARE_FETCHED,
        payload: locations,
    };
};

const locationsFetchError = (message: string): Action => {
    return {
        type: LOCATIONS_FETCH_ERROR,
        payload: message,
    };
};

const refreshData = () : Action => {
    return {
        type: REFRESH_DATA,
    }
}

const startAddLocation = (): Action => {
    return {
        type: LOCATION_ADD,
    };
};

const successAddLocation = (location: Location): Action => {
    return {
        type: LOCATION_ADD_SUCCESS,
        payload: location,
    };
};

const errorAddLocation = (message: string): Action => {
    return {
        type: LOCATION_ADD_ERROR,
        payload: message,
    };
};
