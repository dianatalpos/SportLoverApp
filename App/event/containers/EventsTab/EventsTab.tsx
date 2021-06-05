import React from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { Button } from "react-native";
import AddEventScreen from "../AddEventScreen";
import EventsScreen from "../EventsScreen";
import EventScreen from "../EventScreen";

const Stack = createStackNavigator();

const EventsTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events"
                component={EventsScreen}
                options={{ header: () => null }}
            />

            <Stack.Screen name="EventDetails" component={EventScreen} />

            <Stack.Screen name="AddEvent" component={AddEventScreen} />
        </Stack.Navigator>
    );
};

export default EventsTab;
