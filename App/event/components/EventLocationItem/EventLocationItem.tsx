import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";

const EventLocationItem = ({ isSelected, location, onSelect }) => {
  const { name, startTime, endTime } = location;
  const containerStyle = isSelected
    ? styles.selectedItem
    : styles.unselectedItem;

  return (
    <TouchableOpacity style={containerStyle} onPress={() => onSelect(location)}>
      <View style={styles.details}>
        <Text style={styles.locationName}>{name}</Text>
        <View>
          <Text style={styles.hours}>{`${startTime} - ${endTime}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hours: {
    fontSize: 12,
  },
  unselectedItem: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.colorLightGrey,
    borderRadius: 10,
    padding: 10,
  },
  selectedItem: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.greenAccent,
    borderRadius: 10,
    padding: 10,
  },
  details: {
    flexDirection: "column",
    marginHorizontal: 10,
    padding: 10,
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  title: {
    fontSize: 20,
  },
});

EventLocationItem.defaultProps = {
  isSelected: false,
  location: "N/A",
  onPress: () => {},
};

export default EventLocationItem;
