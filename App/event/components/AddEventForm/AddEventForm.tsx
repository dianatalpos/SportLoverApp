import React, { useState } from "react";
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

const AddEventForm = ({
    locations,
    fields,
    onLoadLocations,
    onLoadFields,
    onCreate,
}) => {
    const [type, setType] = useState(ActivityType.VOLLEYBALL);
    const [location, setLocation] = useState(null);
    const [field, setField] = useState(null);

    const onTypeSelect = (type: ActivityType): void => {
        setType(type);
        onLoadLocations(type);
    };

    const onLocationSelect = (place: Location): void => {
        setLocation(place);
        onLoadFields(place);
    };

    const onFieldSelect = (field: Field): void => {
        setField(field);
    };

    return (
        <View style={styles.view}>
            <ProgressSteps>
                <ProgressStep
                    label="Select Activity"
                    nextBtnTextStyle={styles.nextBtn}
                    // previousBtnTextStyle={styles.prevBtn}
                >
                    <SelectEventActivityStep
                        selectedType={type}
                        onSelect={onTypeSelect}
                    />
                </ProgressStep>
                <ProgressStep
                    label="Select Location"
                    nextBtnTextStyle={styles.nextBtn}
                    previousBtnTextStyle={styles.prevBtn}
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
                >
                    <SelectLocationFieldStep
                        fields={fields}
                        onSelect={onFieldSelect}
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
