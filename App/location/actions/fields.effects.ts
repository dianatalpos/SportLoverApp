import { Action } from "../../shared";
import { LocationService } from "../services";
import { Field, Location } from "../types";
import {
    FIELDS_FETCH_ERROR,
    FIELDS_ARE_FETCHING,
    FIELDS_ARE_FETCHED,
    FIELD_ADD,
    FIELD_ADD_ERROR,
    FIELD_ADD_SUCCESS,
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

export const addField = (locationId: string, field: Field) => (dispatch) => {
    dispatch(startAddFiels());
    console.log("In add Field Action", locationId, field)
    const locationService = new LocationService();
    return locationService
        .addField(locationId, field)
        .then((response) => {
            console.log(response, "After getting response from be")

            dispatch(successAddField(response));
        })
        .catch((err: Error) => dispatch(errorAddField(err.message)));
}

const startAddFiels = (): Action => {
    return {
        type: FIELD_ADD,
    };
};

const successAddField= (field: Field): Action => {
    return {
        type: FIELD_ADD_SUCCESS,
        payload: field,
    };
};

const errorAddField = (message: string): Action => {
    return {
        type: FIELD_ADD_ERROR,
        payload: message,
    };
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

const refreshData = (): Action => {
    return {
        type: REFRESH_DATA,
    }
}