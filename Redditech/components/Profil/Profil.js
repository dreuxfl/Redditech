import axios from 'axios';
import {StyleSheet, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from "expo-secure-store";
import * as React from "react";

const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit

export default function Profil() {
    const [token, setToken] = React.useState('');
    const [username, setUsername] = React.useState('~');
    const [karma, setKarma] = React.useState('~');
    const [description, setDescription] = React.useState('~');
    const [golds, setGolds] =React.useState('~');
    const [PP, setPP] = React.useState('~')
    const [cake, setCake]= React.useState('~')
    const fetchToken = async () => {
        if (token === '') {
            try {
                let result = await SecureStore.getItemAsync("token");
                setToken(result)

            } catch (e) {
                console.log(e);
            }
        }

    }

    fetchToken().then(r => console.log(r));
    console.log(token)
    let headers = {
        'Authorization': `bearer ${token}`,
        'User-Agent': USER_AGENT
    }
    axios.get(REDDIT_API + "/me", {
        headers: headers
    })
        .then((response) => {
            let username = response.data.name
            setUsername(username);
            let karma = response.data.total_karma
            setKarma(karma)
            let description = response.data.subreddit.description
            setDescription(description)
            let golds = response.data.subreddit.coins
            setGolds(golds)
            let PP = response.data.subreddit.icon_img
            setPP(PP)
            let cake = response.data.created_utc
            setCake(cake)
        })
        .catch((error) => {
            console.log(error)
        })
    return (
        <View>
            {
                (username === '' && karma === '' && golds === '' && description === '') ?
                    <View>
                        <Text style={styles.container}>Something went wrong... </Text>
                        <Text style={styles.container}>username:{username}</Text>
                        <Text style={styles.container}>description:{description}</Text>
                        <Text style={styles.container}>golds:{golds}</Text>
                        <Text style={styles.container}>karma:{karma}</Text>
                        <Text style={styles.container}>PP:{PP}</Text>
                    </View>
                :
                    <Text style={styles.container}>Hello {username}, you've got {karma} karma and {golds} golds. And your description
                        is: {description}.Cake day: {cake} and your profile picture is:{PP}</Text>
            }
            <StatusBar style="auto" />
        </View>)
}
const styles = StyleSheet.create({
    container: {
        color: 'white',
    },
});