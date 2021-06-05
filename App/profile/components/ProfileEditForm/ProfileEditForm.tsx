import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";
import { Datepicker } from "../../../shared";
import moment from "moment";
import { Profile } from "../../types";

const ProfileEditForm = ({ profile, onEdit }) => {
    const [file, setFile] = useState({
        filePath: {
            data: null,
            uri: null,
        },
        fileData: null,
        fileUri: null,
    });

    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required("First Name required!")
            .label("First Name"),
        lastName: Yup.string()
            .required("Last Name is required!")
            .label("Last Name"),
        birthDay: Yup.date()
            .required("Birth day is required")
            .label("Birth Day"),
        avatar: Yup.string().label("Avatar"),
        activities: Yup.array().label("Activities"),
    });
    const noImg =
        "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";

    const onAvatar = () => {};

    const handleSubmit = (values) => {
        const profile = new Profile();
        profile.firstName = values.firstName;
        profile.lastName = values.lastName;
        profile.birthDay = values.birthDay;
        profile.description = values.description;
        profile.avatar = values.avatar;
        profile.activities = values.activities;
        profile.description = values.description;

        onEdit(values);
    };

    const imgUri = file.fileUri || (profile ? profile.avatar : noImg);

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Edit profile</Text>
            <TouchableOpacity onPress={onAvatar}>
                <Image source={{ uri: imgUri }} style={styles.avatar}></Image>
            </TouchableOpacity>
            <Formik
                initialValues={{
                    firstName: profile?.firstName || "",
                    lastName: profile?.lastName || "",
                    activities: profile?.activities || [],
                    avatar: profile?.avatar || noImg,
                    description: profile?.description || "",
                    birthDay:
                        profile?.birthDay ||
                        moment(new Date()).format("YYYY-MM-DD"),
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={schema}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <View style={styles.form}>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                value={values.firstName}
                                onChangeText={handleChange("firstName")}
                            />
                            {errors.firstName && touched.firstName ? (
                                <Text style={styles.error}>
                                    {errors.firstName}
                                </Text>
                            ) : null}
                        </View>

                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                value={values.lastName}
                                onChangeText={handleChange("lastName")}
                            />
                            {errors.lastName && touched.lastName ? (
                                <Text style={styles.error}>
                                    {errors.lastName}
                                </Text>
                            ) : null}
                        </View>

                        <View>
                            <TextInput
                                style={styles.description}
                                multiline={true}
                                numberOfLines={5}
                                placeholder="Description"
                                value={values.description}
                                onChangeText={handleChange("description")}
                            />
                            {errors.description && touched.description ? (
                                <Text style={styles.error}>
                                    {errors.description}
                                </Text>
                            ) : null}
                        </View>

                        <View>
                            <Datepicker
                                date={values.birthDay}
                                onChange={handleChange("birthDay")}
                                placeholder={"Select birth day"}
                            />
                            {errors.birthDay && touched.birthDay ? (
                                <Text style={styles.error}>
                                    {errors.birthDay}
                                </Text>
                            ) : null}
                        </View>

                        <TouchableHighlight
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonLabel}>Update</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        margin: 30
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        color: Colors.error,
        marginLeft: 20,
    },
    input: {
        width: 250,
        height: 40,
        marginVertical: 15,
        padding: 5,
        textAlign: "center",
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 50,
    },
    description: {
        width: 250,
        margin: 5,
        padding: 10,
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 20,
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
    avatar: { width: 150, height: 150, borderRadius: 100 },
});

ProfileEditForm.defaultProps = {
    profile: null,
    onEdit: () => {},
};
export default ProfileEditForm;
