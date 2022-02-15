import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const id = 'lDIG15lBBgtfMwJwSp0guQ'; // à changer en fonction de l'id de l'appli sur https://www.reddit.com/prefs/apps

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function Auth() {
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
            const { code } = response.params;
            console.log(code);
        }
    }, [response]);

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