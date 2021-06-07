import React from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { Button } from "react-native";
import PastEventScreen from "../PastEventsScreen";
import NextEventsScreen from "../NextEventsScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const MyEventsTab = () => {
    return (
        // <Stack.Navigator>
        //     <Stack.Screen
        //         name="NextEvents"
        //         component={NextEventsScreen}
        //         options={{ header: () => null }}
        //     />

        //     <Stack.Screen name="PastEvents" component={PastEventScreen} />

        // </Stack.Navigator>
        <Tab.Navigator>
            <Tab.Screen name="NextEvents" component={NextEventsScreen}
                options={{
                    tabBarLabel: "NextEvents",
                }} />
            <Tab.Screen name="PastEvents" component={PastEventScreen}
                options={{
                    tabBarLabel: "NextEvents",
                }} />
        </Tab.Navigator>
    );
};

export default MyEventsTab;
