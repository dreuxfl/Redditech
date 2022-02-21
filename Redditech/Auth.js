import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import { Button } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

const id = 'lDIG15lBBgtfMwJwSp0guQ'; // à changer en fonction de l'id de l'appli sur https://www.reddit.com/prefs/apps

const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function Auth() {

    const [token, onChangeToken] = React.useState('');

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: id,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                native: "exp://localhost:19000"
            }),

        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {

            onChangeToken(response.params.code);

            const saveToken = async () => {

                try {
                    await SecureStore.setItemAsync("token", token);
                    let result = await SecureStore.getItemAsync("token");
                    if (result) {
                        alert("🔐 Here's your value 🔐 \n" + result);
                    } else {
                        alert('No values stored under that key.');
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            saveToken();

        }

    }, [response,token]);

    return (
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
    );
}