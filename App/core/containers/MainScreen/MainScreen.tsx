import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LocationTab } from "../../../location";
import { ProfileTab } from "../../../profile/containers";
import { EventsTab, MyEventsTab } from "../../../event";
import { getProfile } from "../../../profile"
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { ChatScreen } from "../../../chat"
import { GeneralFriendsTab } from "../../../friends";

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const { state, getProfile } = props;
    const { profile, isFetched, isFetching, hasError } = state;

    const [isOwner, setIsOwner] = useState(false);
    const [id, setId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);


    useEffect(() => {
        loadRole();
    }, []);

    const loadRole = async () => {
        const authService = new AuthService();
        authService.isOwner().then((data) => setIsOwner(data));
        authService.getId().then((id) => {
            setId(id)
            setIsIdLoaded(true)
        })
    };

    useEffect(() => {
        getProfile(id);
    }, [id, isIdLoaded])

    return (
        <Tab.Navigator initialRouteName="Events"
            tabBarOptions={{
                activeTintColor: Colors.gradientPrimary,
                inactiveTintColor: "grey",
                style: {
                    backgroundColor: Colors.colorWhite,
                },
            }
            }
        >
            {isOwner ? (
                <Tab.Screen
                    name="MyLocation"
                    component={LocationTab}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: "Location",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home-map-marker"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            ) : null}
            <Tab.Screen
                name="Events"
                component={EventsTab}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "Events",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="format-list-text"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="MyEvents"
                component={MyEventsTab}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "My Events",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-details"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Friends"
                component={GeneralFriendsTab}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "Friends",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-supervisor"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="My Profile"
                component={ProfileTab}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
})

const mapDispatchToProps = {
    getProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
