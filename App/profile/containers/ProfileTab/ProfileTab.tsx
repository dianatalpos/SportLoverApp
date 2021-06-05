import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../EditProfileScreen";
import ProfileScreen from "../ProfileScreen";
import ProfileAddFriendScreen from "../ProfileAddFriendScreen";

const Stack = createStackNavigator();

const ProfileTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                options={{ headerLeft: null }}
                component={ProfileScreen}
            />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            <Stack.Screen
                name="Add Friend"
                component={ProfileAddFriendScreen}
            />
        </Stack.Navigator>
    );
};

export default ProfileTab;
