import React from "react";
import {View,Image,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Card from "../components/cards";
import { Heading } from "../components/Heading";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FAB } from 'react-native-paper';

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import ViewBloodSugar from "./ViewBloodSugar";
// import ViewBloodPressure from "./ViewBloodPressure";
// import ViewCholesterol from "./ViewCholesterol";

// const Tab = createMaterialTopTabNavigator();


export default function TrackerScreen({navigation}){
    return(

        <View style={styles.container}>
            
            <Heading name="Tracker"/>
            {/* <Tab.Navigator>
                <Tab.Screen name="BloodSugar" component={ViewBloodSugar} />
                <Tab.Screen name="BloodPressure" component={ViewBloodPressure} />
                <Tab.Screen name="Cholesterol" component={ViewCholesterol} />
                {/* <Tab.Screen name="Dinner" component={DinnerPage} /> */}
                {/* <Tab.Screen name="Snack" component={Snack} /> */}
            {/* </Tab.Navigator> */} 

            <ScrollView style={styles.scroll}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("ViewBloodSugar")
                }
                    }>
                    <Card style={styles.card} title="Blood Sugar" imageSource={require("../../../assets/Images/bloogsugar.jpg")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    navigation.navigate("ViewBloodPressure")
                }}>
                    <Card style={styles.card} title="Blood Pressure" imageSource={require("../../../assets/Images/bloodPressure.jpg")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    navigation.navigate("ViewCholesterol")
                }}>
                    <Card style={styles.card} title="Cholesterol" imageSource={require("../../../assets/Images/cholestrol.jpg")}/>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{height:"5%",backgroundColor:"#6A6DD0",width:"10%",marginLeft:"2%",alignItems:"center",justifyContent:"center" }} onPress={()=>{
                    navigation.replace("Home")
                }}>
                    <Icon name="long-arrow-left" style={styles.iconStyle}></Icon>
                </TouchableOpacity> */}
                
            </ScrollView>
            <FAB
                style={styles.fab}
                small
                icon="arrow-left"
                color='white'
                // disabled={props.isDisabled}
                onPress={() => {
                    navigation.replace("Home")
                }}
            />

        </View>

    )

}

const styles=StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        backgroundColor: '#6A6DB0'
      },
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
}, 
iconStyle:{
    fontSize:18,
    color:'white',
    marginHorizontal:5
}
})

