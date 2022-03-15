import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import SubSearchLine from "../../components/SubSearchLine/SubSearchLine";

const REDDIT_API = "https://oauth.reddit.com/api/v1"

//const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Search({ navigation }) {

    const [searchValue, setSearchValue] = React.useState();
    const [token, setToken] = React.useState('');
    const [subreddits, setSubreddits] = React.useState([])
    const [posts, setPosts] = React.useState([]);

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
    const searchSubreddits = () => {
        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }
        axios.get(`https://oauth.reddit.com/api/subreddit_autocomplete?query=${searchValue}&include_over_18=true`,{
            headers: headers//get subreddits
        }).then((response) => {
            setSubreddits(response.data.subreddits);

        }).catch((e) => {
            console.log(`Post fetch error`);
        })
    }

    React.useEffect( () => {
        searchSubreddits();
    }, [searchValue]);

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
                    style={styles.input_datas2}
                    onChangeText={setSearchValue}
                    placeholder={"  Your research"}
                />
            </View>

            <View style={styles.search_results}>
                <ScrollView >
                    {
                        subreddits.map((subreddit) => {
                            return (

                                <SubSearchLine key={subreddit.name} subData={subreddit}>{subreddit.name}</SubSearchLine>

                            )
                        })
                    }
                </ScrollView>
            </View>
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
        alignItems:"stretch",
        margin : 5,
        paddingTop: 30,
        paddingRight: 15
    },
    logo: {
        width:200,
        height:60
    },

    input_datas2:{
        flex:1,
        backgroundColor:'#094E65',
        borderRadius:32,
        marginBottom:7,
        borderWidth:1,
        borderColor:'#118AB2',
        width:'40%',
    },
    search_results:{
        alignSelf:"center",
        flex:1,
        width:"80%",
        margin:5,

    }
});
