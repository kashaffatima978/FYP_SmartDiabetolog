import React from "react";
import {View,Image,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Card from "../components/cards";

export default function TrackerScreen({navigation}){
    return(
        <SafeAreaView style={generalStyles.container}>
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Image 
                 source={require("../../../assets/Images/trackerHead.jpg")} 
                style={styles.trackerImage} resizeMode="contain"/>
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
        </SafeAreaView>
    )

}

const styles=StyleSheet.create({
    container:{
        // height:"100%",
        // width:"100%",
        flex:1,
        backgroundColor: "white"
    },
    titleContainer:{
        height:"25%",
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",

        borderRadius:50
    },
trackerImage:{
    width:"100%",
    height:"80%", 

    alignSelf: "center"
 
},
titleHeading:{
    
    // fontSize:60,
    // fontWeight:"bold",
    // color:colors.darkGreyBlue,
    // alignSelf:"center",
    // position:"relative",
    fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        margin: 15

 

},
scroll:{
    height:"80%",
    width:"100%",
},
card:{
    
}
})

