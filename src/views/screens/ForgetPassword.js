
import React, { useState } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity, Image } from "react-native";
import { Input } from "../components/input";
import colors from "../../files/Colors";
import { MyButton } from "../components/button";
import { MainHeading } from "../components/mainHeading";
import Loader from "../components/loader";
import generalStyles from "../../files/generalStyle";
import PageHeading from "../components/PageHeading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { title } from "process";
import {changePassword} from "../connectionToDB/authentication"



export default function ForgetPassword({ navigation,route }) {


    const [password, setPassword] = useState()
    const [repassword, setRePassword] = useState()
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)

    const changeThePassword=async()=>{
        setLoader(true)
        try{if(password==repassword){
            setError("")
            await changePassword(route.params.email,password)
            setLoader(false)
            navigation.replace("Login");
            alert("Password successfully changed")
        }
        else{
            setError("**Both Passwords does not match")
        }}
        catch(err){
            console.log(err,"error in ForgetPAssword")
            setLoader(false)
            navigation.replace("Login");
            alert("Connection Lost! Try Again")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader} />
            <ScrollView style={styles.scrollViewContainer}>
                {/* <MainHeading heading="login"  style={{width:"100%"}}/> */}
                <Image style={styles.headImage} resizeMode={"contain"} source={require("../../../assets/Images/forgetpassword.jpg")} />
                <Text style={styles.heading}>Change Password</Text>
                <View style={{ marginHorizontal: "10%", flex: 1 }}>



                    <Input
                        iconName="lock"
                        placeholder="Enter new Password"
                        password
                        value={password}
                        onChangeText={text =>{setPassword(text)}} 
                    />

                    <Input
                        label="re-enter password"
                        iconName="lock"
                        placeholder="Re-enter new Password"
                        password
                        value={repassword}
                        onChangeText={text =>{setRePassword(text)}} 
                    />

                    <MyButton title="Save" onPress={changeThePassword} />
                    <Text style={styles.error}>{error}</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollViewContainer: {
        width: "100%",

    },
    forgetPasswordText: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.darkGreyBlue,
        marginTop: 4
    },
    headImage: {
        width: "100%",
        alignSelf: "center",
        height: 200
    },
    heading: {
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        marginBottom: 15
    },
    error:{
        color:"red",
        textAlign:"center",
        marginTop:"3%"
    }
});


