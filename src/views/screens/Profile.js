import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import colors from '../../files/Colors';

export default Profile = function () {
  return (
    <SafeAreaView style={{flex:1}}>
      <Image style={styles.image} source={require('../../../assets/Images/profile.jpg')}/>
      <View style={styles.inputCont}>
      <TextInput style={styles.input} placeholder='Username'/>
        <TextInput style={styles.input} placeholder='Email'/>
        <TextInput style={styles.input} placeholder='Length'/>
        <TextInput style={styles.input} placeholder='Height'/>
        <TextInput style={styles.input} placeholder='Password'/>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Save Changes</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image:{
    width: 150,
    height:150,
    borderRadius: 70,
    alignSelf: 'center',
    marginTop: 55
  },
  inputCont:{
    flex:1,
    marginTop: 30,
    padding: 5
  },
  input: {
    width: '90%',
    backgroundColor: "#B8B2A6",
    margin: 10,
    alignSelf: 'center'
 },
 button:{ 

   backgroundColor:'#A5A58D',
   width:180,
   height:40,
   textAlign:"center",
   justifyContent:"center",
   alignSelf: 'center',
   borderRadius: 10,
   marginTop: 19
   },
   buttonText:{
       color: 'black',
       textAlign:"center",
       fontWeight:"bold",
       fontSize:16,
     
   }
});
