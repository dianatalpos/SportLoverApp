import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfile } from "../../actions";
import { ProfileActivitiesList, ProfileDetails } from "../../components";
import AuthService from "../../../auth/services";
import { Text, View } from "react-native";

const ProfileScreen = (props) => {
    const { navigation, state, getProfile } = props;
    const { profile, isFetched } = state;

    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);


    useEffect(() => {
        loadId();
    }, []);

    const loadId = async () => {
        const authService = new AuthService();
        authService.getId().then((data) => {
            setUserId(data);
            setIsIdLoaded(true);
        });
    };

    useEffect(() => {
        console.log("Get profile from Profile screen")
        if (isIdLoaded) {
            getProfile(userId);
        }
    }, [userId, isIdLoaded]);

    const onAddFriend = () => {
        navigation.navigate("Add Friend");
    };

    const onEditProfile = () => {
        navigation.navigate("Edit Profile");
    };

    const onAvatarChange = () => { };

    const onLogout = () => {
        const auth = new AuthService();
        auth.logout();
        navigation.navigate("Login");
    };

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {isFetched ? (
                    <View>
                        <ProfileDetails
                            profile={profile}
                            onAddFriend={onAddFriend}
                            onEdit={onEditProfile}
                            onAvatar={onAvatarChange}
                            onLogout={onLogout}
                        ></ProfileDetails>
                    </View>
                ) : (
                    <Text>No profile</Text>
                )}
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

const mapDispatchToProps = {
    getProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
