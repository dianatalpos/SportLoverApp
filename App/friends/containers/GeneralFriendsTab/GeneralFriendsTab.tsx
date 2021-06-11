import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendsTab from "../FriendsTab";
import {ProfileAddFriendScreen} from "../../../profile";

const Stack = createStackNavigator();

const GeneralFriendsTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Location"
                options={{ header: () => null }}
                component={FriendsTab}
            />

            <Stack.Screen
                name="AddFriend"
                component={ProfileAddFriendScreen} />

        </Stack.Navigator>
    );
};

export default GeneralFriendsTab;
