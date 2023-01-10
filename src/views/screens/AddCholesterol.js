import React from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView, TouchableOpacity} from "react-native";
import { Input } from "../components/input";

export default function AddCholesterol({navigation}){
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
            <Text style={styles.text}>Add Cholesterol</Text>
        </View>

        <ScrollView style={styles.container2}
        showsVerticalScrollIndicator={false}>
           

            <View style={styles.inputContainer}>
                <Input label="LDL"
                placeholder="Enter your LDL reading"
                inputBackground="white"
                textColor="#4A3C31"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="HDL"
                placeholder="Enter your HDL reading"
                inputBackground="white"
                textColor="#4A3C31"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Triglycerides"
                placeholder="Enter your Triglycerides reading"
                inputBackground="white"
                textColor="#4A3C31"/>
            </View>


            <View style={styles.inputContainer}>
            <Input label="Notes" 
                placeholder="Enter a Description" 
                multiline={true}
                inputBackground="white" 
                textColor="#4A3C31"
               />
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
        backgroundColor:"#CB997E",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#FFE8D6",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        color:"#4A3C31",
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
        // borderRadius:30,
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