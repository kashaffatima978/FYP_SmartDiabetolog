import { PromiseProvider } from "mongoose";
import React from "react";
import {useState} from "react";
import {View,SafeAreaView,Text,StyleSheet} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import colors from "../../files/Colors";

export default function MyDropDown({dropdownlist,title, selection}){
    
    return(
        <SafeAreaView style={styles.container}>
            <Text  style={styles.text}> {title}</Text>
            <SelectDropdown
            style={styles.dropdown}
            data={dropdownlist} 
            onSelect={(selectedItem,index)=>{
                 console.log(selectedItem,index)
                //selection(selectedItem);
            }}

            buttonTextAfterSelection={(selectedItem,index)=>{
                return selectedItem;

            }}
            rowTextForSelection={(selectedItem,index)=>{
                return selectedItem;
            }}

            buttonStyle={{borderWidth:1,color:"red",width:"100%", backgroundColor:'#86C0DD',height:50}}
           
            buttonTextStyle={
                {
                fontSize:14,
                color:colors.darkGreyBlue,
                textTransform:"capitalize",
                fontWeight:"bold"}
            }
            defaultButtonText="Select an Event"
            
            dropdownIconPosition="right"
            dropdownStyle={{backgroundColor:"white"}}
            rowStyle={{backgroundColor:colors.blue3,margin:4}}
            rowTextStyle={{color:colors.greyBlue}}
           
            >
           
            </SelectDropdown>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{},
    text:{
        marginVertical:5,
        marginHorizontal:5,
       
                fontSize:14,
                color:colors.greyBlue,
                textTransform:"capitalize",
                fontWeight:"bold"
    },
    dropdown:{
        width:"100%",
        
    }

});