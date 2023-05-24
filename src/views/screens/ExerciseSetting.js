import React,{useState} from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity } from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import {  store } from "../../redux/reduxActions";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setNeck,setArms,setLegs,setWaist,setCardio,setChest,setBack,setShoulders } from "../../redux/reduxActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {storeUserState } from "../connectionToDB/authentication";
import { Heading } from "../components/Heading";



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
        <SafeAreaView style={{flex:1}}>
            {/* <View style={styles.view}> */}
                {/* <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                    Exercise Plan Settings
                </Text> */}
                <Heading name={"Exercise Plan Settings"}/>
            {/* </View> */}
            <ScrollView style={styles.scroll}>

                <View style={styles.container}>
                    <Text style={styles.text}>Neck Routine {isNeckEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isNeckEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setNeck())}}
                        value={isNeckEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Arms Routine {isArmsEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isArmsEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setArms())}}
                        value={isArmsEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Legs Routine {isLegsEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isLegsEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setLegs())}}
                        value={isLegsEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Shoulders Routine {isShouldersEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isShouldersEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setShoulders())}}
                        value={isShouldersEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Chest Routine {isChestEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isChestEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setChest())}}
                        value={isChestEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Cardio Routine {isCardioEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isCardioEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setCardio())}}
                        value={isCardioEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Back Routine {isBackEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isBackEnabled ? '#6A6DB0' : '#f4f3f4'}
                        onValueChange={()=>{dispatch(setBack())}}
                        value={isBackEnabled}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Waist Routine {isWaistEnabled?"ON":"OFF"}</Text>
                    <Switch
                        trackColor={{ false: 'black', true: 'gray' }}
                        thumbColor={isWaistEnabled ? '#6A6DB0' : '#f4f3f4'}
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

                    navigation.replace("MainExercisePage")
                }}
                style={styles.saveButtonContainer}>
                    <Text style={styles.saveButtonText}>OK</Text>
                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: "85%",
        backgroundColor: 'lavender'
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
        fontSize:20,
    },
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        margin:"2%",
        // borderWidth:3,
        // borderColor:"gray",
        padding:"5%",
        // borderRadius: 10
        elevation: 5
    },
    saveButtonContainer: {
        backgroundColor: "#6A6DB0",
        width: 80,
        height: 50,
        borderRadius: 25,
        marginTop: 40,
        padding: 10,
        alignSelf: "flex-end",
        bottom: 25,
        right: 0,
        marginRight: 10
      },
      saveButtonText: {
        fontSize: 17,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "bold"
        // paddingLeft: 8,
      },
})