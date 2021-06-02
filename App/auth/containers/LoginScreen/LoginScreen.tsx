import React from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import AuthService from "../../services/auth.service";

const LoginScreen = ({ navigation }) => {
    const onLogin = (credentials: AuthCredentials) => {
        const authService = new AuthService();
        const authCreds = new AuthCredentials();
        authCreds.email = credentials.email.toLowerCase().trim();
        authCreds.password = credentials.password;
        authService
            .login(credentials)
            .then((response) => {
                console.log(response, "succ");
            })
            .catch((err: Error) => console.log(err.message, "err"));
    };

    const redirectTo = () => {
        navigation.navigate("Register");
    };

    return <LoginForm onLogin={onLogin} redirectTo={redirectTo}></LoginForm>;
};

export default LoginScreen;
