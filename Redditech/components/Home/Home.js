import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Animated, Button, StyleSheet, Text, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Login from "../Login/Login";
import axios from 'axios';
import Logout from "../Logout/Logout";

const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Home({ navigation }) {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState('');

    const fetchToken = async () => {

        let result = await SecureStore.getItemAsync("token");
        setToken(result);

    }

    const tryConnection = () => {

        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }

        axios.get(REDDIT_API + "/me", {
            headers : headers
        }).then((response) => {
            console.log("Request successful")
            // let username = response.data.subreddit.display_name
            // setUsername(username);
        }).catch((error) => {
            console.log(error)
        });
    }

    React.useEffect(() => {

        if(token === null){ //if there is no token in the state then fetch it

            try {
                console.log("try fetch")
                fetchToken().then( () => { //we now have either the connection token or nothing if the user hasn't logged in
                    if( token === null) {
                        console.log("token null")
                        navigation.navigate("Login");
                    }
                });

            } catch (e) {
                console.log(e);
            }
        } else {
            console.log(`token not null : ${token}`);
            tryConnection();
        }

    }, []);


    return (
        <View style={styles.home}>
            {/*<Login/>*/}
            <Logout/>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
