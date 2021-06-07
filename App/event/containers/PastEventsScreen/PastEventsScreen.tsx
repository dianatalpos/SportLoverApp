import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, useStore } from "react-redux";
import { EventList } from "../../components";
import { setEvent, getPastEvents } from "../../actions";
import { Spinner } from "native-base";
import { Colors } from "../../../theme/colors";
import { AuthService } from "../../../auth";


const PastEventScreen = (props) => {
    const { navigation, state, getProfile, setEvent, getPastEvents } = props
    const { eventsRed, profileRed } = state;
    const { pastEvents, areFetching, hasError: eventsErr, areFetched } = eventsRed;
    const { isFetched, isFetching, hasError: profileError } = profileRed

    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);
    const loading = isFetching || areFetching || !isIdLoaded;

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
            console.log("In My Past Events Screen, getting events", userId)
            getPastEvents(userId);
        }
    }, [userId, isIdLoaded]);

    const onAddEvent = () => {
        navigation.navigate("AddEvent");
    }


    const onItemPressed = (event: Event) => {
        //setEvent(event);
        //navigation.navigate("EventDetails");
        console.log("Item pressed");
    }

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {loading ? <Spinner color={Colors.gradientPrimary} /> : <EventList
                    loading={areFetching}
                    events={pastEvents}
                    onAdd={onAddEvent}
                    onItemPressed={onItemPressed}
                    title={"My Past Events"}
                    message={"Click on one event to chat with your team!"}
                    shouldShowAddButton={false}
                ></EventList>}
            </SafeAreaView>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    state: {
        eventsRed: state.events,
        profileRed: state.profile
    },
});

const mapDispatchToProps = { setEvent, getPastEvents }
export default connect(mapStateToProps, mapDispatchToProps)(PastEventScreen);
