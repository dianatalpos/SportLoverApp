import React from "react";
import { StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ActivityItem = ({ activity, icon, isSelected, onSelect }) => {
    const viewStyle = isSelected
        ? styles.selectedBubble
        : styles.unselectedBubble;

    const iconStyle = isSelected ? Colors.greenAccent : Colors.gradientPrimary;

    const textStyle = isSelected
        ? styles.selectedTitle
        : styles.unselectedTitle;

    return (
        <TouchableOpacity onPress={() => onSelect(activity)} style={viewStyle}>
            <MaterialCommunityIcons name={icon} color={iconStyle} size={50} />
            <Text style={textStyle}>{activity}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    selectedBubble: {
        borderWidth: 1,
        borderColor: Colors.greenAccent,
        borderRadius: 20,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    unselectedBubble: {
        borderWidth: 1,
        borderColor: Colors.gradientPrimary,
        borderRadius: 20,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    selectedTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.greenAccent,
    },
    unselectedTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.gradientPrimary,
    },
});

ActivityItem.defaultProps = {
    activity: "N/A",
    icon: null,
    isSelected: false,
    onSelect: () => {},
};
export default ActivityItem;
