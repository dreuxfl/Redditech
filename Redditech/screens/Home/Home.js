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
                console.log(result)
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }


    const displayNPosts = (n) => {
        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }

        axios.get("https://oauth.reddit.com/subreddits/mine/subscriber", { //get subreddits
            headers : headers
        }).then((response) => {

            let subscribedSubreddits = response.data.data.children;

            let posts = [];
            subscribedSubreddits.forEach( (subreddit) => {

                let url = subreddit.data.url


                axios.get(`https://oauth.reddit.com${url}hot`, {
                    headers : headers
                }).then((response) => {
                    console.log(`${response.data.data.children.length} posts from ${response.data.data.children[0].data.subreddit}`)

                    response.data.data.children.forEach( (post) => {
                        let postData = post.data

                        if (postData.distinguished) {

                            // admin and mod posts are not to be displayed
                            // if post is admin or mod then post.data.distinguished == "mod" or "admin" else null
                            console.log(postData.distinguished + " post");

                        } else {
                            console.log(`Author is ${postData.author}, subreddit is ${postData.subreddit}`);
                        }

                    })


                }).catch((error) => {
                    console.log(error)
                });
                // fetchNPosts(n, url, headers).then( (posts) => {
                //     console.log(posts);
                    // posts.foreach((post) => {
                    //     if (post.data.distinguished) {
                    //
                    //         // admin and mod posts are not to be displayed
                    //         // if post is admin or mod then post.data.distinguished == "mod" or "admin" else null
                    //         console.log(post.data.distinguished + " post");
                    //
                    //     } else {
                    //         console.log(`Author is ${post.data.author_fullname}, subreddit is ${post.data.subreddit}`);
                    //     }
                    // });

                // });

            });


        }).catch((error) => {
            console.log("Subreddit fetch error")
            console.log(error)
        });

    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            fetchToken().then((res) => {

                if(res){
                    setToken(res);

                } else {
                    navigation.navigate("Login");
                }
            });
        });
    }, [navigation]);

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
                displayNPosts(20);

            }).catch((error) => { // fetch of user info hasn't worked -> token has expired
                console.log("Token is dead, returning to login");
                navigation.navigate("Login");
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
