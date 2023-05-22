import React from "react";
import {View,Image,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Card from "../components/cards";
import { Heading } from "../components/Heading";
import Dashboard from "./dashboard";
import Chat from "./chat";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';



import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import ViewBloodSugar from "./ViewBloodSugar";
// import ViewBloodPressure from "./ViewBloodPressure";
// import ViewCholesterol from "./ViewCholesterol";

const Tab = createMaterialTopTabNavigator();

export default function Chatbot({navigation}){
    return(
        <>
        <Heading name="Community" />

         <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chat') {
            iconName = focused
              ? 'comment-dots'
              :'comment-dots';
          } 
          else if (route.name === 'Dashboard') {
            iconName = focused ? 'question' : 'question';
          }
        
          // You can return any component that you like here!
          return <Icon name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: '#6A6DB0',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      
      })}>
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'QnA', }}/>
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

