import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Login from "../../stacks/Login/Login";
import axios from 'axios';
import Logout from "../../components/Logout/Logout";
import Post from "../../components/Post/Post";

const REDDIT_API = "https://oauth.reddit.com/api/v1"

//const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Home({ navigation }) {

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


    // const displayNPostsV1 = (n) => {
    //     let headers = {
    //         'Authorization': `bearer ${token}`,
    //         'User-Agent': USER_AGENT
    //     }
    //
    //     axios.get("https://oauth.reddit.com/subreddits/mine/subscriber", { //get subreddits
    //         headers : headers
    //     }).then((response) => {
    //
    //         let subscribedSubreddits = response.data.data.children;
    //
    //         let posts = [];
    //         subscribedSubreddits.forEach( (subreddit) => {
    //
    //             let url = subreddit.data.url
    //
    //
    //             axios.get(`https://oauth.reddit.com${url}hot?limit=10`, {
    //                 headers : headers
    //             }).then((response) => {
    //                 console.log(`${response.data.data.children.length} posts from ${response.data.data.children[0].data.subreddit}`)
    //
    //                 response.data.data.children.forEach( (post) => {
    //                     let postData = post.data
    //
    //                     if (postData.distinguished) {
    //
    //                         // admin and mod posts are not to be displayed
    //                         // if post is admin or mod then post.data.distinguished == "mod" or "admin" else null
    //                         console.log(postData.distinguished + " post");
    //
    //                     } else {
    //                         console.log(`Author is ${postData.author}, subreddit is ${postData.subreddit}`);
    //                     }
    //
    //                 })
    //
    //
    //             }).catch((error) => {
    //                 console.log(error)
    //             });
    //             // fetchNPosts(n, url, headers).then( (posts) => {
    //             //     console.log(posts);
    //                 // posts.foreach((post) => {
    //                 //     if (post.data.distinguished) {
    //                 //
    //                 //         // admin and mod posts are not to be displayed
    //                 //         // if post is admin or mod then post.data.distinguished == "mod" or "admin" else null
    //                 //         console.log(post.data.distinguished + " post");
    //                 //
    //                 //     } else {
    //                 //         console.log(`Author is ${post.data.author_fullname}, subreddit is ${post.data.subreddit}`);
    //                 //     }
    //                 // });
    //
    //             // });
    //
    //         });
    //
    //
    //     }).catch((error) => {
    //         console.log("Subreddit fetch error")
    //         console.log(error)
    //     });
    //
    // }

    const displayNPostsV2 = (n, filter) => {
        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }

        axios.get(`https://oauth.reddit.com/${filter}?limit=${n}`, { //get subreddits
            headers : headers
        }).then((response) => {
            console.log(`Fetched ${response.data.data.children.length} posts`);

            setPosts(response.data.data.children);
        }).catch((e) => {
            console.log(`Post fetch error`);
        })
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
                {/*<Picker*/}
                {/*    selectedValue={selectedFilter}*/}
                {/*    onValueChange={(itemValue, itemIndex) =>*/}
                {/*        setSelectedFilter(itemValue)*/}
                {/*    }>*/}
                {/*    <Picker.Item label="Hot" value="hot" />*/}
                {/*    <Picker.Item label="New" value="new" />*/}
                {/*    <Picker.Item label="Top of all time" value="topAllTime" />*/}
                {/*    <Picker.Item label="Top of past year" value="topPastYear" />*/}
                {/*    <Picker.Item label="Top of past month" value="topPastMonth" />*/}
                {/*    <Picker.Item label="Top of past week" value="topPastWeek" />*/}
                {/*    <Picker.Item label="Random" value="random" />*/}
                {/*</Picker>*/}
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
        justifyContent:"flex-start",
        alignItems:"flex-start",
        margin : 5,
        paddingTop: 30,
    },
    logo: {
        width:200,
        height:60
    },
});
