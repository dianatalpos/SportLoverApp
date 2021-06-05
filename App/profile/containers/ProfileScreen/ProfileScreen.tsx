import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfile } from "../../actions";
import { ProfileActivitiesList, ProfileDetails } from "../../components";
import { Profile } from "../../types";
import AuthService from "../../../auth/services";
import { Text, View } from "react-native";

const ProfileScreen = (props) => {
    const { navigation, state, getProfile, performLogout } = props;
    const { profileRed, authRed } = state;

    useEffect(() => {
        const userId = "12";
        const profileId = "12";
        getProfile(profileId);
    }, []);

    const onAddFriend = () => {};

    const onEditProfile = () => {
        navigation.navigate("EditProfile");
    };

    const onAvatarChange = () => {};

    const onLogout = () => {
        const auth = new AuthService();
        auth.logout();
        navigation.navigate("Login");
    };

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {profileRed.isFetched ? (
                    <View>
                        <ProfileDetails
                            profile={profileRed.profile}
                            onAddFriend={onAddFriend}
                            onEdit={onEditProfile}
                            onAvatar={onAvatarChange}
                            onLogout={onLogout}
                        ></ProfileDetails>
                        <ProfileActivitiesList
                            activities={profileRed.profile.activities}
                        ></ProfileActivitiesList>
                    </View>
                ) : (
                    <Text>No profile</Text>
                )}
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: {
        profileRed: state.profile,
        authRed: state.auth,
    },
});

const mapDispatchToProps = {
    getProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
