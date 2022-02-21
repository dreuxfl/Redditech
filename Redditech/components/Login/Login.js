import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, ResponseType, useAuthRequest} from 'expo-auth-session';
import { Button, Text } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const id = '1K5vNBLfywoWdVUFsThxXg'; // à changer en fonction de l'id de l'appli sur https://www.reddit.com/prefs/apps

const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token.compact',
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

        }

    }, [response,token]);

    if(token == '') {
        return (
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
        );
    } else {
        return (
            <Text>
                You are currently connected to reddit as : {token}
            </Text>
        );
    }
}