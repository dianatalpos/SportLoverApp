import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";
import moment from "moment";

const ProfilePersonalDetails = (props) => {
    const { profile, onAvatar } = props;

    const yearsDisplay = moment().diff(profile.birthday, "years");
    const noImg =
        "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";
    return (
        <View style={styles.detailsView}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={onAvatar}>
                    <Image
                        source={{ uri: profile ? profile.image : noImg }}
                        style={styles.avatar}
                    ></Image>
                </TouchableOpacity>
                <Text style={styles.profileName}>
                    {profile
                        ? `${profile.firstName} ${profile.lastName}`
                        : "N/A"}
                </Text>
                <Text>{`${yearsDisplay} yrs`}</Text>
                <Text> {`${profile.shortDescription}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: { width: 150, height: 150, borderRadius: 100 },
    detailsView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    profileContainer: {
        alignItems: "center",
    },

    detailContainer: {
        alignItems: "center",
    },
    detail: {
        fontSize: 16,
    },
    detailValue: {
        color: Colors.gradientPrimary,
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    profileName: {
        fontSize: 26,
        fontStyle: "italic",
        fontWeight: "bold",
        margin: 10,
    },
});

ProfilePersonalDetails.defaultProps = {
    profile: null,
    onAvatar: () => {},
};

export default ProfilePersonalDetails;
