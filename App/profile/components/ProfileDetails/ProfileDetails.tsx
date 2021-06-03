import React from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import {
    TouchableHighlight,
    TouchableOpacity,
} from "react-native-gesture-handler";
import moment from "moment";
import { Profile } from "../../types";
import { Colors } from "../../../theme/colors";

type ProfileType = {
    profile: Profile;
};
const ProfileDetails = ({ profile }: ProfileType) => {
    const onAvatarPress = () => {
        console.log("avatar press");
    };

    const onAddFriend = () => {
        console.log("add friend");
    };

    const yearsDisplay = moment().diff(profile.birthDay, "years");
    return (
        <View style={styles.view}>
            <View style={styles.detailsView}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={onAvatarPress}>
                        <Image
                            source={{ uri: profile.avatar }}
                            style={styles.avatar}
                        ></Image>
                    </TouchableOpacity>
                    <Text
                        style={styles.profileName}
                    >{`${profile.firstName} ${profile.lastName}`}</Text>
                    <Text>{`${yearsDisplay} yrs`}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailValue}>0</Text>
                    <Text style={styles.detail}>Friends</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text onPress={onAddFriend} style={styles.addFriend}>
                    Add Friend
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    profileContainer: {
        alignItems: "center",
    },
    profileName: {
        fontSize: 26,
        fontStyle: "italic",
        fontWeight: "bold",
        margin: 10,
    },
    detailsView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
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
    avatar: { width: 150, height: 150, borderRadius: 100 },
    addFriend: {
        backgroundColor: Colors.colorTextBlack,
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
    },
});

ProfileDetails.defaultProps = {
    profile: {
        avatar: "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpghttps://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720",
        birthDay: "2020-10-10",
        firstName: "N/A",
        lastName: "N/A",
        sports: [],
        id: "asddd",
    },
};

export default ProfileDetails;
