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
import { storeTrackerInstanceInAsync } from "../connectionToDB/AsyncStorage"


export default AddBloodSugar = function ({ navigation, route }) {
    const [mgUnit, setMgUnit] = useState("mg/dL");
    const [loader, setLoader] = useState(false)
    const [inputList, setInputList] = useState({
        "concentration": "",
        "unit": "",
        "description": "",
        "event": "",
        "creationDate": "",
        "creationTime": ""
    });
    const [existingItem, setExistingItem] = useState(null)
    const [mount, setMount] = useState(0)
    const loadDataOnlyOnce = async () => {
        // alert("loadDataOnlyOnce");
        if (route.params !== undefined) {
            setLoader(true)
            const id = route.params.id
            // alert(route.params.id)
            if (id !== undefined) {
                viewBloodSugarInstance(id)
                    .then((res) => {
                        console.log("In ", res)
                        setExistingItem(res);
                        setInputList(() => {
                            return {
                                "concentration": res.concentration,
                                "unit": res.unit,
                                "description": res.description,
                                "event": res.event,
                                "creationDate": res.creationDate,
                                "creationTime": res.creationTime
                            }
                        });
                        console.log("After setting existingItem= ", existingItem)
                        setLoader(false)
                    })
                    .catch((err) => { 
                        console.log("Error in ViewBloodSugarInstance uploading particular instance ", err) 
                        setLoader(false)
                        alert("Connection Lost! Try Again.")
                        navigation.replace("ViewBloodSugar")
                    })
            }
        }

    };
    useEffect(() => {
        if (mount === 0) {
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
        const date = `${(new Date()).getDate()}-${(new Date()).getMonth() + 1}-${(new Date()).getFullYear()}`
        const time = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`
        handleOnTextChange(date, "creationDate")
        handleOnTextChange(time, "creationTime")
    }, [mount]);

    //FOR TESTING PURPOSE
    const checkData = (con, description) => {
        return {
            "concentration": res.concentration,
            "description": res.description,
        }
    }


    const save = () => {
        // alert(date)
        // alert(time)
        setLoader(true)
        addBloodSugarRecord(inputList.concentration, inputList.unit, inputList.description, inputList.event, inputList.creationDate, inputList.creationTime)
            .then(async (data) => {
                console.log("abc", data);
                //also store instance in Async
                await storeTrackerInstanceInAsync("bloodsugar", data)
                setLoader(false)
                navigation.replace("ViewBloodSugar")
            })
            .catch((err) => {
                console.log("Error in save in add blood sugar", err)
                setLoader(false)
                alert("Connection Lost! Try Again.")
                navigation.replace("ViewBloodSugar")
            })
    }

    const update = () => {
        setLoader(true)
        updateBloodSugarRecord(route.params.id, inputList.concentration, inputList.unit, inputList.description, inputList.event, inputList.creationDate, inputList.creationTime)
            .then((data) => {
                console.log("update", data);
                setLoader(false);
                navigation.replace("ViewBloodSugar")
            })
            .catch((err) => {
                console.log("Error in update in add blood sugar", err)
                setLoader(false)
                alert("Connection Lost! Try Again.")
                navigation.replace("ViewBloodSugar")
            })
    }
    const deleteItem = () => {
        setLoader(true)
        deleteBloodSugarInstance(route.params.id)
            .then((data) => {
                console.log("delete", data);
                setLoader(false);
                navigation.replace("ViewBloodSugar")
            })
            .catch((err) => {
                console.log("Error in delete in add blood sugar", err)
                setLoader(false)
                alert("Connection Lost! Try Again.")
                navigation.replace("ViewBloodSugar")
            })
    }

    //Method sets the state change in inputList
    const handleOnTextChange = (newText, inputType) => {
        setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
        console.log("InputList: ", inputList)
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader visible={loader}></Loader>
            <Heading name="Add Blood Sugar" />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>


                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name="heartbeat" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>Blood Sugar Concentration</Text>
                        <TextInput style={styles.input} value={`${inputList.concentration}`} keyboardType={'numeric'} placeholderTextColor={"gray"} maxLength={3} placeholder="Enter Blood Sugar Concentration" onChangeText={text => handleOnTextChange(text, "concentration")} />
                    </View>
                </View>

                <View style={{ marginTop: 40, marginLeft: 65 }}>
                    <Text style={[styles.label, { marginBottom: 15 }]}>Select Concentration Unit</Text>
                    <View style={styles.unitContainer}>
                        <TouchableOpacity style={[styles.radioContainer]}
                            value={mgUnit} onPress={() => {
                                setMgUnit("mmol/L")
                                handleOnTextChange("mmol/L", "unit")
                            }}>
                            <View style={[styles.radioButton, { backgroundColor: (mgUnit === "mmol/L") ? "#32004f" : '#6A6DB0' }]}>
                                <Text style={[styles.radioCircle]}>O</Text>
                            </View>
                            <Text style={styles.radioText}>mmol/L</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioContainer}
                            value={mgUnit}
                            onPress={() => {
                                setMgUnit("mg/dL")
                                handleOnTextChange("mg/dL", "unit")
                            }}>
                            <View style={[styles.radioButton, { backgroundColor: (mgUnit === "mg/dL") ? "#32004f" : '#6A6DB0' }]} >
                                <Text style={styles.radioCircle}>O</Text>
                            </View>
                            <Text style={styles.radioText}>mg/dL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <SafeAreaView style={[styles.container, { marginTop: 40, marginLeft: 50, marginRight: 28 }]}>
                    <Text style={[styles.label, { marginBottom: 15 }]}> Event</Text>
                    <SelectDropdown
                        style={styles.dropdown}
                        data={["Before Breakfast", "After Breakfast", "Before Lunch",
                            "After Lunch", "Before Dinner", "After Dinner", "Random"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            handleOnTextChange(selectedItem, "event")
                        }}

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;

                        }}
                        rowTextForSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}

                        buttonStyle={{ color: "red", width: "100%", backgroundColor: '#b8bedd', height: 50, borderRadius: 15 }}

                        buttonTextStyle={
                            {
                                fontSize: 14,
                                color: 'black',
                                textTransform: "capitalize",
                                fontWeight: "bold"
                            }
                        }
                        defaultButtonText={`${existingItem !== null ? existingItem.event : "Select an Event"}`}

                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >

                    </SelectDropdown>
                </SafeAreaView>
                {/* sticky-note */}

                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Icon name="sticky-note" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput style={styles.input} value={inputList.description} multiline={true} placeholder="Enter a Description" placeholderTextColor={"gray"} onChangeText={text => handleOnTextChange(text, "description")} />
                    </View>
                </View>

                <View style={{ marginTop: 40 }}>
                    {

                        existingItem === null ?
                            (<MyButton title="Save" onPress={() => { save() }} />) :
                            (<View>
                                <MyButton title="Update" onPress={() => { update() }} />
                                <MyButton title="Delete" onPress={() => { deleteItem() }} />
                            </View>
                            )

                    }
                </View>





            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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