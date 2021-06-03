import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { getProfile } from "../../actions";
import { ProfileDetails } from "../../components";

const ProfileScreen = ({ state, getProfile }) => {
    const { profile } = state;

    useEffect(() => {
        const userId = "12";
        const profileId = "12";
        getProfile(userId, profileId);
    }, []);

    return (
        <View>
            <ProfileDetails profile={profile}></ProfileDetails>
        </View>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

export default connect(mapStateToProps, { getProfile })(ProfileScreen);
