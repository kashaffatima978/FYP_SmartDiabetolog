import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity } from "react-native";
import { Input } from "../components/input";
import { addCholesterolRecord, viewCholesterolInstance, deleteCholesterolInstance, updateCholesterolRecord } from "../connectionToDB/trackerCholestrol";
import Loader from '../components/loader';
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
                        setTimeout(() => { setLoader(false) }, 1000)
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

                    })
                    .catch((err) => { console.log("Error in AddCholesterol uploading particular instance ", err) })
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
        addCholesterolRecord(inputList.hdl, inputList.ldl, inputList.triglycerides, inputList.description)
            .then((data) => { console.log("abc", data), navigation.replace("ViewCholesterol") })
            .catch((err) => { console.log("Error in save in add cholesterol", err) })
    }

    const update = () => {
        updateCholesterolRecord(route.params.id, inputList.hdl, inputList.ldl, inputList.triglycerides, inputList.description)
            .then((data) => { console.log("update", data), navigation.replace("ViewCholesterol") })
            .catch((err) => { console.log("Error in update in add cholesterol", err) })
    }
    const deleteItem = () => {
        deleteCholesterolInstance(route.params.id)
            .then((data) => { console.log("delete", data), navigation.replace("ViewCholesterol") })
            .catch((err) => { console.log("Error in delete in add cholesterol", err) })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader}></Loader>
            <View style={styles.textView}>
                <Text style={styles.text}>Add Cholesterol</Text>
            </View>

            <ScrollView style={styles.container2}
                showsVerticalScrollIndicator={false}>


                <View style={styles.inputContainer}>
                    <Input label="LDL"
                        placeholder="Enter your LDL reading"
                        value={`${inputList.ldl}`}
                        onChangeText={text => handleOnTextChange(text, "ldl")}
                        inputBackground="white"
                        keyboardType={"numeric"}
                        maxLength={3}
                        textColor="#4A3C31" />
                </View>

                <View style={styles.inputContainer}>
                    <Input label="HDL"
                        value={`${inputList.hdl}`}
                        placeholder="Enter your HDL reading"
                        onChangeText={text => handleOnTextChange(text, "hdl")}
                        inputBackground="white"
                        keyboardType={"numeric"}
                        maxLength={3}
                        textColor="#4A3C31" />
                </View>

                <View style={styles.inputContainer}>
                    <Input label="Triglycerides"
                        value={`${inputList.triglycerides}`}
                        placeholder="Enter your Triglycerides reading"
                        onChangeText={text => handleOnTextChange(text, "triglycerides")}
                        inputBackground="white"
                        keyboardType={"numeric"}
                        maxLength={3}
                        textColor="#4A3C31" />
                </View>


                <View style={styles.inputContainer}>
                    <Input label="Notes"
                        value={inputList.description}
                        placeholder="Enter a Description"
                        onChangeText={text => handleOnTextChange(text, "description")}
                        multiline={true}
                        inputBackground="white"
                        textColor="#4A3C31"
                    />
                </View>


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
        backgroundColor: "#CB997E",
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
        marginVertical: "3%",
        marginHorizontal: "3%",
        backgroundColor: "#DDBEA9",
        width: "30%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        borderRadius: 30,
    },
    saveButtonText: {
        color: "#4A3C31",
        fontWeight: "bold",
        fontSize: 16
    }

})