import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {storeUserInformation} from "../connectionToDB/AsyncStorage"

const GenderSelectionPage = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const addingGender = ()=>{
    storeUserInformation('Gender', selectedGender);
    navigation.navigate('AgeAndActivity');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Select Height:</Text>
        <Text style={styles.selectedWeightText}>Selected Gender:<Text style={{color: '#6A6DB0', fontWeight: 'bold'}}> {selectedGender}</Text></Text>
      <TouchableOpacity
        style={[styles.genderImageContainer, selectedGender === 'male' && styles.selectedGenderImageContainer]}
        onPress={() => handleGenderSelection('male')}
      >
        <Image source={require('../../../assets/Images/man.jpg')} style={styles.genderImage} resizeMode='contain' />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.genderImageContainer, selectedGender === 'female' && styles.selectedGenderImageContainer]}
        onPress={() => handleGenderSelection('female')}
      >
        <Image source={require('../../../assets/Images/women.jpg')} style={styles.genderImage} resizeMode='contain'  />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButtonContainer} onPress={addingGender}>
              <Text style={styles.saveButtonText} >Next</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    padding: 20
  },
  selectedWeightText: {
    fontSize: 25,
    color: 'black', // White color
    marginTop: "5%",
    marginBottom: '5%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', // White color
    // marginBottom: 10,
  },
  genderImageContainer: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 5,
    margin: 10,
  },
  selectedGenderImageContainer: {
    borderColor: '#6A6DB0',
  },
  genderImage: {
    width: 250,
    height: 250,
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

export default GenderSelectionPage;
