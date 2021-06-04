import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfile, editProfile } from "../../actions";
import { ProfileEditForm } from "../../components";
import { Profile } from "../../types";

const EditProfileScreen = ({ state, getProfile, editProfile }) => {
    const { profile } = state;

    useEffect(() => {
        const userId = "12";
        const profileId = "12";
        getProfile(userId, profileId);
    }, []);

    const onEdit = (profile: Profile) => {
        editProfile(profile);
    };

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                <ProfileEditForm onEdit={onEdit}></ProfileEditForm>
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

const mapDispatchToProps = () => ({
    getProfile,
    editProfile,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
