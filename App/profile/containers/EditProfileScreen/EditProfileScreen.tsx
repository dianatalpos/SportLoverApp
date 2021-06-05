import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfile, editProfile } from "../../actions";
import { ProfileEditForm } from "../../components";
import { Profile } from "../../types";

const EditProfileScreen = ({ state, getProfile, editProfile }) => {
    const { profile } = state;

    useEffect(() => {
        const profileId = "12";
        getProfile(profileId);
    }, []);

    const onEdit = (profile: Profile) => {
        console.log(profile, "PROFILE");
        editProfile(profile);
    };

    return (
        <SafeAreaView style={{ alignItems: "center",  backgroundColor:"#fff" }}>
            <ProfileEditForm
                profile={profile}
                onEdit={onEdit}
            ></ProfileEditForm>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

const mapDispatchToProps = {
    getProfile,
    editProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
