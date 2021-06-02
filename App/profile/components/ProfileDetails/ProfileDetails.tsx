import React from "react";
import { StyleSheet, Text } from "react-native";
import { Profile } from "../../types";

const ProfileDetails = (profile: Profile) => {
    return <Text>{profile.lastName}</Text>;
};

const styles = StyleSheet.create({});

ProfileDetails.defaultProps = {
    profile: {},
};

export default ProfileDetails;
