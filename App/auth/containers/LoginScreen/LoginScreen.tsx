import React from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import { performLogin } from "../../actions";
import { KeyboardAvoidingView, Platform } from "react-native"
import { connect } from "react-redux";

const LoginScreen = ({ navigation, state, performLogin }) => {
    const onLogin = (credentials: AuthCredentials) => {
        performLogin(credentials)
            .then(() => navigation.navigate("Profile"))
            .catch((err: Error) => console.log(err.message, "Login error"));
    };

    const redirectTo = () => {
        navigation.navigate("Register");
    };

    return <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <LoginForm onLogin={onLogin} redirectTo={redirectTo}></LoginForm>
    </KeyboardAvoidingView>;
};

const mapStateToProps = (state) => ({
    state: state.auth,
});

export default connect(mapStateToProps, { performLogin })(LoginScreen);
