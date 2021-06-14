import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileCard = ({ profile, onAdd }) => {
    const handleOnAdd = () => {
        console.log("Add profile in Profile card", profile)
        onAdd(profile);
    };

    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Image source={{ uri: profile.image }} style={styles.avatar} />
                <Text>{`${profile.lastName} ${profile.firstName}`}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={handleOnAdd}
                    style={styles.addFriendIcon}
                >
                    <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={Colors.gradientPrimary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconGradient: {
        borderRadius: 50,
    },
    addFriendIcon: {
        padding: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.gradientPrimary,
    },
    avatar: { width: 50, height: 50, borderRadius: 100, marginRight: 10 },
    details: {
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
    },
});

ProfileCard.defaultProps = {
    profile: null,
};

export default ProfileCard;
