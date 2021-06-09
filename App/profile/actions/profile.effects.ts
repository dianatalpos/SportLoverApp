import { Action } from "../../shared";
import { ProfileService } from "../services";
import { Profile } from "../types";
import {
    PROFILE_EDIT,
    PROFILE_EDIT_ERROR,
    PROFILE_EDIT_SUCCESS,
    PROFILE_FETCH_ERROR,
    PROFILE_IS_FETCHED,
    PROFILE_IS_FETCHING,
    REFRESH_DATA
} from "./types";

export const getProfile = (userId: string) => (dispatch) => {
    dispatch(profileFetching());
    const profileService = new ProfileService();
    return profileService
        .get(userId)
        .then((response: any) => {
            dispatch(profileFetched(response));
        })
        .catch((err: Error) => {
            dispatch(profileFetchError(err.message))
        });
};

export const editProfile =
    (userId: string, profile: Profile) => (dispatch) => {

        dispatch(startEditProfile());
        const profileService = new ProfileService();
        return profileService
            .put(userId, profile)
            .then((response) => {

                dispatch(successEditProfile(response));
            })
            .catch((err: Error) => dispatch(errorEditProfile(err.message)));
    };

export const refreshProfileData = () => (dispatch) => {
    dispatch(refreshData());
}

const refreshData = () : Action => {
    return {
        type: REFRESH_DATA,
    }
}

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

const startEditProfile = (): Action => {
    return {
        type: PROFILE_EDIT,
    };
};

const successEditProfile = (profile: Profile): Action => {
    return {
        type: PROFILE_EDIT_SUCCESS,
        payload: profile,
    };
};

const errorEditProfile = (message: string): Action => {
    return {
        type: PROFILE_EDIT_ERROR,
        payload: message,
    };
};
