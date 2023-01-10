import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import PageHeading from '../components/PageHeading';

export default AddMeal = function ({navigation}) {

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <Image style={styles.headImage} resizeMode={"contain"} source={require('../../../assets/head3.jpg')}/>
      <Text style={styles.heading}>Add Meal</Text>
      <ScrollView style={styles.scrollViewCon}>
        <TextInput style={styles.input} placeholder='Enter Dish name'/>
        <TextInput style={styles.input} placeholder='Enter Calories'/>
        <TextInput style={styles.input} placeholder='Enter Carbohydrates'/>
        <TextInput style={styles.input} placeholder='Enter Protein'/>
        <TextInput style={styles.input} placeholder='Enter Fats'/>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Save</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollViewCon:{
    flex:1,
    marginTop: 30,
    padding: 5,
    backgroundColor: 'white'
  },
  input: {
     width: '90%',
     backgroundColor: '#DDBEA9',
     margin: 10,
     alignSelf: 'center'
  },
  button:{ 
    flex:1,
    backgroundColor:'#A5A58D',
    width:180,
    height:40,
    textAlign:"center",
    justifyContent:"center",
    alignSelf: 'center',
    marginTop: 19,
    borderRadius: 10
    },
    buttonText:{
        color: 'black',
        textAlign:"center",
        // fontWeight:"bold",
        // borderRadius:15,
        fontSize:16,
    },
    headImage:{
      width:"90%",
      height: 150,
      alignSelf:"center",
      marginTop: 10
    },
    heading:{
      fontSize: 30,
          fontStyle: "italic",
          textAlign: "center",
          fontWeight: "bold",
          color: 'black',
          margin: 15
    }
});
