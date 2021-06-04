import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfile } from "../../actions";

const ProfileScreen = ({ state, getProfile }) => {
    const { profile } = state;

    useEffect(() => {
        const userId = "12";
        const profileId = "12";
        getProfile(userId, profileId);
    }, []);

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                <Text>Edit Profile</Text>
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

export default connect(mapStateToProps, { getProfile })(ProfileScreen);
