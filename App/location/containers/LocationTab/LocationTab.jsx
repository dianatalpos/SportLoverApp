import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "../LocationScreen";
import LocationDetailsScreen from "../LocationDetailsScreen";

const Stack = createStackNavigator();

const LocationTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Location"
                options={{ header: () => null }}
                component={LocationScreen}
            />
            {/* <Stack.Screen
                name="Add Location"
                component={}
            /> */}
            <Stack.Screen
                name="LocationDetails"
                options={{ header: () => null }}
                component={LocationDetailsScreen}
            />
        </Stack.Navigator>
    );
};

export default LocationTab;
