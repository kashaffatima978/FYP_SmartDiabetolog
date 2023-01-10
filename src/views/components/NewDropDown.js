import React from "react";
import {View,SafeAreaView,Text,StyleSheet} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import colors from "../../files/Colors";

export default function NewDropDown({dropdownlist,title, defaultValue, selection}){
    return(
        <SafeAreaView style={styles.container}>
            <Text  style={styles.text}> {title}</Text>
            <SelectDropdown
            style={styles.dropdown}
            data={dropdownlist} 
            onSelect={(selectedItem,index)=>{
                // console.log(selectedItem,index)
                selection(selectedItem);
            }}

            buttonTextAfterSelection={(selectedItem,index)=>{
                return selectedItem;
            }}
            rowTextForSelection={(selectedItem,index)=>{
                return selectedItem;
            }}

            buttonStyle={{borderWidth:1,color:"#4A3C31",width:"100%", backgroundColor:"white",height:50, alignSelf:"center"}}
           
            buttonTextStyle={
                {
                fontSize:14,
                color:colors.darkGreyBlue,
                textTransform:"capitalize",
                fontWeight:"bold"}
            }
            defaultButtonText={defaultValue}
            
            dropdownIconPosition="right"
            dropdownStyle={{backgroundColor:"white"}}
            rowStyle={{backgroundColor:'#DDBEA9',margin:4}}
            rowTextStyle={{color:'#4A3C31'}}>
           
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
                color:'black',
                textTransform:"capitalize",
                fontWeight:"bold"
    },
    dropdown:{
        width:"100%",
        
    }

});