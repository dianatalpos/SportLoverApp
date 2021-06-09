import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, useStore } from "react-redux";
import { EventList } from "../../components";
import { getEvents, setEvent, getNextEvents } from "../../actions";
import { getProfile } from "../../../profile";
import { Spinner } from "native-base";
import { Colors } from "../../../theme/colors";
import { AuthService } from "../../../auth";


const NextEventsScreen = (props) => {
    const { navigation, state, setEvent, getNextEvents } = props
    const { eventsRed, profileRed } = state;
    const { nextEvents, areFetching, hasError: eventsErr, areFetched } = eventsRed;
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
            getNextEvents(userId);
        }
    }, [userId, isIdLoaded]);


    const onItemPressed = (event: Event) => {
        setEvent(event);
        //navigation.navigate("EventDetails");
        navigation.navigate("Chat")
    }

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {loading ? <Spinner color={Colors.gradientPrimary} /> : <EventList
                    loading={areFetching}
                    events={nextEvents}
                    onAdd={null}
                    onItemPressed={onItemPressed}
                    title={"My Next Events"}
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

const mapDispatchToProps = { setEvent, getNextEvents }
export default connect(mapStateToProps, mapDispatchToProps)(NextEventsScreen);
