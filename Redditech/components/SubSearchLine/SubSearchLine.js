import React, {useEffect} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { Text, Card } from 'react-native-elements';
import axios from "axios";

export default function SubSearch({ subData, token, queryHeaders }) {

    console.log(token)
    const [subReddit] = React.useState(subData);
    const [subbed, setSubbed]= React.useState(false);

    const subscribe = () =>  {
        axios.post(`https://oauth.reddit.com/api/subscribe?action=sub&sr=${subReddit.id}`, {},{
            headers: queryHeaders
        }).then((response) => {
            console.log(`Subbed to r/${subReddit.name}`);
            setSubbed(true);

        }).catch((error) => {
            console.log("Sub error");
        });
    }
    return(
        <View style={styles.searchResult}>
            <Text style={{color:subReddit.primaryColor||"white"}}>r/{subReddit.name}</Text>

            {
                (subbed) ?
                    <TouchableOpacity style={styles.input_button} disabled={true}>
                        <Text style={styles.text_datas}>Subbed !</Text>
                    </TouchableOpacity>
                :

                    <TouchableOpacity style={styles.input_button} onPress={() => subscribe()}>
                        <Text style={styles.text_datas}>Subscribe</Text>
                    </TouchableOpacity>
            }


        </View>
    );

}

const styles = StyleSheet.create({
    searchResult:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding: 1,

    },
    text_datas:{
        color:'white',
        fontSize:12,
    },
    input_button:{
        backgroundColor:'#2c2f33',
        borderColor:'#094e65',
        borderWidth:2,
        borderRadius:53,
        padding: 6,
        alignItems:'center',
        width: 100
    },
});

