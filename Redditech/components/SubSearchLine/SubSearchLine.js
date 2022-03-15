import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import { Text, Card } from 'react-native-elements';

export default function SubSearch({ subData }) {

    const [subReddit] = React.useState(subData);

    return(
        <>
            <Text>r/{subReddit.name}</Text>
        </>
    )
    const styles = StyleSheet.create({

    });
}