import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileAddFriendForm } from "../../components";
import { ProfileService } from "../../services";
import { Profile } from "../../types";

const ProfileAddFriendScreen = (props) => {
    const profileService = new ProfileService();
    const [profile, setProfile] = useState(null);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const onAdd = (profile) => {
        profileService.addFriend(profile)
        console.log(profile, "profile to add");
    };

    const onSearch = (email: string) => {
        setShouldSearch(true);
        setIsSearching(true);

        const formattedEmail = email.toLowerCase();
        profileService
            .searchProfile(formattedEmail)
            .then((profile: Profile) => {
                const mockProfile: Profile = {
                    activities: ["Basket"],
                    avatar: "https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg",
                    birthDay:new Date("2000-01-01"),
                    description: "aaaaaaaaaa aaaaa aaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaa",
                    firstName:"Marus",
                    id:'sss',
                    lastName:"Martus"
                }
                setProfile(mockProfile)
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
                profile={profile}
                onSearch={onSearch}
                onAdd={onAdd}
            ></ProfileAddFriendForm>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: { alignItems: "center", backgroundColor: "#fff", height: "100%" },
});

export default ProfileAddFriendScreen;
