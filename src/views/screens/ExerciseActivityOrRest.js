import React, { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, Image, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setExerciseRecord, setExerciseToday } from "../../redux/reduxActions";
import { store } from "../../redux/reduxActions";

export default ExerciseActivityOrRest = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const { day } = route.params
    activity = [['back', 'body weight', 'http://d205bpvrqc9yn1.cloudfront.net/1773.gif', 1773,
        'one arm towel row', 'upper back', 20.0, 3, 0, 18, 5]]
    const [isModalVisible, setModalVisible] = useState(false);
    const [second, setSecond] = useState()
    const [minute, setMinute] = useState((2))
    var mytimeout
    useEffect(() => {
        mytimeout = setTimeout(() => {
            if (second === 1 && minute == 0) {
                alert("Activity Completed")
                dispatch(setExerciseToday())
                console.log("the state is  ",store.getState())
                clearTimeout(mytimeout);
                navigation.replace("MainExercisePage")
            }
            else {
                setSecond(old => {
                    if (old > 1) return old - 1
                    else if (old == 1 && minute != 0) { return 60 }
                })
                setMinute(old => {
                    if (second == 1 && minute != 0) {
                        return old - 1
                    }
                    return old
                })
            }
        }, 10)
    }, [second])






    return (
        <SafeAreaView >
            <View style={styles.infoView}>
                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                    Day {day}
                </Text>
            </View>
            <ScrollView style={styles.scroll}>

                <View style={{ justifyContent: "center", alignItems: "center",marginTop:"5%"}}>
                <Text style={styles.mainText}>ACTIVITY</Text>
                    <Text style={styles.mainText}>{activity[0][4]}</Text>
                    <Text style={styles.duration}>Duration: 45 minutes</Text>
                </View>

            </ScrollView>
            <TouchableOpacity onPress={() => { toggleModal();setSecond(60) }} style={styles.button}>
                <Text style={styles.text1}>Start</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "white" }}>Minutes Left: {minute}</Text>
                        <Text style={{ color: "white" }}>Seconds:{second}</Text>
                    </View>

                    <TouchableOpacity style={[styles.button, { height: 40 }]} onPress={() => { toggleModal(); clearTimeout(mytimeout);setMinute(-1);navigation.replace("MainExercisePage") }}>
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
    mainText:{
        fontSize:40,
        color:"black",
        textAlign:"center",
        textAlignVertical:"center",
        fontWeight:"bold"
    },
    duration:{
        fontSize:20,
        color:"black"
    }




})