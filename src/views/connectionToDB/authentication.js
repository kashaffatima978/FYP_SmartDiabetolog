import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

exports.checkRoot = () => {
       axios.get("http://10.0.2.2:3000/")
              .then(res => { console.log(res.data) })
              .catch(err => { console.log(err) })
}


exports.registeration = (name, email, password) => {
       let state = false;
       axios.post("http://10.0.2.2:3000/register",
              {
                     "name": name,
                     "email": email,
                     "password": password
              }
       )
              .then((res) => {
                     if (res.data.error !== undefined) {
                            console.log("Email already exists");
                     }
                     if (res.data.token !== undefined) {
                            console.log("token is", JSON.stringify(res.data.token));
                            storeTokenInStorage(res.data.token)
                     }
              })
              .catch((err) => {
                     console.log("Error in registration " + err)

              })

}

exports.signIn = (email, password) => {
       var status=""
       axios.post("http://10.0.2.2:3000/login",
              {
                     "email": email,
                     "password": password
              }
       )
              .then(async (res) => {
                     if (res.data.error !== undefined) {
                            console.log("user not found");
                     }
                     if (res.data.token !== undefined) {
                            status= "success"
                            console.log("token is", res.data.token);
                            await storeTokenInStorage(res.data.token,"login")
                     }          
              })
              .catch((err) => {
                     console.log("Error signIn: ",err)    
              })
}

const storeTokenInStorage = async (value,methodType="register") => {
       try {
              console.log("token in store data is ", JSON.stringify(value))
              const obj = { "token": value }
              await AsyncStorage.setItem("@token", JSON.stringify(obj))
              const data = await AsyncStorage.getItem(("@token"))
              console.log(`in Asyncstorage token is= ${JSON.parse(data).token}`)
              if(methodType==="register")
              {sendOTP()}
       }
       catch (err) {
              console.log(err)
       }
       return true
}

//send OTP code to email of the user
exports.sendOTP = async () => {
       console.log("IN otp")
       try {
              const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
              console.log("token in otp ", token)
              const res = await axios.get("http://10.0.2.2:3000/otp/sendemail",
                     { headers: { "Authorization": "Bearer " + token } })
              console.log(res.data);
              storeOTP(res.data)
       }
       catch (err) {
              console.log(err);
       }
}

//store OTP Code send to email in AsyncStorage
const storeOTP = async (data) => {
       try {
              console.log("\nStoring OTP in AsyncStorage", data.code)
              if (data !== null) {
                     await AsyncStorage.setItem("@OTP", JSON.stringify(data.code))
              }
       }
       catch (err) {
              console.log("Error: StoreOTP= ", err)
       }
}


//getting the otp code from the Asyncstorage
exports.getOTP = async (data) => {
       try {
              console.log("\Getting OTP from AsyncStorage")
              const value = await AsyncStorage.getItem("@OTP")
              console.log(value)
              console.log(typeof value)
              if (value !== null) { return value }
              else { return "ERROR" }
       }
       catch (err) {
              console.log("Error: StoreOTP= ", err)
       }
}

//verify user registration process
exports.verifyUser = async() => {
       const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
       axios.patch("http://10.0.2.2:3000/",
              { "userVerified": "true" },
              { headers: { "Authorization": "Bearer " + token } })
              .then((res) => {
                     if (res.data.status !== undefined) {
                            console.log("changes successfully maintained");
                     }
                     if (res.data.error !== undefined) {
                            console.log("changes failed");
                     }
              })
              .catch((err) => {
                     console.log("Error: verifyUser= ", err)

              })
}