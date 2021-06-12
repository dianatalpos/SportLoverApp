import { Action } from "../../shared";
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
} from "../actions/types";

const INITIAL_STATE = {
  event: null,
  events: null,
  pastEvents: null,
  nextEvents: null,
  areFetching: false,
  areFetched: false,
  hasError: false,
  errorMessage: null,
};

const EventReducer = (state = INITIAL_STATE, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case EVENT_CREATED:
      return {
        ...state,
        nextEvents: [...state.events, payload],
        areFetching: false,
        areFetched: true,
      };
    case EVENT_IS_FETCHING:
      return { ...state, areFetching: true };
    case EVENT_IS_FETCHED:
      return {
        ...state,
        event: payload,
        areFetching: false,
        areFetched: true,
      };
    case EVENTS_FETCH_ERROR:
    case EVENT_CREATE_ERROR:
    case EVENT_FETCH_ERROR:
      return {
        ...state,
        areFetching: false,
        areFetched: false,
        hasError: true,
        errorMessage: payload,
      };
    case EVENTS_ARE_FETCHING:
      return { ...state, isFetching: true };
    case EVENTS_ARE_FETCHED:
      return {
        ...state,
        events: payload,
        areFetching: false,
        areFetchedL: true,
      };
    case SET_EVENT:
      return {
        ...state,
        event: payload,
      };
    case JOIN_EVENT:
      return {
        ...state,
        areFetched: true,
        isFetching: false,
        areFetching: false,
        events: state.events.filter((event: Event) => event.id != payload.id),
        event: payload,
      };

    case NEXT_EVENTS_FETCHED:
      return {
        ...state,
        nextEvents: payload,
        areFetching: false,
        areFetchedL: true,
      };

    case PAST_EVENTS_FETCHED:
      return {
        ...state,
        pastEvents: payload,
        areFetching: false,
        areFetchedL: true,
      };
    case REFRESH_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default EventReducer;
