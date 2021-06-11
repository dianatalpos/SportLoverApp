import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AddEventForm } from "../../components";
import { ActivityType } from "../../types";
// import { getLocations } from "../../../location";

const AddEventScreen = (props) => {
    const { locations } = props.state;
    // const { getLocations } = props;

    const onCreate = () => {
        console.log("create event");
    };

    const onLoadLocations = (type: ActivityType) => {        
        const profileId = "12";
        // getLocations(profileId, type);
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

const mapDispatchToProps = {
    // getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
