import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { EventList } from "../../components";
import { getEvents, setEvent } from "../../actions";


const EventsScreen = (props) => {
    const { navigation, state, getEvents, setEvent } = props
    const { events } = state;
    // console.log(state, 'state')

    const mockedEvents: Event[]= [ 
        {
            eventId: "5555",
            sport: "Football",
            level: "Beginner",
            location: "Baza Sportiva Gheorgheni",
            locationFieldName: "Football Field 1",
            locationId: "",
            locationFieldId: "",
            locationLatitude: 0,
            locationLongitude: 0,
            dateTime: new Date(),
            duration: 60,
            createdBy: "admin",
            maxNoPlayers: 22,
            isPublic: true,
            users: ["user1", "user2"],
        }
    ]

    useEffect(() => {
        getEvents();
    }, []);


    const onAddEvent = () => {
        console.log("Press Add Event");
        navigation.navigate("AddEvent");
    }


    const onItemPressed = (event: Event) => {
        console.log("Press Item");
        setEvent(event);
        navigation.navigate("EventDetails");
    }

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                <EventList
                    events={events}
                    onAdd={onAddEvent}
                    onItemPressed={onItemPressed}
                ></EventList>
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: state.events,
});

export default connect(mapStateToProps, { getEvents, setEvent })(EventsScreen);
