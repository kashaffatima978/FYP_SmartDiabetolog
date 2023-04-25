import React from "react";
import {View,StyleSheet,Text} from "react-native";
import colors from "../../files/Colors";

export const Heading=(props)=>{
    return (
        <View style={styles.titleContainer}>
                <Text style={styles.titleHeading}>{props.name}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    titleContainer:{
        height:80,
        display:"flex",
        marginBottom: 10,
        backgroundColor: "#6A6DB0",
    },

    titleHeading:{

        fontSize: 30,
            textAlign: "center",
            color: 'white',
            margin: 15

    },
    
})