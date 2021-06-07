import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../theme/colors";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location } from "../../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment"
import { ActivityType, activityIcons, activityTypes, ActivityItem } from "../../../event";

type LocationItemProps = {
    location: Location;
    onPress: any;
};

const LocationItem = ({ location, onPress }: LocationItemProps) => {
    const getIconByType = (type: ActivityType): string => {
        return activityIcons[type];
    };
    
    const activities = location.sports.map((activity) => activity as ActivityType).map((activity) => (
        <ActivityItem
            key={activity}
            activity={activity}
            isSelected={false}
            onSelect={() => {}}
            icon={getIconByType(activity)}
        />
    ));
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <MapView
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                style={styles.map}
            >

                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    title={location.name}
                />
            </MapView>

            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Text style={styles.primaryText}>{location.name}</Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>{`Start time: ${location.startTime}`}</Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>{`End time: ${location.endTime}`}</Text>
                </View>
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
    onPress: () => {}
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
        fontSize: 15,
        fontWeight: '700',
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20,
    },
});

export default LocationItem;
