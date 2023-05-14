
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, Button, TouchableOpacity, ScrollView, TextInput } from "react-native";
import generalStyles from "../../files/generalStyle";
import { MainHeading } from "../components/mainHeading";
import colors from "../../files/Colors";
import { Input } from "../components/input";
import MyDropDown from "../components/dropdown";
import Picker from "../components/picker";
import { MyButton } from "../components/button";
import { addBloodSugarRecord, viewBloodSugarInstance, updateBloodSugarRecord, deleteBloodSugarInstance } from "../connectionToDB/trackerBloodSugar"
import SelectDropdown from "react-native-select-dropdown";
import Loader from '../components/loader';
import { Heading } from "../components/Heading";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    addAnswerToQuestion
} from "../connectionToDB/dashboard"



export default AddAnswer = function ({ navigation, route }) {
    const [answer, setAnswer] = useState("")
    const [loader, setLoader] = useState(false)
    

    const saveAnswer = () => {
        setLoader(true)
        addAnswerToQuestion(route.params.id,answer)
            .then((data) => {
                setLoader(false)
                console.log("adding answer", data);
                navigation.navigate("ViewQuestionDetails",{"id":route.params.id})
            })
            .catch((err) => { 
                setLoader(false);
                alert("Connection Lost")
                console.log("Error in saveAnswer in AddAnswer", err) 
                navigation.navigate("Home")
                
                 
            })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader visible={loader}></Loader>
            <Heading name="Add a new Answer" />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                <View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Icon name="heartbeat" size={25} style={styles.icon} />
                        <View style={{ width: "85%" }}>
                            <Text style={styles.label}>Answer</Text>
                            <TextInput multiline value={answer} onChangeText={text => { setAnswer(text) }} style={styles.input} placeholder={`Enter Title`} placeholderTextColor={"gray"} />
                        </View>
                    </View>
                    <MyButton title="Post" onPress={saveAnswer}></MyButton>


                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "black",
        fontWeight:"bold"
    },
    text: {
        marginVertical: 5,
        marginHorizontal: 5,

        fontSize: 14,
        color: colors.greyBlue,
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    dropdown: {
        width: "100%",

    },
    scroll: {},
    unitContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "2%"
    },
    radioContainer: {
        flexDirection: "row"
    },
    radioButton: {
        backgroundColor: '#6A6DB0',
        width: "15%",
        height: "90%",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "5%"
    },
    radioCircle: {
        // backgroundColor: 'red'
    },
    text: {

        fontSize: 14,
        color: colors.greyBlue,
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    icon: {
        width: "13%",
        height: 50,
        backgroundColor: "#b8bedd",
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 25,
        textAlign: 'center',
        margin: 5,
        verticalAlign: 'middle'
    },
    radioText: { color: "black" }
    , input: {
        width: '94%',
        color: "black",
        // backgroundColor: '#b8bedd',
        // margin: 10,
        // alignSelf: 'center',
        // borderRadius: 10,
        // padding: 10,

        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        // elevation: 5,
    },
});