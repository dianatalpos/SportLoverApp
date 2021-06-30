import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, useStore } from "react-redux";
import { EventList } from "../../components";
import { getEvents, setEvent } from "../../actions";
import { Spinner } from "native-base";
import { Colors } from "../../../theme/colors";
import { AuthService } from "../../../auth";


const EventsScreen = (props) => {
    const { navigation, state, getEvents, setEvent } = props
    const { eventsRed, profileRed } = state;
    const { events, areFetching, hasError: eventsErr, areFetched } = eventsRed;
    const { isFetched, isFetching, hasError: profileError } = profileRed

    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);
    const loading = isFetching || areFetching;

    console.log(loading, "LOADING EVENTS")

    useEffect(() => {
        loadId();
    }, []);

    const loadId = async () => {
        const authService = new AuthService();
        authService.getId().then((data) => {
            setUserId(data)
            setIsIdLoaded(true);
        });
    };

    useEffect(() => {
        if (isIdLoaded) {
            getEvents(userId);
        }
    }, [userId, isIdLoaded]);

    const onAddEvent = () => {
        navigation.navigate("AddEvent");
    }


    const onItemPressed = (event: Event) => {
        setEvent(event);
        navigation.navigate("EventDetails");
    }

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {loading ? <Spinner color={Colors.gradientPrimary} /> : <EventList
                    loading={areFetching}
                    events={events}
                    onAdd={onAddEvent}
                    onItemPressed={onItemPressed}
                    title={"Upcoming events"}
                    message={"Help us build a great sport community!"}
                    shouldShowAddButton={true}
                ></EventList>}
            </SafeAreaView>
        </View>
    );
};

const mapStateToProps = (state) => ({
    state: {
        eventsRed: state.events,
        profileRed: state.profile
    },
});

const mapDispatchToProps = { getEvents, setEvent }
export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
