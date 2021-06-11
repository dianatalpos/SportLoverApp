import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddEventForm } from "../../components";
import { ActivityType, Event } from "../../types";
import { Location } from "../../../location/types";
import { LocationService } from "../../../location";
import { connect } from "react-redux";
import { createEvent } from "../../actions";
import { StorageKeys, StorageService } from "../../../core";

const AddEventScreen = (props) => {
  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);

  const { createEvent, navigation } = props;

  const onCreate = async (event: Event) => {
    const storage = new StorageService();
    const userId = await storage.getItem(StorageKeys.ID);
    createEvent(userId, event);
    navigation.navigate("Events");
  };

  const onLoadLocations = async (type: ActivityType) => {
    const locationService = new LocationService();
    locationService
      .get(null, { sport: type })
      .then((data) => setLocations(data))
      .catch((err) => console.log(err, "Load locations error"));
  };

  const onLoadFields = (location: Location, type?: ActivityType): void => {
    const locationService = new LocationService();
    locationService
      .getFields(location.id, type)
      .then((data) => setFields(data))
      .catch((err) => console.log(err, "Load Fields Error"));
  };

  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
      <AddEventForm
        locations={locations}
        fields={fields}
        onCreate={onCreate}
        onLoadLocations={onLoadLocations}
        onLoadFields={onLoadFields}
      />
    </SafeAreaView>
  );
};

const mapDispatchToProps = {
  createEvent,
};
export default connect(null, mapDispatchToProps)(AddEventScreen);
