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
        console.log(`${REDDIT_API}/search_subreddits?query=${searchValue}`)
        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }
        axios.get(`https://oauth.reddit.com/api/subreddit_autocomplete?query=${searchValue}&include_over_18=true`,{
            headers: headers//get subreddits
        }).then((response) => {
            console.log(response)
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

            </View>
            <View style={styles.switch}>

                <TextInput
                    style={styles.input_datas2}
                    onChangeText={setSearchValue}
                    placeholder={"Your research"}
                />

                <TouchableOpacity style={styles.input_button}  onPress={searchSubreddits} >
                    <Text style={styles.text_datas}>Search</Text>
                </TouchableOpacity>

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
        alignItems:"flex-start",
        margin : 5,
        paddingTop: 30,
        paddingRight: 15
    },
    logo: {
        width:200,
        height:60
    },
    switch: {

        padding: 11,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    text_datas:{
        color:'white',
        fontSize:12,
        margin:4,
    },
    input_datas2:{
        backgroundColor:'#118ab2',
        borderRadius:53,
        padding: 6,
        width:'48%',
    },
    input_button:{
        backgroundColor:'#2c2f33',
        borderColor:'#094e65',
        borderWidth:2,
        borderRadius:53,
        padding: 6,
        width:'25%',
        alignItems:'center',
    },
    search_results:{
        alignSelf:"center",
        flex:1,
        width:"80%",
        margin:5,

    }
});
