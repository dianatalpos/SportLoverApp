import React from "react";
import { RegisterForm } from "../../components";
import { connect } from "react-redux";
import { performRegister } from "../../actions";

const RegisterScreen = ({ navigation, state, performRegister }) => {
    const onRegister = (user: any) => {
        performRegister(user);
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
