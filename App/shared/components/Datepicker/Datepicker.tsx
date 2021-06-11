import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const Datepicker = ({
  value,
  minDate,
  is24Hour,
  interval,
  placeholder,
  maxDate,
  mode,
  onChange,
}) => {
  return (
    <DateTimePicker
      value={value}
      maximumDate={new Date(maxDate)}
      minimumDate={new Date(minDate)}
      mode={mode}
      placeholderText={placeholder}
      style={styles.datepickerInput}
      display="spinner"
      minuteInterval={interval}
      is24Hour={is24Hour}
      onChange={(_, selectedDate: Date) => {
        onChange(selectedDate);
      }}
    />
  );
};

const styles = StyleSheet.create({
  datepicker: { width: 260, justifyContent: "center" },
  datepickerInput: {
    padding: 5,
    margin: 5,
    borderColor: Colors.gradientPrimary,
    borderRadius: 50,
  },
  datepickerIcon: {
    position: "absolute",
    left: 5,
    top: 4,
    marginLeft: 10,
  },
});

Datepicker.defaultProps = {
  minDate: new Date("1900-01-01"),
  maxDate: new Date("2100-01-01"),
  placeholder: "Select",
  value: new Date(),
  mode: "date",
  is24Hour: true,
  interval: 1,
  onChange: () => {},
};

export default Datepicker;
