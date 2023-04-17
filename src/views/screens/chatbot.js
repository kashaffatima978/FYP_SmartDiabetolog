import React from "react";
import {View,Image,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Card from "../components/cards";
import { Heading } from "../components/Heading";


// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import ViewBloodSugar from "./ViewBloodSugar";
// import ViewBloodPressure from "./ViewBloodPressure";
// import ViewCholesterol from "./ViewCholesterol";

// const Tab = createMaterialTopTabNavigator();


export default function Chatbot({navigation}){
    return(

        <View style={styles.container}>
            <Heading name="ChatBot"/>

            <ScrollView style={styles.scroll}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Dashboard")
                }
                    }>
                    <Card style={styles.card} title="Dashboard" imageSource={require("../../../assets/Images/bloogsugar.jpg")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    navigation.navigate("ViewBloodPressure")
                }}>
                    <Card style={styles.card} title="Live Chat" imageSource={require("../../../assets/Images/bloodPressure.jpg")}/>
                </TouchableOpacity>

            </ScrollView>

        </View>

    )

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white"
    },

scroll:{
    height:"80%",
    width:"100%",
},
cardStyle:{
    margin: 15,
    backgroundColor: 'green'
}
})

