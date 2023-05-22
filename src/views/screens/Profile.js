import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import colors from '../../files/Colors';
import { getProfileInformation, editProfileInformation, deleteAccount } from "../connectionToDB/profile"
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../components/loader';
import SelectDropdown from "react-native-select-dropdown";


export default Profile = function ({navigation}) {
  const [profile, setProfile] = useState('')
  const [loader,setLoader]=useState(false)
  const [mount, setMount] = useState(0)

  const loadDataOnlyOnce = async () => {
    getProfileInformation()
      .then((res) => {
        console.log("here", res)
        console.log("state", res.userDetails.state)
        setInputList(() => {
          return {
            "name": res.userDetails.name,
            "email": res.userDetails.email,
            "weight": res.userDetails.weight,
            "heightFeet": res.userDetails.heightFeet,
            "heightInches": res.userDetails.heightInches,
            "diabetesType": res.userDetails.diabetesType,
            "activityLevel": res.userDetails.activityLevel,
            "gender": res.userDetails.gender,
            "age":  res.userDetails.age
          }
        });
        // console.log("*******************************************",inputList.age);

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
    "diabetesType": "",
    "activityLevel":"",
    "gender": "",
    "age":""
  });

  //Method sets the state change in inputList
  const handleOnTextChange = (newText, inputType) => {
    setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
    console.log("InputList: ", inputList)
  };

  

  const update = () => {
   setLoader(true)
    editProfileInformation(inputList.name, inputList.email, inputList.weight, inputList.heightFeet, 
      inputList.heightInches, inputList.diabetesType, inputList.activityLevel, inputList.gender,  inputList.age )
      .then((data) => { 
        console.log("abc", data) ;
        setLoader(false)
        navigation.replace("Profile")})
      .catch((err) => { 
        setLoader(false);
        console.log("Error in update in profile", err)
      alert("Connection Lost! Try Again.") })
  }

  const logout = () => {
    setLoader(true)
    //AsyncStorage.setItem("@token", "")
     AsyncStorage.removeItem("@token").then(async () => {
      navigation.replace("Login")
      setLoader(false)
    }).catch((err) => {
      console.log("logout error in profile ", err)
      setLoader(false)
      navigation.replace("Login")
    })

  }

  const deleteItem = () => {
    setLoader(true)
    deleteAccount()
      .then(async(data) => { 
        console.log("abc", data) ;
        await AsyncStorage.removeItem("@token")
        setLoader(false)
        navigation.replace("Registration")})
      .catch((err) => { 
        console.log("Error in delete account in profile", err)
        setLoader(false)
        Alert.alert("Error","Connection Lost! Try again")
        navigation.replace("Registration")
        
     
       })
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
          <Icon name="user-edit" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} value={(inputList.age!=undefined)?`${inputList.age}`:0}  keyboardType='numeric' placeholder='Age' onChangeText={text => handleOnTextChange(text, "age")} />
          </View>
        </View>
        

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="weight" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Weight</Text>
            <TextInput style={styles.input} value={(inputList.weight!=undefined)?`${inputList.weight}`:0} placeholder='Weight in kg' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "weight")} />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="venus-mars" size={25} style={styles.icon}/>
          <View style={{width: "50%"}}>
            <Text style={styles.label}>Gender</Text>
            <SelectDropdown
                        // style={{height: '5%'}}
                        data={['Male',"Female"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            handleOnTextChange(selectedItem, "gender")
                        }}

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;

                        }}
                        rowTextForSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}

                        buttonStyle={{  color: "red", width: "100%", backgroundColor: '#b8bedd', height: 50, borderRadius: 15 }}

                        buttonTextStyle={
                            {
                                fontSize: 12,
                                color: 'black',
                                textTransform: "capitalize",
    
                            }
                        }
                        // defaultButtonText={`${existingItem !== null ? existingItem.event : "Select an Event"}`}
                        defaultButtonText={(inputList.gender!="")? inputList.gender: 'Select gender'}
                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: '#b8bedd', margin: 2 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >

                    </SelectDropdown>          
             </View>
        </View>


        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="walking" size={25} style={styles.icon}/>
          <View style={{width: "50%", marginTop: 5}}>
            <Text style={styles.label}>Activity level</Text>
            <SelectDropdown
                        data={['Very Light','Light','Moderate','Heavy',
                        'Very Heavy']}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            handleOnTextChange(selectedItem, "activityLevel")
                        }}

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;

                        }}
                        rowTextForSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}

                        buttonStyle={{  color: "red", width: "100%", backgroundColor: '#b8bedd', height: 50, borderRadius: 15 }}

                        buttonTextStyle={
                            {
                                fontSize: 12,
                                color: 'black',
                                textTransform: "capitalize",
    
                            }
                        }
                        // defaultButtonText={`${existingItem !== null ? existingItem.event : "Select an Event"}`}
                        // defaultButtonText={"select activity level"}
                        defaultButtonText={(inputList.activityLevel!="")? inputList.activityLevel: 'select activity level'}
                        dropdownIconPosition="right"
                        dropdownStyle={{ backgroundColor: "white" }}
                        rowStyle={{ backgroundColor: '#b8bedd', margin: 2 }}
                        rowTextStyle={{ color: colors.greyBlue }}

                    >

                    </SelectDropdown>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="ruler-vertical" size={25} style={styles.icon}/>
          <View style={{width: "85%"}}>
            <Text style={styles.label}>Height</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput style={[styles.input, {width: '25%', marginRight: 20, textAlign: 'center'}]} value={(inputList.heightFeet!="")?`${inputList.heightFeet}`:0} placeholder='Feet' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "heightFeet")} />
              <Text style={{marginTop: 15, marginRight: 20}}>ft</Text>
              <TextInput style={[styles.input, {width: '25%', textAlign: 'center'}]} value={(inputList.heightInches)?`${inputList.heightInches}`:0} placeholder='Inches' keyboardType='numeric' onChangeText={text => handleOnTextChange(text, "heightInches")} />
              <Text style={{marginTop: 15, marginRight: 20}}>in</Text>
            </View>
          </View>
        </View>


        
        {/* <TextInput style={styles.input} value={`${inputList.diabetesType}`} placeholder='Diabetes Type' onChangeText={text => handleOnTextChange("Type 1", "diabetesType")} /> */}
        
        
      </View>
      <View style={{width: '100%', flexDirection: 'row', marginTop: 25, justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.button}
              onPress={()=>{ update();setLoader(true); setTimeout(()=>{setLoader(false) },2000) }}>
                <Text style={styles.buttonText}>Edit  <Icon name="edit" size={15}  /></Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button}
              onPress={() => { logout() }}><Text style={styles.buttonText}>Logout  <Icon name="sign-out-alt" size={15}/></Text>
            </TouchableOpacity>
          
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: 'red', marginTop: 10}]}
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
    color: 'grey',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
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