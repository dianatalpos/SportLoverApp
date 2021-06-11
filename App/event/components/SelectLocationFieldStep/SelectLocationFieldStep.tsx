import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Field } from "../../../location";

const SelectLocationFieldStep = ({ fields, onSelect }) => {
    const components =
        fields.length > 0 ? (
            fields.map((field: Field) => <Text>{field.name}</Text>)
        ) : (
            <Text>No fields available!</Text>
        );
    return <View style={styles.view}>{components}</View>;
};

const styles = StyleSheet.create({
    view: {},
});

SelectLocationFieldStep.defaultProps = {
    fields: [],
    onSelect: () => {}
};
export default SelectLocationFieldStep;
