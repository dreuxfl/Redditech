import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Login from "../../stacks/Login/Login";
import axios from 'axios';
import Logout from "../../components/Logout/Logout";
import Profile from "../Profile/Profile";

const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit

export default function Home({ navigation }) {

    const [token, setToken] = React.useState(null);

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
            <Profile/>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#2c2f33',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
