import React from "react";
import { RegisterForm } from "../../components";
import { connect } from "react-redux";
import { performRegister } from "../../actions";
import { AuthCredentials } from "../../types";
import { StorageKeys, StorageService } from "../../../core";

const RegisterScreen = ({ navigation, state, performRegister }) => {
    const onRegister = (credentials: AuthCredentials) => {
        performRegister(credentials)
            .then(async (data) => {
                const storage = new StorageService();
                await storage.setItem(StorageKeys.TOKEN, data.token);
                await storage.setItem(StorageKeys.ROLES, data.role);
                await storage.setItem(StorageKeys.ID, data.id)
                navigation.navigate("CompleteProfile");
            })
            .catch((err: Error) => console.log(err.message, "Register error!"));
    };

    const redirectTo = () => {
        navigation.navigate("Main");
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
