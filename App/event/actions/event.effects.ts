import { Action } from "../../shared";
import { EventService } from "../services";
import { Event } from "../types";
import {
    EVENT_FETCH_ERROR,
    EVENT_IS_FETCHED,
    EVENT_IS_FETCHING,
    EVENTS_FETCH_ERROR,
    EVENTS_ARE_FETCHED,
    EVENTS_ARE_FETCHING,
} from "./types";

export const getEvent = (id: string) => (dispatch) => {
    dispatch(eventFetching());
    const eventService = new EventService();
    return eventService
        .get(id)
        .then((response: any) => {
            dispatch(eventFetched(response.profile));
        })
        .catch((err: Error) => dispatch(eventFetchError(err.message)));
};


export const getEvents = () => (dispatch) => {
    dispatch(eventsFetching());
    const eventService = new EventService();
    return eventService
        .get()
        .then((response: any) => {
            console.log(response, 'BBBB')
            dispatch(eventsFetched(response));
        })
        .catch((err: Error) => {
            console.log(err, 'er');

            dispatch(eventsFetchError(err.message))
        });
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

const eventsFetched = (events: Event[]): Action => {
    return {
        type: EVENTS_ARE_FETCHED,
        payload: events,
    };
};

const eventsFetchError = (message: string): Action => {
    return {
        type: EVENTS_FETCH_ERROR,
        payload: message,
    };
};


const eventsFetching = (): Action => {
    return {
        type: EVENTS_ARE_FETCHING,
    };
};