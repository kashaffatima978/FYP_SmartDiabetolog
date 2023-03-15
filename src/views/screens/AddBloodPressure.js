import { useState, useEffect } from "react";
import React from "react-native";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Input } from "../components/input";
import { addBloodPressureRecord, viewBloodPressureInstance, updateBloodPressureRecord, deleteBloodPressureInstance } from "../connectionToDB/trackerBloodPressure";
import Loader from '../components/loader';
export default function AddBloodPressure({ navigation, route }) {


    const [existingItem, setExistingItem] = useState(null)
    const [loader, setLoader] = useState(false)
    const [mount, setMount] = useState(0)
    const loadDataOnlyOnce = async () => {
        //alert("loadDataOnlyOnce");
        if (route.params !== undefined) {
            const id = route.params.id
            // alert(route.params.id)
            if (id !== undefined) {
                setLoader(true)
                viewBloodPressureInstance(id)
                    .then((res) => {
                        setTimeout(() => { setLoader(false) }, 1000)
                        console.log("In ", res)
                        setExistingItem(res);
                        setInputList(() => {
                            return {

                                "disystolic": res.disystolic, "systolic": res.systolic, "description": res.description

                            }
                        });
                        console.log("After setting existingItem= ", existingItem)

                    })
                    .catch((err) => { console.log("Error in AddBloodPressure uploading particular instance ", err) })
            }
        }

    };
    useEffect(() => {
        if (mount === 0) {
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);




    const [inputList, setInputList] = useState({ "disystolic": "", "systolic": "", "description": "" });
    const save = () => {
        addBloodPressureRecord(inputList.disystolic, inputList.systolic, inputList.description)
        navigation.replace("ViewBloodPressure")
    }

    const update = () => {
        console.log("JJJJJJJJJ")
        updateBloodPressureRecord(route.params.id, inputList.disystolic, inputList.systolic, inputList.description)
            .then((data) => { console.log("update", data), navigation.replace("ViewBloodPressure") })
            .catch((err) => { console.log("Error in update in add bloodpressure", err) })
    }
    const deleteItem = () => {
        deleteBloodPressureInstance(route.params.id)
            .then((data) => { console.log("delete", data), navigation.replace("ViewBloodPressure") })
            .catch((err) => { console.log("Error in delete in add bloodpressure", err) })
    }

    //Method sets the state change in inputList
    const handleOnTextChange = (newText, inputType) => {
        setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
        console.log("InputList: ", inputList)
    };
    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader}></Loader>
            <View style={styles.textView}>
                <Text style={styles.text}>Add Blood Pressure</Text>
            </View>

            <ScrollView style={styles.container2}
                showsVerticalScrollIndicator={false}>
                {/* <View style={styles.inputContainer}>
                    <Picker pickertitle="Select Time" pickermode="time"
                        textColor="#212529"
                        buttonColor="#6B705C" />
                </View> */}

                <View style={styles.inputContainer}>
                    <Input label="Disystolic Pressure"
                        value={`${inputList.disystolic}`}
                        maxlength={3}
                        onChangeText={text => handleOnTextChange(text, "disystolic")}
                        placeholder="Enter your disystolic pressure"
                        inputBackground="white"
                        textColor="black" />
                </View>

                <View style={styles.inputContainer}>
                    <Input label="Systolic Pressure"
                        value={`${inputList.systolic}`}
                        maxlength={3}
                        onChangeText={text => handleOnTextChange(text, "systolic")}
                        placeholder="Enter your Systolic pressure"
                        multiline={false}
                        inputBackground="white"
                        textColor="black" />
                </View>


                <View style={styles.inputContainer}>
                    <Input label="Notes"
                        value={`${inputList.description}`}
                        onChangeText={text => handleOnTextChange(text, "description")}
                        placeholder="Enter a Description"
                        multiline={true}
                        inputBackground="white"
                        textColor="black"
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

        </SafeAreaView>)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6B705C",
        flexDirection: "column"
    },
    textView: {
        flex: 0.1,
        backgroundColor: "#C3C5BD",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
        color: "#212529",
        fontWeight: "bold"
    },
    container2: {
        flex: 0.9,
        backgroundColor: "white"
    },
    inputContainer: {
        backgroundColor: "#C3C5BD",
        marginVertical: "3%",
        marginHorizontal: "3%",
        // borderRadius:30,
        padding: "2%"
    },
    saveButtonContainer: {
        marginVertical: "3%",
        marginHorizontal: "3%",
        backgroundColor: "#6B705C",
        width: "30%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        borderRadius: 30,
    },
    saveButtonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    }

})