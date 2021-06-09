import React from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { Button } from "react-native";
import PastEventScreen from "../PastEventsScreen";
import NextEventsScreen from "../NextEventsScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from "../../../theme/colors";
import { ChatScreen } from "../../../chat";


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MyEventsTab = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: true,
                activeTintColor: Colors.gradientPrimary,
                inactiveTintColor: "grey",
                style: {
                    paddingTop: 30,
                    backgroundColor: Colors.colorWhite,
                },
            }
            }>
            <Tab.Screen name="NextEvents" component={NextEventsScreen}
                options={{
                    tabBarLabel: "Next Events",
                }} />
            <Tab.Screen name="PastEvents" component={PastEventScreen}
                options={{
                    tabBarLabel: "Past Events",
                }} />
                
        </Tab.Navigator>
    );
};

export default MyEventsTab;
