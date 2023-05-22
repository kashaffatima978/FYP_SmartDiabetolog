import React from "react";
import {View,Image,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Card from "../components/cards";
import { Heading } from "../components/Heading";
import Dashboard from "./dashboard";
import Chat from "./chat";


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import ViewBloodSugar from "./ViewBloodSugar";
// import ViewBloodPressure from "./ViewBloodPressure";
// import ViewCholesterol from "./ViewCholesterol";

const Tab = createMaterialTopTabNavigator();

export default function Chatbot({navigation}){
    return(
        <>
        <Heading name="Community" />

         <Tab.Navigator>
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Dashboard" component={Dashboard} />
        </Tab.Navigator >
        </>
       

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

