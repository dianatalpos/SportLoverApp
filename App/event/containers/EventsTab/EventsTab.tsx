import React from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { Button } from "react-native";
import { Colors } from "../../../theme/colors";
import AddEventScreen from "../AddEventScreen";
import EventsScreen from "../EventsScreen";
import EventScreen from "../EventScreen"

const Stack = createStackNavigator();

const EventsTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events"
                component={EventsScreen}
                options={{ header: () => null }}
            />

            <Stack.Screen
                name="EventDetails"
                component={EventScreen}
                options={{ 
                    // headerShown: true,
                    // headerTitle: "Event Details",
                    // headerBackTitle: "Back",
                    // headerBackTitleStyle: { color: Colors.colorGrey },
                    // headerTintColor: Colors.colorGrey,
                    // headerTransparent: true,
                 }}
            />

            <Stack.Screen
                name="AddEvent"
                component={AddEventScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Add a New Event",
                    headerBackTitle: "Back",
                    headerBackTitleStyle: { color: Colors.colorGrey },
                    headerTintColor: Colors.colorGrey,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default EventsTab;
