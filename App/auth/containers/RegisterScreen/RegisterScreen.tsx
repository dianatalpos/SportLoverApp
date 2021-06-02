import React from "react";
import { RegisterForm } from "../../components";

const RegisterScreen = ({ navigation }) => {
    const onRegister = (user: any) => {};

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

export default RegisterScreen;
