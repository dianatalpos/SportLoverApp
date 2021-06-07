import { Action } from "../../shared";
import { LocationService } from "../services";
import { Location } from "../types";
import {
    FIELDS_FETCH_ERROR,
    FIELDS_ARE_FETCHING,
    FIELDS_ARE_FETCHED,
} from "./types";

export const getFields = (locationId: string) => (dispatch) => {
    dispatch(fieldsFetching());
    const locationService = new LocationService();
    return locationService
        .getFields(locationId)
        .then((response: any) => {
            dispatch(fieldsFetched(response));
        })
        .catch((err: Error) => dispatch(fieldsFetchError(err.message)));
};


const fieldsFetching = (): Action => {
    return {
        type: FIELDS_ARE_FETCHING,
    };
};

const fieldsFetched = (fields: Location[]): Action => {
    return {
        type: FIELDS_ARE_FETCHED,
        payload: fields,
    };
};

const fieldsFetchError = (message: string): Action => {
    return {
        type: FIELDS_FETCH_ERROR,
        payload: message,
    };
};
