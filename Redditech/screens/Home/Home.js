import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Post from "../../components/Post/Post";
import {Picker} from '@react-native-picker/picker';
const REDDIT_API = "https://oauth.reddit.com/api/v1"
const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
//const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Home({ navigation }) {

    const [token, setToken] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const [selectedFilter, setSelectedFilter] = React.useState('hot')

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

    const displayNPosts = (n, filter) => {
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
                console.log(selectedFilter)
                displayNPosts(numberOfPosts, selectedFilter);

            }).catch((error) => { // fetch of user info hasn't worked -> token has expired
                console.log("Token is dead, returning to login");
                navigation.navigate("Login");
            });
        }
    }, [token, selectedFilter])
    return (
        <View style={styles.home}>

            <View style={styles.header}>
                <Image source={require('../../components/Images/Round_reddit_white_title_flex.png') } style={styles.logo}/>

                <View style={styles.filter}>
                    <Picker
                        style={{flex:1}}
                        selectedValue={selectedFilter}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedFilter(itemValue)
                        }>
                        <Picker.Item label="Hot" value="hot" />
                        <Picker.Item label="New" value="new" />
                        <Picker.Item label="Best" value="best" />
                        <Picker.Item label="Top" value="top" />
                        {/*<Picker.Item label="Top of all time" value="topAllTime" />*/}
                        {/*<Picker.Item label="Top of past year" value="topPastYear" />*/}
                        {/*<Picker.Item label="Top of past month" value="topPastMonth" />*/}
                        {/*<Picker.Item label="Top of past week" value="topPastWeek" />*/}
                        {/*<Picker.Item label="Random" value="random" />*/}
                    </Picker>
                </View>


            </View>

            <ScrollView>
                {
                    posts.map((post) => {
                        return (

                            <Post
                                key={post.data.id}
                                title={post.data.title}
                                author={post.data.author}
                                subreddit={post.data.subreddit_name_prefixed}
                                contentType={post.data.post_hint}
                                content={post.data.selftext}
                                ups={post.data.ups}
                                downs={post.data.downs}
                                imageSrcUri={post.data.url_overridden_by_dest}
                            />
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
        paddingRight: 15
    },
    filter:{
        flex:1,
        backgroundColor: '#094E65',
        borderRadius: 32,
        marginBottom: 10,
        borderWidth:1,
        borderColor: '#118AB2',

  },
    logo: {
        width:200,
        height:60
    },
});
