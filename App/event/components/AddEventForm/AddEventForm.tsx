import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { SelectEventActivityStep } from "..";
import { Colors } from "../../../theme/colors";
import { ActivityType } from "../../types";

const AddEventForm = ({ locations, onLoadLocations, onCreate }) => {
    const [type, setType] = useState(ActivityType.VOLLEYBALL);

    const onTypeSelect = (type: ActivityType): void => {
        setType(type);
        onLoadLocations(type);
    };
    return (
        <View style={styles.view}>
            <ProgressSteps>
                <ProgressStep
                    label="Select Activity"
                    nextBtnTextStyle={styles.nextBtn}
                    previousBtnTextStyle={styles.prevBtn}
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
                    <View style={{ alignItems: "center" }}>
                        <Text>This is the content within step 2!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep
                    borderStyle={"solid"}
                    label="Book a place"
                    nextBtnTextStyle={styles.nextBtn}
                    previousBtnTextStyle={styles.prevBtn}
                >
                    <View style={{ alignItems: "center" }}>
                        <Text>This is the content within step 3!</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

const styles = StyleSheet.create({
    view: { backgroundColor: "#fff" },
    nextBtn: {
        backgroundColor: Colors.colorTextBlack,
        color: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 10,
        marginLeft: 50,
    },
    prevBtn: {
        borderColor: Colors.gradientPrimary,
        color: Colors.gradientPrimary,
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 10,
        marginRight: 50,
    },
});
AddEventForm.defaultProps = {
    locations: null,
    onLoadLocations: () => {},
    onCreate: () => {},
};

export default AddEventForm;
