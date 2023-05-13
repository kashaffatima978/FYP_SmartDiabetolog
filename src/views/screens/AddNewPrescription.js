import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

import colors from "../../files/Colors";
import Fab from '../components/Fab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Heading } from '../components/Heading';
import { Avatar, Title, Paragraph, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MyButton } from "../components/button";
import { updatePrescriptionTitle, viewParticularPrescriptionOralMedicines, deletePartiularPrescription, viewFastInsulin, viewLongInsulin } from "../connectionToDB/prescription"
import {
    storeAllergiesInAsync, getAllergiesFromAsync
} from "../connectionToDB/AsyncStorage"
import Loader from "../components/loader";

export default function AddNewPrescription({ navigation, route }) {
    const name = route.params.title
    const id = route.params.id
    const [title, setTitle] = useState(name)
    const [loader, setLoader] = useState(false)

    const [longInsulinMedication, setLongInsulinMedication] = useState([])
    const [fastInsulinMedication, setFastInsulinMedication] = useState([])
    const [oralMedications, setOralMedications] = useState([
    ])
    const [mount, setMount] = useState(0)
    //viewLongInsulin, viewFastInsulin

    const getState = (type) => {
        getAllergiesFromAsync(type).then(insulin => {
            if (insulin!==null && insulin.length === 1 && mount !== 0) {
                console.log(`in loadDataOnlyOnce in AddNewPrescription if for ${type}`)
                console.log(insulin)
                if (type === "fast") {
                    setFastInsulinMedication(() => { return [insulin] })
                }
                else {
                    setLongInsulinMedication(() => { return [insulin] })
                    setLoader(false)
                }

            }
            else {
                if (type === "long") {
                    viewLongInsulin(route.params.id)
                        .then(async (res) => {
                            console.log("in loadDataOnlyOnce in AddNewPrescription")
                            console.log("long insulin in this prescription are", res)
                            setLongInsulinMedication(res)
                            await storeAllergiesInAsync("long", res)
                            setLoader(false)
                        })
                        .catch(err => {
                            console.log("Error in loadDataOnlyOnce in viewLongInsulin ", err)
                            setLoader(false)
                            navigation.navigate("Home");
                            alert("Connection Lost! Try Again")
                        })
                }
                else {
                    viewFastInsulin(route.params.id)
                        .then(async (res) => {
                            console.log("in loadDataOnlyOnce in AddNewPrescription")
                            console.log("fast insulin in this prescription are", res)
                            setFastInsulinMedication(res)
                            await storeAllergiesInAsync("fast", res)
                        })
                        .catch(err => { console.log("Error in loadDataOnlyOnce in viewFastInsulin ", err) })
                }

            }
        })
            .catch(err => {
                console.log("Error in loadDataOnlyOnce in AllergicReactionMain outside catch ", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("Home");
            })

    }
    const loadDataOnlyOnce = () => {
        setLoader(true)
        viewParticularPrescriptionOralMedicines(route.params.id)
            .then((res) => {
                console.log("in loadDataOnlyOnce in AddNewPrescription")
                console.log("oral medications in this prescription are", res)
                setOralMedications(() => { return res })
            })
            .catch(err => {
                console.log("Error in loadDataOnlyOnce in AddNewPrescription ", err)
            })


        getState("fast")
        getState("long")
    };
    useEffect(() => {
        if (mount === 0) {
            //setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);


    const saveTitle = () => {
        setLoader(true)
        updatePrescriptionTitle(id, title)
            .then((data) => {
                console.log("updating prescription title", data);
                setLoader(false)
            })
            .catch((err) => { 
                console.log("Error in saveTitle in AddNewPrescription", err) 
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("Home");
            })
    }

    const deletePrescription = () => {
        setLoader(true)
        deletePartiularPrescription(route.params.id)
            .then((data) => {
                console.log("deletePrescription", data);
                setLoader(false)
                navigation.replace("Prescription")
            })
            .catch((err) => { 
                console.log("Error in deletePrescription in AddNewPrescription", err) 
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.replace("Prescription")
            })
    }

    const Oral = () => {
        console.log("data in flatlist is ", oralMedications)
        return (
            <View style={{ backgroundColor: '#E2E4FF', flex: 1 }} >
                <FlatList style={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                    data={oralMedications}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.navigate("AddOralMedicine", { "title": title, "id": id, "oralMedicineId": item._id }) }}>
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
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Units: </Paragraph>
                                                <Paragraph>{item.unit}</Paragraph>
                                            </View>


                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Dosage: </Paragraph>
                                                <Paragraph>{item.dosage}</Paragraph>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>
                                                <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Time: </Paragraph>
                                                <Paragraph>{item.time}</Paragraph>
                                            </View>


                                        </Card.Content>
                                    </View>
                                </Card>
                            </TouchableOpacity>

                        )
                    }}
                >
                </FlatList>
                <Fab onPress={() => { navigation.navigate("AddOralMedicine", { "title": title, "id": id }) }}></Fab>
            </View>
        )
    }
    const Insulin = () => {

        return (
            <View style={{ backgroundColor: '#E2E4FF', flex: 1 }} >

                {(!fastInsulinMedication || fastInsulinMedication[0] === undefined) ? null :
                    (
                        <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.navigate("AddInsulinMedicine", { "title": title, "id": id, "fastInsulinID": fastInsulinMedication[0]._id }) }}>
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10 }}>
                                <View style={{ backgroundColor: '#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                                    <Text style={styles.titleText}>Date: {(fastInsulinMedication[0].createdAt).slice(0, 10)} </Text>

                                </View>
                                <View style={{ margin: 10 }}>
                                    <Card.Content style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Fast Acting Insulin </Paragraph>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Name: </Paragraph>
                                            <Paragraph>{fastInsulinMedication[0].name}</Paragraph>
                                        </View>

                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>ISF: </Paragraph>
                                            <Paragraph>{fastInsulinMedication[0].isf}</Paragraph>
                                        </View>


                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Carb Ratio: </Paragraph>
                                            <Paragraph>{fastInsulinMedication[0].carb_ratio}</Paragraph>
                                        </View>

                                    </Card.Content>
                                </View>
                            </Card>
                        </TouchableOpacity>

                    )
                }

                {(!longInsulinMedication || longInsulinMedication[0] === undefined) ? null :
                    (
                        <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.navigate("AddInsulinMedicine", { "title": title, "id": id, "longInsulinID": longInsulinMedication[0]._id }) }}>
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10 }}>
                                <View style={{ backgroundColor: '#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                                    <Text style={styles.titleText}>Date: {(longInsulinMedication[0].createdAt).slice(0, 10)} </Text>

                                </View>
                                <View style={{ margin: 10 }}>
                                    <Card.Content style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Long Acting Insulin </Paragraph>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Name: </Paragraph>
                                            <Paragraph>{longInsulinMedication[0].name}</Paragraph>
                                        </View>

                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Time: </Paragraph>
                                            <Paragraph>{longInsulinMedication[0].time}</Paragraph>
                                        </View>


                                        <View style={{ flexDirection: "row" }}>
                                            <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Units: </Paragraph>
                                            <Paragraph>{longInsulinMedication[0].units}</Paragraph>
                                        </View>

                                    </Card.Content>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                }

                <Fab isDisabled={fastInsulinMedication.length >= 1 && longInsulinMedication.length >= 1 ? true : false}
                    onPress={() => { navigation.navigate("AddInsulinMedicine", { "title": title, "id": id }) }}></Fab>
            </View>
        )
    }
    const Tab = createMaterialTopTabNavigator();
    return (


        <SafeAreaView style={styles.safeAreaCont}>
            <Loader visible={loader}></Loader>

            <Heading name={title} />
            <TouchableOpacity
                onPress={deletePrescription}
                activeOpacity={0.5} style={[styles.touchOpacity, { width: "50%", }]}>
                <Text style={styles.textButton}>delete</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 5, width: "100%" }}>
                <Icon name="heartbeat" size={25} style={styles.icon} />
                <View style={{ width: "60%" }}>
                    <Text style={{ color: "black" }}>Prescription Title</Text>
                    <TextInput value={title} onChangeText={text => setTitle(text)} style={styles.input} placeholder="Enter Prescription Name" placeholderTextColor={"gray"} />
                </View>
                <TouchableOpacity
                    onPress={saveTitle}
                    activeOpacity={0.5} style={styles.touchOpacity}>
                    <Text style={styles.textButton}>Save</Text>
                </TouchableOpacity>
            </View>

            <Tab.Navigator >
                <Tab.Screen name="Oral" component={Oral} />

                <Tab.Screen name="Insulin" component={Insulin} />

            </Tab.Navigator >

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