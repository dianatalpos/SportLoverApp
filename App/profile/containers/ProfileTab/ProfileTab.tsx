import React from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { Button } from "react-native";
import { Colors } from "../../../theme/colors";
import EditProfileScreen from "../EditProfileScreen";
import ProfileScreen from "../ProfileScreen";

const Stack = createStackNavigator();

const ProfileTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerTitle: "Edit Profile Info",
                    headerBackTitle: "Go Back",
                    headerBackTitleStyle: { color: Colors.colorGrey },
                    headerTintColor: Colors.colorGrey,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileTab;
