
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
    viewParticularQuestionDetail
} from "../connectionToDB/dashboard"
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';



export default ViewQuestionDetails = function ({ navigation, route }) {
    const id = (route.params.id)



    const [mount, setMount] = useState(0)

    const loadDataOnlyOnce = () => {
        alert(route.params.id)
        viewParticularQuestionDetail(id)
            .then((res) => {
                console.log("in loadDataOnlyOnce in ViewQuestionDetails")
                setTitle(res.title)
                setDetail(res.detail)
                setAnswers(res.answers)
            })
            .catch(err => { console.log("Error in loadDataOnlyOnce in ViewQuestionDetails ", err) })


    };
    useEffect(() => {
        if (mount === 0) {
            //setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);


    const [title, setTitle] = useState("")
    const [detail, setDetail] = useState("")
    const [answers, setAnswers] = useState([])
    // const answers = [`You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.`, `You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
    // `, `You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
    // `, `You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
    // `, `You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
    // `]


    return (
        <ScrollView >
            <Heading name="Question Details" />


            <Text style={styles.title}>
                {title}
                {/* Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" */}
            </Text>
            <Text style={styles.detail}>
                {/* Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" Android Studio Error "Android Gradle plugin requires Java 11 to run.
                    You are currently using Java 1.8" */}
                {detail}
            </Text>

            <View style={{ height: 100 }}>
                <Text style={{ fontSize: 30, textAlign: "center", color: 'black', }}>
                    Answers </Text>
                <TouchableOpacity style={styles.addAnswerButton} onPress={() => { navigation.navigate("AddAnswer", { "id": route.params.id }) }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Add Answer</Text>
                </TouchableOpacity>
            </View>


            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {
                    answers.map((item)=>{
                        return(
                            <TouchableOpacity style={styles.flatlistItemContainer} >
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 2 }}>
                                <View style={{ backgroundColor: '#6A6DB0', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                                    {/* <Text style={styles.titleText}>Date: {(item.createdAt).slice(0, 10)}</Text>
                                        <Text style={styles.titleText}>Time: {item.creationTime}</Text> */}
                                </View>

                                <View style={{ margin: 1 }}>
                                    <Card.Content style={{ flexDirection: "row" }}>
                                        <Paragraph>{item.answer}</Paragraph>
                                    </Card.Content>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        )
                    })
                }

                


            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        marginHorizontal: "2%",
        textAlign: "justify",
        borderBottomWidth: 1,
        height: 150
    },
    detail: {
        fontSize: 14,
        color: "black",
        marginHorizontal: "2%",
        marginVertical: "3%",
        textAlign: "justify",
        borderBottomWidth: 1,
        height: 200
    },
    label: {
        color: "black"
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
    scroll: { width: "100%" },
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
    ,
    input: {
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
    flatlist: {

        backgroundColor: "white"
    },
    flatlistItemContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "white",
        marginHorizontal: "5%",
        //height: 150,
        marginBottom: "3%",
    },
    addAnswerButton: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 15,
        backgroundColor: '#6A6DB0',
        height: 40,
        width: "25%",
        justifyContent: "center",
        alignItems: "center"
    }
});