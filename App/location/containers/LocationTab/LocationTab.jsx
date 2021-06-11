import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "../LocationScreen";
import LocationDetailsScreen from "../LocationDetailsScreen";
import AddLocationScreen from "../AddLocationScreen";
import EditLocationScreen from "../EditLocationScreen";
import { Colors } from "../../../theme/colors";

const Stack = createStackNavigator();

const LocationTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Location"
                options={{ header: () => null }}
                component={LocationScreen}
            />

            <Stack.Screen
                name="AddLocation"
                options={{
                    headerBackTitleStyle: { color: Colors.colorGrey },
                    headerTintColor: Colors.colorGrey,
                    headerShown: true,
                    headerTitle: false,
                    headerBackTitle: "Back",
                    headerTransparent: true,
                }}
                component={AddLocationScreen}
            />

            <Stack.Screen
                name="EditLocation"
                options={{
                    headerBackTitleStyle: { color: Colors.colorGrey },
                    headerTintColor: Colors.colorGrey,
                    headerShown: true,
                    headerTitle: false,
                    headerBackTitle: "Back",
                    headerTransparent: true,
                }}
                component={EditLocationScreen}
            />

            <Stack.Screen
                name="LocationDetails"
                options={{
                    headerBackTitleStyle: { color: Colors.colorGrey },
                    headerTintColor: Colors.colorGrey,
                    headerShown: true,
                    headerTitle: true,
                    headerTitle: "Location Details",
                    headerBackTitle: "Back",
                    headerTransparent: true,
                }}
                component={LocationDetailsScreen}
            />
        </Stack.Navigator>
    );
};

export default LocationTab;
