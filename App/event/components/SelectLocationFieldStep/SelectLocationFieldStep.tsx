import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Field } from "../../../location";
import { Datepicker } from "../../../shared";
import { Picker } from "@react-native-community/picker";

const SelectLocationFieldStep = ({
  date,
  duration,
  field,
  nrParticipants,
  fields,
  onDateSelect,
  onNrParticipantsSelect,
  onDurationSelect,
  onFieldSelect,
}) => {
  const createComponents = () =>
    fields.map((field: Field) => (
      <Picker.Item key={field.id} label={field.name} value={field.id} />
    ));

  const hasFields = fields ? fields.length > 0 : false;

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
        <Text style={styles.title}>Select max participants {nrParticipants}</Text>
        <Picker
          selectedValue={nrParticipants}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={onNrParticipantsSelect}
        >
          <Picker.Item key="2" label="2" value={2} />
          <Picker.Item key="4" label="4" value={4} />
          <Picker.Item key="10" label="10" value={10} />
          <Picker.Item key="15" label="15" value={15} />
          <Picker.Item key="20" label="20" value={20} />
          <Picker.Item key="30" label="30" value={30} />
          <Picker.Item key="50" label="50" value={50} />
        </Picker>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Select Field</Text>
        {hasFields && !!field ? (
          <Picker
            selectedValue={field.name}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={onFieldSelect}
          >
            {createComponents()}
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
    marginVertical: 20,
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
  nrParticipants: 2,
  duration: 1,
  field: null,
  fields: [],
  onDateSelect: () => {},
  onNrParticipantsSelect: () => {},
  onDurationSelect: () => {},
  onFieldSelect: () => {},
};
export default SelectLocationFieldStep;
