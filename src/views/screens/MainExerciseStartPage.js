import React, { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, Image, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setExerciseRecord, setExerciseToday } from "../../redux/reduxActions";
import { store } from "../../redux/reduxActions";
import { storeUserState } from "../connectionToDB/authentication"

export default MainExerciseStartPage = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const { day } = route.params
    exercises = [['back', 'body weight', 'http://d205bpvrqc9yn1.cloudfront.net/1773.gif', 1773,
        'one arm towel row', 'upper back', 20.0, 3, 0, 18, 5],
    ['upper arms', 'body weight', 'http://d205bpvrqc9yn1.cloudfront.net/0815.gif', 815,
        'triceps dips floor', 'triceps', 20.0, 3, 7, 17, 1],
    ['shoulders', 'barbell', 'http://d205bpvrqc9yn1.cloudfront.net/0119.gif', 119,
        'barbell upright row v. 2', 'delts', 20.0, 2, 6, 6, 7],
        // ['waist', 'body weight', 'http://d205bpvrqc9yn1.cloudfront.net/0872.gif', 872,
        //     'reverse crunch', 'abs', 20.0, 3, 9, 1, 3],
        // ['upper legs', 'body weight', 'http://d205bpvrqc9yn1.cloudfront.net/1604.gif', 1604,
        //     'world greatest stretch', 'hamstrings', 20.0, 3, 8, 9, 4],
        // ['chest', 'body weight',
        //     'http://d205bpvrqc9yn1.cloudfront.net/1297.gif', 1297,
        //     'isometric chest squeeze', 'pectorals', 20.0, 3, 2, 12, 2],
        // ['cardio', 'body weight',
        //     'http://d205bpvrqc9yn1.cloudfront.net/3224.gif', 3224,
        //     'jack jump (male)', 'cardiovascular system', 20.0, 3, 1, 5, 12],
        // ['neck', 'body weight',
        //     'http://d205bpvrqc9yn1.cloudfront.net/0716.gif', 716,
        //     'side push neck stretch', 'levator scapulae', 60.0, 3, 5, 11, 15]
    ]
    const seconds = 10 / (exercises.length) * 60

    const [isModalVisible, setModalVisible] = useState(false);
    const [minutes, setMinutes] = useState(((exercises.length) * 2) - 2)
    const [second, setSecond] = useState()
    const [exerciseRange, setExerciseRange] = useState(0)
    var mytimeout
    useEffect(() => {
        //  mytimeout=setTimeout(()=>{
        //     setSecond(old=>{ 
        //         //if your minutes is 0 and exercise range is exercises.lenght-1 and second is also 1 then exercise is completed
        //         if(minutes===1 && exerciseRange===exercises.length-1 && old===1 ){
        //             alert("Exercise Completed")
        //             dispatch(setExerciseToday())
        //             dispatch(setExerciseRecord())
        //             console.log("the todayExerciseDone is ",store.getState().todayExerciseDone)
        //             navigation.replace("MainExercisePage")

        //         } 
        //         if(old>1){return old-1} 
        //         else if(minutes!=0){ 
        //             setMinutes(old=>{if(old>=1){return old-1}}); 
        //             if(minutes%2==0 && exerciseRange<exercises.length){
        //                 setExerciseRange(old=>old+1)
        //             };
        //             return 60} 

        //         })},10)
       mytimeout= setTimeout(()=>{
        if (second === 1 && minutes == 0) {
            //user done with exercise
            //update redux state then save the state in database
            alert("Exercise Completed")
            dispatch(setExerciseToday())
            dispatch(setExerciseRecord())
            storeUserState(store.getState())
            .then((res) => {
                console.log("now redux state is ",store.getState())
                console.log(res)
                console.log("User state SuccessFully stored after exercise being done")

            })
            .catch((err) => {
                console.log("Error while state storing after exercise being done", err)
                Alert.alert("Error", "Connection Lost! Try Again")
            })
            

            console.log("the state is  ", store.getState())
            clearTimeout(mytimeout);
            navigation.replace("MainExercisePage")
        }
        else {
            setSecond(old => {
                if (old > 1) return old - 1
                else if (old == 1 && minutes != 0) { return 60 }
            })
            setMinutes (old => {
                if (second == 1 && minutes != 0) {
                    return old - 1
                }
                return old
            })
            if (minutes % 2 == 0 && exerciseRange < exercises.length) {
                setExerciseRange(old => old + 1)
            }
        }
       },10)

    }, [second])


    return (
        <SafeAreaView >
            <View style={styles.infoView}>
                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                    Day {day}
                </Text>
            </View>
            <ScrollView style={styles.scroll}>
                {exercises.map((val, index) => {
                    return (
                        <View key={index} style={{ flexDirection: "row", margin: "3%", borderWidth: 2 }}>

                            <Image style={{ width: 100, height: 100 }} source={{ uri: val[2] }} />
                            <View style={{ justifyContent: "center", alignItems: "center", marginLeft: "8%" }}>
                                <Text style={{ color: "black" }}>{val[4]}</Text>
                                <Text style={{ color: "black" }}>{seconds}</Text>
                            </View>
                        </View>
                    )
                })
                }
            </ScrollView>
            <TouchableOpacity onPress={() => { toggleModal(); setSecond(60) }} style={styles.button}>
                <Text style={styles.text1}>Start</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "white" }}>Minutes Left: {minutes}</Text>
                        <Text style={{ color: "white" }}>Seconds: {second}</Text>
                        <Text style={{ color: "white" }}>Exercise: {exerciseRange + 1}</Text>
                    </View>


                    {minutes % 2 == 0 ?
                        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "70%" }}>
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "http://d205bpvrqc9yn1.cloudfront.net/0119.gif" }} />
                        </View> :
                        <Text style={styles.rest}>REST</Text>
                    }

                    <TouchableOpacity style={[styles.button, { height: 40 }]} onPress={() => { toggleModal(); clearTimeout(mytimeout);setMinutes(-1);navigation.replace("MainExerciseStartPage", { "day": day }) }}>
                        <Text>STOP</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: "75%"
    },

    infoView: {
        backgroundColor: "#DEE2E6",
        height: "15%",
        alignItems: "center",
        justifyContent: "center"
    },
    text1: {
        fontSize: 20,
        textTransform: "capitalize",
        color: "#212529",
        fontWeight: "bold",
        textAlign: "center",
    },

    button: {

        borderWidth: 5,
        margin: "2%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.l7blue,
        backgroundColor: "#6A6DB0",
        height: "7%"
    },
    rest: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },




})