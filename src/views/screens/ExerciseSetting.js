import React,{useState} from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity } from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import {  store } from "../../redux/reduxActions";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setNeck,setArms,setLegs,setWaist,setCardio,setChest,setBack,setShoulders } from "../../redux/reduxActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {storeUserState } from "../connectionToDB/authentication"


export default ExerciseSetting = ({navigation}) => {
    const [isNeckEnabled, setIsNeckEnabled] = useState((!store.getState())?false:store.getState().neck);
    const [isArmsEnabled, setIsArmsEnabled] = useState((!store.getState())?false:store.getState().arms);
    const [isLegsEnabled, setIsLegsEnabled] = useState((!store.getState())?false:store.getState().legs);
    const [isWaistEnabled, setIsWaistEnabled] = useState((!store.getState())?false:store.getState().waist);
    const [isCardioEnabled, setIsCardioEnabled] = useState((!store.getState())?false:store.getState().cardio);
    const [isChestEnabled, setIsChestEnabled] = useState((!store.getState())?false:store.getState().chest);
    const [isShouldersEnabled, setIsShouldersEnabled] = useState((!store.getState())?false:store.getState().shoulders);
    const [isBackEnabled, setIsBackEnabled] = useState((!store.getState())?false:store.getState().back);
    const dispatch = useDispatch();
    
    store.subscribe(() => {
        setIsNeckEnabled((old) => { return (store.getState().neck) })
        setIsArmsEnabled((old) => { return (store.getState().arms) })
        setIsLegsEnabled((old) => { return (store.getState().legs) })
        setIsCardioEnabled((old) => { return (store.getState().cardio) })
        setIsChestEnabled((old) => { return (store.getState().chest) })
        setIsBackEnabled((old) => { return (store.getState().back) })
        setIsWaistEnabled((old) => { return (store.getState().waist) })
        setIsShouldersEnabled((old) => { return (store.getState().shoulders) })
      })

    return (
        <SafeAreaView >
            <View style={styles.view}>
                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                    Exercise Plan Settings
                </Text>
            </View>
            <ScrollView style={styles.scroll}>

                <View style={styles.container}>
                    <Text style={styles.text}>Neck Routine {isNeckEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isNeckEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setNeck())}}
                        value={isNeckEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Arms Routine {isArmsEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isArmsEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setArms())}}
                        value={isArmsEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Legs Routine {isLegsEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isLegsEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setLegs())}}
                        value={isLegsEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Shoulders Routine {isShouldersEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isShouldersEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setShoulders())}}
                        value={isShouldersEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Chest Routine {isChestEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isChestEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setChest())}}
                        value={isChestEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Cardio Routine {isCardioEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isCardioEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setCardio())}}
                        value={isCardioEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Back Routine {isBackEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isBackEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setBack())}}
                        value={isBackEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Neck Routine {isWaistEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isWaistEnabled ? '#282A71' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setWaist())}}
                        value={isWaistEnabled}
                    />
                </View>


                <TouchableOpacity onPress={()=>{
                    //first set the state then navigate
                    storeUserState(store.getState())
                    .then((res) => {
                        console.log(res)
                        console.log("User state SuccessFully stored after Exersise Setting changed")

                    })
                    .catch((err) => {
                        console.log("Error while state storing after Exersise Setting changed", err)
                        Alert.alert("Error", "Connection Lost! Try Again")
                    })

                    navigation.navigate("MainExercisePage")
                }}
                style={{alignSelf:"flex-end",marginRight:"4%",margin:"2%",backgroundColor:"#282A71",width:"20%",height:30,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontWeight:"bold"}}>OK</Text>
                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: "85%"
    },

    view: {
        backgroundColor: "#DEE2E6",
        height: "15%",
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color:"black",
        fontWeight:"bold",
        fontSize:20
    },
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        margin:"2%",
        borderWidth:3,
        borderColor:"gray",
        padding:"3%"
    }
})