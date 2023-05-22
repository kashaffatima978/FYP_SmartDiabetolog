import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Input } from "../components/input";
import { addCholesterolRecord, viewCholesterolInstance, deleteCholesterolInstance, updateCholesterolRecord } from "../connectionToDB/trackerCholestrol";
import Loader from '../components/loader';
import { Heading } from "../components/Heading";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeTrackerInstanceInAsync } from "../connectionToDB/AsyncStorage"

export default function AddCholesterol({ navigation, route }) {

    const [existingItem, setExistingItem] = useState(null)
    const [loader, setLoader] = useState(false)
    const [mount, setMount] = useState(0)
    const loadDataOnlyOnce = async () => {
        // alert("loadDataOnlyOnce");
        if (route.params !== undefined) {
            const id = route.params.id
            // alert(route.params.id)
            if (id !== undefined) {
                setLoader(true)
                viewCholesterolInstance(id)
                    .then((res) => {
                        console.log("In ", res)
                        setExistingItem(() => { return res });
                        setInputList(() => {
                            return {
                                "ldl": res.ldl,
                                "hdl": res.hdl,
                                "triglycerides": res.triglycerides,
                                "description": res.description,

                            }
                        });
                        console.log("After setting existingItem= ", existingItem)
                        setLoader(false)

                    })
                    .catch((err) => {
                        console.log("Error in AddCholesterol uploading particular instance ", err)
                        setLoader(false)
                        alert("Connection Lost! Try Again.")
                        navigation.replace("ViewCholesterol")
                    })
            }
        }

    };
    useEffect(() => {
        if (mount === 0) {
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);



    const [inputList, setInputList] = useState(
        {
            "hdl": "",
            "ldl": "",
            "triglycerides": "",
            "description": ""
        }
    );

    //Method sets the state change in inputList
    const handleOnTextChange = (newText, inputType) => {
        setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
        console.log("InputList: ", inputList)
    };

    const save = () => {
        setLoader(true)
        addCholesterolRecord(inputList.hdl, inputList.ldl, inputList.triglycerides, inputList.description)
            .then(async (data) => {
                console.log("abc", data);
                //also store instance in Async
                await storeTrackerInstanceInAsync("cholesterol", data)
                setLoader(false)
                navigation.replace("ViewCholesterol")
            })
            .catch((err) => {
                console.log("Error in save in add cholesterol", err)
                setLoader(false)
                alert("Connection Lost! Try Again.")
                navigation.replace("ViewCholesterol")
            })
    }

    const update = () => {
        setLoader(true)
        updateCholesterolRecord(route.params.id, inputList.hdl, inputList.ldl, inputList.triglycerides, inputList.description)
            .then((data) => {
                console.log("update", data)
                setLoader(false)
                navigation.replace("ViewCholesterol")
            })
            .catch((err) => {
                console.log("Error in update in add cholesterol", err);
                setLoader(false)
                alert("Connection Lost! Try Again.")
                navigation.replace("ViewCholesterol")
            })
    }
    const deleteItem = () => {
        setLoader(true)
        deleteCholesterolInstance(route.params.id)
            .then((data) => {
                console.log("delete", data);
                setLoader(false)
                navigation.replace("ViewCholesterol")
            })
            .catch((err) => {
                console.log("Error in delete in add cholesterol", err);
                setLoader(false)
                alert("Connection Lost! Try Again.")
                navigation.replace("ViewCholesterol")
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader}></Loader>
            <Heading name="Add Cholesterol" />
            {/* medkit */}
            <ScrollView style={styles.container2}
                showsVerticalScrollIndicator={false}>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name="tint" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>LDL</Text>
                        <TextInput style={styles.input} maxLength={3} keyboardType={"numeric"} value={`${inputList.ldl}`} multiline={true} placeholder="Enter your LDL reading" onChangeText={text => handleOnTextChange(text, "ldl")} />
                    </View>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Icon name="tint" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>HDL</Text>
                        <TextInput style={styles.input} maxLength={3} keyboardType={"numeric"} value={`${inputList.hdl}`} multiline={true} placeholder="Enter your HDL reading" onChangeText={text => handleOnTextChange(text, "hdl")} />
                    </View>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Icon name="notes-medical" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>Triglycerides</Text>
                        <TextInput style={styles.input} maxLength={3} keyboardType={"numeric"} value={`${inputList.triglycerides}`} multiline={true} placeholder="Enter your Triglycerides reading" onChangeText={text => handleOnTextChange(text, "triglycerides")} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Icon name="sticky-note" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput style={styles.input} value={inputList.description} multiline={true} placeholder="Enter a Description" onChangeText={text => handleOnTextChange(text, "description")} />
                    </View>
                </View>


                {/* <View style={styles.inputContainer}>
                    <Input label="Notes"
                        
                        placeholder="Enter a Description"
                        
                        multiline={true}
                        inputBackground="white"
                        textColor="#4A3C31"
                    />
                </View> */}


                {

                    existingItem === null ?
                        (<TouchableOpacity style={styles.saveButtonContainer} onPress={save}>
                            <Text style={styles.saveButtonText} >Save</Text>
                        </TouchableOpacity>) :
                        (<View>
                            <TouchableOpacity style={styles.saveButtonContainer}
                                onPress={() => { update() }}>
                                <Text style={styles.saveButtonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButtonContainer}
                                onPress={() => { deleteItem() }}>
                                <Text style={styles.saveButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        )

                }

            </ScrollView>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    textView: {
        flex: 0.1,
        backgroundColor: "#FFE8D6",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
        color: "#4A3C31",
        fontWeight: "bold"
    },
    container2: {
        flex: 0.9,
        backgroundColor: "white"
    },
    inputContainer: {
        backgroundColor: "#DDBEA9",
        marginVertical: "3%",
        marginHorizontal: "3%",
        // borderRadius:30,
        padding: "2%"
    },
    saveButtonContainer: {
        backgroundColor: "#6A6DB0",
        width: 250,
        height: 50,
        borderRadius: 25,
        marginTop: 40,
        padding: 10,
        alignSelf: "center"
    },
    saveButtonText: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 5,
    },
    text: {

        fontSize: 14,
        color: 'black',
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
    }
    , input: {
        width: '94%',
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
    }

})