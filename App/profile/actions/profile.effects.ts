import { Action } from "../../shared";
import { ProfileService } from "../services";
import { Profile } from "../types";
import {
    PROFILE_FETCH,
    PROFILE_FETCH_ERROR,
    PROFILE_IS_FETCHED,
    PROFILE_IS_FETCHING,
} from "./types";

export const getProfile = (id: string) => (dispatch) => {
    dispatch(profileFetching());
    const profileService = new ProfileService();
    return profileService
        .get(id)
        .then((response: any) => {
            dispatch(profileFetched(response.profile));
        })
        .catch((err: Error) => dispatch(profileFetchError(err.message)));
};

const profileFetching = (): Action => {
    return {
        type: PROFILE_IS_FETCHING,
    };
};

const profileFetched = (profile: Profile): Action => {
    return {
        type: PROFILE_IS_FETCHED,
        payload: profile,
    };
};

const profileFetchError = (message: string): Action => {
    return {
        type: PROFILE_FETCH_ERROR,
        payload: message,
    };
};
