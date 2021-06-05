import { Button } from "native-base";
import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getEvent } from "../../actions";
import { EventDetails } from "../../components";
import { Colors } from "../../../theme/colors";

const EventScreen = (props) => {
    const { navigation, state, getEvent } = props

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
        getEvent(eventId);
    }, []);
    
    const onJoin = () => {
        console.log("Join Event pressed")
    }
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                <EventDetails 
                    event={mockEvent}
                ></EventDetails>

                <TouchableOpacity style={styles.actionBtn} onPress={onJoin}>
                    <Text style={styles.joinEvent}>Join Event</Text>
                </TouchableOpacity>
                
            </SafeAreaView>
        </ScrollView>
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
    description: {
        marginVertical: 20,
        marginHorizontal: 10,
        color: "#bbb",
        fontStyle: "italic",
        maxHeight: 100,
    },
    joinEvent: {
        backgroundColor: Colors.colorTextBlack,
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
    },
});

const mapStateToProps = (state) => ({
    state: state.event,
});

export default connect(mapStateToProps, { getEvent })(EventScreen);
