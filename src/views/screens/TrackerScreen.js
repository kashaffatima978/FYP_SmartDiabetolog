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

