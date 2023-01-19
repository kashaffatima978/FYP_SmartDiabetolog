import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../files/Colors';
import { getProfileInformation, editProfileInformation, deleteAccount } from "../connectionToDB/profile"
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';


export default Profile = function ({navigation}) {
  const [mount, setMount] = useState(0)
  const loadDataOnlyOnce = async () => {
    getProfileInformation()
      .then((res) => {
        console.log("here", res)
        setInputList(() => {
          return {
            "name": res.userDetails.name,
            "email": res.userDetails.email,
            "weight": res.userDetails.weight,
            "heightFeet": res.userDetails.heightFeet,
            "heightInches": res.userDetails.heightInches,
            "diabetesType": res.userDetails.diabetesType
          }
        });

      })
      .catch(err => { console.log("Error in profile screen", err) })


  };
  useEffect(() => {
    if (mount === 0) {
      loadDataOnlyOnce();
      setMount((oldVal) => oldVal++);
    }
  }, [mount]);
  const [inputList, setInputList] = useState({
    "name": "",
    "email": "",
    "weight": "",
    "heightFeet": "",
    "heightInches": "",
    "diabetesType": ""
  });

  //Method sets the state change in inputList
  const handleOnTextChange = (newText, inputType) => {
    setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
    console.log("InputList: ", inputList)
  };

  const update = () => {
    editProfileInformation(inputList.name, inputList.email, inputList.weight, inputList.heightFeet, inputList.heightInches, inputList.diabetesType)
      .then((data) => { console.log("abc", data) ;navigation.push("Profile")})
      .catch((err) => { console.log("Error in update in profile", err) })
  }

  const logout = () => {

    AsyncStorage.setItem("@token", "").then(async () => {
      navigation.push("Login")
    }).catch((err) => {
      console.log("logout error in profile ", err)
    })

  }
  const deleteItem = () => {
    deleteAccount()
      .then((data) => { console.log("abc", data) ;navigation.push("Registration")})
      .catch((err) => { console.log("Error in delete account in profile", err) })
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image style={styles.image} source={require('../../../assets/Images/profile.jpg')} />

      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <TouchableOpacity style={styles.button}
          onPress={() => { logout() }}><Text style={styles.buttonText}>logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => { deleteItem() }}><Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputCont}>
        <TextInput style={styles.input} value={inputList.name} placeholder='Username' onChangeText={text => handleOnTextChange(text, "name")} />
        <TextInput style={styles.input} value={inputList.email} placeholder='Email' onChangeText={text => handleOnTextChange(text, "email")} />
        <TextInput style={styles.input} value={`${inputList.weight}`} placeholder='Weight in kg' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "weight")} />
        <TextInput style={styles.input} value={`${inputList.heightFeet}`} placeholder='Height in Feet' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "heightFeet")} />
        <TextInput style={styles.input} value={`${inputList.heightInches}`} placeholder='Height in Inches' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "heightInches")} />
        <TextInput style={styles.input} value={`${inputList.diabetesType}`} placeholder='Diabetes Type' onChangeText={text => handleOnTextChange("Type 1", "diabetesType")} />
        <TouchableOpacity style={styles.button}
          onPress={() => { update() }}><Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 70,
    alignSelf: 'center',
    marginTop: 55
  },
  inputCont: {
    marginTop: 30,
    padding: 5,
    
  },
  input: {
    width: '90%',
    backgroundColor: '#ADD8E6',
    margin: 10,
    alignSelf: 'center'
  },
  button: {

    backgroundColor: "#86C0DD",
    width: 110,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 19
  },
  buttonText: {
    color: 'white',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,

  }
});