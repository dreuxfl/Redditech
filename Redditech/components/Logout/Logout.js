import React from "react";
import * as SecureStore from "expo-secure-store";
import {Alert, Button, StyleSheet, View} from "react-native";

export default function Logout() {

    async function deleteRedditToken() {

        let access_token = await SecureStore.getItemAsync("token");
        if (access_token !== null) {
            await SecureStore.deleteItemAsync("token");
            Alert.alert('Logout', 'You are now logged out', [
                {text: "Ok"}
            ]);
            // navigation.navigate('Login');
        }
    }
    return (
        <View style={styles.logout}>
            <Button
                title="Logout"
                onPress={() => {
                    deleteRedditToken();
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    logout: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
