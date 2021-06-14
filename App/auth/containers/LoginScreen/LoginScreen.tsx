import React from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import { performLogin } from "../../actions";
import { connect } from "react-redux";
import { StorageKeys, StorageService } from "../../../core";
import { getProfile } from "../../../profile/actions";
import { Alert } from "react-native";

const LoginScreen = ({ navigation, state, performLogin, getProfile }) => {
    const onLogin = (credentials: AuthCredentials) => {
        const authCreds = new AuthCredentials();
        authCreds.email = credentials.email.toLowerCase();
        authCreds.password = credentials.password;
        performLogin(authCreds)
            .then(async (data) => {
                const storage = new StorageService();
                await storage.setItem(StorageKeys.TOKEN, data.token);
                await storage.setItem(StorageKeys.ROLES, data.role);
                await storage.setItem(StorageKeys.ID, data.id)
                navigation.navigate("Main");
            })
            .catch((err: Error) => {
                console.log(err.message, "Login error");
                Alert.alert(err.message);
        }) ;
    };

    const redirectTo = () => {
        navigation.navigate("Register");
    };
    return <LoginForm onLogin={onLogin} redirectTo={redirectTo}></LoginForm>;
};

const mapStateToProps = (state) => ({
    state: state.auth,
});

const mapDispatchToProps = {
    performLogin,
    getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
