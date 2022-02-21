import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Auth from "./Auth";
import axios from 'axios';

const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit
export default function App() {

    const [token, setToken] = React.useState('');
    const [username, setUsername] = React.useState('');

    const fetchToken = async () => {
        if(token === ''){
            try {
                let result = await SecureStore.getItemAsync("token");
                setToken(result)

            } catch (e) {
                console.log(e);
            }
        }

    }

    fetchToken();

    if(token !== '') {

        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }

        axios.get(REDDIT_API + "/me", {
            headers : headers
        })
            .then((response) => {
                let username = response.data.subreddit.display_name
                setUsername(username);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            {
                (username === '') ?
                    <Text>Log into reddit to start using this app !<Auth/></Text>
                :
                    <Text>Logged into reddit as {username} </Text>
            }


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
