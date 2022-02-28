import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, ResponseType, useAuthRequest} from 'expo-auth-session';
import {StyleSheet, Button, Text, TouchableOpacity, View, Image } from 'react-native';
import ImageAnalyticsTagContext from "react-native/Libraries/Image/ImageAnalyticsTagContext";

WebBrowser.maybeCompleteAuthSession();

const id = 'KQj-_0KclqlE6l1Mwv3ABA'; // à changer en fonction de l'id de l'appli sur https://www.reddit.com/prefs/apps

const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token.',
};

export default function Login() {

    const [token, onChangeToken] = React.useState('');

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: id,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'com.redditech://'
            }),
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {

            const token = response.authentication.accessToken;
            const saveToken = async () => {

                try {
                    await SecureStore.setItemAsync("token", token);

                    let result = await SecureStore.getItemAsync("token");

                    if (result) {
                        onChangeToken(result);
                        alert("🔐 Here's your access token 🔐 \n" + result);
                    } else {
                        alert('UNEXPECTED ERROR');
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            saveToken();
            console.log(token)
        }

    }, [response,token]);

    if(token == '') {
        return (
            <View>
                <Image source={require('../Images/Round_reddit_white_title.png')} style={{width:250, height:250}}/>
                <Text>Log into reddit to start using this app !</Text>
                <TouchableOpacity
                    onPress={()=>{promptAsync()}}
                    style={styles.button} >
                    <Image source={require('../Images/Round_reddit.png')} style={{width: 30 , height: 30 }}/>
                    <Text>Sign into Reddit</Text>

                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <Text>
                You are currently connected to reddit as : {token}
            </Text>
        );
    }
}
const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        borderRadius:32,
        backgroundColor: '#118ab2',
    }
})