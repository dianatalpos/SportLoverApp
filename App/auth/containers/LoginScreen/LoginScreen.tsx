import React from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import { performLogin } from "../../actions";
import { connect } from "react-redux";

const LoginScreen = ({ navigation, state, performLogin }) => {
    const onLogin = (credentials: AuthCredentials) => {
        performLogin(credentials);
    };

    const redirectTo = () => {
        navigation.navigate("Register");
    };

    return <LoginForm onLogin={onLogin} redirectTo={redirectTo}></LoginForm>;
};

const mapStateToProps = (state) => ({
    state: state.auth,
});

export default connect(mapStateToProps, { performLogin })(LoginScreen);
