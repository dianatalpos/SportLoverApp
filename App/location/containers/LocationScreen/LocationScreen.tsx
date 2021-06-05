import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getLocation } from "../../actions";

const LocationScreen = ({ state, getLocation }) => {
    const { locations } = state;

    useEffect(() => {
        const locationId = "1";
        const profileId = "12";
        getLocation(locationId, profileId);
    }, []);

    return (
        <SafeAreaView>
            <Text>TTT</Text>
        </SafeAreaView>
    );
};



const mapStateToProps = (state) => ({
    state: state.locations,
});

const mapDispatchToProps = {
    getLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
