import {NavigationContainer} from "@react-navigation/native";
import StackNav from "../StackNav/StackNav";
import {StyleSheet} from "react-native";

export default function App() {

    return(
        <NavigationContainer>
            <StackNav/>
        </NavigationContainer>
    )
}