import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AuthReducer, LoginScreen, RegisterScreen } from "./auth";
import { SplashScreen } from "./core";
import { ProfileReducer, ProfileScreen } from "./profile";

const Stack = createStackNavigator();
const reducers = combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer
});
const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                {/* <Stack.Screen name="Main" component={MainScreen} /> */}
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