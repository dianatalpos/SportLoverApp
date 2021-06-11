import React, { useState, useEffect } from "react";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {
  SelectEventActivityStep,
  SelectLocationFieldStep,
  SelectLocationStep,
} from "..";
import { Field, Location } from "../../../location/types";
import { Colors } from "../../../theme/colors";
import { ActivityType } from "../../types";
import { Event } from "../../types";

const AddEventForm = ({
  locations,
  fields,
  onLoadLocations,
  onLoadFields,
  onCreate,
}) => {
  const [type, setType] = useState(null);
  const [location, setLocation] = useState<Location>(null);
  const [field, setField] = useState<Field>(fields ? fields[0] : null);
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [nrParticipants, setNrParticipants] = useState(2);
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });

  useEffect(() => {
    if (fields && fields.length > 0) {
      setField(fields[0]);
    }
  }, [fields]);

  const onTypeSelect = (type: ActivityType): void => {
    setType(type);
    setLocation(null);
    setField(null);
    setDuration(30);
    setDate(new Date());
    setNrParticipants(2);
    setError({ hasError: false, message: "" });
    onLoadLocations(type);
  };

  const onLocationSelect = (place: Location): void => {
    setLocation(place);
    onLoadFields(place, type);
  };

  const onDurationSelect = (duration: number): void => setDuration(duration);

  const onFieldSelect = (fieldId: string): void => {
    const selectedField = fields.find((field: Field) => field.id === fieldId);
    setField(selectedField);
  };

  const onDateSelect = (value: Date): void => setDate(value);

  const onNrParticipantsSelect = (value: number): void =>
    setNrParticipants(value);

  const validateLocationStep = () => {
    location
      ? setError({ ...error, hasError: false })
      : setError({ hasError: true, message: "Please select a location" });
  };

  const validateFieldStep = () => {
    !field
      ? setError({ hasError: true, message: "Please a field" })
      : handleOnCreate();
  };

  const handleOnCreate = () => {
    const event = new Event();
    event.location = location.name;
    event.locationFieldId = field?.id;
    event.locationFieldName = field?.name;
    event.locationId = location?.id;
    event.locationLatitude = location?.latitude;
    event.locationLongitude = location?.longitude;
    event.sport = type;
    event.duration = duration;
    event.maxNoPlayers = nrParticipants;
    event.isPublic = true;
    event.dateTime = date;
    event.level = "Beginner";
    event.participants = [];
    event.users = [];
    onCreate(event);
  };

  return (
    <View style={styles.view}>
      <ProgressSteps>
        <ProgressStep label="Select Activity" nextBtnTextStyle={styles.nextBtn}>
          <SelectEventActivityStep
            selectedType={type}
            onSelect={onTypeSelect}
          />
        </ProgressStep>
        <ProgressStep
          label="Select Location"
          nextBtnTextStyle={styles.nextBtn}
          previousBtnTextStyle={styles.prevBtn}
          onNext={validateLocationStep}
          errors={error.hasError}
        >
          <SelectLocationStep
            locations={locations}
            selectedItem={location}
            onSelect={onLocationSelect}
          />
        </ProgressStep>
        <ProgressStep
          borderStyle={"solid"}
          label="Book a place"
          nextBtnTextStyle={styles.nextBtn}
          previousBtnTextStyle={styles.prevBtn}
          onSubmit={validateFieldStep}
          errors={error.hasError}
        >
          <SelectLocationFieldStep
            field={field}
            fields={fields}
            date={date}
            duration={duration}
            nrParticipants={nrParticipants}
            onDurationSelect={onDurationSelect}
            onDateSelect={onDateSelect}
            onNrParticipantsSelect={onNrParticipantsSelect}
            onFieldSelect={onFieldSelect}
          />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { backgroundColor: "#fff", width: 400, height: 650 },
  nextBtn: {
    backgroundColor: Colors.colorTextBlack,
    color: "#fff",
    borderWidth: 1,
    padding: 10,
    width: 80,
    textAlign: "center",
  },
  prevBtn: {
    borderColor: Colors.gradientPrimary,
    color: Colors.gradientPrimary,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
  },
});
AddEventForm.defaultProps = {
  locations: null,
  fields: [],
  onLoadFields: () => {},
  onLoadLocations: () => {},
  onCreate: () => {},
};

export default AddEventForm;
