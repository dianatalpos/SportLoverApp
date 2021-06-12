import { event } from "react-native-reanimated";
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
  SET_EVENT,
  JOIN_EVENT,
  PAST_EVENTS_FETCHED,
  NEXT_EVENTS_FETCHED,
  EVENT_CREATED,
  EVENT_CREATE_ERROR,
  REFRESH_DATA,
} from "./types";

export const getEvent = (id: string) => (dispatch) => {
  dispatch(eventFetching());
  const eventService = new EventService();
  return eventService
    .get(id)
    .then((response: any) => {
      dispatch(eventFetched(response));
    })
    .catch((err: Error) => dispatch(eventFetchError(err.message)));
};

export const getEvents = (userId: string) => (dispatch) => {
  dispatch(eventsFetching());
  const eventService = new EventService();
  return eventService
    .getEvents(userId)
    .then((response: any) => {
      dispatch(eventsFetched(response));
    })
    .catch((err: Error) => {
      console.log(err, "er");

      dispatch(eventsFetchError(err.message));
    });
};

export const getNextEvents = (userId: string) => (dispatch) => {
  dispatch(eventsFetching());
  const eventService = new EventService();
  return eventService
    .getNextEvents(userId)
    .then((response: any) => {
      dispatch(nextEventsFetched(response));
    })
    .catch((err: Error) => {
      console.log(err, "er");

      dispatch(eventsFetchError(err.message));
    });
};

export const getPastEvents = (userId: string) => (dispatch) => {
  dispatch(eventsFetching());
  const eventService = new EventService();
  return eventService
    .getPastEvents(userId)
    .then((response: any) => {
      dispatch(pastEventsFetched(response));
    })
    .catch((err: Error) => {
      console.log(err, "er");

      dispatch(eventsFetchError(err.message));
    });
};

export const joinEvent = (eventId, userId) => (dispatch) => {
  dispatch(eventFetching());
  const eventService = new EventService();
  return eventService
    .joinEvent(eventId, userId)
    .then((response: any) => {
      dispatch(joinEventAction(response));
    })
    .catch((err: Error) => {
      console.log(err, "er");
      console.log(err, "Joining event")

      dispatch(eventFetchError(err.message));
    });
};

export const createEvent = (userId: string, event: Event) => (dispatch) => {
  const eventService = new EventService();
  dispatch(eventFetching());
  return eventService
    .post(userId, event)
    .then((data) => {
      console.log(data, 'NEW EVENT')
      dispatch(eventCreated(data))
    })
    .catch((err) => dispatch(eventCreateError(err.message)));
};

export const refreshEventData = () => (dispatch) => {
  dispatch(refreshData());
};

const eventCreated = (event: Event): Action => {
  return {
    type: EVENT_CREATED,
    payload: event,
  };
};

const eventCreateError = (message: string): Action => {
  return {
    type: EVENT_CREATE_ERROR,
    payload: message,
  };
};

const eventFetching = (): Action => {
  return {
    type: EVENT_IS_FETCHING,
  };
};

const refreshData = (): Action => {
  return {
    type: REFRESH_DATA,
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

export const setEvent = (event: Event): Action => {
  return {
    type: SET_EVENT,
    payload: event,
  };
};

export const joinEventAction = (event: Event): Action => {
  return {
    type: JOIN_EVENT,
    payload: event,
  };
};

const pastEventsFetched = (events: Event[]): Action => {
  return {
    type: PAST_EVENTS_FETCHED,
    payload: events,
  };
};

const nextEventsFetched = (events: Event[]): Action => {
  return {
    type: NEXT_EVENTS_FETCHED,
    payload: events,
  };
};
