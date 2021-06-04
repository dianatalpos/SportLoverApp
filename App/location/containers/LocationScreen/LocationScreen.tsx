import { StyleProvider } from "native-base";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getLocation } from "../../actions";
import { Location } from "../../types";

const LocationScreen = ({ state, getLocation }) => {
    const { location } = state;

    const mockEvent: Location = {
        id: "1",
        name: "Baza Sportiva Gheorgheni",
        latitude: "",
        longitute: "",
        startTime: "10:00",
        endTime: "19:00",
        sports: ["Football", "Dance"],
    };

    useEffect(() => {
        const locationId = "1";
        const profileId = "12";
        getLocation(locationId, profileId);
    }, []);

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>

            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: state.event,
});

export default connect(mapStateToProps, { getLocation })(LocationScreen);
