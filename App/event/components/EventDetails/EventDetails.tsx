import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Event } from "../../types";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from 'moment';

const EventDetails = (props) => {
    const { event } = props;
    return (
        <View style={styles.view}>


            <View>
                <Text style={styles.primaryText}>{event.sport} Event - {event.level}</Text>
                <Text numberOfLines={1} style={styles.primaryText}>{event.location}</Text>
                <Text numberOfLines={1} style={styles.primaryText}>{event.location}</Text>
                <Text numberOfLines={1} style={styles.primaryText}>{Moment(event.dateTime).format('d MMM hh:ss')}</Text>
                <Text></Text>
            </View>

            <View style={styles.content}>
                <View >
                    <Text style={styles.primaryText}>{event.sport} Event - {event.level}</Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>{event.location}</Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>{Moment(event.dateTime).format('d MMM hh:ss')}</Text>
                    <Text></Text>
                </View>
                <View>
                    <MaterialCommunityIcons
                        style={{ marginRight: 4 }}
                        name="human-male-male"
                        color={Colors.colorGrey}
                        size={24}
                    />
                    <Text style={styles.peopleNumber}>{event.users.length}/{event.maxNoPlayers}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: "100%",
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
        width: '100%',
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
        width: '100%',
        height: 150,
        borderColor: Colors.colorLightGrey,
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    content: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    primaryText: {
        color: Colors.colorTextBlack,
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 8,
    },
    secondaryText: {
        color: Colors.colorText,
        marginBottom: 4,
    },
    peopleNumber: {
        color: Colors.gradientSecondary,
        fontSize: 25,
        fontWeight: '700',
    }
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
