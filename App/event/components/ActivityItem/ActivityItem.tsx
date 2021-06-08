import React from "react";
import { StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ActivityItem = ({ activity, icon, isSelected, onSelect, isSmallIcons }) => {
    const viewStyle = isSelected
        ? styles.selectedBubble
        : styles.unselectedBubble;

    const iconStyle = isSelected ? Colors.greenAccent : Colors.gradientPrimary;

    const textStyle = isSelected
        ? styles.selectedTitle
        : styles.unselectedTitle;

    let iconSize = 50;

    const additionalStyle = {
        height: 100,
        width: 100,
        fontSize: 16,
    };
    if (isSmallIcons) {
        additionalStyle.width = 50;
        additionalStyle.height = 50;
        iconSize=25
    }

    return (
        <TouchableOpacity onPress={() => onSelect(activity)} style={{ ...viewStyle, ...additionalStyle }}>
            <MaterialCommunityIcons name={icon} color={iconStyle} size={iconSize} />
            { !isSmallIcons ? <Text style={{...textStyle}}>{activity}</Text> : null}
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
    onSelect: () => { },
};
export default ActivityItem;
