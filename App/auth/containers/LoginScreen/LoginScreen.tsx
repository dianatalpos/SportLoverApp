import React from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import { performLogin } from "../../actions";
import { connect } from "react-redux";
import { StorageKeys, StorageService } from "../../../core";

const LoginScreen = ({ navigation, state, performLogin }) => {
    const onLogin = (credentials: AuthCredentials) => {
        performLogin(credentials)
            .then((data) => {
                const storage = new StorageService();
                storage.setItem(StorageKeys.TOKEN, data.token);
                storage.setItem(StorageKeys.ROLES, data.role);
                navigation.navigate("Main");
            })
            .catch((err: Error) => console.log(err.message, "Login error"));
    };

    const redirectTo = () => {
        console.log("redir");
        navigation.navigate("Register");
    };
    return <LoginForm onLogin={onLogin} redirectTo={redirectTo}></LoginForm>;
};

const mapStateToProps = (state) => ({
    state: state.auth,
    performLogin,
});

export default connect(mapStateToProps, { performLogin })(LoginScreen);
