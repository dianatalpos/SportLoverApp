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
} from "./types";

export const getProfile = (id: string) => (dispatch) => {
    dispatch(profileFetching());
    const profileService = new ProfileService();
    return profileService
        .get(id)
        .then((response: any) => {
            const mockProfile: Profile = {
                activities: ["Basket"],
                avatar: "https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg",
                birthDay:new Date("2000-01-01"),
                description: "aaaaaaaaaa aaaaa aaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaa",
                firstName:"Marus",
                id:'sss',
                lastName:"Martus"
            }
            // dispatch(profileFetched(response.profile));
            dispatch(profileFetched(mockProfile));
        })
        .catch((err: Error) => dispatch(profileFetchError(err.message)));
};

export const editProfile =
    (id: string, profile: Profile) => (dispatch) => {
        dispatch(startEditProfile());
        const profileService = new ProfileService();
        return profileService
            .put(id, profile)
            .then((response) => {
                dispatch(successEditProfile(response.profile));
            })
            .catch((err: Error) => dispatch(errorEditProfile(err.message)));
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
