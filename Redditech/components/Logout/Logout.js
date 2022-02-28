import React from "react";
import { IconButton } from 'react-native-paper';
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";
import {Alert} from "react-native";
export default function Logout() {
    const navigation = useNavigation();
    async function deleteRedditToken() {
        let access_token = await SecureStore.getItemAsync('reddit_token');
        const redditCode = 'reddit_token';
        if (access_token !== null) {
            await SecureStore.deleteItemAsync(redditCode);
            Alert.alert('Logout', 'You are now logged out', [
                {text: "Ok"}
            ]);
            navigation.navigate('Login');
        }
    }

    return (
        <IconButton
            icon="logout"
            color={"black"}
            onPress={() => {
                deleteRedditToken();
            }}/>
    )
}