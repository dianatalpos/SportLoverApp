import React from "react";
import { Colors } from "../../../theme/colors";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ onLogin, toRegister }: any) => {
    const schema = Yup.object().shape({
        email: Yup.string().required().email().label("Email"),
        password: Yup.string().min(8).required().label("Password"),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => onLogin(values)}
                validationSchema={schema}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={values.password}
                            secureTextEntry={true}
                            onChangeText={handleChange("password")}
                        />
                        <Button onPress={handleSubmit} title="Login" />
                    </View>
                )}
            </Formik>
            <Text style={styles.toRegister}>
                Don't have an account?{" "}
                <Text style={styles.button} onPress={toRegister}>
                    Sign up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        paddingTop: 250,
    },
    bkgImage: {
        width: "100%",
        height: "100%",
    },
    text: {
        color: Colors.colorPrimary,
        fontSize: 40,
        fontWeight: "700",
        textAlign: "center",
        top: -60,
        left: 0,
        bottom: 0,
    },
    input: {
        width: "100%",
        height: 10,
        textAlign: "center",
        borderColor: 'red',
        borderRadius: 10
    },
    forgetPassword: {
        color: Colors.colorPrimary,
        textAlign: "left",
        alignSelf: "stretch",
        paddingLeft: 45,
        fontFamily: "Georgia",
        marginTop: 10,
    },
    background: {
        width: "100%",
        height: "100%",
    },
    toRegister: {
        marginTop: 40,
        color: Colors.colorText,
        fontSize: 17,
    },
    button: {
        fontWeight: "bold",
    },
});

export default LoginForm;
