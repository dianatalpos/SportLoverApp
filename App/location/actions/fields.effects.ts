import { Action } from "../../shared";
import { LocationService } from "../services";
import { Location } from "../types";
import {
    FIELDS_FETCH_ERROR,
    FIELDS_ARE_FETCHING,
    FIELDS_ARE_FETCHED,
    REFRESH_DATA
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

export const refreshFieldsData = () => (dispatch) => {
    dispatch(refreshData());
}


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

const refreshData = (): Action => {
    return {
        type: REFRESH_DATA,
    }
}