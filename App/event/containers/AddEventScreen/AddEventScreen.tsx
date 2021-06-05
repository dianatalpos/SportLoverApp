import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AddEventForm } from "../../components";
import { ActivityType } from "../../types";

const AddEventScreen = (props) => {
    const { locations } = props;
    useEffect(() => {
        const profileId = "12";
    }, []);

    const onCreate = () => {
        console.log("create event");
    };

    const onLoadLocations = (type: ActivityType) => {
        console.log("load", type);
    };

    return (
        <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
            <AddEventForm
                locations={locations}
                onCreate={onCreate}
                onLoadLocations={onLoadLocations}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    state: state.locations,
});

export default connect(mapStateToProps)(AddEventScreen);
