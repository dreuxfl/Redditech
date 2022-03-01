import axios from 'axios';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as SecureStore from "expo-secure-store";
import * as React from "react";

const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
//const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Profile({ navigation }) {

    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [createdAt, setCreatedAt] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const [friends, setFriends] = React.useState(null);
    const [karma, setKarma] = React.useState(null);

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


    const getData = () => {

        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }

        axios.get(REDDIT_API + "/me", {
            headers : headers
        }).then((response) => {
            setUsername(response.data.name);
            setCreatedAt(response.data.created_utc);
            setFriends(response.data.num_friends)
            setAvatar(response.data.snoovatar_img);
            setKarma(response.data.total_karma);
            
        }).catch((error) => {
            console.log(error)
        });
    }

    React.useEffect(()=>{

        if(token){
            getData();
        } else {

            fetchToken().then( (res) => {
                if(res){ //if there is no token in the state then fetch it
                    setToken(res);
                    console.log(`Profile token not null : ${res}`);
                } else {
                    console.log("ERROR ALED ALED") ;
                }
            });
        }

    },[token]);


    return (
        <View style={styles.profile}>
            <Text>Something went wrong... </Text>
            <Text>username:{username}</Text>
            <Text>cake:{createdAt}</Text>
            <Text>Friends:{friends}</Text>
            <Text>karma:{karma}</Text>
            <Image source={{uri: avatar}}/>

        </View>
        )
}
const styles = StyleSheet.create({
    profile:{
        flex: 1,
        backgroundColor: '#2c2f33',
        alignItems: 'center',
        justifyContent: 'center',
        color:'white',
    }
});