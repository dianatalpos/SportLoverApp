import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../../theme/colors";
import { Spinner } from "native-base";
import ProfileCard from "../ProfileCard";

const ProfileAddFriendForm = ({
    searching,
    shouldSearch,
    profile,
    currentId,
    onAdd,
    onSearch,
}) => {
    const schema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required!")
            .email("Invalid email!")
            .label("Email"),
    });
    const initialValues = {
        email: "",
    };

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Introduce your friend's email</Text>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => onSearch(values.email)}
                validationSchema={schema}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <View style={styles.form}>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Your friend email"
                                value={values.email}
                                keyboardType={"email-address"}
                                onChangeText={handleChange("email")}
                            />
                            {errors.email && touched.email ? (
                                <Text style={styles.error}>{errors.email}</Text>
                            ) : null}
                        </View>

                        <TouchableHighlight
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonLabel}>Find Friend</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </Formik>
            <View>
                {shouldSearch ? (
                    searching ? (
                        <Spinner color={Colors.gradientPrimary} />
                    ) : profile  && profile.id != currentId  ? (
                        <View style={styles.card}>
                            <Text style={styles.subtitle}>Profiles found</Text>
                            <ProfileCard profile={profile} onAdd={onAdd} />
                        </View>
                    ) : (
                        <Text>No profile found.</Text>
                    )
                ) : null}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        margin: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    error: {
        color: Colors.error,
        marginLeft: 20,
    },
    card: {
        width: 300,
    },
    input: {
        width: 250,
        height: 50,
        marginVertical: 15,
        padding: 15,
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 50,
    },
    button: {
        fontWeight: "bold",
        backgroundColor: Colors.colorTextBlack,
        color: "#fff",
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "center",
        marginVertical: 30,
        marginHorizontal: 50,
    },
    buttonLabel: {
        color: "#fff",
    },
});

ProfileAddFriendForm.defaultProps = {
    searching: false,
    shouldSearch: false,
    profile: {},
    onSearch: () => {},
    onAdd: () => {},
};

export default ProfileAddFriendForm;
