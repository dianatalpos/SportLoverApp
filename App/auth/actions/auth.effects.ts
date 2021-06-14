import { StorageKeys, StorageService } from "../../core";
import { Action } from "../../shared";
import AuthService from "../services";
import { AuthCredentials } from "../types";
import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./types";

export const performLogin = (credentials: AuthCredentials) => (dispatch) => {
  dispatch(startLogin());
  const authService = new AuthService();
  const authCreds = new AuthCredentials();
  authCreds.email = credentials.email.toLowerCase().trim();
  authCreds.password = credentials.password;
  return authService
    .login(credentials)
    .then((response: any) => {
      console.log(response, "LOGIN RESPONSE");
      dispatch(successLogin(response.token, response.role, response.id));
      return response;
    })
    .catch((err) => {
      console.log("Caught an error", err)

      dispatch(errorLogin(err));
    });
};

export const performRegister = (credentials: AuthCredentials) => (dispatch) => {
  dispatch(startRegister());
  const authService = new AuthService();
  const authCreds = new AuthCredentials();
  authCreds.email = credentials.email.toLowerCase().trim();
  authCreds.password = credentials.password;
  authCreds.isOwner = credentials.isOwner;
  return authService
    .register(credentials)
    .then((response: any) => {
      dispatch(successRegister(response.token, response.role, response.id));
      return response;
    })
    .catch((err: Error) => {
      dispatch(errorRegister(err.message))
      console.log("Caught an error", err)
    });
};

export const performLogout = () => (dispatch) => {
  dispatch(logout());
  const authService = new AuthService();
  authService.logout();
};

const logout = (): Action => {
  return {
    type: LOGOUT,
  };
};

const startLogin = (): Action => {
  return {
    type: LOGIN,
  };
};

const successLogin = (token: string, role: string, id: string): Action => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      role,
      id,
    },
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

const successRegister = (token: string, role: string, id: string): Action => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      token,
      role,
      id,
    },
  };
};

const errorRegister = (message: string): Action => {
  return {
    type: REGISTER_ERROR,
    payload: message,
  };
};
