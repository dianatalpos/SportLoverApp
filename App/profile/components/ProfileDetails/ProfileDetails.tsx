import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Profile } from "../../types";

type ProfileType = {
    profile: Profile;
};
const ProfileDetails = ({ profile }: ProfileType) => {
    const mockProfile: Profile = {
        avatar: "url",
        birthDay: new Date("2000-10-10"),
        firstName: "Marrus",
        lastName: "Lst",
        sports: ["Basket", "Polo"],
        id: "asddd",
    };
    return (
        <View style={styles.view}>
            <Text key={mockProfile.lastName}>{mockProfile.firstName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        // height: "100%",
        // width: "100%",
        alignItems: "center",
    },
});

ProfileDetails.defaultProps = {
    profile: {},
};

export default ProfileDetails;
