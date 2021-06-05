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
import { MainScreen } from "./core/containers";

const Stack = createStackNavigator();
const reducers = combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer,
    events: EventReducer,
});
const store = createStore(reducers, applyMiddleware(thunk));

const SplashScreenOptions = {
    gestureEnabled: false,
    headerShown: false,
};

const ProfileScreenOptions = {
    headerLeft: null,
};

const App = () => {
    return (
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

                <Stack.Screen 
                    options={SplashScreenOptions}
                    name="Login"
                    component={LoginScreen}
                />
                
                <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const AppWithReduxProvider = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppWithReduxProvider;
