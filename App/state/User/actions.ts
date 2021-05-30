import { LOGIN, LOGOUT } from "./constants"

export const loginAction = (user) => ({
    type: LOGIN,
    payload: { user },
});

export const logoutAction = () => ({
    type: LOGOUT,
});