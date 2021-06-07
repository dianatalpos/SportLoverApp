import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LocationScreen } from "../../../location";
import { ProfileTab } from "../../../profile/containers";
import { EventsTab, MyEventsTab } from "../../../event";
import { getProfile } from "../../../profile"
import { connect } from "react-redux";
import { AuthService } from "../../../auth";

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const {state}  = props;
    const { profile, isFetched, isFetching, hasError } = state;

    const [isOwner, setIsOwner] = useState(false);


    useEffect(() => {
        loadRole();
    }, []);

    const loadRole = async () => {
        const authService = new AuthService();
        authService.isOwner().then((data) => setIsOwner(data));
    };

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
                    name="My Location"
                    component={LocationScreen}
                    options={{
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
                name="My Profile"
                component={ProfileTab}
                options={{
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
