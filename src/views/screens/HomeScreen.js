import { React, useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, Image, Animated, Easing, Pressable } from "react-native";
import { Input } from "../components/input";
import NewDropDown from "../components/NewDropDown"
import NewPicker from "../components/NewPicker";
import * as Progress from 'react-native-progress';
import { CircularProgress } from 'react-native-circular-progress';
import DailyInputs from "../components/DailyInputs";
import NavBar from "../components/NavBar";
import SpinListButton from "../components/SpinListButton";
import { setAuthentication, store } from "../../redux/reduxActions";
import { setExerciseRecord, setExerciseToday, setBreakfastToday, setLunchToday, setSnackOneToday, setSnackTwoToday, setDinnerToday } from "../../redux/reduxActions";
import { storeUserState } from "../connectionToDB/authentication"
import { useDispatch } from "react-redux/es/exports";
import { getProfileInformation } from "../connectionToDB/profile"
import { storeTodayDateInAsync, getTodayDateFromAsync, getAllergiesFromAsync, storeAllergiesInAsync } from "../connectionToDB/AsyncStorage"
import { storeStateInAsync, getStateFromAsync, getRecordStateFromAsync, getTrackerInstanceInAsync } from "../connectionToDB/AsyncStorage"
import Alarm from "./Alarm";
import { IP } from "../../files/information"
import axios from 'axios';
import getCalories from '../Counters/PerDay';




