import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AuthReducer, LoginScreen, RegisterScreen } from "./auth";
import { SplashScreen } from "./core";
import { ProfileReducer } from "./profile";
import { EventReducer } from "./event";
import {FriendsReducer} from "./friends"
import { MainScreen } from "./core/containers";
import { FieldsReducer, LocationReducer } from "./location";
import { CompleteProfileScreen } from "./profile";
import { StatusBar, StyleSheet, View } from "react-native";
import { ChatScreen } from "./chat";
import { Colors } from "./theme/colors";
import * as firebase from 'firebase';
import 'firebase/firestore';

const Stack = createStackNavigator();
const reducers = combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer,
    events: EventReducer,
    locations: LocationReducer,
    fields: FieldsReducer,
    friends: FriendsReducer
});
const store = createStore(reducers, applyMiddleware(thunk));

const SplashScreenOptions = {
    gestureEnabled: false,
    headerShown: false,
};

const firebaseConfig = {
    apiKey: "AIzaSyDOf7VOjk7CUUwc9XBASskMrQKnu7gxUNQ",
    authDomain: "sportapp-aa560.firebaseapp.com",
    projectId: "sportapp-aa560",
    storageBucket: "sportapp-aa560.appspot.com",
    messagingSenderId: "160625088719",
    appId: "1:160625088719:web:439bb732d3c8f9c3ffbfba",
    measurementId: "G-5WH0CPKX5D"
};
// Initialize Firebase
if (firebase.default.apps.length === 0) {
    firebase.default.initializeApp(firebaseConfig);
}

const App = () => {
    return (

        <View style={styles.container}>
            <StatusBar
                backgroundColor="#b3e6ff"
                barStyle="dark-content"
                hidden={false}
                translucent={true}
            />

            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        options={SplashScreenOptions}
                        name="Splash"
                        component={SplashScreen}
                    />
                    <Stack.Screen name="Main" component={MainScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
                    <Stack.Screen
                        name="Chat"
                        component={ChatScreen}

                        options={{
                            headerBackTitleStyle: { color: Colors.colorGrey }, headerTintColor: Colors.colorGrey,
                            headerShown: true, headerBackTitle: 'Back', headerTransparent: true
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const AppWithReduxProvider = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppWithReduxProvider;
