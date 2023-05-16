import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';



const AgeAndActivity = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');

  const handleAgeChange = (age) => {
    setSelectedAge(age);
  };

  const handleActivityLevelChange = (activityLevel) => {
    setSelectedActivityLevel(activityLevel);
  };

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
            <Picker.Item label="Select Activity Level" value="" />
            <Picker.Item label="Very Light" value="veryLight" />
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
            <Picker.Item label="Very Hard" value="veryHard" />
          </Picker>
          {selectedActivityLevel !== '' && (
            <Text style={styles.selectedText}>
              Selected Activity Level: <Text style={{color: '#6A6DB0', fontWeight: 'bold'}}> {selectedActivityLevel}</Text>
            </Text>
          )}
        </>
      )}
        <TouchableOpacity style={styles.saveButtonContainer} onPress={()=>{navigation.navigate('Home')}}>
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
