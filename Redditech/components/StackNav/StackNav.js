import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from "../../stacks/Login/Login";
import MainStack from "../../stacks/MainStack/Main";
import Settings from "../../stacks/Settings/Settings";

const Stack = createStackNavigator();

export default function StackNav() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="MainStack"
                component={MainStack}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
            />
        </Stack.Navigator>
    );
}