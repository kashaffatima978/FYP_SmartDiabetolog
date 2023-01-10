import React from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView, TouchableOpacity} from "react-native";
import { Input } from "../components/input";
import NewDropDown from "../components/NewDropDown"
import NewPicker from "../components/NewPicker";

export default function AddOralMedicine({navigation}){
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
            <Text style={styles.text}>Add Oral Medicine</Text>
        </View>

        <ScrollView style={styles.container2}
        showsVerticalScrollIndicator={false}>
           <View style={styles.inputContainer}>
           <NewDropDown  dropdownlist={["Dietic","Non-diabetic"]} defaultValue="select medicine type"
               title="Type" />
               </View>

            <View style={styles.inputContainer}>
                <Input label="Name"
                placeholder="Enter Medicine Name"
                inputBackground="white"
                textColor="black"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Unit"
                placeholder="Enter medicine unit"
                inputBackground="white"
                textColor="black"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Dosage"
                placeholder="Enter medicine dosage"
                inputBackground="white"
                textColor="black"/>
            </View>


            <View style={styles.inputContainer}>
            <NewPicker pickertitle="+" pickermode="time" textColor="black" buttonColor="#4A3C31"/>
            </View>

            <TouchableOpacity style={styles.saveButtonContainer}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

        

        </ScrollView>

    </SafeAreaView>
    )
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#DDBEA9",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        color:"black",
        fontWeight:"bold"
    },
    container2:{
        flex:0.9,
        backgroundColor:"white"
    },
    inputContainer:{
        backgroundColor:"#DDBEA9",
        marginVertical:"3%",
        marginHorizontal:"3%",
        padding:"2%"
    },
    saveButtonContainer:{
        marginVertical:"3%",
        marginHorizontal:"3%",
        backgroundColor:"#DDBEA9",
        width:"30%",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end", 
        borderRadius:30,
    },
    saveButtonText:{
        color:"#4A3C31",
        fontWeight:"bold",
        fontSize:16
    }

})