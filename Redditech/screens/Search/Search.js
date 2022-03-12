import React from 'react';
import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Post from "../../components/Post/Post";
import {onChangeText} from "react-native/Libraries/DeprecatedPropTypes/DeprecatedTextInputPropTypes";

const REDDIT_API = "https://oauth.reddit.com/api/v1"

const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
//const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Home({ navigation }) {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [token, setToken] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const [selectedFilter, setSelectedFilter] = React.useState(null)

    const numberOfPosts = 25;
    const fetchToken = () => {
        return new Promise(async (resolve, reject) => {
            try{
                let result = await SecureStore.getItemAsync("token");
                console.log(result)
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }
    const displayNPostsV2 = () => {
        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }
        let params = {
            'q':q,
        }

        axios.get(`https://oauth.reddit.com/subreddits/search.json`,  { //get subreddits
            headers : headers,
            params : params

        }).then((response) => {
            console.log(response)
        }).catch((e) => {
            console.log(`Post fetch error`);
        })
    }


    React.useEffect(() => {
        console.log(posts.length);
    }, [posts])

    React.useEffect(() => {
        if(token)
        {
            let headers = {
                'Authorization': `bearer ${token}`,
                'User-Agent': USER_AGENT
            }

            axios.get(REDDIT_API + "/me", {
                headers: headers
            }).then((response) => {
                console.log("Home Request successful, token valid");
                displayNPostsV2(numberOfPosts, "hot");

            }).catch((error) => { // fetch of user info hasn't worked -> token has expired
                console.log("Token is dead, returning to login");
                navigation.navigate("Login");
            });
        }
    }, [token])
    return (
        <View style={styles.home}>

            <View style={styles.header}>

                <Image source={require('../../components/Images/Round_reddit_white_title_flex.png') } style={styles.logo}/>
                <TextInput
                    style={styles.logo}
                    onchangeText={q => onChangeText(q)}
                    value={q}
                    placeholder={"Your research"}
                />
            </View>

            <ScrollView>
                {
                    posts.map((post) => {
                        return (

                            <Post
                                key={Math.random() * ( numberOfPosts - 1 ) + 1}
                                title={post.data.title}
                                author={post.data.author}
                                subreddit={post.data.subreddit_name_prefixed}
                                contentType={post.data.post_hint}
                                content={post.data.selftext}
                                imageSrcUri={post.data.url_overridden_by_dest}/>

                        )
                    })
                }
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    home: {
        flex:1,
        justifyContent:"center",
        alignItems:"flex-start",
        backgroundColor: '#2c2f33',
    },
    header : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-start",
        margin : 5,
        paddingTop: 30,
    },
    logo: {
        width:200,
        height:60
    },
});
