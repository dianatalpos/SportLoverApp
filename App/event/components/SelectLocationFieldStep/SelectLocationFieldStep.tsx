import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Field } from "../../../location";
import { Datepicker } from "../../../shared";
import { Picker } from "@react-native-community/picker";

const SelectLocationFieldStep = ({
  date,
  duration,
  field,
  fields,
  onDateSelect,
  onDurationSelect,
  onFieldSelect,
}) => {
  const components = fields.map((field: Field) => (
    <Picker.Item key={field.id} label={field.id} value={field.name} />
  ));

  const hasFields = fields?.length > 0;

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Event's day</Text>
        <Datepicker
          value={date}
          minDate={new Date()}
          mode="datetime"
          interval={30}
          onChange={onDateSelect}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Select Event duration</Text>
        <Picker
          selectedValue={duration}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={onDurationSelect}
        >
          <Picker.Item label="30 min" value={30} />
          <Picker.Item label="1 hr" value={60} />
          <Picker.Item label="2 hr" value={120} />
          <Picker.Item label="3 hr" value={180} />
        </Picker>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Select Field</Text>
        {hasFields ? (
          <Picker
            selectedValue={field.name}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={onFieldSelect}
          >
            {components}
          </Picker>
        ) : (
          <Text>No fields.</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    marginHorizontal: 20,
  },
  container: {
    marginVertical: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  picker: {
    height: 100,
  },
  pickerItem: { height: 100 },
});

SelectLocationFieldStep.defaultProps = {
  date: null,
  duration: 1,
  field: null,
  fields: [],
  onDateSelect: () => {},
  onDurationSelect: () => {},
  onFieldSelect: () => {},
};
export default SelectLocationFieldStep;
