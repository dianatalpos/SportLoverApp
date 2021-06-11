import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";

const EventLocationItem = ({ isSelected, location, onSelect }) => {
    const { image, title, location: place } = location;
    const containerStyle = isSelected
        ? styles.selectedItem
        : styles.unselectedItem;

    return (
        <TouchableOpacity style={containerStyle} onPress={() => onSelect(location)}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.details}>
                <Text style={styles.locationName}>{title}</Text>
                <Text style={styles.address}>{place}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    address: {
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
    image: { width: 70, height: 70, backgroundColor: "#000" },
});

EventLocationItem.defaultProps = {
    isSelected: false,
    id: "N/A",
    title: "N/A",
    location: "N/A",
    image: "N/A",
    onPress: () => {},
};

export default EventLocationItem;
