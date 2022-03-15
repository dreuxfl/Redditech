import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import { Text, Card } from 'react-native-elements';

export default function Post({ title, author, subreddit, contentType, content, votes, imageSrcUri }) {

    const [data] = React.useState(
        {
            "title": title,
            "author" : author,
            "subreddit" : subreddit,
            "contentType" : contentType,
            "content" : content,
            "votes" : votes,
            "image" : imageSrcUri
        }
    );

    const styles = StyleSheet.create({
        post: {
            flex: 1,
            backgroundColor: '#094E65',
            margin : 10,
            padding : 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,

        },
        mainContent: {
            borderWidth:1,
            borderColor: '#118AB2',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            color:"#ebebeb",
            padding:5,
        },
        title: {
            flex: 1,
            flexDirection:"column",
            justifyContent:"space-around",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,

        },
        image : {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overlayColor: '#2c2f33',
            borderWidth:1,
            borderColor: '#118AB2',
            height:490

        },
        footer: {
            borderWidth:1,
            borderTopWidth:0,
            borderColor: '#118AB2',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
        },
        text: {
            color:"#ebebeb",
            padding:5,
        },
        fromBy : {
            flex: 1,
            flexDirection:"row",
            justifyContent: 'space-between',
            flexWrap:"wrap",
        }
    });

    useEffect(() => {
        console.log(data.contentType + " " + data.image)
    }, [data]);

    return (
        <Card containerStyle={styles.post}>

            {
                (data.contentType == "image") ? // is a text post ?
                    <View>
                        <Card.Image
                            style={styles.image}
                            source={{uri:data.image}}
                            resizeMode="cover"
                            />
                    </View>
                    :
                    <Text style={styles.mainContent}>{data.content}</Text>
            }


            <View style = {styles.footer}>
                <View style = {styles.title}>
                    <Card.Title style={styles.text}>{data.title}</Card.Title>
                </View>

                <View style={styles.fromBy}>
                    <Text style={styles.text}>From {data.subreddit}</Text>
                    <Text style={styles.text}>By {data.author}</Text>
                </View>
            </View>

        </Card>
    )

}

