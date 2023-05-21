import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity, Image, TextInput } from "react-native";
import { MyButton } from "../components/button";
import { getOTP, sendOTP, verifyUser,sendOTPForForgetPassword } from "../connectionToDB/authentication"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "../components/input";

export default function ForgetPasswordEnterCode({ props, navigation }) {
    const [time, setTime] = React.useState(120);
    const [email, setEmail] = useState()
    const timerRef = React.useRef(time);
    const [OTP, setOTP] = useState(
        {
            one: "",
            two: "",
            three: "",
            four: ""
        }
    )
    const [otpMatched, setOtpMatched] = useState(false)



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
        setOTP((oldOTP) => ({ ...oldOTP, [position]: val }))
        console.log("Now OTP is ")
        console.log(OTP)
    }

    //get otp again
    const sendOTPForget = async() => {
       
           try{await sendOTPForForgetPassword(email)}
           catch(err){console.log(err,"error in sendOTPForget in ForgetPAsswordOTP screen")}
        
        //sendOTP((JSON.parse(await AsyncStorage.getItem("@registerToken")).token))
    }

    const submitOTP = async () => {
        const userOTP = JSON.stringify(`${OTP.one}${OTP.two}${OTP.three}${OTP.four}`)
        console.log("User added OTP is ", userOTP)
        console.log(typeof userOTP)
        const sendotp = await getOTP()
        console.log("Sended OTP is ", sendotp)
        console.log(typeof sendotp)
        if (sendotp === userOTP) {
            console.log("otp matched")
            setOtpMatched(true)
            navigation.navigate("ForgetPassword",{"email":email})
        }
        else{
            alert("Wrong OTP")
            navigation.navigate("Login")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Forget Password:</Text>
            <View style={styles.emailInput}>
                <Input
                    label="Email"
                    iconName="envelope"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text)=>{console.log(text);setEmail(text)}}

                />
                <MyButton title="Send code" onPress={sendOTPForget} />
            </View>
            <Text style={styles.heading}>Enter recieved code:</Text>
            <View style={styles.codeBox}>
                <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text, "one")}></TextInput>
                <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text, "two")}></TextInput>
                <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text, "three")}></TextInput>
                <TextInput style={styles.codeItem} maxLength={1} keyboardType='numeric' onChangeText={(text) => handleOnChange(text, "four")}></TextInput>
            </View>
            <View style={styles.timmer}>
                <Text style={styles.timmerText}> {time} seconds </Text>
            </View>
            <MyButton title="Done" onPress={submitOTP} disabled={!otpMatched ? true : false} />
            



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
    },
    emailInput:{
        flexDirection:"column",
        justifyContent:"center",
        margin:"2%"
    }


});