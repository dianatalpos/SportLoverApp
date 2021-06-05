import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../theme/colors";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "../../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from 'moment';


type EventItemProps = {
    event: Event;
    onPress: any;
};

const EventItem = ({ event, onPress}: EventItemProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <MapView
                initialRegion={{
                    latitude: event.locationLatitude,
                    longitude: event.locationLongitude,
                    latitudeDelta: 0.1922,
                    longitudeDelta: 0.045,
                }}
                style={styles.map}
            >

                <Marker
                    coordinate={{
                        latitude: event.locationLatitude,
                        longitude: event.locationLongitude,
                    }}
                    title={event.location}
                />
            </MapView>

            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Text style={styles.primaryText}>{event.sport} Event - {event.level}</Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>{event.location}</Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>{Moment(event.dateTime).format('d MMM hh:ss')}</Text>
                    <Text></Text>
                </View>
                <View style={styles.rightContent}>
                    <MaterialCommunityIcons
                        style={{ marginRight: 4 }}
                        name="human-male-male"
                        color={Colors.colorGrey}
                        size={24}
                    />
                    <Text style={styles.peopleNumber}>{event.users.length}/{event.maxNoPlayers}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

EventItem.defaultProps = {
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


const styles = StyleSheet.create({
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
    leftContent: {
        maxWidth: '80%',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: Colors.colorTextBlack,
        fontSize: 25,
        fontWeight: '700',
    }
});

export default EventItem;