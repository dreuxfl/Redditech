import React from 'react';
import {StyleSheet, Switch, View, Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Login from "../../stacks/Login/Login";
import axios from 'axios';


const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
//const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Settings({ navigation }) {

    const [token, setToken] = React.useState(null);
    const [bool_values, setBool_values ] = React.useState({over_18:false, video_autoplay:false, show_snoovatar:false, show_presence:false, email_chat_request:false, enable_followers:false})


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


    const bool_datas = () =>{
        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }
        axios.get(REDDIT_API + "/me/prefs", {
            headers : headers,

        }).then((response) => {
           setBool_values({
               'over_18':response.data.over_18,
               'video_autoplay':response.data.video_autoplay,
               'show_snoovatar':response.data.show_snoovatar,
               'show_presence':response.data.show_presence,
               'email_chat_request':response.data.email_chat_request,
               'enable_followers':response.data.enable_followers,
            })
        }).catch((error) => {
            console.log(error)
        });
    }
    const updateData = () =>{
        let headers = new Headers()
        headers.append('Authorization', `bearer ${token}`)

        let requete = {
            method:"patch",
            headers:headers,
            body:JSON.stringify(bool_values)
        }
        fetch("https://oauth.reddit.com/api/v1/me/prefs", requete).catch(error => console.log(error))
    }

    React.useEffect( () => {
        if(token){
            bool_datas()

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
    React.useEffect(() => {
        updateData()
        console.log(bool_values)
    }, [bool_values])

    return (
        <View style={styles.container}>
            <Text style={styles.settingsTitle}>Your Settings</Text>
            <View style={styles.modalCard}>
                <View style={styles.switch}>
                    <Text style={styles.switchText}> Are you over 18 ?</Text>
                    <Switch
                        trackColor={{ true: "#118ab2", false: "white" }}
                        thumbColor={bool_values.over_18 ? "white" : "white"}
                        onValueChange={() => setBool_values({ ...bool_values, over_18: !bool_values.over_18 })}
                        value={bool_values.over_18}
                    />
                </View>
                <View style={styles.switch}>
                    <Text style={styles.switchText}> Enabling followers ?</Text>
                    <Switch
                        trackColor={{ true: "#118ab2", false: "white" }}
                        thumbColor={bool_values.enable_followers ? "white" : "white"}
                        onValueChange={() => setBool_values({ ...bool_values, enable_followers: !bool_values.enable_followers })}
                        value={bool_values.enable_followers}
                    />
                </View>
                <View style={styles.switch}>
                    <Text style={styles.switchText}> Show presence ?</Text>
                    <Switch
                        trackColor={{ true: "#118ab2", false: "white" }}
                        thumbColor={bool_values.show_presence ? "white" : "white"}
                        onValueChange={() => setBool_values({ ...bool_values, show_presence: !bool_values.show_presence })}
                        value={bool_values.show_presence}
                    />
                </View>

                <View style={styles.switch}>
                    <Text style={styles.switchText}> show Snoovatar</Text>
                    <Switch
                        trackColor={{ true: "#118ab2", false: "white" }}
                        thumbColor={bool_values.show_snoovatar ? "white" : "white"}
                        onValueChange={() => setBool_values({ ...bool_values, show_snoovatar: !bool_values.show_snoovatar })}
                        value={bool_values.show_snoovatar}
                    />
                </View>

                <View style={styles.switch}>
                    <Text style={styles.switchText}> video autoplay ?</Text>
                    <Switch
                        trackColor={{ true: "#118ab2", false: "white" }}
                        thumbColor={bool_values.video_autoplay ? "white" : "white"}
                        onValueChange={() => setBool_values({ ...bool_values, video_autoplay: !bool_values.video_autoplay })}
                        value={bool_values.video_autoplay}
                    />
                </View>

                <View style={styles.switch}>
                    <Text style={styles.switchText}> Email chat request ?</Text>
                    <Switch
                        trackColor={{ true: "#118ab2", false: "white" }}
                        thumbColor={bool_values.email_chat_request ? "white" : "white"}
                        onValueChange={() => setBool_values({ ...bool_values, email_chat_request: !bool_values.email_chat_request })}
                        value={bool_values.email_chat_request}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
        alignItems: 'center',

    },
    modalCard: {
        marginTop: 35,
    },
    buttonTextStyle: {
        color: "white",
        fontWeight: "bold",
    },
    switchText: {
        marginTop: 14,
        marginRight: 40,
        color: 'white'
    },
    switch: {
        padding: 11,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    settingsTitle: {
        fontSize: 24,
        textAlign: "center",
        marginTop: 45,
        color: "white",
        fontWeight: "bold"
    },
});