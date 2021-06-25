import React, { useEffect } from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import { performLogin } from "../../actions";
import { connect } from "react-redux";
import { StorageKeys, StorageService } from "../../../core";
import { getProfile } from "../../../profile/actions";
import { Alert } from "react-native";

const LoginScreen = ({ navigation, state, performLogin, getProfile }) => {

    const { hasError , errorMessage} = state

    useEffect(()=>{

        if(hasError){
            Alert.alert(errorMessage);
        }

    }, [hasError])

    const onLogin = (credentials: AuthCredentials) => {
        const authCreds = new AuthCredentials();
        authCreds.email = credentials.email.toLowerCase();
        authCreds.password = credentials.password;
        performLogin(authCreds)
            .then((data) => {
                if(data){
                    navigation.navigate("Main");
            }});

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
