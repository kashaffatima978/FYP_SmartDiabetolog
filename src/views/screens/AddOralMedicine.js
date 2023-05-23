import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView,Alert, StyleSheet, FlatList, Button, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { addOralMedicationToPrescription, getOralMedicationDetails, updateOralMedicationDetails, deleteOralMedicationDetails } from "../connectionToDB/prescription"
import axios from "axios";
import { IP } from "../../files/information"
import { getAllergiesFromAsync, storeAllergiesInAsync } from "../connectionToDB/AsyncStorage"

export default AddOralMedicine = function ({ navigation, route }) {
    const { title, id } = route.params
    console.log("id got in AddOralMedicine is ", id)
    const [loader, setLoader] = useState(false)
    const [mount, setMount] = useState(0)
    const ip = `http://${IP}`

    const loadDataOnlyOnce = () => {
        if (route.params.oralMedicineId) {
            setLoader(true)
            getOralMedicationDetails(route.params.oralMedicineId)
                .then((res) => {
                    console.log("in loadDataOnlyOnce in AddOralMedicine")
                    console.log("oral medication details is", res)
                    setType(res.type)
                    setName(res.name)
                    setUnits(res.unit)
                    setDosage(`${res.dosage}`)
                    setHour(res.time.substring(0, 2))
                    setMinute(res.time.substring(3))
                    setLoader(false)
                })
                .catch(err => {
                    console.log("Error in loadDataOnlyOnce in AddNewPrescription ", err)
                    setLoader(false)
                    navigation.replace("AddNewPrescription", { "title": title, "id": id });
                    alert("Connection Lost! Try Again")
                })
        }

    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                const options = {
                    quality: 1,
                    cameraType: 'back'
                };
                launchCamera(options)
                    .then((response) => {

                        if (response.didCancel) {
                            console.log('User cancelled image picker');
                        } else if (response.error) {
                            console.log('ImagePicker Error: ', response.error);
                        } else {
                            console.log('we got the image ');
                            console.log(response.assets[0])
                            console.log(response.assets[0].uri);
                            //sending image 
                            const formData = new FormData();
                            formData.append('file', { uri: response.assets[0].uri, name: response.assets[0].fileName, type: response.assets[0].type, width: response.assets[0].width, height: response.assets[0].height });
                            //axios request towards api
                            axios.post(ip + ':8000/ReadMedicineName', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            })
                                .then((response) => {
                                    console.log(response.text)
                                })
                                .catch((err) => { console.log('error in sending medication image:', err) })
                        }
                    })
                    .catch(err => { console.log('image not given', err) });
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

          openLibrary = () => {
            const options: ImageLibraryOptions = {
              mediaType: 'photo',
              quality: 1
            };
        
            launchImageLibrary(options, async (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker')
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
              }
              else {
                console.log(response)
                const formData = new FormData();
                formData.append('file', { uri: response.assets[0].uri, name: response.assets[0].fileName, type: response.assets[0].type});
                //axios request towards api
                axios.post(ip+':8000/ReadMedicineName', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response)=>{
                    console.log("This is the response from medication ocr detection ",response.data)
                    data = response.data;
                    setName(data.toString())

                })
                .catch((err)=>{console.log('error in sending medication image:', err)})
              }
              }
            )
          }

    useEffect(() => {
        if (mount === 0) {
            //setLoader(true)
            //first get medications stored in Async to check the active agents
            getAllergiesFromAsync("medication")
                .then(allergies => {
                    console.log('//////////////////////////////////////////////',allergies)
                    array = (allergies.map(val => val.active_agent)).flat()
                    console.log("@@@@@@@@@@@@@@@@@@@Set active agents are", array)
                    setMedicationAllergies(() => (array))
                    loadDataOnlyOnce();
                })
                .catch(err => {
                    console.log(err, "error in useEffect in AddOralMedication for getting active agents of medications from ASYNC")
                })
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);

    const [type, setType] = useState("nondiabetic")
    const [name, setName] = useState("")
    const [units, setUnits] = useState("")
    const [dosage, setDosage] = useState("")
    const [hour, setHour] = useState("00")
    const [minute, setMinute] = useState("00")
    const [medicationAllergies, setMedicationAllergies] = useState([])

    const saveOralMedicine = () => {
        setLoader(true)
        //first get active agent for the medicine added
        axios.post(ip + ':8000/getActiveAgent', { 'med': name })
            .then((response) => {
                console.log("When active agent got is ", response.data)
                const agentsGot = response.data
                console.log(agentsGot, typeof (agentsGot))
                //check if user is allergic to medication or not
                for (j = 0; j < medicationAllergies.length; j++) {
                    element = medicationAllergies[j]
                    matched = false
                    let trimmedStr = element.replace(/\s/g, "");
                    console.log("1", trimmedStr)
                    for (i = 0; i < agentsGot.length; i++) {
                        const element2 = agentsGot[i]
                        console.log("KKKKK")
                        let trimmedStr2 = element2.replace(/\s/g, "");
                        console.log(trimmedStr2)
                        if (trimmedStr === trimmedStr2) {
                            //alert(`You are allergic to ${name}`)
                            matched = true
                            Alert.alert(
                                'Warning',
                                `You are allergic to ${name}`,
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                                ],
                                {
                                    // Override the container style
                                    containerStyle: styles.container1,
                                    // Override the title style
                                    titleStyle: styles.title,
                                    // Override the message style
                                    messageStyle: styles.message
                                }
                            )
                            break
                        }
                    }
                    if(matched){
                        break
                    }


                };

                //now add medication in DB
                const time = `${hour}:${minute}`
                addOralMedicationToPrescription(id, name, dosage, units, type, time)
                    .then((data) => {
                        console.log("adding oral medication", data);
                        setLoader(false)
                        navigation.replace("AddNewPrescription", { "title": title, "id": id });
                    })
                    .catch((err) => {
                        console.log("Error in add in Prescription", err)
                        setLoader(false)
                        navigation.replace("AddNewPrescription", { "title": title, "id": id });
                        alert("Connection Lost! Try Again")
                    })

            })
            .catch((err) => {
                console.log(err, "error in AddAllergicReaction for getting active agents")
                setLoader(false)
                navigation.replace("AddNewPrescription", { "title": title, "id": id });
                alert("Connection Lost! Try Again")
            })




    }

    const deleteOralMedicine = () => {
        setLoader(true)
        const time = `${hour}:${minute}`
        deleteOralMedicationDetails(route.params.oralMedicineId, id)
            .then((data) => {
                console.log("deleteOralMedicine ", data);
                setLoader(false)
                navigation.replace("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in update in deleteOralMedicine", err)
                setLoader(false)
                navigation.replace("AddNewPrescription", { "title": title, "id": id });
                alert("Connection Lost! Try Again")
            })
    }

    const updateOralMedicine = () => {
        setLoader(true)
        const time = `${hour}:${minute}`
        console.log(id, type, name, units, dosage, time)
        updateOralMedicationDetails(route.params.oralMedicineId, type, name, units, dosage, time)
            .then((data) => {
                console.log(route.params.oralMedicineId, type, name, units, dosage, time)
                console.log("updateOralMedicine ", data);
                setLoader(false)
                navigation.replace("AddNewPrescription", { "title": title, "id": id });
            })
            .catch((err) => {
                console.log("Error in updatein updateOralMedicine", err)
                setLoader(false)
                navigation.replace("AddNewPrescription", { "title": title, "id": id });
                alert("Connection Lost! Try Again")
            })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader visible={loader}></Loader>
            <Heading name="Add Oral Medication" />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={[styles.container, { marginTop: 10, marginLeft: 50, marginRight: 28 }]}>
                    <Text style={[styles.label, { marginBottom: 15 }]}>Medication Type</Text>
                    <SelectDropdown
                        style={styles.dropdown}
                        data={["Diabetic", "Non-Diabetic"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            if (selectedItem === "Diabetic") {
                                setType("diabetic")
                            }
                            else {
                                setType("nondiabetic")
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
                        defaultButtonText={type}

                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >

                    </SelectDropdown>
                </SafeAreaView>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name="heartbeat" size={25} style={styles.icon} />
                    <View style={{ width: "55%" }}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput value={name} onChangeText={text => { setName(text) }} style={styles.input} placeholder="Enter Medicine Name" placeholderTextColor={"gray"} />
                    </View>
                    <TouchableOpacity onPress={requestCameraPermission} ><Icon name="camera" size={27} style={{marginVertical: "50%", marginHorizontal:"3%"}}/></TouchableOpacity>
                    <TouchableOpacity onPress={openLibrary} ><Icon name="images" size={27} style={{marginVertical: "50%", marginHorizontal:"3%"}}/></TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name="heartbeat" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>Units</Text>
                        <TextInput keyboardType="numeric" value={units} onChangeText={text => { setUnits(text) }} style={styles.input} placeholder="Enter Medicine Units in mg" placeholderTextColor={"gray"} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Icon name="heartbeat" size={25} style={styles.icon} />
                    <View style={{ width: "85%" }}>
                        <Text style={styles.label}>Dosage</Text>
                        <TextInput keyboardType="numeric" value={dosage} onChangeText={text => { setDosage(text) }} style={styles.input} placeholder="Enter Medicine Dosage" placeholderTextColor={"gray"} />
                    </View>
                </View>

                <SafeAreaView style={[styles.container, { marginTop: 20, marginLeft: 50, marginRight: 28 }]}>
                    <Text style={[styles.label, { marginBottom: 15 }]}>Time</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <SelectDropdown
                            style={styles.dropdown}
                            data={["00", "01", "02", "03", "04", "05", "06", "07",
                                "08", "09", "10", "11", "12", "13", "14", "15",
                                "16", "17", "18", "19", "20", "21", "22", "23"]}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setHour(selectedItem)
                            }}

                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;

                            }}
                            rowTextForSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}

                            buttonStyle={{ color: "red", width: "50%", margin: 6, backgroundColor: '#b8bedd', height: 50, borderRadius: 15 }}

                            buttonTextStyle={
                                {
                                    fontSize: 14,
                                    color: 'black',
                                    textTransform: "capitalize",
                                    fontWeight: "bold"
                                }
                            }
                            defaultButtonText={hour}

                            dropdownIconPosition="right"
                            dropdownStyle={{ backgroundColor: "white" }}
                            rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                            rowTextStyle={{ color: colors.greyBlue }}>
                        </SelectDropdown>
                        <SelectDropdown
                            style={styles.dropdown}
                            data={["00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
                                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                                "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
                                "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
                                "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
                                "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
                            ]}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setMinute(selectedItem)
                            }}

                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;

                            }}
                            rowTextForSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}

                            buttonStyle={{ color: "red", width: "50%", backgroundColor: '#b8bedd', height: 50, borderRadius: 15 }}

                            buttonTextStyle={
                                {
                                    fontSize: 14,
                                    color: 'black',
                                    textTransform: "capitalize",
                                    fontWeight: "bold"
                                }
                            }
                            defaultButtonText={minute}

                            dropdownIconPosition="right"
                            dropdownStyle={{ backgroundColor: "white" }}
                            rowStyle={{ backgroundColor: '#b8bedd', margin: 4 }}
                            rowTextStyle={{ color: colors.greyBlue }}>
                        </SelectDropdown>
                    </View>
                    {!route.params.oralMedicineId ?
                        (<MyButton title="Save" onPress={saveOralMedicine}></MyButton>)
                        :
                        (
                            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <MyButton title="Delete" style={{ width: "20%" }} onPress={deleteOralMedicine}></MyButton>
                                <MyButton title="Update" onPress={updateOralMedicine}></MyButton>
                            </View>
                        )
                    }

                </SafeAreaView>









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
    container1: {
        backgroundColor: 'yellow',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
    },
});