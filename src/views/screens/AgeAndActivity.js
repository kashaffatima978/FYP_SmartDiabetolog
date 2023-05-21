import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {storeUserInformation, getAsyncUserInformation} from "../connectionToDB/AsyncStorage"
import { editProfileInformation, getProfileInformation} from "../connectionToDB/profile"


const AgeAndActivity = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');
  const [inputList, setInputList] = useState({
    "name": "",
    "email": "",
    "diabetesType":""
  });
  const [userInfo, setUserInfo] = useState({
    "weight":"",
    "height":"",
    "Gender":"",

  })

  const [mount, setMount] = useState(0);
  const [obj, setObj] = useState({})

  const loadDataOnlyOnce = async () => {
    getProfileInformation()
      .then((res) => {
        console.log("here", res)
        console.log("state", res.userDetails.state)
        setInputList(() => {
          return {
            "name": res.userDetails.name,
            "email": res.userDetails.email,
            "diabetesType": res.userDetails.diabetesType,
          }
        });
      })
      .catch(err => { console.log("Error in age activity screen", err) })
  };
  useEffect(() => {
    if (mount === 0) {
      loadDataOnlyOnce();
      getAsyncUserInformation()
      .then((res)=>{
        console.log('in userEffect',res.weight);
        setUserInfo(() => ({ "weight": res.weight, "height": res.height, "Gender": res.Gender }));
        console.log('this is user infooooo', userInfo)
      })
      .catch((err)=>console.log(err))
      // console.log('this is user infooooo', userInfo)
  
      setMount(1);
    }
  }, [mount]);


  const handleAgeChange = (age) => {
    setSelectedAge(age);
  };

  const handleActivityLevelChange = (activityLevel) => {
    setSelectedActivityLevel(activityLevel);
  };

  const addingAll =()=>{
    console.log('This is selected age and activity level ',selectedAge, selectedActivityLevel)
    const heightInInches = parseFloat(userInfo.height); // Assuming the height is given in inches
    const feet = Math.floor(heightInInches); // Calculate the feet (rounding down)
    const inches =  parseInt(heightInInches % 1 * 10);; // Calculate the remaining inches
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', heightInInches, feet, inches)
    editProfileInformation(inputList.name, inputList.email, userInfo.weight, feet, 
      inches, inputList.diabetesType, selectedActivityLevel, userInfo.Gender,  selectedAge )
      .then((data) => { console.log("abc", data.data) ;navigation.navigate("Profile")})
      .catch((err) => { console.log("Error in update in Activity aage screen", err) })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Age</Text>
      <Picker
        selectedValue={selectedAge}
        style={styles.picker}
        onValueChange={(itemValue) => handleAgeChange(itemValue)}
      >
        <Picker.Item label="Select Age" value="" />
        {Array.from({ length: 100 }, (_, index) => (
          <Picker.Item key={index + 1} label={`${index + 1} years`} value={index + 1} />
        ))}
      </Picker>
      {selectedAge !== '' && (
        <>
          <Text style={styles.selectedText}>Selected Age: {selectedAge} years</Text>
          <Text style={styles.title}>Select Your Activity Level</Text>
          <Picker
            selectedValue={selectedActivityLevel}
            style={styles.picker}
            onValueChange={(itemValue) => handleActivityLevelChange(itemValue)}
          >
            <Picker.Item label="Select Activity Level" value="Light" />
            <Picker.Item label="Very Light" value="Very Light" />
            <Picker.Item label="Light" value="Light" />
            <Picker.Item label="Moderate" value="Moderate" />
            <Picker.Item label="Heavy" value="Heavy" />
            <Picker.Item label="Very Heavy" value="Very Heavy" />
          </Picker>
          {selectedActivityLevel !== '' && (
            <Text style={styles.selectedText}>
              Selected Activity Level: <Text style={{color: '#6A6DB0', fontWeight: 'bold'}}> {selectedActivityLevel}</Text>
            </Text>
          )}
        </>
      )}
        <TouchableOpacity style={styles.saveButtonContainer} onPress={addingAll}>
              <Text style={styles.saveButtonText} >Done</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    padding: 20,
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black', // White color
    margin: 5,
  },
  picker: {
    width: '100%',
    // marginBottom: 20,
    backgroundColor: 'lavender'
  },
  selectedText: {
    fontSize: 20,
    color: 'black', // White color
    // marginTop: "5%",
  },
  saveButtonContainer: {
    backgroundColor: "#6A6DB0",
    width: 100,
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignSelf: "flex-end",
    // marginRight: 20
},
saveButtonText: {
    fontSize: 15,
    color: "white",
    textAlign:"center",
    textAlignVertical: "center",
    padding: 5,
},
});

export default AgeAndActivity;
