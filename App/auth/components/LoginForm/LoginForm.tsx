import React from "react";
import { Colors } from "../../../theme/colors";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ onLogin, redirectTo }: any) => {
    const schema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required!")
            .email("Invalid email!")
            .label("Email"),
        password: Yup.string()
            .min(6, "Password is too short!")
            .required("Password is required!")
            .label("Password"),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign In</Text>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    onLogin(values);
                }}
                validationSchema={schema}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={values.email}
                            keyboardType={"email-address"}
                            onChangeText={handleChange("email")}
                        />
                        {errors.email && touched.email ? (
                            <Text style={styles.error}>{errors.email}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={values.password}
                            secureTextEntry={true}
                            onChangeText={handleChange("password")}
                        />
                        {errors.password && touched.password ? (
                            <Text style={styles.error}>{errors.password}</Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonLabel}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <Text>
                Don't have an account?{" "}
                <Text style={styles.link} onPress={redirectTo}>
                    Sign up
                </Text>
            </Text>
        </View>
    );
};

LoginForm.defaultProps = {
    onLogin: () => {},
    redirectTo: () => {},
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        paddingTop: 250,
        backgroundColor: "#fff",
    },
    form: {
        alignItems: "center",
    },
    text: {
        fontSize: 40,
        fontWeight: "700",
        textAlign: "center",
        top: -60,
        left: 0,
        bottom: 0,
    },
    error: {
        color: Colors.error,
        marginLeft: 20,
    },
    input: {
        width: 250,
        height: 40,
        margin: 5,
        padding: 5,
        textAlign: "center",
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 50,
    },
    forgetPassword: {
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
    link: {
        marginTop: 40,
        color: Colors.colorText,
        fontSize: 17,
    },
    button: {
        fontWeight: "bold",
        backgroundColor: Colors.colorTextBlack,
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 40,
        margin: 30,
        borderRadius: 30,
    },
    buttonLabel: {
        color: "#fff",
    },
});

export default LoginForm;
