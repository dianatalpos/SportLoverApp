import bkgImage from "../../../assets/images/sport_lover_image.png";
import { ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { LoginForm } from "../../components";
import { AuthCredentials } from "../../types";
import AuthService from "../../services/auth.service";

const LoginScreen = ({ navigation }) => {
    const onLogin = (credentials: AuthCredentials) => {
        console.log(credentials, "credentials");
        const authService = new AuthService();
        authService.login(credentials);
    };

    const toRegister = () => {
        navigation.navigate("Register");
    };

    return (
        <ImageBackground source={bkgImage} style={styles.bkgImage}>
            <LoginForm onLogin={onLogin} toRegister={toRegister}></LoginForm>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bkgImage: {
        width: "100%",
        height: "100%",
    },
});

export default LoginScreen;
