import React from "react";
import FriendListScreen from "../FriendListScreen";
import FriendsRequestScreen from "../FriendsRequestScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from "../../../theme/colors";


const Tab = createMaterialTopTabNavigator();

const FriendsTab = () => {
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
            <Tab.Screen name="FriendsList" component={FriendListScreen}
                options={{
                    tabBarLabel: "Friend List",
                }} />
            <Tab.Screen name="FriendsRequest" component={FriendsRequestScreen}
                options={{
                    tabBarLabel: "Friend Requests",
                }} />

        </Tab.Navigator>
    );
};

export default FriendsTab;