import { Paragraph, Dialog, Portal, Button, Provider, Modal } from 'react-native-paper';
import Loader from "../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen({ navigation, prop }) {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('Fatima');
    const [bloodSugar, setBloodSugar] = useState(120);
    const [ldl, setldl] = useState(60);
    const [hdl, sethdl] = useState(70);
    const [sbp, setsbp] = useState(80);
    const [dbp, setdbp] = useState(120);
    const [profile, setprofile] = useState('');
    const [mount, setMount] = useState(0);
    const [alarmVisibility, setAlarmVisibility] = useState(false)
    const [reminderTime, setReminderTime] = useState("")
    const [reminderName, setReminderName] = useState("")
    const [reminderDosage, setReminderDosage] = useState("")
    const [medicationForAlarm, setMedicationForAlarm] = useState([])
    const [alarmShown, setAlarmShown] = useState(0)
    const [bloodSugarInstance, setBloodSugarInstance] = useState({})
    const [bloodPressureInstance, setBloodPressureInstance] = useState({})
    const [cholesterolInstance, setCholesterolInstance] = useState({})
    const [totalCalories, setTotalCalories] = useState(1200)

    const ip = `http://${IP}`



    const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
    const animatedProgress = new Animated.Value((bloodSugar / 500) * 100);

    // useEffect(() => {
    //     Animated.timing(animatedProgress, {
    //         toValue: 1,
    //         duration: 5000,
    //         useNativeDriver: true,

    //     }).start();
    // }, [animatedProgress, bloodSugar]);


    // On date change the status for the user state changes and get stores in db
    const [date, setDate] = useState(new Date().getDate());
    useEffect(() => {


        Animated.timing(animatedProgress, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,

        }).start();

        //for loading profile info and oral medications for alarm
        if (mount === 0) {
            setMount(old => (old += 5))
            console.log("In oneffect")
            getProfileInformation()
                .then(async (res) => {
                    console.log("here", res)
                    console.log("state", res.userDetails.state)
                    //get calories for making diet chart
                    cal = getCalories(res.userDetails.weight, false, res.userDetails.gender, res.userDetails.heightFeet, res.userDetails.heighInches, res.userDetails.age, res.userDetails.acitivitLevel);
                    setTotalCalories(cal)

                    //setName
                    setName(res.userDetails.name)

                    //also get oral medications for alarm
                    getAllergiesFromAsync("oralMedications")
                        .then(ress => { console.log("Oral medications for alarms in HomeScreen= ", ress); setMedicationForAlarm(() => ress) })
                        .catch(err => { console.log("Error in getAllergiesFromAsync in HomeScreen while getting oralMedications ", err) })
                    if (res.userDetails.weight == undefined || res.userDetails.age || undefined || res.userDetails.heightFeet == undefined) {
                        navigation.navigate('Tracker')
                    }

                    const bs = await getTrackerInstanceInAsync("bloodsugar")
                    console.log(bs)
                    console.log(bs.concentration)
                    setBloodSugarInstance(() => bs)

                    const bp = await getTrackerInstanceInAsync("bloodpressure")
                    console.log(bp)
                    console.log(bp.systolic)
                    setBloodPressureInstance(() => bp)

                    const ch = await getTrackerInstanceInAsync("cholesterol")
                    console.log(ch)
                    console.log(ch.ldl)
                    setCholesterolInstance(() => ch)

                })
                .catch(err => { console.log("Error in Home screen", err) })



        }
        // Clean up the interval when the component unmounts
        // return () => clearInterval(intervalId);
    }, [date, animatedProgress, bloodSugar]);

    const intervalId = setInterval(async () => {
        setAlarmShown(true)
        //console.log("here in interval")
        //calling for alarm
        arrayInAsync = [
            { "time": "3:38", "name": "med1", "type": "oral", "dosage": "10" },
            { "time": "12:52", "name": "med2", "type": "insulin", "dosage": "10" }]
        medicationForAlarm.forEach(element => {
            hoursInArray = element.time.split(":")[0]
            currentHours = new Date().getHours()
            minutesInArray = element.time.split(":")[1]
            currentMinutes = new Date().getMinutes()

            //console.log(`current hours=${currentHours} hour in array=${hoursInArray}`)
            // console.log((currentHours == hoursInArray))
            // console.log(`current minutes=${currentMinutes} minutes in array=${minutesInArray}`)
            // console.log((currentMinutes == minutesInArray))
            //console.log(((hoursInArray == currentHours) && (minutesInArray == currentMinutes)))

            if (((hoursInArray == currentHours) && (minutesInArray == currentMinutes))) {
                console.log("In if")
                if (!alarmShown) {
                    console.log("In double if")
                    setReminderName(element.name)
                    setReminderTime(element.time)
                    setReminderDosage(element.dosage)
                    setAlarmShown(true)
                    setAlarmVisibility(true)
                    setTimeout(() => { setAlarmVisibility(false) }, 5000)
                }
            }
        });
    }, 60000); // Run every minute

    async function callbackForDayChange() {
       // console.log("here in timeout 2 for day changing setup")
        //when the date changes
        const currentDate = new Date().getDate();
       // console.log("today current date is=", currentDate)
        const dateInAsyc = (await getTodayDateFromAsync())
       // console.log("dateInAsyc is=", dateInAsyc)
        if (dateInAsyc !== currentDate) {
            //set todayDate in Async
            await storeTodayDateInAsync()
            console.log("before changing date is ", dateInAsyc)
            console.log("new date is ", currentDate)
            console.log("states before changing to new date are  ", store.getState())

            //add todayExerciseDone to record to mark todays exercise is done(true)/skip(false)
            getRecordStateFromAsync()
                .then(async (records) => {
                    console.log("records got before updating state when change date is ", records)
                    recordProcessed = records
                    recordProcessed.push(store.getState().todayExerciseDone)
                    //getting the actual state from Async
                    let state = await getStateFromAsync()
                    state.record = recordProcessed
                    await storeStateInAsync(state)
                })
                .catch(err => { console.log("error in getRecordStateFromAsync1 in HomeScreen") })


            //update state in db if todayExerciseDone is false
            if (!(store.getState().todayExerciseDone)) {
                storeUserState(store.getState())
                    .then((res) => {
                        console.log(res)
                        console.log("User state SuccessFully stored in home screen when date changes")

                    })
                    .catch((err) => {
                        console.log("Error while state storing in home screen when date changes", err)
                        Alert.alert("Error", "Connection Lost! Try Again")
                    })
            }
            //state setting for diet
            //if true change them to false for day because day is changed
            if (!store.getState()) dispatch(setAuthentication())
            if (store.getState().todayBreakfastDone) dispatch(setBreakfastToday())
            if (store.getState().todayLunchDone) dispatch(setLunchToday())
            if (store.getState().todaySnackOneDone) dispatch(setSnackOneToday())
            if (store.getState().todaySnackTwoDone) dispatch(setSnackTwoToday())
            if (store.getState().todayDinnerDone) dispatch(setDinnerToday())


            //if todayExerciseDone is true then update the state to false
            if (store.getState().todayExerciseDone) {
                dispatch(setExerciseToday())
            }
            //Now set the date
            setDate(currentDate);

            //Now again updating the state in Async
            //add todayExerciseDone to record to mark todays exercise is done(true)/skip(false)
            getRecordStateFromAsync()
                .then(async (records) => {
                    console.log("records got from Async is ", records)
                    //getting the actual state from Async
                    let state = await getStateFromAsync()
                    state.record = records
                    await storeStateInAsync(state)
                })
                .catch(err => { console.log("error in getRecordStateFromAsync 2 in HomeScreen") })

            //when day changes also get new diet Plan and store it in Async

            getAllergiesFromAsync("food")
                .then(allergies => {
                    array = allergies.map(val => val.name)
                    console.log("********", array, "********")
                    axios.post(ip + ':8000/dietPlan', { 'calories': totalCalories, 'alergies': array })
                        .then(async (response) => {
                            console.log("When day changes diet plan got is ", response.data)
                            //now store dietChart in Async
                            await AsyncStorage.setItem(`@dietChart`, JSON.stringify(response.data))
                            const storedDate = await AsyncStorage.getItem(`@dietChart`)
                            const parsed = JSON.parse(storedDate)
                            console.log(`In Asyncstorage stored diet chart is = ${parsed}`)
                        })
                        .catch((err) => {
                            console.log(err, "error in useEffect in HomeScreen for getting recipes catch 1")
                        })
                })
                .catch(err => {
                    console.log(err, "error in useEffect in HomeScreen for getting recipes catch 2")
                })

            //make add meal content in async null here
            AsyncStorage.setItem(`@Breakfast`, JSON.stringify(obj))
            try {
                await AsyncStorage.removeItem("@Breakfast");
                await AsyncStorage.removeItem("@Dinner");
                await AsyncStorage.removeItem("@Lunch");
                await AsyncStorage.removeItem("@Snack1");
                await AsyncStorage.removeItem("@Snack2");
                console.log('Data for add meal removed successfully');
              } catch (error) {
                console.log('Error removing data for add meal in HomeScreen:', error);
              }
        }
        setTimeout(callbackForDayChange, 30000)
    };
    setTimeout(callbackForDayChange, 30000)//runs every 30 mins



    return (
        <View>
            <Alarm visible={alarmVisibility} name={reminderName} time={reminderTime} dosage={reminderDosage}></Alarm>
            <NavBar name={name} profile={profile} />

            <ScrollView style={styles.container}>
                <View style={styles.con}>
                    <AnimatedCircularProgress
                        size={200}
                        width={8}
                        fill={animatedProgress}
                        tintColor="#6A6DB0"
                        backgroundColor="#E2E4FF"
                        rotation={0}
                        lineCap="round"
                    >
                        {() => (
                            ((bloodSugar >= 80) && (bloodSugar < 130)) ?
                                <Image
                                    source={require('../../../assets/Images/normal.png')}
                                    resizeMode="center"
                                    style={[styles.image, { width: 250, height: 250 }]}
                                />
                                :
                                <Image
                                    style={[styles.image, { width: 200, height: 200 }]}
                                    source={require('../../../assets/Images/pain.png')}
                                    resizeMode="center"
                                />

                        )}
                    </AnimatedCircularProgress>
                    <Text style={styles.text}>Blood sugar: {bloodSugar} mg/dl</Text>
                </View>
                <View style={{ marginTop: 16, padding: 20 }}>
                    <Text style={[styles.text, { alignSelf: "flex-start", fontSize: 16, fontWeight: "bold" }]}>Daily Inputs</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Pressable onPress={() => { navigation.navigate('WeightScreen') }}>
                            <View style={{
                                backgroundColor: "#6A6DB0",
                                width: 150,
                                height: 190,
                                borderRadius: 20,
                                marginTop: 20,
                                padding: 10,
                                marginRight: 15
                            }}>
                                <View style={{ alignItems: "center", marginTop: 50 }}>
                                    <View style={{ backgroundColor: 'white', justifyContent: "center", width: '40%', borderRadius: 50 }}>
                                        <Text style={{ fontSize: 40, color: 'black', alignSelf: "center" }}>+</Text>
                                    </View>
                                    <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "bold", color: 'white' }}>Add your logs</Text>
                                </View>
                            </View>
                        </Pressable>
                        {(Object.keys(bloodSugarInstance).length === 0) ?
                            <DailyInputs colorbg="#FCE0D7"
                                dataUnit="mg/dl"
                                dataType="Blood Sugar"
                                data={`120`}
                                icon={require('../../../assets/Images/bloodsugar_icon.png')}
                                dataColor="#9d8189" >

                            </DailyInputs>
                            :
                            <DailyInputs colorbg="#FCE0D7"
                                dataUnit={bloodSugarInstance.event}
                                dataType="Blood Sugar"
                                data={`${bloodSugarInstance.concentration}`}
                                icon={require('../../../assets/Images/bloodsugar_icon.png')}
                                dataColor="#9d8189" >

                            </DailyInputs>
                        }

                        {(Object.keys(bloodPressureInstance).length === 0) ?
                            <DailyInputs colorbg="#fad2e1"
                                dataType="Systolic BP"
                                data={`120`}
                                icon={require('../../../assets/Images/bloodpressure-icon.png')}
                                dataColor="#e56866" >

                            </DailyInputs>
                            :
                            <DailyInputs colorbg="#fad2e1"
                                dataType="Systolic BP"
                                data={bloodPressureInstance.systolic}
                                icon={require('../../../assets/Images/bloodsugar_icon.png')}
                                dataColor="#e56866" >
                            </DailyInputs>
                        }

                        {(Object.keys(bloodPressureInstance).length === 0) ?
                            <DailyInputs colorbg="#dee2ff"
                                dataType="Diasystolic BP"
                                data={dbp}
                                icon={require('../../../assets/Images/bloodpressure-icon.png')}
                                dataColor="#8e9aaf" />
                            :
                            <DailyInputs colorbg="#dee2ff"
                                dataType="Diasystolic BP"
                                data={bloodPressureInstance.disystolic}
                                icon={require('../../../assets/Images/bloodpressure-icon.png')}
                                dataColor="#8e9aaf" />
                        }

                        {(Object.keys(cholesterolInstance).length === 0) ?
                            <DailyInputs
                                colorbg="#c8e7ff"
                                dataType="LDL chlolestroll"
                                data={ldl}
                                icon={require('../../../assets/Images/ldl-icon.png')}
                                dataColor="#618985" />
                            :
                            <DailyInputs
                                colorbg="#c8e7ff"
                                dataType="LDL chlolestrol"
                                data={cholesterolInstance.ldl}
                                icon={require('../../../assets/Images/ldl-icon.png')}
                                dataColor="#618985" />
                        }

                        {(Object.keys(cholesterolInstance).length === 0) ?
                            <DailyInputs
                                colorbg="#c9e4de"
                                dataType="HDL chlolestrol"
                                data={hdl}
                                icon={require('../../../assets/Images/hdl-icon.png')}
                                dataColor="#09814a" />
                            :
                            <DailyInputs
                                colorbg="#c9e4de"
                                dataType="HDL chlolestrol"
                                data={cholesterolInstance.hdl}
                                icon={require('../../../assets/Images/hdl-icon.png')}
                                dataColor="#09814a" />
                        }








                    </ScrollView>


                </View>
                <View style={{ marginTop: 16, padding: 20 }}>
                    <Text style={[styles.text, { alignSelf: "flex-start", fontSize: 16, fontWeight: "bold" }]}>Life style</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        <Pressable style={styles.smallBoxes} onPress={() => { navigation.navigate('Diet') }}>
                            <Text style={[styles.boxText, { color: '#09814a' }]}>Diet</Text>
                        </Pressable>

                        <Pressable style={[styles.smallBoxes, { backgroundColor: '#c8e7ff' }]} onPress={() => { navigation.navigate('MainExercisePage') }}>
                            <Text style={[styles.boxText, { color: '#618985' }]}>Exercise</Text>
                        </Pressable>

                        <Pressable style={[styles.smallBoxes, { backgroundColor: '#FAD2E1' }]} onPress={() => { navigation.navigate('Retinopathy') }}>
                            <Text style={[styles.boxText, { color: '#f08080' }]}>Retinopathy</Text>
                        </Pressable>
                    </ScrollView>
                </View>


                <View style={{ marginTop: 16, padding: 20 }}>
                    <Text style={[styles.text, { alignSelf: "flex-start", fontSize: 16, fontWeight: "bold" }]}>Health care</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* navigation.navigate('ExerciseActivityOrRest', { "day": 16 }) */}
                        <Pressable style={[styles.smallBoxes, { backgroundColor: "#e3d5ca" }]} onPress={() => { navigation.navigate('Prescription') }}>
                            <Text style={[styles.boxText, { color: '#A4907C' }]}>Medication</Text>
                        </Pressable>

                        <Pressable style={[styles.smallBoxes, { backgroundColor: '#CDDAFD' }]} onPress={() => { navigation.navigate('AllergicReactionMain') }}>
                            <Text style={[styles.boxText, { color: '#8e9aaf' }]}>Allergies</Text>
                        </Pressable>

                    </ScrollView>
                </View>

                <View style={{ marginTop: 16, padding: 20, marginBottom: 100 }}>
                    <Text style={[styles.text, { alignSelf: "flex-start", fontSize: 16, fontWeight: "bold" }]}>Awareness</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        <Pressable style={[styles.smallBoxes, { backgroundColor: "#FCE0D7" }]} onPress={() => { navigation.navigate('BlogList') }}>
                            <Text style={[styles.boxText, { color: '#9d8189' }]}>Blogs</Text>
                        </Pressable>

                        <Pressable style={[styles.smallBoxes, { backgroundColor: '#d0f4ba' }]} onPress={() => { navigation.navigate('Videos') }}>
                            <Text style={[styles.boxText, { color: '#a3b18a' }]}>Videos</Text>
                        </Pressable>

                    </ScrollView>
                </View>

            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    con: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',mar
        marginTop: 30
    },

    container: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white'
    },

    text: {
        textAlign: "center",
        marginTop: 15,
        fontWeight: 'bold',

    },
    smallText: {
        color: 'red',
        // alignSelf: "center",
        marginTop: 5,
        fontSize: 16

    },
    smallBoxes:
    {
        backgroundColor: '#c9e4de',
        width: 150,
        height: 100,
        borderRadius: 20,
        marginTop: 20,
        padding: 10,
        marginRight: 15,
        justifyContent: "center"
    },
    boxText: {
        textAlign: "center",
        fontSize: 15,
    }
})