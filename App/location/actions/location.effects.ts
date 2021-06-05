import { Action } from "../../shared";
import { LocationService } from "../services";
import { Location } from "../types";
import {
    LOCATION_FETCH_ERROR,
    LOCATION_IS_FETCHED,
    LOCATION_IS_FETCHING,
} from "./types";

export const getLocation = (locationId: string, id: string) => (dispatch) => {
    dispatch(locationFetching());
    const locationService = new LocationService();
    return locationService
        .get(id)
        .then((response: any) => {
            const mockLocation: Location = {
                id: "1",
                name: "Baza Sportiva Gheorgheni",
                latitude: "",
                longitute: "",
                startTime: "10:00",
                endTime: "19:00",
                sports: ["Football", "Dance"],
            };
            dispatch(locationFetched(mockLocation));
            // dispatch(locationFetched(response.profile));
        })
        .catch((err: Error) => dispatch(locationFetchError(err.message)));
};

const locationFetching = (): Action => {
    return {
        type: LOCATION_IS_FETCHING,
    };
};

const locationFetched = (location: Location): Action => {
    return {
        type: LOCATION_IS_FETCHED,
        payload: location,
    };
};

const locationFetchError = (message: string): Action => {
    return {
        type: LOCATION_FETCH_ERROR,
        payload: message,
    };
};
