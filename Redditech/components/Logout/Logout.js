import React from "react";
import * as SecureStore from "expo-secure-store";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function Logout({ navigation }) {

    async function deleteRedditToken() {

        let access_token = await SecureStore.getItemAsync("token");
        if (access_token !== null) {
            await SecureStore.deleteItemAsync("token");
            Alert.alert('Logout', 'You are now logged out', [
                {text: "Ok"}
            ]);
             navigation.goBack();
        }
    }
    return (
        <View style={styles.position}>
            <TouchableOpacity
                style={styles.logout}
                onPress={() => {deleteRedditToken()}}
                >
                <Text style={styles.text_datas}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    logout: {
        borderColor:'#35424a',
        backgroundColor:'#f85f6a',
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
});
