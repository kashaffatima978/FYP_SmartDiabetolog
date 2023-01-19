import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

exports.checkRoot = () => {
       axios.get("http://10.0.2.2:3000/")
              .then(res => { console.log(res.data) })
              .catch(err => { console.log(err) })
}


exports.registeration = (name, email, password) => {
       return new Promise((resolve, reject) => {
              axios.post("http://10.0.2.2:3000/register",
                     {
                            "name": name,
                            "email": email,
                            "password": password
                     }
              )
                     .then(async (res) => {
                            if (res.data.token !== undefined) {
                                   console.log("token is", JSON.stringify(res.data.token));
                                   //const token = await storeTokenInStorage(res.data.token)
                                   storeTokenInStorage(res.data.token).then((token) => {
                                          console.log(token)
                                          console.log("token in registeration is", token)
                                          return resolve(token)
                                   }).catch((err) => {
                                          // console.log(err.response.status)
                                          console.log("Error in registration " + err)
                                          return reject(err)
                                   })

                            }
                     })
                     .catch((err) => {
                            // console.log(err.response.status)
                            console.log("Error in registration " + err)
                            return reject(err)
                     })

       })
}

exports.signIn = (email, password) => {
       return new Promise((resolve,reject)=>{
              var status = ""
              axios.post("http://10.0.2.2:3000/login",
                     {
                            "email": email,
                            "password": password
                     }
              )
                     .then((res) => {
                            console.log(res)
                            if (res.data.token !== undefined) {
                                   status = "success"
                                   console.log("token is", res.data.token);
                                   storeTokenInStorage(res.data.token, "login")
                                   .then(token=>{
                                          console.log("token in signin after storing in asyncstorage is",token)
                                          resolve();
                                   })
                                   .catch(err=>{console.log("Error signIn1: ", err),reject(err)})

                            }
                     })
                     .catch((err) => {
                            console.log("Error signIn2: ", err)
                            reject(err)
                     })

       })
}

const storeTokenInStorage = (value, methodType = "register") => {
       //value contains token
       //method type could be login or register
       return new Promise((resolve, reject) => {
              console.log("token to be stored is ", JSON.stringify(value))
              const obj = { "token": value }
              //storage for register
              if (methodType === "register") {
                     AsyncStorage.setItem("@registerToken", JSON.stringify(obj)).then(async() => {
                            const data = await AsyncStorage.getItem(("@registerToken"))
                            const token = JSON.parse(data).token
                            console.log(`In Asyncstorage register token is= ${JSON.parse(data).token}`)
                            resolve(token)
                            //sendOTP(JSON.parse(data).token)
                     }).catch((err) => {
                            console.log("storeTokenInStorage error ", err)
                            reject(err)
                     })

              }
              //storage for login
              else {
                     AsyncStorage.setItem("@token", JSON.stringify(obj)).then(async() => {
                            const data = await AsyncStorage.getItem(("@token"))
                            const token = JSON.parse(data).token
                            console.log(`in Asyncstorage token for login is= ${JSON.parse(data).token}`)
                            resolve(token)

                     }).catch((err) => {
                            console.log("storeTokenInStorage error ", err)
                            reject(err)
                     })

              }
       })
}

//send OTP code to email of the user
exports.sendOTP = (token) => {
       //recieves token from register
       console.log("In sendOTP")
       return new Promise((resolve, reject) => {
              console.log("token in otp ", token)
              axios.get("http://10.0.2.2:3000/otp/sendemail",
                     { headers: { "Authorization": "Bearer " + token } })
                     .then((res) => {
                            console.log(res.data);
                            storeOTP(res.data)
                                   .then(() => { resolve() })
                                   .catch((err) => {
                                          console.log("sendOTP error", err);
                                          reject(err)
                                   })
                     })
                     .catch((err) => {
                            console.log("sendOTP error", err);
                            reject(err)
                     })
       })
}

//store OTP Code send to email in AsyncStorage
const storeOTP = (data) => {
       return new Promise((resolve, reject) => {
              console.log("In storeOTP")

              console.log("\nStoring OTP in AsyncStorage", data.code)
              if (data !== null) {
                     AsyncStorage.setItem("@OTP", JSON.stringify(data.code)).then(() => {
                            resolve()
                     }).catch((err) => {
                            console.log("Error: StoreOTP= ", err)
                            reject()
                     })
              }

       })

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
exports.verifyUser = async () => {
       return new Promise(async(resolve,reject)=>{

              const token = (JSON.parse(await AsyncStorage.getItem("@registerToken")).token)
       axios.patch("http://10.0.2.2:3000/",
              { "userVerified": "true" },
              { headers: { "Authorization": "Bearer " + token } })
              .then((res) => {
                     if (res.data.status !== undefined) {
                            console.log("changes successfully maintained in verifyUser");
                            console.log(res.data)
                            resolve(res.data)
                     }
              })
              .catch((err) => {
                     console.log("Error: verifyUser= ", err)
                     reject(err)
              })
       })
       
}