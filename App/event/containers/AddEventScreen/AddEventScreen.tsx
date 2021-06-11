import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AddEventForm } from "../../components";
import { ActivityType, Event } from "../../types";
import { getLocations } from "../../../location/actions/location.effects";
import { Location } from "../../../location/types";

const AddEventScreen = (props) => {
  const { locations } = props.state;
  const { getLocations } = props;

  const onCreate = (event: Event) => {
    console.log(event, "create event");
  };

  const onLoadLocations = (type: ActivityType) => {
    const profileId = "12";
    getLocations(profileId, type);
  };

  const onLoadFields = (location: Location, type?: ActivityType): void => {
    // console.log(location, type, "on load fields");
  };

  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
      <AddEventForm
        locations={locations}
        onCreate={onCreate}
        onLoadLocations={onLoadLocations}
        onLoadFields={onLoadFields}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state.locations,
});

const mapDispatchToProps = {
  getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
