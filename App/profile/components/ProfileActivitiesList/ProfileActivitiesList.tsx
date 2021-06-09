import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfileActivityItem from "../ProfileActivityItem";

type ProfileActivitiesListProps = {
    activities: string[];
};

const ProfileActivitiesList = ({ activities }: ProfileActivitiesListProps) => {

    const activitiesComponents = activities.map((activity) => (
        <ProfileActivityItem
            key={activity}
            activity={activity}
        ></ProfileActivityItem>
    ));
    return activities.length > 0 ? (
        <View style={styles.activities}>{activitiesComponents}</View>
    ) : (
        <Text>No activities.</Text>
    );
};

const styles = StyleSheet.create({
    activities: {
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});

ProfileActivitiesList.defaultProps = {
    activities: [],
};

export default ProfileActivitiesList;
