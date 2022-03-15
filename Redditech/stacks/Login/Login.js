import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, ResponseType, useAuthRequest} from 'expo-auth-session';
import {StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

//const id = '1K5vNBLfywoWdVUFsThxXg'; // à changer en fonction de l'id de l'appli sur https://www.reddit.com/prefs/apps
const id ='KQj-_0KclqlE6l1Mwv3ABA'

const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token.',
};

export default function Login({ navigation }) {

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: id,
            scopes: ['*'],
            redirectUri: makeRedirectUri({
                scheme: 'com.redditech://'
            }),
        },
        discovery
    );

    const saveToken = async (newToken) => {
        await SecureStore.setItemAsync("token", newToken);
    }

    React.useEffect(() => {
        if (response?.type === 'success') {

            const newToken = response.authentication.accessToken;

            saveToken(newToken).then(navigation.navigate("Home"))
        }

    }, [response]);


    return(
        <View style={styles.login}>

            <View style={styles.loginItems}>
                <Image source={require('../../components/Images/Round_reddit_white_title.png')} style={styles.logo}/>

                <TouchableOpacity
                    onPress={()=>{promptAsync()}}
                    style={styles.button} >
                    <Image source={require('../../components/Images/Round_reddit.png')} style={styles.buttonImage}/>
                    <Text style={styles.buttonText}>Sign into Reddit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    loginItems : {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    logo: {
        width:250,
        height:250,

    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderRadius: 32,
        backgroundColor: '#118ab2',
    },
    buttonImage : {flex: 1 , height: 55 },
    buttonText : {flex: 3, textAlign:'center'},
    login:{
        flex: 1,
        backgroundColor: '#2c2f33',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
