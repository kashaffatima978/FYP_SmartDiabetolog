import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, Button, TouchableOpacity, ScrollView } from "react-native";
import generalStyles from "../../files/generalStyle";
import { MainHeading } from "../components/mainHeading";
import colors from "../../files/Colors";
import { Input } from "../components/input";
import MyDropDown from "../components/dropdown";
import Picker from "../components/picker";
import { MyButton } from "../components/button";
import { addBloodSugarRecord, viewBloodSugarInstance,updateBloodSugarRecord,deleteBloodSugarInstance } from "../connectionToDB/trackerBloodSugar"
import SelectDropdown from "react-native-select-dropdown";

export default AddBloodSugar = function ({ navigation, route }) {
    const [mgUnit, setMgUnit] = useState("mg/dL");
    const [inputList, setInputList] = useState({
        "concentration": "",
        "unit": "",
        "description": "",
        "event": "",
        "creationDate": "",
        "creationTime": ""
    });
    const [existingItem, setExistingItem] = useState(null)
    const [mount,setMount]=useState(0)
    const loadDataOnlyOnce = async() => {
       // alert("loadDataOnlyOnce");
        if (route.params !== undefined) {
            const id = route.params.id
           // alert(route.params.id)
            if (id !== undefined) {
                viewBloodSugarInstance(id)
                    .then((res) => { 
                        console.log("In ",res)
                        setExistingItem(res);
                        setInputList(()=>{return{
                            "concentration": res.concentration,
                            "unit": res.unit,
                            "description": res.description,
                            "event": res.event,
                            "creationDate": res.creationDate,
                            "creationTime": res.creationTime
                        }});
                        console.log("After setting existingItem= ",existingItem)
                    
                    })
                    .catch((err) => { console.log("Error in AddBloodSugar uploading particular instance ", err) })
            }
        }
        
      };
          useEffect(() => {
            if(mount===0){
              loadDataOnlyOnce(); 
              setMount((oldVal)=>oldVal++);
            }
            const date = `${(new Date()).getDate()}-${(new Date()).getMonth() + 1}-${(new Date()).getFullYear()}`
            const time = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`
             handleOnTextChange(date, "creationDate")
            handleOnTextChange(time, "creationTime")
          },[mount]);
    
//FOR TESTING PURPOSE
    const checkData = (con, description )=>{
        return {
            "concentration": res.concentration,
            "description": res.description,
        }
    }
  
  
    const save = () => {
        // alert(date)
        // alert(time)
        addBloodSugarRecord(inputList.concentration, inputList.unit, inputList.description, inputList.event, inputList.creationDate, inputList.creationTime)
            .then((data) => { console.log("abc", data) ; navigation.push("ViewBloodSugar")})
            .catch((err) => { console.log("Error in save in add blood sugar", err) })
    }

    const update=()=>{
        updateBloodSugarRecord(route.params.id,inputList.concentration, inputList.unit, inputList.description, inputList.event, inputList.creationDate, inputList.creationTime)
            .then((data) => { console.log("update", data) ;navigation.push("ViewBloodSugar")})
            .catch((err) => { console.log("Error in update in add blood sugar", err) })
    }
    const deleteItem=()=>{
        deleteBloodSugarInstance(route.params.id)
            .then((data) => { console.log("delete", data) ;navigation.push("ViewBloodSugar")})
            .catch((err) => { console.log("Error in delete in add blood sugar", err) })
    }

    //Method sets the state change in inputList
    const handleOnTextChange = (newText, inputType) => {
        setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
        console.log("InputList: ", inputList)
    };

    return (
        <SafeAreaView style={generalStyles.container}>
            <MainHeading heading="Add Blood Sugar" />
            <ScrollView style={[generalStyles.spacing, styles.scroll]} showsVerticalScrollIndicator={false}>

                {/* <Picker pickertitle="Select Time" pickermode="time" textColor='black' buttonColor='#86C0DD'
                  onCancel={()=>{alert("cancel")}}
                  onConfirm={(date)=>{
                    setDate(date)
                      alert(`${date.getHours()}`)
                      //alert(typeof date)
                 
                  }}
                /> */}

                <Input label="Blood Sugar Concentration"
                value={`${inputList.concentration}`}
                    placeholder="Enter Blood Sugar Concentration"
                    keyboardType={'numeric'} maxLength={3}
                  
                    onChangeText={text => handleOnTextChange(text, "concentration")}
                />


                <View style={{ marginBottom: "1%" }}>
                    <Text style={styles.text}>Select Concentration Unit</Text>
                    <View style={styles.unitContainer}>
                        <TouchableOpacity style={[styles.radioContainer]}
                            value={mgUnit} onPress={() => {
                                setMgUnit("mmol/L")
                                handleOnTextChange("mmol/L", "unit")
                            }}>
                            <View style={[styles.radioButton, { backgroundColor: (mgUnit === "mmol/L") ? colors.d2blue : colors.headingBlue }]}>
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
                            <View style={[styles.radioButton, { backgroundColor: (mgUnit === "mg/dL") ? colors.d2blue : colors.headingBlue }]} >
                                <Text style={styles.radioCircle}>O</Text>
                            </View>
                            <Text style={styles.radioText}>mg/dL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 
                <MyDropDown dropdownlist={["Before Breakfast", "After Breakfast", "Before Lunch",
                    "After Lunch", "Before Dinner", "After Dinner", "Random"]}
                    title="Event" buttonColor='#86C0DD' 
                    onChange={(selectedItem)=>{
                        alert(selectedItem)
                       //selection(selectedItem);
                   }}/> */}

                <SafeAreaView style={styles.container}>
                    <Text style={styles.text}> Event</Text>
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

                        buttonStyle={{ borderWidth: 1, color: "red", width: "100%", backgroundColor: '#86C0DD', height: 50 }}

                        buttonTextStyle={
                            {
                                fontSize: 14,
                                color: colors.darkGreyBlue,
                                textTransform: "capitalize",
                                fontWeight: "bold"
                            }
                        }
                        defaultButtonText={`${existingItem!==null?existingItem.event:"Select an Event"}`}

                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: colors.blue3, margin: 4 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >

                    </SelectDropdown>
                </SafeAreaView>


                <Input label="Notes"
                value={inputList.description}
                    placeholder="Enter a Description"
                    onChangeText={text => handleOnTextChange(text, "description")}
                    multiline={true}
                />

                
                 {
                   
                existingItem===null? 
                (<MyButton title="Save" onPress={() => { save() }} />):
                (<View>
                    <MyButton title="Update" onPress={() => { update() }} />
                    <MyButton title="Delete" onPress={() => { deleteItem() }} />
                </View>
                )
                    
                }





            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: 'buttonColor',
        width: "20%",
        height: "100%",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "5%"
    },
    radioCircle: {
    },
    text: {

        fontSize: 14,
        color: colors.greyBlue,
        textTransform: "capitalize",
        fontWeight: "bold"
    }

});