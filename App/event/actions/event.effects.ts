import { Action } from "../../shared";
import { EventService } from "../services";
import { Event } from "../types";
import {
    EVENT_FETCH_ERROR,
    EVENT_IS_FETCHED,
    EVENT_IS_FETCHING,
} from "./types";

export const getEvent = (userId: string, id: string) => (dispatch) => {
    dispatch(eventFetching());
    const eventService = new EventService();
    return eventService
        .get(userId, id)
        .then((response: any) => {
            dispatch(eventFetched(response.profile));
        })
        .catch((err: Error) => dispatch(eventFetchError(err.message)));
};

const eventFetching = (): Action => {
    return {
        type: EVENT_IS_FETCHING,
    };
};

const eventFetched = (event: Event): Action => {
    return {
        type: EVENT_IS_FETCHED,
        payload: event,
    };
};

const eventFetchError = (message: string): Action => {
    return {
        type: EVENT_FETCH_ERROR,
        payload: message,
    };
};
