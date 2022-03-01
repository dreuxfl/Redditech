import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Login from "../../stacks/Login/Login";
import axios from 'axios';
import Logout from "../../components/Logout/Logout";
import Profile from "../Profile/Profile";

const REDDIT_API = "https://oauth.reddit.com/api/v1"
//const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Home({ navigation }) {

    const [token, setToken] = React.useState('');

    const fetchToken = () => {
        return new Promise(async (resolve, reject) => {
            try{
                let result = await SecureStore.getItemAsync("token");
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }

    React.useEffect( () => {
        if(token){

            let headers = {
                'Authorization': `bearer ${token}`,
                'User-Agent': USER_AGENT
            }

            axios.get(REDDIT_API + "/me", {
                headers : headers
            }).then((response) => {
                console.log("Home Request successful")

            }).catch((error) => {
                console.log(error)
            });

            //displayPosts();

        } else {
            fetchToken().then((res) => {

                if(res){
                    setToken(res);
                } else {
                    navigation.navigate("Login");
                }
            });
        }

    }, [token])
    return (
        <View style={styles.home}>
            <Logout/>
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
