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
import DatePicker from 'react-native-datepicker'
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";

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
            .required("Email is required!")
            .email("Invalid email!")
            .label("Email"),
        lastName: Yup.string()
            .required("Email is required!")
            .email("Invalid email!")
            .label("Email"),
        birthDay: Yup.date()
            .required("Birth day is required")
            .label("Birth Day"),
        sports: Yup.string()
            .min(6, "Password is too short!")
            .required("Password is required!")
            .label("Password"),
    });
    const noImg =
        "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";

    const onAvatar = () => {
        // const options: any = {
        //     mediaType: "photo",
        //     includeBase64: false,
        //     maxHeight: 200,
        //     maxWidth: 200,
        // };
        // ImagePicker.launchImageLibrary(options, (response: any) => {
        //     console.log("Response = ", response);
        //     if (response.didCancel) {
        //         console.log("User cancelled image picker");
        //     } else if (response.error) {
        //         console.log("ImagePicker Error: ", response.error);
        //     } else if (response.customButton) {
        //         console.log(
        //             "User tapped custom button: ",
        //             response.customButton
        //         );
        //     } else {
        //         const source = { uri: response.uri };
        //         console.log("response", JSON.stringify(response));
        //         setFile({
        //             filePath: response,
        //             fileData: response.data,
        //             fileUri: response.uri,
        //         });
        //     }
        // });
    };

    const imgUri = file.fileUri || (profile ? profile.avatar : noImg);

    return (
        <SafeAreaView  style={styles.view}>
            <Text style={styles.title}>Edit profile</Text>
            <TouchableOpacity onPress={onAvatar}>
                <Image source={{ uri: imgUri }} style={styles.avatar}></Image>
            </TouchableOpacity>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    sports: [],
                    birthDay: "",
                }}
                onSubmit={() => onEdit()}
                validationSchema={schema}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <View>
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
        margin: 5,
        padding: 5,
        textAlign: "center",
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
    avatar: { width: 150, height: 150, borderRadius: 100 },
});

ProfileEditForm.defaultProps = {
    profile: null,
    onEdit: () => {},
};
export default ProfileEditForm;
