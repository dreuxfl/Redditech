import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from "../Login/Login";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";

const Stack = createStackNavigator();

export default function StackNav() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
            />


        </Stack.Navigator>
    );
}