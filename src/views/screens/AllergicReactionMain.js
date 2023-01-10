import React from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity} from "react-native";
import Card from "../components/cards";
import colors from "../../files/Colors";


export default function AllergicReactionMain({navigation}){
    return(
        <View style={styles.container}>
            <Image style={styles.medImg}source={require("../../../assets/Images/allergicMed.jpg")}/>
            <Text style={styles.heading} >Allergic Reaction</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('FoodAllergicReactions')}}>
                <Image source={require('../../../assets/Images/foodAllergy.jpg') } style={styles.image}/>
                <Text style={styles.buttonText}>Food Allergic Reaction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('MedicineAllergicReactions')}}>
                <Image source={require('../../../assets/Images/medicineAllergy.jpg') } style={styles.image}/>
                <Text style={styles.buttonText}>Medication Allergic Reaction</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
       flex:1,
        backgroundColor: "white",
    },
    heading:{
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        margin: 15
    },
    medImg:{
        width: "80%",
        height: 150,
        alignSelf:"center"
    },

    button:{
        borderColor:"#b2e7ed",
        borderWidth:2,
        height:200,
        width:"90%",
        marginTop:10,
        marginBottom:10,
        alignSelf: "center",
        // elevation: 6,
        // shadowColor: '#DDBEA9',
    },
    buttonText:{
        fontWeight:"bold",
        fontSize:20,
        color:colors.darkGreyBlue,
        textAlign:"center",
        height:"20%",
        width:"100%",
        marginTop: 15

    },
    image:{
        height:"70%",
        width:"50%",
        alignSelf:"center",
        justifyContent: "center"
    },

});