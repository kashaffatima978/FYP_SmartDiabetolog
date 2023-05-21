import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {storeUserInformation} from "../connectionToDB/AsyncStorage"


const HeightScreen = ({navigation}) => {
  const [selectedWeight, setSelectedWeight] = useState(5.5);


  const HeightOptions = Array.from({ length: 61 }, (_, index) => parseFloat((2 + index / 10).toFixed(2)));  
  const addingHeight = ()=>{
    storeUserInformation('height', selectedWeight)
    navigation.navigate('GenderSelectionPage')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Height:</Text>
      <Text style={styles.selectedWeightText}>Selected height:<Text style={{color: '#6A6DB0', fontWeight: 'bold'}}> {selectedWeight} ft</Text></Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin: 10, maxHeight: "90%"}}>
        <Image source={require('../../../assets/Images/height.jpg')} style={[styles.scrollView,{height:"80%", width:"100%"}]}/>
        <ScrollView style={styles.scrollView}>
            {HeightOptions.map((weight) => (
            <Text
       
                key={weight}
                style={[
                styles.weightOption,
                selectedWeight === weight && styles.selectedWeightOption,
                {textAlign: 'center'}
                ]}
                onPress={() => setSelectedWeight(weight)}
            >
                {weight} <Text style={styles.small}>ft</Text> 
            </Text>
            ))}
        </ScrollView>

      </View>

      <TouchableOpacity style={styles.saveButtonContainer} onPress={addingHeight}>
              <Text style={styles.saveButtonText} >Next</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', // White color
    // marginBottom: 10,
  },
  scrollView: {
    maxHeight: "80%",
    backgroundColor: '#FFFFFF', // White color
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '50%',
    alignSelf: 'flex-end'
  },
  weightOption: {
    fontSize: 35,
    marginBottom: 5,
    color: '#000000', // Black color
  },
  selectedWeightOption: {
    fontWeight: 'bold',
    color: '#6A6DB0', // Purple color
  },
  selectedWeightText: {
    fontSize: 25,
    color: 'black', // White color
    marginTop: "5%",
  },
  small:{
    fontSize: 15,
    // color: 'black', // White color

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

export default HeightScreen;
