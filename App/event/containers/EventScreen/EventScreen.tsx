import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getEvent } from "../../actions";
import { Event } from "../../types";

const EventScreen = ({ state, getEvent }) => {
    const { event } = state;

    const mockEvent: Event = {
        sport: "Football",
        level: "Beginner",
        location: "Baza Sportiva Gheorgheni",
        locationFieldName: "Football Field 1",
        locationId: "",
        locationFieldId: "",
        dateTime: new Date(),
        duration: 60,
        createdBy: "admin",
        maxNoPlayers: 22,
        isPublic: true,
        users: ["user1", "user2"],
    };

    useEffect(() => {
        const eventId = "1";
        const profileId = "12";
        getEvent(eventId, profileId);
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

export default connect(mapStateToProps, { getEvent })(EventScreen);
