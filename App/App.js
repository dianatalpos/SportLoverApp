import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./state/User/reducer";
import logger from 'redux-logger';
import LoginScreen from "./screens/LoginScreen";
import SplashScreen from "./screens/SplashScreen";


const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(logger));

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const AppWithReduxProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithReduxProvider;
