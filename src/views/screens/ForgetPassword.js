
import React,{useState} from "react";
import {View,Button,Text,StyleSheet, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity,Image} from "react-native";
import { Input } from "../components/input";
import colors from "../../files/Colors";
import { MyButton } from "../components/button";
import { MainHeading } from "../components/mainHeading";
import Loader from "../components/loader";
import generalStyles from "../../files/generalStyle";
import PageHeading from "../components/PageHeading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { title } from "process";



export default function ForgetPassword({navigation}){

   // this state input keeps track of the data written inside the input
   const [inputList,setInputList]=React.useState({
    email:"",
    password:"",
});

//to set and get error message
const [errorMessages,setErrorMessages]=useState({})


const validation=async ()=>{
    //first close the keyboard
    Keyboard.dismiss();
    let valid=true;

    ////////nEED TO REMOVE THIS IF AFTERWARDS FROM HERE//////////////////////////

    //login to the account using token
fetch('http://10.0.2.2:3000/user/signin',
{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({"email":inputList.email , "password":inputList.password})
}
)
.then(res => res.json())
.then(async (data)=>{
    console.log(data)
    try{
        await AsyncStorage.setItem("token",data.token)
    }
    catch(err){
        console.log("Could not store is async storage ",e)
    }
})
.catch(err=>console.log(err))

    if (valid){
        login();
    }

    //////////////////////////////////////////////////////////////////////////////

    //if empty
    if(!inputList.email){
        handleErrorMessage("Please input email","email")
         valid=false;
    }
    else if (!inputList.email.match(/\S+@\S+\.\S+/)){
        handleErrorMessage("Please input valid email","email")
         valid=false;
    }

    if(!inputList.password){
        handleErrorMessage("Please enter password","password")
        valid=false;
    }
    else if(inputList.password.length<5 || !inputList.password.match(/[A-Z]+[a-z]+[0-9]+\W+/)){
        handleErrorMessage("Your password length must be greater than 5 and must have atleast 1 capital,smaller alphabets and a digit ","password")
        valid=false;
    }
    // if (valid){
    //     login();
    // }
};

const [loader,setLoader]=useState(false)

const login=()=>{
    setLoader(true);
    setTimeout(()=>{
        setLoader(false);
        try{
        navigation.navigate("Home");
        }
        catch(error){
            Alert.alert("Error","Something went wrong")
        }
    }
    ,3000)
}

//Methoda sets the state change in inputList
const handleOnTextChange=(newText,inputType)=>{
    setInputList(prevInputListState=>({...prevInputListState,[inputType]:newText}));
    console.log("InputList: ",inputList)
};

const handleErrorMessage=(newerrorMessage,inputType)=>{
    setErrorMessages(prevState=>({...prevState,[inputType]:newerrorMessage}));
    console.log("ErrorMessage: ",errorMessages)
}



return(<SafeAreaView style={styles.container}>
  <Loader visible={loader}/>
  <ScrollView style={styles.scrollViewContainer}> 
  {/* <MainHeading heading="login"  style={{width:"100%"}}/> */}
  <Image style={styles.headImage} resizeMode={"contain"} source={require("../../../assets/Images/forgetpassword.jpg")}/>
   <Text style={styles.heading}>Change Password</Text>
  <View style={{marginHorizontal:"10%",flex:1}}>

  <Input 
          label="password" 
          iconName="lock-outline"
          placeholder="Enter old Password"
          password
          onChangeText={text=>handleOnTextChange(text,"password")}
          errorMessage={errorMessages.password}
          onFocus={()=>{handleErrorMessage(null,"password")}}
          />

    <Input 
          label="re-enter password" 
          iconName="lock-outline"
          placeholder="Enter new Password"
          password
          onChangeText={text=>handleOnTextChange(text,"password")}
          errorMessage={errorMessages.password}
          onFocus={()=>{handleErrorMessage(null,"password")}}
          />

    <Input 
          label="re-enter password" 
          iconName="lock-outline"
          placeholder="Re-enter new Password"
          password
          onChangeText={text=>handleOnTextChange(text,"password")}
          errorMessage={errorMessages.password}
          onFocus={()=>{handleErrorMessage(null,"password")}}
          />    

      <MyButton title="Save" onPress={validation}/>

      </View>
  </ScrollView>
</SafeAreaView>
)
};

 const styles=StyleSheet.create({
  container:{  
      flex:1,
      backgroundColor:"white",
  },
  scrollViewContainer:{
      width:"100%",
 
  },
  forgetPasswordText:{
      textAlign:"center",
      fontWeight:"bold",
      color:colors.darkGreyBlue,
      marginTop: 4
  },
  headImage:{
    width:"100%",
    alignSelf:"center",
    height: 200
  },
  heading:{
    fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        marginBottom: 15
  }
});


