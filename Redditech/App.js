import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Auth from "./Auth";

export default function App() {

    const [token, setToken] = React.useState('');

    const fetchToken = async () => {
        if(token === ''){
            try {
                let result = await SecureStore.getItemAsync("token");
                setToken(result)

            } catch (e) {
                console.log(e);
            }
        }

        console.log(token);
        return token;
    }

    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Auth/>
          <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
