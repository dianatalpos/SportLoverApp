import { Button, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { EventDetails } from "../../components";
import { Colors } from "../../../theme/colors";
import { joinEvent, refreshErrorJoin} from "../../actions"
import { AuthService } from "../../../auth";

const EventScreen = (props) => {
    const { state, joinEvent, refreshErrorJoin} = props
    const { eventsRed, profileRed, } = state;
    const { profile, isFetched, isFetching } = profileRed;
    const { event, areFetching, hasJoinError } = eventsRed;

    const [isInEvent, setIsInEvent] = useState(false);

    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);
    const loading = isFetching || areFetching || !isIdLoaded;
    const isEventFull = event.maxNoPlayers === event.participants.length;
    console.log(isEventFull, "iseventFull")

    useEffect(() => {
        loadId();
    }, []);

    const loadId = async () => {
        const authService = new AuthService();
        authService.getId().then((data) => {
            setUserId(data);
            setIsIdLoaded(true);
        });
    };


    useEffect(() => {
        if (!(isFetching || areFetching)) {
            setIsInEvent(!event.participants.find((participant) => participant.id === profile?.id))
        }
    }, [isFetching, areFetching])

    const onJoin = () => {
        joinEvent(event.id, userId);
    }

    useEffect(() => {
        if(hasJoinError){
            Alert.alert("You already have an event at that time!");
        }
        refreshErrorJoin();
    }, [hasJoinError])

    const spinner = <Spinner color={Colors.gradientPrimary} />
    const component = <ScrollView contentContainerStyle={{alignItems:"center"}} style={{ backgroundColor: "#fff"}}>
            <EventDetails
                event={event}
            ></EventDetails>
            {!isEventFull ? 
            (isInEvent ?
                <TouchableOpacity style={styles.actionBtn} onPress={onJoin}>
                    <Text style={styles.joinEvent}>Join Event</Text>
                </TouchableOpacity>
                : null
             ) : null
        }
    </ScrollView>
    return loading ? spinner : component

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
    state: {
        eventsRed: state.events,
        profileRed: state.profile,
    }
});

export default connect(mapStateToProps, { joinEvent, refreshErrorJoin })(EventScreen);
