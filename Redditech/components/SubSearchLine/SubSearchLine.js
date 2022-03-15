import React, {useEffect} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { Text, Card } from 'react-native-elements';

export default function SubSearch({ subData }) {

    const [subReddit] = React.useState(subData);

    return(
        <View style={styles.searchResult}>
            <Text>r/{subReddit.name}</Text>
            <TouchableOpacity style={styles.input_button}>
                <Text style={styles.text_datas}>Subscribe</Text>
            </TouchableOpacity>



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

