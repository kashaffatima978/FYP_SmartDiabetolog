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
import { store } from "../../redux/reduxActions";
import { setExerciseRecord, setExerciseToday, setBreakfastToday, setLunchToday, setSnackOneToday, setSnackTwoToday, setDinnerToday } from "../../redux/reduxActions";
import { storeUserState } from "../connectionToDB/authentication"
import { useDispatch } from "react-redux/es/exports";
import { getProfileInformation } from "../connectionToDB/profile"
import { storeTodayDateInAsync, getTodayDateFromAsync } from "../connectionToDB/AsyncStorage"
import { storeRecordStateInAsync, getStateFromAsync, getRecordStateFromAsync } from "../connectionToDB/AsyncStorage"



import { Paragraph, Dialog, Portal, Button, Provider, Modal } from 'react-native-paper';


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




    const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
    const animatedProgress = new Animated.Value((bloodSugar / 500) * 100);

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,

        }).start();
    }, [animatedProgress, bloodSugar]);

    // const [modalVisible, setModalVisible] = useState(false);




    // return(
    //     <View>

    //     <NavBar name ={name} profile={profile}/>


    //     <ScrollView style={styles.container}>

    //     {/* <Button onPress={()=>{setModalVisible(true)}}>open</Button>
    //        <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //             Alert.alert('Modal has been closed.');
    //             setModalVisible(!modalVisible);
    //             }}>
    //             <View style={{backgroundColor: 'green', width: '100%', height:'50%'}}>
    //             <View style={{backgroundColor:'blue'}}>
    //                 <Text style={styles.modalText}>Hello World!</Text>
    //                 <Pressable
    //                 style={{backgroundColor:'red'}}
    //                 onPress={() => setModalVisible(!modalVisible)}>
    //                 <Text style={styles.textStyle}>Hide Modal</Text>
    //                 </Pressable>
    //             </View>
    //             </View>
    //         </Modal> */}


    //         <View style={styles.con}>
    //             <AnimatedCircularProgress
    //                 size={200}
    //                 width={8}
    //                 fill={animatedProgress}
    //                 tintColor="#6A6DB0"
    //                 backgroundColor="#E2E4FF"
    //                 rotation={0}
    //                 lineCap="round"
    //             >
    //                 {() => (
    //                 ((bloodSugar >= 80)&&(bloodSugar <130))?
    //                     <Image
    //                         source={require('../../../assets/Images/normal.png')}
    //                         resizeMode="center"
    //                         style={[styles.image,{width: 250, height:250}]}
    //                     />
    //                     : 
    //                     <Image
    //                         style={[styles.image,{width: 200, height:200}]}
    //                         source={require('../../../assets/Images/pain.png')}
    //                         resizeMode="center"
    //                     />

    //                 )}
    //             </AnimatedCircularProgress>
    //             <Text style={styles.text}>Blood sugar: {bloodSugar} mg/dl</Text> 
    //         </View>
    //         <View style={{marginTop: 16, padding: 20}}>
    //             <Text style={[styles.text, {alignSelf: "flex-start", fontSize: 16, fontWeight: "bold"}]}>Daily Inputs</Text>
    //         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //             <Pressable onPress={()=>{navigation.navigate('Tracker')}}>
    //                 <View style={{
    //                     backgroundColor: "#6A6DB0",
    //                     width: 150, 
    //                     height:190, 
    //                     borderRadius: 20, 
    //                     marginTop: 20, 
    //                     padding: 10,
    //                     marginRight: 15
    //                 }}>
    //                     <View style ={{alignItems: "center", marginTop: 50}}>
    //                         <View style={{backgroundColor: 'white', justifyContent: "center", width: '40%',borderRadius: 50 }}> 
    //                             <Text style ={{fontSize: 40, color: 'black', alignSelf: "center"}}>+</Text>
    //this useEffect tracks the date
    // On date change the status for the user state changes and get stores in db
    const [date, setDate] = useState(new Date().getDate());
    useEffect(() => {

        //for loading profile info
        if (mount == 0) {
            getProfileInformation()
                .then((res) => {
                    console.log("here", res)
                    console.log("state", res.userDetails.state)
                    setName(res.userDetails.name)
                    if (res.userDetails.weight == undefined || res.userDetails.age == undefined || res.userDetails.heightFeet == undefined) {
                        Alert.alert("Set Your Profile", "Thank you!")
                        navigation.navigate('Profile')
                    }
                })
                .catch(err => { console.log("Error in Home screen", err) })
        }

        const intervalId = setInterval(async () => {
            const currentDate = new Date().getDate();

            const dateInAsyc = (await getTodayDateFromAsync())
            //console.log("date from async in HomeScreen",dateInAsyc)

            //when the date changes
            if (dateInAsyc !== currentDate) {
                //set todayDate in Async
                await storeTodayDateInAsync()

                console.log("before changing date is ", dateInAsyc)
                console.log("new date is ", currentDate)
                console.log("states before changing to new date are  ", store.getState())

                //state setting for diet
                //if true change them to false for day because day is changed
                if (store.getState().todayBreakfastDone) dispatch(setBreakfastToday())
                if (store.getState().todayLunchDone) dispatch(setLunchToday())
                if (store.getState().todaySnackOneDone) dispatch(setSnackOneToday())
                if (store.getState().todaySnackTwoDone) dispatch(setSnackTwoToday())
                if (store.getState().todayDinnerDone) dispatch(setDinnerToday())

                //add todayExerciseDone to record to mark todays exercise is done(true)/skip(false)
                getRecordStateFromAsync()
                    .then(records => {
                        console.log("records got before updating state when change date is ", records)
                        recordProcessed = records
                        recordProcessed.push(store.getState().todayExerciseDone)
                        storeRecordStateInAsync(recordProcessed)
                    })

                //dispatch(setExerciseRecord())

                //if todayExerciseDone is true then update the state to false
                if (store.getState().todayExerciseDone) {
                    dispatch(setExerciseToday())
                }

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
                //Now set the date
                setDate(currentDate);
            }
        }, 1000); // Run every second

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [date]);


    return (
        <View>
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
                        <Pressable onPress={() => { navigation.navigate('Tracker') }}>
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
                        <DailyInputs colorbg="#FCE0D7" dataUnit={'mg/dl'} dataType="Blood Sugar" data={bloodSugar} icon={require('../../../assets/Images/bloodsugar_icon.png')} dataColor="#9d8189" />
                        <DailyInputs colorbg="#fad2e1" dataUnit={'mg/dl'} dataType="Systolic BP" data={sbp} icon={require('../../../assets/Images/bloodpressure-icon.png')} dataColor="#e56866" />
                        <DailyInputs colorbg="#dee2ff" dataUnit={'mg/dl'} dataType="Diasystolic BP" data={dbp} icon={require('../../../assets/Images/bloodpressure-icon.png')} dataColor="#8e9aaf" />
                        <DailyInputs colorbg="#c8e7ff" dataUnit={'mg/dl'} dataType="LDL chlolestrol" data={ldl} icon={require('../../../assets/Images/ldl-icon.png')} dataColor="#618985" />
                        <DailyInputs colorbg="#c9e4de" dataUnit={'mg/dl'} dataType="HDL chlolestrol" data={hdl} icon={require('../../../assets/Images/hdl-icon.png')} dataColor="#09814a" />

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

                        <Pressable style={[styles.smallBoxes, { backgroundColor: '#d0f4ba' }]} onPress={() => { navigation.navigate('Diet') }}>
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