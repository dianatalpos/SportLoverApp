import { Action } from "../../shared";
import AuthService from "../services/auth.service";
import { AuthCredentials } from "../types";
import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTER,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
} from "./types";

export const performLogin = (credentials: AuthCredentials) => (dispatch) => {
    dispatch(startLogin());
    const authService = new AuthService();
    const authCreds = new AuthCredentials();
    authCreds.email = credentials.email.toLowerCase().trim();
    authCreds.password = credentials.password;
    // navigation.navigate("Profile");
    return authService
        .login(credentials)
        .then((response: any) => {
            dispatch(successLogin(response.token));
        })
        .catch((err: Error) => dispatch(errorLogin(err.message)));
};

export const performRegister = (credentials: AuthCredentials) => (dispatch) => {
    dispatch(startRegister());
    const authService = new AuthService();
    const authCreds = new AuthCredentials();
    authCreds.email = credentials.email.toLowerCase().trim();
    authCreds.password = credentials.password;
    return authService
        .register(credentials)
        .then((response: any) => {
            dispatch(successRegister(response.token));
        })
        .catch((err: Error) => dispatch(errorRegister(err.message)));
};

const startLogin = (): Action => {
    return {
        type: LOGIN,
    };
};

const successLogin = (token: string): Action => {
    return {
        type: LOGIN_SUCCESS,
        payload: token,
    };
};

const errorLogin = (message: string): Action => {
    return {
        type: LOGIN_ERROR,
        payload: message,
    };
};

const startRegister = (): Action => {
    return {
        type: REGISTER,
    };
};

const successRegister = (token: string): Action => {
    return {
        type: REGISTER_SUCCESS,
        payload: token,
    };
};

const errorRegister = (message: string): Action => {
    return {
        type: REGISTER_ERROR,
        payload: message,
    };
};
