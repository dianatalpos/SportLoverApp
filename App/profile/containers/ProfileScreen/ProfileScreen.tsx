import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfile } from "../../actions";
import { performLogout } from "../../../auth";
import { ProfileActivitiesList, ProfileDetails } from "../../components";
import { Profile } from "../../types";

const ProfileScreen = ({ navigation, state, getProfile, performLogout }) => {
    const { profile } = state;

    const mockProfile: Profile = {
        avatar: "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720",
        birthDay: new Date("2000-10-10"),
        firstName: "Marrus",
        lastName: "Lst",
        activities: ["Basket", "Polo"],
        id: "asddd",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eum placeat corporis nam delectus quis, dicta dolor atque sequi, ipsa fuga magni eveniet reiciendis labore quas natus. Eius, assumenda quo?",
    };

    useEffect(() => {
        const userId = "12";
        const profileId = "12";
        getProfile(userId, profileId);
    }, []);

    const onAddFriend = () => {};

    const onEditProfile = () => {
        console.log("upd friend");
        console.log(navigation);
        navigation.push('EditProfile');
    };

    const onAvatarChange = () => {};

    const onLogout = () => {
        performLogout();
        console.log("logout");
        navigation.replace("Main");
    };

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                <ProfileDetails
                    profile={mockProfile}
                    onAddFriend={onAddFriend}
                    onEdit={onEditProfile}
                    onAvatar={onAvatarChange}
                    onLogout={onLogout}
                ></ProfileDetails>
                <ProfileActivitiesList
                    activities={mockProfile.activities}
                ></ProfileActivitiesList>
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

const mapDispatchToProps = () => ({
    getProfile,
    performLogout,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
