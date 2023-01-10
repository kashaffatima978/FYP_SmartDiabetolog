import { useState } from "react";
import React from "react-native";
import {StyleSheet,SafeAreaView,View,Text,ScrollView,TouchableOpacity} from "react-native";
import { Input } from "../components/input";
import {addBloodPressureRecord} from "../connectionToDB/tracker"
import {viewBloodPressureInstance} from "../connectionToDB/tracker"

export default function AddBloodPressure({navigation,route}){
    if(route.params!==undefined)
   { const id=route.params.id
    alert(route.params.id)
    if(id!==null){
        viewBloodPressureInstance()
    }}
    


    const [inputList,setInputList]=useState({disystolic:"",systolic:"",description:""});
    const save=()=>{
        addBloodPressureRecord(inputList.disystolic,inputList.systolic,inputList.description)
    }

    //Method sets the state change in inputList
    const handleOnTextChange=(newText,inputType)=>{
    setInputList(prevInputListState=>({...prevInputListState,[inputType]:newText}));
    console.log("InputList: ",inputList)
};
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
            <Text style={styles.text}>Add Blood Pressure</Text>
        </View>

        <ScrollView style={styles.container2}
        showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
            <Picker pickertitle="Select Time" pickermode="time"
            textColor="#212529"
            buttonColor="#6B705C"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Disystolic Pressure"
                onChangeText={text=>handleOnTextChange(text,"disystolic")}
                placeholder="Enter your disystolic pressure"
                inputBackground="white"
                textColor="black"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Systolic Pressure"
                onChangeText={text=>handleOnTextChange(text,"systolic")}
                placeholder="Enter your Systolic pressure"
                multiline={false}
                inputBackground="white"
                textColor="black"/>
            </View>


            <View style={styles.inputContainer}>
            <Input label="Notes" 
            onChangeText={text=>handleOnTextChange(text,"description")}
                placeholder="Enter a Description" 
                multiline={true}
                inputBackground="white" 
                textColor="black"
               />
            </View>

            <TouchableOpacity style={styles.saveButtonContainer}
            onPress={()=>{save()}}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

        </ScrollView>

    </SafeAreaView>)

}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#6B705C",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#C3C5BD",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        color:"#212529",
        fontWeight:"bold"
    },
    container2:{
        flex:0.9,
        backgroundColor:"white"
    },
    inputContainer:{
        backgroundColor:"#C3C5BD",
        marginVertical:"3%",
        marginHorizontal:"3%",
        // borderRadius:30,
        padding:"2%"
    },
    saveButtonContainer:{
        marginVertical:"3%",
        marginHorizontal:"3%",
        backgroundColor:"#6B705C",
        width:"30%",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end", 
        borderRadius:30,
    },
    saveButtonText:{
        color:"black",
        fontWeight:"bold",
        fontSize:16
    }

})