import React, {useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import { Text, Card, Button, Icon } from 'react-native-elements';

export default function Post({ title, author, subreddit, contentType, content, votes, imageSrcUri }) {

    const [data] = React.useState(
        {
            "title": title,
            "author" : author,
            "subreddit" : subreddit,
            "contentType" : contentType,
            "content" : content,
            "votes" : votes,
            "image" : imageSrcUri,
        }
    );

    useEffect(() => {
        console.log(data.contentType + " " + data.image)
    }, [data]);

    return (
        <Card containerStyle={styles.post}>

            {
                (data.contentType === "image") ? // is a text post ?
                    <Card.Image
                        source={{uri:data.image}}
                        style={styles.image}/>
                    :
                    <Text style={styles.text}>{data.content}</Text>
            }

            <View style = {styles.title}>
                <Card.Title style={styles.text}>{data.title}</Card.Title>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text}>From {data.subreddit}</Text>
                <Text style={styles.text}>By {data.author}</Text>
            </View>


        </Card>
    )
}

const styles = StyleSheet.create({
    post: {
        flex: 1,
        backgroundColor: '#094E65',
        borderColor: '#118AB2',
        margin : 10,
        padding : 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    title: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"space-around",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    image : {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    text: {
        color:"#ebebeb",
        padding:5,
    },
    footer : {
        flex: 1,
        flexDirection:"row",
        justifyContent: 'space-between',
        flexWrap:"wrap",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    }
});
