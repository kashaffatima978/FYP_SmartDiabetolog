import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../files/Colors';
import { getProfileInformation, editProfileInformation, deleteAccount } from "../connectionToDB/profile"
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../components/loader';

export default Profile = function ({navigation}) {
  const [profile, setProfile] = useState('')
  const [loader,setLoader]=useState(false)

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
      .then((data) => { console.log("abc", data) ;navigation.navigate("Profile")})
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
      <Loader visible={loader} name="Updating...." />
      {
        profile!=''?<Avatar.Image style={styles.image} size={50} source={profile} />:<Avatar.Text style={styles.image} backgroundColor='#bdb2ff' size={150} label={(inputList.name).charAt(0)} />
       }

      
      <View style={styles.inputCont}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="user" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={inputList.name} placeholder='Username' onChangeText={text => handleOnTextChange(text, "name")} />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="envelope" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={inputList.email} placeholder='Email' onChangeText={text => handleOnTextChange(text, "email")} />
          </View>
        </View>
        

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="weight" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Weight</Text>
            <TextInput style={styles.input} value={`${inputList.weight}`} placeholder='Weight in kg' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "weight")} />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="ruler-vertical" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Height</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput style={[styles.input, {width: '25%', marginRight: 20, textAlign: 'center'}]} value={`${inputList.heightFeet}`} placeholder='Height in Feet' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "heightFeet")} />
              <Text style={{marginTop: 15, marginRight: 20}}>ft</Text>
              <TextInput style={[styles.input, {width: '25%', textAlign: 'center'}]} value={`${inputList.heightInches}`} placeholder='Height in Inches' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "heightInches")} />
              <Text style={{marginTop: 15, marginRight: 20}}>in</Text>
            </View>
          </View>
        </View>


        
        {/* <TextInput style={styles.input} value={`${inputList.diabetesType}`} placeholder='Diabetes Type' onChangeText={text => handleOnTextChange("Type 1", "diabetesType")} /> */}
        
        
      </View>
      <View style={{width: '100%', flexDirection: 'row', marginTop: 30, justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.button}
              onPress={()=>{ update();setLoader(true); setTimeout(()=>{setLoader(false) },2000) }}>
                <Text style={styles.buttonText}>Edit  <Icon name="edit" size={15}  /></Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button}
              onPress={() => { logout() }}><Text style={styles.buttonText}>Logout  <Icon name="sign-out-alt" size={15}/></Text>
            </TouchableOpacity>
          
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: 'lightred', marginTop: 10}]}
              onPress={() => { deleteItem() }}><Text style={styles.buttonText}>Delete  <Icon name="trash-alt" size={15}/></Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    marginTop: 30
  },
  inputCont: {
    marginTop: 30,
    padding: 5,

  },
  input: {
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
  },
  button: {
    margin: 20,
    marginTop: 30,
    backgroundColor: "#6A6DB0",
    width: 110,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginTop: 19
  },
  buttonText: {
    color: 'white',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  label:{
    fontSize: 12,

  },
  icon:{
    width: "15%",
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
});