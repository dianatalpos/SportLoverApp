import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Location } from "../../types";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import FieldDetails from "../FieldsDetails";
import { Map } from "../../../shared";

const LocationDetails = (props) => {
  const { location, fields, onEditLocation, onDeleteLocation, onClickFields } =
    props;

  const renderListItem = (flatListProp) => {
    const { item } = flatListProp;
    return <FieldDetails field={item} />;
  };

  return (
    <View style={styles.view}>
      <Map
        markerName={location.name}
        longitude={location.longitude}
        latitude={location.latitude}
      />

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.primaryText}>{location.name}</Text>
          <Text
            style={styles.secondaryText}
          >{`Start time: ${location.startTime}`}</Text>
          <Text
            style={styles.secondaryText}
          >{`End time: ${location.endTime}`}</Text>
        </View>
      </View>

      <FlatList
        data={fields}
        renderItem={renderListItem}
        keyExtractor={(field) => field.id}
        style={styles.listStyle}
      />

      <View>
        <TouchableOpacity style={styles.actionBtn} onPress={onEditLocation}>
          <Text style={styles.addFriend}>Edit Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onClickFields}>
          <Text style={styles.addFriend}>Add Fields</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: "90%",
    padding: 12,
  },
  view: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: Colors.colorWhite,
  },
  actionBtn: {
    marginVertical: 10,
  },
  addFriend: {
    backgroundColor: Colors.colorTextBlack,
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  container: {
    width: "100%",
    marginBottom: 25,
    borderRadius: 5,
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
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  leftContent: {
    maxWidth: "80%",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryText: {
    color: Colors.colorTextBlack,
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  titleText: {
    color: Colors.colorTextBlack,
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 8,
  },
  secondaryText: {
    color: Colors.colorText,
    marginBottom: 4,
  },
  avatar: { width: 150, height: 150, borderRadius: 100 },
  peopleNumber: {
    color: Colors.colorGrey,
    fontSize: 25,
    fontWeight: "700",
  },
});

LocationDetails.defaultProps = {
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

export default LocationDetails;
