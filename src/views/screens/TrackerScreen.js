import React from "react";
import {View,Image,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Card from "../components/cards";

export default function TrackerScreen({navigation}){
    return(

        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.titleHeading}>Tracker</Text>
              
            </View>

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
    titleContainer:{
        height:"10%",
        display:"flex",
        marginBottom: 30,
        backgroundColor: "#6A6DB0",
        
    },

titleHeading:{

    fontSize: 30,
        textAlign: "center",
        color: 'white',
        margin: 15

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

