import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from "../Login/Login";
import Home from "../Home/Home";

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


        </Stack.Navigator>
    );
}