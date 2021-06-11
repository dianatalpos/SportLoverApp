import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Event } from "../../types";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import ParticipantsList from "../ParticipantsList";
import { Map } from "../../../shared";

const EventDetails = (props) => {
  const { event } = props;

  const displayEventDate = moment(event.dateTime).format("LLLL");
  return (
    <View style={styles.view}>
      <Map
        markerName={event.location}
        longitude={event.locationLongitude}
        latitude={event.locationLatitude}
      />

      <View style={styles.content}>
        <View>
          <Text style={styles.titleText}>
            {event.sport} Event - {event.level}
          </Text>
          <Text numberOfLines={1} style={styles.primaryText}>
            {event.location}
          </Text>
          <Text numberOfLines={1} style={styles.primaryText}>
            {event.locationFieldName}
          </Text>
          <Text numberOfLines={1} style={styles.primaryText}>
            {displayEventDate}
          </Text>
          <Text style={styles.primaryText}>{event.duration} min</Text>
        </View>
        <View>
          <MaterialCommunityIcons
            style={{ marginRight: 4 }}
            name="human-male-male"
            color={Colors.colorGrey}
            size={24}
          />
          <Text style={styles.peopleNumber}>
            {event.participants.length}/{event.maxNoPlayers}
          </Text>
        </View>
      </View>

      <ParticipantsList
        style={styles.content}
        participants={event.participants}
      ></ParticipantsList>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: "95%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
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
  map: {
    width: "100%",
    height: 150,
    borderColor: Colors.colorLightGrey,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  content: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
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
  avatar: { width: 150, height: 150, borderRadius: 100 },
  peopleNumber: {
    color: Colors.colorGrey,
    fontSize: 25,
    fontWeight: "700",
  },
});

EventDetails.defaultProps = {
  event: {
    sport: "N/A",
    level: "N/A",
    location: "N/A",
    locationFieldName: "N/A",
    locationId: "N/A",
    locationFieldId: "N/A",
    locationLatitude: 0,
    locationLongitude: 0,
    dateTime: new Date(),
    duration: 0,
    createdBy: "N/A",
    maxNoPlayers: 22,
    isPublic: true,
    users: [],
  } as Event,
};

export default EventDetails;
