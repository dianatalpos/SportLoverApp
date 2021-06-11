import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileAddFriendForm } from "../../components";
import { ProfileService } from "../../services";
import { Profile } from "../../types";
import { FriendService } from "../../../friends"
import { connect } from "react-redux";


const ProfileAddFriendScreen = (props) => {

    const { navigation, state } = props;
    const { profile } = state

    const profileService = new ProfileService();
    const friendService = new FriendService();
    const [profileSearched, setProfileSearched] = useState(null);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const onAdd = (profileRequest) => {
        const friend = {
            id: profileRequest.id,
            firstName: profileRequest.firstName,
            lastName: profileRequest.lastName,
            image: profileRequest.image,
        }

        friendService.sendFriendRequest(profile.id, friend)
            .then((response) => {
                navigation.goBack();
            });
    };

    const onSearch = (email: string) => {
        setShouldSearch(true);
        setIsSearching(true);

        const formattedEmail = email.toLowerCase();
        profileService
            .searchProfile(formattedEmail)
            .then((profile: Profile) => {
                // const mockProfile: Profile = {
                //     activities: ["Basket"],
                //     image: "https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg",
                //     birthday: new Date("2000-01-01"),
                //     shortDescription: "aaaaaaaaaa aaaaa aaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaa",
                //     firstName: "Marus",
                //     id: 'sss',
                //     lastName: "Martus"
                // }
                setProfileSearched(profile)
                // if (profile) {
                //     setProfile(profile);
                //     console.log(profile, "PROFILE");
                // }
                setIsSearching(false);
            })
            .catch((err: Error) => {
                setIsSearching(false);
                console.log(err, "ERROR");
            });
    };

    return (
        <SafeAreaView style={styles.view}>
            <ProfileAddFriendForm
                shouldSearch={shouldSearch}
                searching={isSearching}
                profile={profileSearched}
                onSearch={onSearch}
                onAdd={onAdd}
            ></ProfileAddFriendForm>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: { alignItems: "center", backgroundColor: "#fff", height: "100%" },
});


const mapStateToProps = (state) => ({
    state: state.profile,
});

export default connect(mapStateToProps, null)(ProfileAddFriendScreen);
