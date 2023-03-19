import { useState, useEffect } from "react";
import React from "react-native";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity , TextInput} from "react-native";
import { Input } from "../components/input";
import { addBloodPressureRecord, viewBloodPressureInstance, updateBloodPressureRecord, deleteBloodPressureInstance } from "../connectionToDB/trackerBloodPressure";
import Loader from '../components/loader';
import { Heading } from "../components/Heading";
import Icon from 'react-native-vector-icons/FontAwesome5';


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
            <Heading name="Add Blood Pressure"/>

            <ScrollView style={styles.container2}
                showsVerticalScrollIndicator={false}>
                {/* <View style={styles.inputContainer}>
                    <Picker pickertitle="Select Time" pickermode="time"
                        textColor="#212529"
                        buttonColor="#6B705C" />
                </View> */}
                

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Icon name="heartbeat" size={25} style={styles.icon}/>
                    <View style={{width: "85%"}}>
                        <Text style={styles.label}>Disystolic Pressure</Text>
                        <TextInput style={styles.input}  placeholder="Enter your disystolic pressure" value={`${inputList.disystolic}`} maxlength={3} onChangeText={text => handleOnTextChange(text, "disystolic")}/>
                    </View>
                </View>


                {/* <View style={styles.inputContainer}>
                    <Input label="Disystolic Pressure"
                        
                        
                        
                       
                        inputBackground="white"
                        textColor="black" />
                </View> */}

                <View style={{flexDirection: 'row', marginTop: 35}}>
                    <Icon name="heartbeat" size={25} style={styles.icon}/>
                    <View style={{width: "85%"}}>
                        <Text style={styles.label}>Systolic Pressure</Text>
                        <TextInput style={styles.input} multiline={false}  placeholder="Enter your Systolic pressure" value={`${inputList.systolic}`} maxlength={3} onChangeText={text => handleOnTextChange(text, "systolic")}/>
                    </View>
                </View>

                

                {/* <View style={styles.inputContainer}>
                    <Input label="Notes"
                        
                        onChangeText={text => handleOnTextChange(text, "description")}
                        placeholder="Enter a Description"
                        multiline={true}
                        inputBackground="white"
                        textColor="black"
                    /> */}
                {/* </View> */}

                <View style={{flexDirection: 'row', marginTop: 40}}>
                    <Icon name="sticky-note" size={25} style={styles.icon}/>
                    <View style={{width: "85%"}}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput style={styles.input} value={`${inputList.description}`} multiline={true} placeholder="Enter a Description" onChangeText={text => handleOnTextChange(text, "description")}/>
                    </View>
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
        backgroundColor: 'white',
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
        textAlign:"center",
        textAlignVertical: "center",
        padding: 5,
    },
    text: {

        fontSize: 14,
        color: 'black',
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    icon:{
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
,input: {
    width: '94%',
    // backgroundColor: '#b8bedd',
    // margin: 10,
    // alignSelf: 'center',
    // borderRadius: 10,
    // padding: 10,

    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    // elevation: 5,
  }
})