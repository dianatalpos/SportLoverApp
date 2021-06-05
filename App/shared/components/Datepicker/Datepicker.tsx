import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const Datepicker = ({ date, minDate, placeholder, maxDate, mode, onChange }) => {
    const [localDate, setLocalDate] = useState(new Date(date));
    return (
        <DateTimePicker
            value={localDate}
            maximumDate={new Date(maxDate)}
            minimumDate={new Date(minDate)}
            mode={mode}
            placeholderText={placeholder}
            style={styles.datepickerInput}
            display="default"
            onChange={(_, selectedDate: Date) => {
                const value = moment(selectedDate).format("YYYY-MM-DD");
                onChange(value);
                setLocalDate(new Date(value));
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
    date: new Date(),
    mode: "date",
    onChange: () => {},
};

export default Datepicker;
