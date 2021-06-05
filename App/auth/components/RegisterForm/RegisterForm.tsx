import { Formik } from "formik";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";
import { CheckBox } from "react-native-elements";
import { Colors } from "../../../theme/colors";
import { StyleSheet, Text, View } from "react-native";

const RegisterForm = ({ onRegister, redirectTo }) => {
    const [isOwner, setIsOwner] = useState(false);
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

    const initialValues = { email: "", password: "" };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    onRegister({ ...values, isOwner });
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

                        <View style={styles.checkbox}>
                            <CheckBox
                                center
                                checkedColor={Colors.gradientPrimary}
                                title="Do you want to promote your location ?"
                                checked={isOwner}
                                containerStyle={{
                                    backgroundColor: "#fff",
                                    borderWidth: 0,
                                }}
                                onPress={() => setIsOwner(!isOwner)}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={styles.button}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <Text>
                Do you have already an account?
                <Text style={styles.link} onPress={redirectTo}>
                    Sign In
                </Text>
            </Text>
        </View>
    );
};

RegisterForm.defaultProps = {
    onRegister: () => {},
    redirectTo: () => {},
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        paddingTop: 250,
    },
    checkbox: {
        marginTop: 30,
        flexDirection: "row",
        width: 250,
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
    },
});

export default RegisterForm;
