import React from "react";
import { Colors } from "../../../theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location } from "../../types";
import { ActivityType, activityIcons, ActivityItem } from "../../../event";
import { Map } from "../../../shared";

type LocationItemProps = {
  location: Location;
  onPress: any;
};

const LocationItem = ({ location, onPress }: LocationItemProps) => {
  const getIconByType = (type: ActivityType): string => {
    return activityIcons[type];
  };

  const activities = location.sports
    .map((activity) => activity as ActivityType)
    .map((activity) => (
      <ActivityItem
        key={activity}
        activity={activity}
        isSelected={false}
        onSelect={() => {}}
        icon={getIconByType(activity)}
        isSmallIcons={true}
      />
    ));

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{location.name}</Text>

      <Map
        markerName={location.name}
        longitude={location.longitude}
        latitude={location.latitude}
      />

      <View style={styles.content}>
        <Text
          style={styles.secondaryText}
        >{`Start time: ${location.startTime}`}</Text>
        <Text
          style={styles.secondaryText}
        >{`End time: ${location.endTime}`}</Text>
        <View style={styles.grid}>{activities}</View>
      </View>
    </TouchableOpacity>
  );
};

LocationItem.defaultProps = {
  location: {
    userId: "N/A",
    name: "N/A",
    sports: [],
    id: "N/A",
    latitude: 0,
    longitude: 0,
    startTime: "N/A",
    endTime: "N/A",
  } as Location,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.colorLightGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 7,
    backgroundColor: Colors.colorCard,
  },
  content: {
    padding: 12,
    justifyContent: "space-between",
    width: "100%",
  },
  leftContent: {
    maxWidth: "80%",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: Colors.colorTextBlack,
    fontWeight: "600",
    fontSize: 16,
    padding: 20,
  },
  secondaryText: {
    color: Colors.colorText,
    marginBottom: 4,
  },
  peopleNumber: {
    color: Colors.colorTextBlack,
    fontSize: 15,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
  },
});

export default LocationItem;
