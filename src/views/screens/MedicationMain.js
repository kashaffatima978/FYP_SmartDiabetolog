import React from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity} from "react-native";
import Card from "../components/cards";
import colors from "../../files/Colors";


export default function MedicationMain({navigation}){
    return(
        <View style={styles.container}>
            <Image style={styles.medImg}source={require("../../../assets/Images/medicineM.jpg")}/>
            <Text style={styles.heading} >medication</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('OralMed')}}>
                <Image source={require('../../../assets/Images/oralMedicine.jpg') } style={styles.image}/>
                <Text style={styles.buttonText}>Oral Medication</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('InsulinMed')}}>
                <Image source={require('../../../assets/Images/insulin.jpg') } style={styles.image}/>
                <Text style={styles.buttonText}>Insulin Medication</Text>
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
        width: "90%",
        height: 180,
        alignSelf:"center"
    },

    button:{
        borderColor:"#DDBEA9",
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
        width:"100%"

    },
    image:{
        height:"80%",
        width:"60%",
        alignSelf:"center",
        justifyContent: "center"
    },

});