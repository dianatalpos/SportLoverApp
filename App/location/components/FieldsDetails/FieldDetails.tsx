import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Field } from "../../types";
import { Colors } from "../../../theme/colors";

const FieldDetails = (props) => {
  const { field } = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.field}>{`Field Name: ${field.name}`}</Text>
        <Text style={styles.sport}>{`Sport: ${field.sport || 'N/A'}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 25,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 7,
    backgroundColor: Colors.colorCard,
  },
  sport: {
    fontSize: 14,
  },
  field: {
    color: Colors.colorTextBlack,
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  peopleNumber: {
    color: Colors.colorGrey,
    fontSize: 25,
    fontWeight: "700",
  },
});

FieldDetails.defaultProps = {
  location: {
    name: "N/A",
    sport: "N/A",
  } as Field,
  onPress: () => {},
};

export default FieldDetails;
