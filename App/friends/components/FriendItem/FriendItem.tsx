import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const FriendItem = ({ friend, shouldDisplayButton, onAccept, onDecline }) => {

    const onAcceptRequest= () => {
        onAccept(friend);
    }

    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Image source={{ uri: friend.image }} style={styles.avatar} />
                <Text>{`${friend.lastName} ${friend.firstName}`}</Text>
            </View>

            {shouldDisplayButton ?
                <View style={styles.details}>
                    <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={onAcceptRequest}
                    >
                        <MaterialCommunityIcons name="check" color={Colors.colorGrey} size={16} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.declineBtn}
                        onPress={onDecline}
                    >
                        <MaterialCommunityIcons name="check" color={Colors.colorGrey} size={16} />
                    </TouchableOpacity>
                </View>
                : null
            }

        </View>
    );
}


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
    actionBtn: {

    },
    acceptBtn: {
        backgroundColor: Colors.gradientPrimary,
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    declineBtn: {
        backgroundColor: Colors.colorLightGrey,
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
    }

});

FriendItem.defaultProps = {
    friend: null,
};

export default FriendItem;

