
import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity, Image, TextInput } from "react-native";
import { MyButton } from "../components/button";
import { getOTP,sendOTP,verifyUser } from "../connectionToDB/authentication"



export default function EnterCode({ props, navigation }) {
  const [time, setTime] = React.useState(60);
  const timerRef = React.useRef(time);
  const [OTP, setOTP] = useState(
    {
      one: "",
      two: "",
      three: "",
      four: ""
    }
  )
  const [otpMatched,setOtpMatched]=useState(false)

  const sendOTPAgain=async()=>{
    sendOTP()
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  //changes the user entered OTP code in state OTP
  const handleOnChange = (val, position) => {
    setOTP((oldOTP)=>({...oldOTP,[position]:val}))
    console.log("Now OTP is ")
    console.log(OTP)
  }

  const submitOTP=async()=>{
    const userOTP=JSON.stringify(`${OTP.one}${OTP.two}${OTP.three}${OTP.four}`)
    console.log("User added OTP is ",userOTP)
    console.log(typeof userOTP)
    const sendotp=await getOTP()
    console.log("Sended OTP is ", sendotp)
    console.log(typeof sendotp)
    if(sendotp!=="ERROR" && sendotp===userOTP){
      alert("in")
      await verifyUser()
      setOtpMatched(true)
      alert("User SuccessFully Registered")
      navigation.navigate("Login")
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Enter recieved code:</Text>
      <View style={styles.codeBox}>
        <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text,"one")}></TextInput>
        <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text,"two")}></TextInput>
        <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text,"three")}></TextInput>
        <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text,"four")}></TextInput>
      </View>
      <View style={styles.timmer}>
        <Text style={styles.timmerText}> {time} seconds </Text>
      </View>
      <MyButton title="Done" onPress={submitOTP} disabled={otpMatched?true:false} />

      <TouchableOpacity onPress={sendOTPAgain} disabled={otpMatched?true:false}>
        <Text style={{fontSize:16}} >Send code Again</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 30,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "bold",
    color: 'black',
    marginBottom: 15,
    marginTop: 10
  },
  codeBox: {
    flex: 0.2,
    flexDirection: 'row',
    // backgroundColor: 'pink',
    margin: 20,
    justifyContent: 'space-evenly',

  },
  codeItem: {
    // backgroundColor: 'lightgrey',
    width: 50,
    height: 80,
    fontSize: 30,
    color: 'black',
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,

  },
  timmer: {
    // backgroundColor: 'red'
  },
  timmerText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }


});


