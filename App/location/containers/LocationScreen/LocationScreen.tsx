import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { Colors } from "../../../theme/colors";
import { getLocations } from "../../actions";
import { LocationList } from "../../components";

const LocationScreen = ({ state, getLocations }) => {
    const { locations, isFetching } = state;

    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);

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
            console.log("In Locations Screen", userId)
            getLocations(userId);
        }
    }, [userId, isIdLoaded]);


    const onAddEvent = () => {
        //navigation.navigate("AddEvent");
    }


    const onItemPressed = (event: Event) => {
        // setEvent(event);
        // navigation.navigate("EventDetails");
    }


    const isLoading = !isIdLoaded || isFetching;

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {isLoading ? <Spinner color={Colors.gradientPrimary} /> : <LocationList
                    loading={isFetching}
                    locations={locations}
                    onAdd={onAddEvent}
                    onItemPressed={onItemPressed}
                ></LocationList>}
            </SafeAreaView>
        </ScrollView>
    );
};



const mapStateToProps = (state) => ({
    state: state.locations,
});

const mapDispatchToProps = {
    getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
