import React from "react";
import { RegisterForm } from "../../components";
import { connect } from "react-redux";
import { performRegister } from "../../actions";
import { AuthCredentials } from "../../types";

const RegisterScreen = ({ navigation, state, performRegister }) => {
    const onRegister = (credentials: AuthCredentials) => {
        performRegister(credentials)
            .then(() => navigation.navigate("Main"))
            .catch((err: Error) => console.log(err.message, "Register error!"));
    };

    const redirectTo = () => {
        navigation.navigate("Login");
    };

    return (
        <RegisterForm
            onRegister={onRegister}
            redirectTo={redirectTo}
        ></RegisterForm>
    );
};

const mapStateToProps = (state) => ({
    state: state.auth,
});

export default connect(mapStateToProps, { performRegister })(RegisterScreen);
