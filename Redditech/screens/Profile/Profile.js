import axios from 'axios';
import {StyleSheet, Text, View, Image, TouchableOpacity, Modal} from 'react-native';
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import moment from "moment";
import Logout from "../../components/Logout/Logout";
import Settings from "../../stacks/Settings/Settings";

const REDDIT_API = "https://oauth.reddit.com/api/v1"
//const USER_AGENT = "cringeApp.client by FloaNDR13009" //à modifier en fonction de votre utilisateur et client reddit
const USER_AGENT = "sadcringe.client by redditech_sadcringe" //à modifier en fonction de votre utilisateur et client reddit

export default function Profile({ navigation }) {

    const [modal, setModal] = React.useState(false);
    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [createdAt, setCreatedAt] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const [friends, setFriends] = React.useState(null);
    const [karma, setKarma] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    const fetchToken = () => {
        return new Promise(async (resolve, reject) => {
            try{
                let result = await SecureStore.getItemAsync("token");
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }


    const getData = () => {

        let headers = {
            'Authorization': `bearer ${token}`,
            'User-Agent': USER_AGENT
        }

        axios.get(REDDIT_API + "/me", {
            headers : headers
        }).then((response) => {
            setUsername(response.data.name);
            setCreatedAt(response.data.created_utc);
            setFriends(response.data.num_friends)
            setAvatar(response.data.snoovatar_img);
            setKarma(response.data.total_karma);
            setDescription(response.data.subreddit.public_description)

        }).catch((error) => {
            console.log(error)
        });
    }

    React.useEffect(()=>{

        if(token){
            getData();
        } else {

            fetchToken().then( (res) => {
                if(res){ //if there is no token in the state then fetch it
                    setToken(res);
                    console.log(`Profile token not null : ${res}`);
                } else {
                    console.log("ERROR ALED ALED") ;
                }
            });
        }

    },[token]);


    return (
            <View style={styles.profile}>

                <View><Image style={styles.img_avatar} source={{uri: avatar}}/></View>
                <View style={styles.position}><View style={styles.input_datas }><Text style={styles.text_datas}>Name : {username}</Text></View></View>
                <View style={styles.position}>
                    <View style={styles.input_datas2}><Text style={styles.text_datas}>Friends : {friends}</Text></View>
                    <View style={styles.input_datas2}><Text style={styles.text_datas}>Karma : {karma}</Text></View>
                </View>
                <View style={styles.position}><View style={styles.input_datas}><Text style={styles.text_datas}>Birthday cake : {moment.unix(parseInt(createdAt)).format("DD/MM/YYYY")}</Text></View></View>
                <View style={styles.position}><View style={styles.input_datas3}><Text style={styles.text_datas}>Description :</Text>
                    <Text style={styles.text_datas}> {description}</Text></View>
                </View>
                <View style={styles.position}>
                    <Modal
                        animationType="slide"
                        presentationStyle={"overFullScreen"}
                        visible={modal}
                        onRequestClose={() => {
                            setModal(!modal);
                        }}
                    >
                    <View style={styles.centeredView}>
                        <View>
                            <Settings />

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal(!modal)}
                            >
                                <Text style={styles.text_datas}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                    <TouchableOpacity style={styles.input_button} onPress={() => setModal(!modal)}>
                        <Text style={styles.text_datas}>Settings</Text>
                    </TouchableOpacity>
                    <Logout navigation={navigation}/>
                </View>
            </View>
        )
}
const styles = StyleSheet.create({
    profile:{
        flex: 1,
        backgroundColor: '#2c2f33',
        alignItems: 'center',
        justifyContent: 'center',
        color:'white',
    },
    img_avatar: {
        width: 127,
        height: 200,
        marginBottom: 10,
        marginTop: 25,
    },
    input_datas:{
        backgroundColor:'#118ab2',
        borderRadius:53,
        padding: 6,
        width:'100%',
        alignItems:'center',
    },
    input_datas2:{
        backgroundColor:'#118ab2',
        borderRadius:53,
        padding: 6,
        width:'48%',
    },
    input_datas3:{
        backgroundColor:'#118ab2',
        borderRadius:13,
        padding: 10,
        width:'100%',
    },
    input_button:{
        backgroundColor:'#2c2f33',
        borderColor:'#094e65',
        borderWidth:2,
        borderRadius:53,
        padding: 6,
        width:'48%',
        alignItems:'center',
    },
    logout:{
        backgroundColor:'#f85f6a',
        borderColor:'#35424a',
        borderWidth:2,
        borderRadius:53,
        padding: 6,
        width:'48%',
        alignItems:'center'
    },
    text_datas:{
        color:'white',
        fontSize:12,
        margin:4,
    },
    position:{
        flexDirection:'row',
        alignItems:'center',
        padding: 6,
        marginHorizontal:10,
        width:'90%',
        justifyContent:'space-between'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonClose: {
        backgroundColor: "#f85f6a",
        marginBottom: 74
    },
    button: {
        flexDirection: "row",
        marginVertical: 20,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderWidth:2,
        borderRadius:53,
        backgroundColor:'#2c2f33',
        borderColor:'#094e65',
    },
});