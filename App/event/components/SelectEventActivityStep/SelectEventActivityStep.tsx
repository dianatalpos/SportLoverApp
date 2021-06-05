import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityItem } from "..";
import { ActivityType, activityTypes, activityIcons } from "../../types";

const SelectEventActivityStep = ({ selectedType, onSelect }) => {
    const getIconByType = (type: ActivityType): string => {
        return activityIcons[type];
    };
    const activities = activityTypes.map((activity) => (
        <ActivityItem
            key={activity}
            activity={activity}
            isSelected={activity === selectedType}
            onSelect={onSelect}
            icon={getIconByType(activity)}
        />
    ));
    return <View style={styles.grid}>{activities}</View>;
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20,
    },
});

SelectEventActivityStep.defaultProps = {
    onSelect: () => {},
    selectedType: ActivityType.VOLLEYBALL,
};

export default SelectEventActivityStep;
