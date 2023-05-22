import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

import colors from "../../files/Colors";
import Fab from '../components/Fab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Heading } from '../components/Heading';
import { Avatar, Title, Paragraph, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../components/loader';
import { MyButton } from "../components/button";
import { updatePrescriptionTitle, viewParticularPrescriptionOralMedicines, deletePartiularPrescription, viewFastInsulin, viewLongInsulin } from "../connectionToDB/prescription"
import {
    addAllergicReaction, updateAllergicReaction, deleteAllergicReaction,
    viewParticularAllergicReaction, viewAllTypeAllergicReaction
} from "../connectionToDB/reactions"
import {
    storeAllergiesInAsync, getAllergiesFromAsync
} from "../connectionToDB/AsyncStorage"


export default function AllergicReactionMain({ navigation, route }) {
    const [foodReactions, setFoodReactions] = useState([])
    const [medicationReactions, setMedicationReactions] = useState([])
    const [mount, setMount] = useState(0)
    const [loader, setLoader] = useState(false)

    const setStates = (type) => {
        getAllergiesFromAsync(type).then(allergies => {
            if (allergies!==null && allergies.length >= 1 && mount !== 0) {
                console.log(`in loadDataOnlyOnce in AllergicReactionMain if for ${type}`)
                console.log(allergies)
                if (type === "food") {
                    setFoodReactions(() => { return allergies })
                }
                else {
                    setMedicationReactions(() => { return allergies })
                }
            }
            else {
                viewAllTypeAllergicReaction(type)
                    .then(async (res) => {
                        console.log(`in loadDataOnlyOnce in AllergicReactionMain ${type}`)
                        console.log(`allergic reaction for ${type} are`, res)
                        await storeAllergiesInAsync(type, res)
                        if (type === "food") {
                            setFoodReactions(() => { return res })
                        }
                        else {
                            setMedicationReactions(() => { return res })
                            setLoader(false)
                        }
                    })
                    .catch(err => {
                        setLoader(false)
                        alert("Connection Lost! Try Again")
                        console.log("Error in loadDataOnlyOnce in AllergicReactionMain else ", err)
                    })
            }
        })
            .catch(err => {
                setLoader(false)
                alert("Connection Lost! Try Again")
                console.log("Error in loadDataOnlyOnce in AllergicReactionMain outside catch ", err)
            })

    }

    const loadDataOnlyOnce = async () => {
         setStates("food")
         setStates("medication")
    };

    useEffect(() => {
        if (mount === 0) {
            setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);
    const Food = () => {
        console.log("data in flatlist is ", foodReactions)
        return (
            <View style={{ backgroundColor: '#E2E4FF', flex: 1 }} >
                <FlatList style={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                    data={foodReactions}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.replace("AddAllergicReactions", { "id": item._id }) }}>
                                <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10 }}>
                                    <View style={{ backgroundColor: '#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                                        <Text style={styles.titleText}>Date: {(item.createdAt).slice(0, 10)} </Text>
                                        {/* <Text style={styles.titleText}>Time: {item.creationTime}</Text> */}
                                    </View>

                                    <View style={{ margin: 10 }}>
                                        <Card.Content style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Name: </Paragraph>
                                                <Paragraph>{item.name}</Paragraph>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Symptoms: </Paragraph>
                                                <Paragraph>{item.symptoms}</Paragraph>
                                            </View>


                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Description: </Paragraph>
                                                <Paragraph>{item.description}</Paragraph>
                                            </View>
                                        </Card.Content>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>

            </View>
        )
    }
    const Medication = () => {

        console.log("data in flatlist is ", medicationReactions)
        return (
            <View style={{ backgroundColor: '#E2E4FF', flex: 1 }} >
                <FlatList style={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                    data={medicationReactions}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.replace("AddAllergicReactions", { "id": item._id }) }}>
                                <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10 }}>
                                    <View style={{ backgroundColor: '#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                                        <Text style={styles.titleText}>Date: {(item.createdAt).slice(0, 10)} </Text>
                                        {/* <Text style={styles.titleText}>Time: {item.creationTime}</Text> */}
                                    </View>

                                    <View style={{ margin: 10 }}>
                                        <Card.Content style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Name: </Paragraph>
                                                <Paragraph>{item.name}</Paragraph>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Symptoms: </Paragraph>
                                                <Paragraph>{item.symptoms}</Paragraph>
                                            </View>


                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Description: </Paragraph>
                                                <Paragraph>{item.description}</Paragraph>
                                            </View>
                                        </Card.Content>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>

            </View>
        )
    }
    const Tab = createMaterialTopTabNavigator();
    return (


        <SafeAreaView style={styles.safeAreaCont}>
            <Loader visible={loader}></Loader>

            <Heading name={"Allergic Reactions"} />

            <Tab.Navigator >
                <Tab.Screen name="Food" component={Food} />

                <Tab.Screen name="Medication" component={Medication} />

            </Tab.Navigator >
            <Fab onPress={() => { navigation.replace("AddAllergicReactions", { "id": "undefined" }) }}></Fab>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaCont: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        textAlign: "center",
        // marginTop: 15,
        fontWeight: 'bold',
        color: "gray",
        fontSize: 15

    },
    con: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',mar
        // marginTop: 10
    },

    scrollContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    dietInfo: {
        borderWidth: 1,
        flex: 0.5,
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        // paddingTop: 20,
        margin: 10,
        width: 370,
        fontSize: 15
    },
    caloriesNumber: {
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    calories: {
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
    },
    smallCon: {
        backgroundColor: 'white',
        height: 70,
        flex: 0.5,
        marginLeft: 10,
        borderRadius: 20,
        paddingTop: 5,
    },
    mainSmal: {
        flexDirection: 'row',
        marginTop: 15,
        height: 80,
        height: 120,
        paddingTop: 5,
    },
    smallConTag: {
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
    },
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
    caloriesInfo: {
        marginTop: 20,
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
    },
    mealCategory: {
        flex: 1,
        flexDirection: 'column',
    },
    rowMealCategory: {
        flex: 1,
        flexDirection: 'row',
    },
    foodButton: {
        backgroundColor: 'white',
        width: 170,
        height: 150,
        margin: 8,
        borderRadius: 25,
        padding: 5,
        borderWidth: 1
    },
    Foodtext: {
        fontSize: 20,
        textAlign: 'center',
    },
    headImage: {
        width: "90%",
        height: 100,
        alignSelf: "center",
        marginTop: 10
    },
    heading: {
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",

        color: 'black',
        margin: 10
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
    }, touchOpacity: {
        // backgroundColor: "#86C0DD",
        // width:"100%",
        // height:40,
        // alignSelf:"center",
        // justifyContent:"center",
        // alignItems:"center",
        // marginVertical:15
        backgroundColor: "#6A6DB0",
        width: "20%",
        height: 50,
        borderRadius: 25,
        //marginTop: 20,
        padding: 10,
        alignSelf: "center"

    },
    textButton: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 5,
        // fontWeight: "bold"

    }, label: {
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//     },
//     heading: {
//         fontSize: 30,
//         fontStyle: "italic",
//         textAlign: "center",
//         fontWeight: "bold",
//         color: 'black',
//         margin: 15
//     },
//     medImg: {
//         width: "90%",
//         height: 180,
//         alignSelf: "center"
//     },

//     button: {
//         borderColor: "#DDBEA9",
//         borderWidth: 2,
//         height: 200,
//         width: "90%",
//         marginTop: 10,
//         marginBottom: 10,
//         alignSelf: "center",
//         // elevation: 6,
//         // shadowColor: '#DDBEA9',
//     },
//     buttonText: {
//         fontWeight: "bold",
//         fontSize: 20,
//         color: colors.darkGreyBlue,
//         textAlign: "center",
//         height: "20%",
//         width: "100%"

//     },
//     image: {
//         height: "80%",
//         width: "60%",
//         alignSelf: "center",
//         justifyContent: "center"
//     },

// });