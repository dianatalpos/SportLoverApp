import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../../theme/colors";

type ProfileActivityItemProps = {
    activity: string;
};

const ProfileActivityItem = ({ activity }: ProfileActivityItemProps) => {
    return (
        <LinearGradient
            style={styles.bubble}
            colors={[Colors.gradientPrimary, Colors.gradientSecondary]}
        >
            <Text style={styles.text}>{activity}</Text>
        </LinearGradient>
    );
};

ProfileActivityItem.defaultProps = {
    activity: "N/A",
};

const styles = StyleSheet.create({
    bubble: {
        margin: 5,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
    },
});

export default ProfileActivityItem;
