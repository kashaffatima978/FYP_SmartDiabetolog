import React, { useEffect, useState } from "react";
import { View, Text, Button, SafeAreaView, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import {  store } from "../../redux/reduxActions";
import {Heading } from '../components/Heading'
import axios from "axios";
import {IP} from "../../files/information"

export default function MainExercisePage({navigation}) {
    const ip=`http://${IP}`
    days = [...Array(31).keys()]
    month = (new Date()).getMonth()
    date = new Date()
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const[mount, setMount]= useState(0);
    
    useEffect(()=>{
        if(mount==0){
            axios.post(ip+':8000/exercisePlan',{
                "day":1,
                "weight": 50,
                "calories": 1200,
                "routine":["True","True","True","True","True","True","True","True"]
            })
            .then((response)=>{
                console.log("this is data ^^^^^^^&&&&&&&&&&&***************",response.data.res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }, [])
    


    return (
        <SafeAreaView >
            <Heading name="Exercise plan"/>
            <View style={styles.infoView}>
                
                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                    Burn Calories and keep fit
                </Text>
                <Text style={{ color: "black", fontSize: 15 }}>
                    {months[month]}
                </Text>
                {/* <TouchableOpacity onPress={()=>navigation.navigate("ExerciseActivityOrRest",{"day":date.getDate()})}
                style={{alignSelf:"flex-end",marginRight:"4%",backgroundColor:"#282A71",width:50,height:50,borderRadius:100,justifyContent:"center",alignItems:"center"}}>
                    <Text>Activity</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>navigation.navigate("ExerciseSetting")}
                style={{alignSelf:"flex-end",marginRight:"4%",backgroundColor:"#282A71",width:50,height:50,borderRadius:100,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="list" style={styles.iconStyle}></Icon>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll}>
                {
                    (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) ?
                        days.map((val, index) => {
                            return (
                                <TouchableOpacity key={index} disabled={date.getDate() != val + 1 ? true : false} style={[styles.button, { backgroundColor: date.getDate() > val + 1 ? "#8E91BD" : "#6A6DB0" }]}
                                    onPress={() => { console.log(store.getState())}}>
                                    <View style={{ height: 50, justifyContent: "center", alignItems: "center" ,flexDirection:"row"}}>
                                        <Text style={[styles.text1]}>Day {val + 1}</Text>
                                        {date.getDate() > val + 1 ? 
                                        ( !store.getState()? 
                                        <Text>SKIP</Text>:
                                        <Text>{store.getState().record[val]?"DONE":"SKIP"}</Text> )
                                        :
                                        null
                                    }
                                        { 
                                            (date.getDate() == val + 1)?
                                               ( date.getDay()===0?
                                               <Text>REST</Text>:
                                                (!(!store.getState() ? false:store.getState().todayExerciseDone ) ?
                                                (<TouchableOpacity style={{backgroundColor:"#282A71",width:"20%",height:"80%",alignItems:"center",justifyContent:"center",marginLeft:"10%"}}
                                                    onPress={() => {navigation.navigate("MainExerciseStartPage",{"day":val+1}) }}>
                                                    <View style={{ height: 50, justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={[styles.text1,{color:"white"}]}>
                                                            START 
                                                        </Text>

                                                    </View>
                                                </TouchableOpacity>):
                                                <Icon name="check-square-o" style={styles.iconStyle}></Icon>
                                                ))
                                                : null
                                        }

                                    </View>
                                </TouchableOpacity>)
                        })
                        : days.map((val, index) => { if (val !== 30) { return <Text style={{ color: "black" }}>{val + 1}</Text> } })
                }

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: "85%"
    },

    infoView: {
        backgroundColor: "#DEE2E6",
        height: "12%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        padding: 5
    },
    text1: {
        fontSize: 20,
        textTransform: "capitalize",
        color: "#212529",
        fontWeight: "bold",
        textAlign: "center",
    },

    button: {
        flex: 1,
        borderWidth: 5,
        margin: "2%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.l7blue,
        backgroundColor: "#6A6DB0"
    },  
     iconStyle:{
        fontSize:20,
        color:'white',
        marginHorizontal:5
    }


})