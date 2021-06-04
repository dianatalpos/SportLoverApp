import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";
import ProfilePersonalDetails from "../ProfilePersonalDetails";

const ProfileDetails = (props) => {
    const { profile, onLogout, onEdit, onAddFriend, onAvatar } = props;
    return (
        <View style={styles.view}>
            <ProfilePersonalDetails
                profile={profile}
                onAvatar={onAvatar}
            ></ProfilePersonalDetails>
            <Text numberOfLines={3} style={styles.description}>
                {profile.description}
            </Text>
            <View>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={onAddFriend}
                >
                    <Text style={styles.addFriend}>Add Friend</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
                    <Text style={styles.addFriend}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={onLogout}>
                    <Text style={styles.addFriend}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    actionBtn: {
        marginVertical: 10,
    },
    description: {
        marginVertical: 20,
        marginHorizontal: 10,
        color: "#bbb",
        fontStyle: "italic",
        maxHeight: 100,
    },
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
        description: "",
    },
};

export default ProfileDetails;
