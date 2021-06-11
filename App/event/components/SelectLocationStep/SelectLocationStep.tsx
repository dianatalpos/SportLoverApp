import React from "react";
import { StyleSheet, Text, View, VirtualizedList } from "react-native";
import { Location } from "../../../location/types";
import EventLocationItem from "../EventLocationItem";

const noImg =
  "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";

const SelectLocationStep = ({ locations, selectedItem, onSelect }) => {
  const getItem = (data: Location[], index: number) => data[index];

  const getItemCount = (data) => (data ? data.length : 10);

  const isSelected = (item: Location) => selectedItem?.id === item.id;

  return (
    <View style={styles.view}>
      <View>
        <VirtualizedList
          data={locations}
          initialNumToRender={5}
          renderItem={({ item }) => (
            <EventLocationItem
              isSelected={isSelected(item)}
              location={item}
              onSelect={onSelect}
            />
          )}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 30,
  },
});

SelectLocationStep.defaultProps = {
  locations: [],
  selectedItem: null,
  onSelect: () => {},
};

export default SelectLocationStep;
