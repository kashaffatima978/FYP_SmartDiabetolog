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
    storeAllergiesInAsync, getAllergiesFromAsync
} from "../connectionToDB/AsyncStorage"

import {
    viewLongInsulin, viewFastInsulin, updateLongInsulin, updateFastInsulin, addFastInsulin,
    deleteFastInsulin, addLongInsulin, deleteLongInsulin
} from "../connectionToDB/prescription"



export default AddInsulinMedicine = function ({ navigation, route }) {

    const { title, id } = route.params
    const [mount, setMount] = useState(0)
    const [loader, setLoader] = useState(false)
    const loadDataOnlyOnce = () => {
        if (route.params.longInsulinID) {
            setLoader(true)
            viewLongInsulin(route.params.id)
                .then((res) => {
                    console.log("in loadDataOnlyOnce in AddInsulinMedicine for long")
                    console.log("long insulin medication details is", res)
                    setInsulinType("long")
                    setName(res[0].name)
                    setUnits(res[0].units)
                    setTime(res[0].time)
                    setLoader(false)
                })
                .catch(err => {
                    console.log("Error in loadDataOnlyOnce in viewLongInsulin ", err)
                    setLoader(false)
                    alert("Connection Lost! Try Again")
                    navigation.navigate("AddNewPrescription", { "title": title, "id": id });
                })
        }
        if (route.params.fastInsulinID) {
            setLoader(true)
            viewFastInsulin(route.params.id)
                .then((res) => {
                    console.log("in loadDataOnlyOnce in AddInsulinMedicine for fast")
                    console.log("fast insulin medication details is", res)
                    setInsulinType("fast")
                    setName(res[0].name)
                    setISF(res[0].isf)
                    setCarbRatio(res[0].carb_ratio)
                    setLoader(false)
                })
                .catch(err => {
                    console.log("Error in loadDataOnlyOnce in viewFastInsulin ", err)
                    setLoader(false)
                    alert("Connection Lost! Try Again")
                    navigation.navigate("AddNewPrescription", { "title": title, "id": id });
                })
        }

    };
    useEffect(() => {
        if (mount === 0) {
            //setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);




    const [insulinType, setInsulinType] = useState("fast")
    const [name, setName] = useState("")
    const [units, setUnits] = useState("")
    const [time, setTime] = useState("22:00")
    const [ISF, setISF] = useState("")
    const [carbRatio, setCarbRatio] = useState("")

    const saveLong = () => {
        setLoader(true)
        addLongInsulin(name, units, time, route.params.id)
            .then((data) => {
                console.log("adding long insulin medication", data);
                setLoader(false)
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in saveLong in AddInsulinMed", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
    }

    const updateLong = () => {
        setLoader(true)
        updateLongInsulin(route.params.longInsulinID, name, units, time)
            .then((data) => {
                console.log("updating long insulin medication", data);
                setLoader(false)
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in updateLong in AddInsulinMed", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
    }
    const deleteLong = () => {
        setLoader(true)
        deleteLongInsulin(route.params.longInsulinID)
            .then((data) => {
                console.log("deleting long insulin medication", data);
                setLoader(false)
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in deleteLong in AddInsulinMed", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
    }

    const saveFast = () => {
        setLoader(true)
        addFastInsulin(name, ISF, carbRatio, route.params.id)
            .then((data) => {
                console.log("adding fast insulin medication", data);
                setLoader(false)
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in saveFast in AddInsulinMed", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
    }

    const updateFast = () => {
        setLoader(true)
        updateFastInsulin(route.params.fastInsulinID, name, ISF, carbRatio)
            .then((data) => {
                console.log("updating fast insulin medication", data);
                setLoader(false)
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
                //navigation.replace(navigation.dangerouslyGetState().routes[navigation.dangerouslyGetState().index - 1].key, { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in updateFast in AddInsulinMed", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
    }
    const deleteFast = () => {
        setLoader(true)
        deleteFastInsulin(route.params.fastInsulinID)
            .then((data) => {
                console.log("deleting fast insulin medication", data);
                setLoader(false)
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in deleteFast in AddInsulinMed", err)
                setLoader(false)
                alert("Connection Lost! Try Again")
                navigation.navigate("AddNewPrescription", { "title": title, "id": id });
            })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader visible={loader}></Loader>
            <Heading name="Add Insulin" />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                <SafeAreaView style={[styles.container, { marginTop: 10, marginLeft: 50, marginRight: 28 }]}>
                    <Text style={[styles.label, { marginBottom: 15 }]}> Insulin Type</Text>
                    <SelectDropdown
                        style={styles.dropdown}
                        data={["Fast Acting Insulin", "Long Acting Insulin"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            if (selectedItem === "Long Acting Insulin") {
                                setInsulinType("long")
                            }
                            else {
                                setInsulinType("fast")
                            }
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
                        defaultButtonText={insulinType === "fast" ? "Fast Acting Insulin" : "Long Acting Insulin"}

                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >

                    </SelectDropdown>
                </SafeAreaView>

                {insulinType === "fast" ?
                    (
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Icon name="heartbeat" size={25} style={styles.icon} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput value={name} onChangeText={text => { setName(text) }} style={styles.input} placeholder="Enter Insulin Name" placeholderTextColor={"gray"} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Icon name="heartbeat" size={25} style={styles.icon} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.label}>Insulin Sensitivity Factor</Text>
                                    <TextInput value={`${ISF}`} onChangeText={text => { setISF(text) }} style={styles.input} placeholder="ISF" placeholderTextColor={"gray"} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Icon name="heartbeat" size={25} style={styles.icon} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.label}>Carb Ratio</Text>
                                    <TextInput value={`${carbRatio}`} onChangeText={text => { setCarbRatio(text) }} style={styles.input} placeholder="Enter Carb Ratio" placeholderTextColor={"gray"} />
                                </View>
                            </View>

                            {!route.params.fastInsulinID ?
                                (<MyButton title="Save" onPress={saveFast}></MyButton>)
                                :
                                (
                                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <MyButton title="Delete" style={{ width: "20%" }} onPress={deleteFast}></MyButton>
                                        <MyButton title="Update" onPress={updateFast}></MyButton>
                                    </View>
                                )
                            }
                        </View>
                    ) :
                    (
                        <View>
                            <View style={{ marginTop: 10, marginLeft: 50, marginRight: 28 }}>
                                <Text style={[styles.label, { marginBottom: 15 }]}> Time</Text>
                                <SelectDropdown
                                    style={styles.dropdown}
                                    data={["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                                        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
                                        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                        setTime(selectedItem)
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
                                    defaultButtonText={time}

                                    dropdownIconPosition="right"
                                    dropdownStyle={{ backgroundColor: "white" }}
                                    rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                                    rowTextStyle={{ color: colors.greyBlue }}>
                                </SelectDropdown>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Icon name="heartbeat" size={25} style={styles.icon} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput value={name} onChangeText={text => { setName(text) }} style={styles.input} placeholder="Enter Insulin Name" placeholderTextColor={"gray"} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Icon name="heartbeat" size={25} style={styles.icon} />
                                <View style={{ width: "85%" }}>
                                    <Text style={styles.label}>Units</Text>
                                    <TextInput value={`${units}`} onChangeText={text => { setUnits(text) }} style={styles.input} placeholder="Enter Units" placeholderTextColor={"gray"} />
                                </View>
                            </View>
                            {!route.params.longInsulinID ?
                                (<MyButton title="Save" onPress={saveLong}></MyButton>)
                                :
                                (
                                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <MyButton title="Delete" style={{ width: "20%" }} onPress={deleteLong}></MyButton>
                                        <MyButton title="Update" onPress={updateLong}></MyButton>
                                    </View>
                                )
                            }



                        </View>
                    )


                }









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