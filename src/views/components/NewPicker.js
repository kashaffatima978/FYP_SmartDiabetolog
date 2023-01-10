import React, { useState } from "react";
import { View,Text, SafeAreaView,StyleSheet, Button, TouchableOpacity, ImageBackground } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../files/Colors";


export default NewPicker=({pickertitle,pickermode,textColor,buttonColor})=>{
    const [date,setDate]=useState(new Date());
    const[day,setDay]=useState(date.getDate());
    const[month,setMonth]=useState(date.getMonth());
    const[year,setYear]=useState(date.getFullYear());
    const[hour,setHour]=useState(date.getHours());
    const[minute,setMinute]=useState(date.getMinutes());
    const [isVisible,setIsVisible]=useState(false);
    
    return(
        <View>
            <View style={styles.container}>
                {/* <Text style={[styles.text,{color:textColor?textColor:colors.headingBlue}]}>Date:</Text>
                <Text style={[styles.text,{color:textColor?textColor:colors.headingBlue},{fontSize:20,fontWeight:"none"}]}>{day}/{month}/{year}</Text> */}
            </View>
            <View style={styles.container}>
                <Text style={[styles.text,{color:textColor?textColor:colors.headingBlue}]}>Time:</Text>
                <Text style={[styles.text,{color:textColor?textColor:colors.headingBlue},{fontSize:20,fontWeight:"none"}]}>{hour>12?hour-12:hour}:{minute} {hour>=12?"PM":"AM"}</Text>
            </View>
           
           
           <TouchableOpacity style={[styles.button,{backgroundColor:buttonColor?buttonColor:colors.headingBlue}]} title={pickertitle} onPress={()=>{setIsVisible(true)}}>
           
            <Text style={styles.buttonText} >{pickertitle}</Text>
            
           </TouchableOpacity>
           
            
            <DateTimePickerModal
            isVisible={isVisible}
            onCancel={()=>{setIsVisible(false)}}
            onConfirm={(date)=>{
                setDate(date);
                if(pickermode==="date"){
                    setDay(date.getDate())
                    setMonth(date.getMonth())
                    setYear(date.getYear())
                }
                if(pickermode==="time"){
                    setHour(date.getHours())
                    setMinute(date.getMinutes())
                }
                setIsVisible(false);
            }}
             mode={pickermode}


            />


        </View>
    )
}

const styles=StyleSheet.create({
    container:{ 
        flexDirection:"row",
        backgroundColor:"white"
        
    },
    text:{
        fontSize:20,
        color:colors.headingBlue,
        fontWeight:"bold",
        marginHorizontal:"1%",
    },
    button:{
        height:50,
        borderRadius:70, 
        width: 50,  
        alignItems:"center",
        justifyContent:"center", 
        alignSelf: "flex-end",
        marginEnd: 5
    },
    buttonText:{
        fontSize:20,
        fontWeight:"bold",
        color:"white",
    },
  
   

});