
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
import axios from "axios";
import { IP } from "../../files/information"

import {
    addAllergicReaction, updateAllergicReaction, deleteAllergicReaction,
    viewParticularAllergicReaction, viewAllTypeAllergicReaction
} from "../connectionToDB/reactions"




export default AddAllergicReactions = function ({ navigation, route }) {
    const { id } = route.params.id
    const ip = `http://${IP}`
    const [loader, setLoader] = useState(false)

    const [mount, setMount] = useState(0)
    const loadDataOnlyOnce = () => {

        if (route.params.id !== "undefined") {
            setLoader(true)
            viewParticularAllergicReaction(route.params.id)
                .then((res) => {
                    console.log("in loadDataOnlyOnce in AddAllergicReactions")
                    setName(res.name)
                    setType(res.type)
                    setSymtoms(res.symtoms)
                    setDescription(res.description)
                    setLoader(false)
                })
                .catch(err => {
                    setLoader(false);
                    alert("Connection Lost")
                    console.log("Error in loadDataOnlyOnce in AddAllergicReactions ", err)
                })
        }

    };
    useEffect(() => {
        if (mount === 0) {
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);

    const [type, setType] = useState("food")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [symtoms, setSymtoms] = useState([])

    const saveReaction = () => {
        setLoader(true)

        if (type === "medication") {
            //if type is medication fet the active agents for medicine
        axios.post(ip + ':8000/getActiveAgent', { 'med': name })
        .then((response) => {
            console.log("When active agent got is ", response.data)
            const agentsGot = response.data
            
            console.log(agentsGot, typeof (agentsGot))       
            //now add allergic Reaction in DB
            addAllergicReaction(name, symtoms, type, description,agentsGot)
            .then((data) => {
                console.log("adding allergic reaction", data);
                setLoader(false)
                navigation.replace("AllergicReactionMain")
            })
            .catch((err) => {
                setLoader(false)
                navigation.replace("AllergicReactionMain")
                alert("Connection Lost! Try Again")
                console.log("Error in saveReaction in AddReaction", err)
            })
            
        })
        .catch((err) => {
            console.log(err, "error in AddAllergicReaction for getting active agents")
            setLoader(false)
            navigation.replace("AllergicReactionMain")
            alert("Connection Lost! Try Again")
        })

        }

        else {
            addAllergicReaction(name, symtoms, type, description,[])
            .then((data) => {
                console.log("adding allergic reaction", data);
                setLoader(false)
                navigation.replace("AllergicReactionMain")
            })
            .catch((err) => {
                setLoader(false)
                navigation.replace("AllergicReactionMain")
                alert("Connection Lost! Try Again")
                console.log("Error in saveReaction in AddReaction", err)
            })
        }
    }

    const updateReaction = () => {
        setLoader(true)
        updateAllergicReaction(route.params.id, name, symtoms, type, description)
            .then((data) => {
                console.log("updating AllergicReaction medication", data);
                setLoader(false)
                navigation.replace("AllergicReactionMain")
            })
            .catch((err) => {
                setLoader(false)
                navigation.replace("AllergicReactionMain")
                alert("Connection Lost! Try Again")
                console.log("Error in updateReaction in AddInsulinMed", err)
            })
    }
    const deleteReaction = () => {
        setLoader(true)
        deleteAllergicReaction(route.params.id)
            .then((data) => {
                console.log("deleting AllergicReaction medication", data);
                setLoader(false)
                navigation.replace("AllergicReactionMain")
            })
            .catch((err) => {
                setLoader(false)
                navigation.replace("AllergicReactionMain")
                alert("Connection Lost! Try Again")
                console.log("Error in deleteReaction in AddInsulinMed", err)
            })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader visible={loader}></Loader>
            <Heading name="Add Allergic Reaction" />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                <SafeAreaView style={[styles.container, { marginTop: 10, marginLeft: 50, marginRight: 28 }]}>
                    <Text style={[styles.label, { marginBottom: 15 }]}> Allergic Reaction Type</Text>
                    <SelectDropdown
                        style={styles.dropdown}
                        data={["Food", "Medication"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            if (selectedItem === "Food") {
                                setType("food")
                            }
                            else {
                                setType("medication")
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
                        defaultButtonText={type === "food" ? "Food" : "Medication"}

                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >
                    </SelectDropdown>
                </SafeAreaView>


                <View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Icon name="heartbeat" size={25} style={styles.icon} />
                        <View style={{ width: "85%" }}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput value={name} onChangeText={text => { setName(text) }} style={styles.input} placeholder={`Enter ${type} name`} placeholderTextColor={"gray"} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Icon name="heartbeat" size={25} style={styles.icon} />
                        <View style={{ width: "85%" }}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput value={description} onChangeText={text => { setDescription(text) }} style={styles.input} placeholder="Enter description" placeholderTextColor={"gray"} />
                        </View>
                    </View>



                    {route.params.id === "undefined" ?
                        (<MyButton title="Save" onPress={saveReaction}></MyButton>)
                        :
                        (
                            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <MyButton title="Delete" style={{ width: "20%" }} onPress={deleteReaction}></MyButton>
                                <MyButton title="Update" onPress={updateReaction}></MyButton>
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