import React, { useState } from "react";
import { View,Text, SafeAreaView,StyleSheet, Button, TouchableOpacity, ImageBackground } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../files/Colors";
import { useNavigation } from '@react-navigation/native';


export default Picker=({pickertitle,pickermode,textColor,buttonColor, onConfirm})=>{
    const [date,setDate]=useState(new Date());
    const[day,setDay]=useState(date.getDate());
    const[month,setMonth]=useState(date.getMonth());
    const[year,setYear]=useState(date.getFullYear());
    const[hour,setHour]=useState(date.getHours());
    const[minute,setMinute]=useState(date.getMinutes());
    const [isVisible,setIsVisible]=useState(false);

    const[fulldate , setFullDate] = useState(`${date.getDate()}-${month}-${year}`);
    const[time, setTime] = useState(`${hour>12?hour-12:hour}:${minute} ${hour>=12?"PM":"AM"}`);
    const[fullTime, setFullTime] = useState(`${year}-${month}-${date.getDate()}T${hour}:${minute}:${date.getSeconds()}.${date.getUTCMilliseconds()}Z`);

    const handleConfirm = (date)=>{
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
        // onConfirm(date, day, month, year, hour, minute);
        onConfirm([fullTime, fulldate, time]);
        
    }
    
    return(
        <View>
            <View style={styles.container}>
                <Text style={[styles.text,{color:textColor?textColor:colors.headingBlue}]}> Date:</Text>
                <Text style={[styles.text,{color:textColor?textColor:colors.headingBlue},{fontSize:20,fontWeight:"none"}]}>{day}/{month}/{year}</Text>
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
            onConfirm={handleConfirm}
             mode={pickermode}
            />


        </View>
    )
}

const styles=StyleSheet.create({
    container:{ 
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center" 
    },
    text:{
        fontSize:20,
        color:colors.headingBlue,
        fontWeight:"bold",
        marginHorizontal:"1%"
    },
    button:{
        height:50,
        // borderRadius:50,   
        alignItems:"center",
        justifyContent:"center", 
    },
    buttonText:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
    },
  
   

});