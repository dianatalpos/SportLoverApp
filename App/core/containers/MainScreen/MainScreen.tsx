import React, { useEffect } from "react";
import {
    StyleSheet,
} from "react-native";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LocationScreen } from "../../../location";
import { ProfileTab } from "../../../profile/containers";
import { EventsTab } from "../../../event/containers"

const Tab = createBottomTabNavigator();

const MainScreen = () => {

    const isOwner = false;

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.gradientPrimary,
                inactiveTintColor: 'grey',
                style: {
                    backgroundColor: Colors.colorWhite,
                }
            }}>

            {isOwner ?
                <Tab.Screen
                    name='My Location'
                    component={LocationScreen}
                    options={{
                        tabBarLabel: 'Location',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-map-marker" color={color} size={size} />
                        ),
                    }}
                />
                : null
            }
            <Tab.Screen
                name='Events'
                component={EventsTab}
                options={{
                    tabBarLabel: 'Events',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-text" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name='My Profile'
                component={ProfileTab}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    bkgImage: {
        width: 400,
        height: 250,
    },
    view: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MainScreen;
