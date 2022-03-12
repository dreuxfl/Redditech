import * as React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../../screens/Profile/Profile";
import Home from "../../screens/Home/Home";
import Search from "../../screens/Search/Search";

const Tab = createMaterialBottomTabNavigator();

export default function Nav() {
    return (
        <Tab.Navigator
            independent={true}
            initialRouteName={"Home"}
            activeColor="#00eeff"
            inactiveColor="#c0c0c0"
            barStyle={{ backgroundColor: '#2c2f33' }}
        >
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}
