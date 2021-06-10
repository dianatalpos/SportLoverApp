import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../theme/colors";


const FriendItem  = ({friend}) => {


    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Image source={{ uri: friend.image }} style={styles.avatar} />
                <Text>{`${friend.lastName} ${friend.firstName}`}</Text>
            </View>
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
});

FriendItem.defaultProps = {
    friend: null,
};

export default FriendItem;

