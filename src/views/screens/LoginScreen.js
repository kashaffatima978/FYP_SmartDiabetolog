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
import { signIn } from "../connectionToDB/authentication"



export default function LoginScreen({ navigation }) {

    // this state input keeps track of the data written inside the input
    const [inputList, setInputList] = React.useState({
        email: "",
        password: "",
    });

    //to set and get error message
    const [errorMessages, setErrorMessages] = useState({})


    const validation = async () => {
        //first close the keyboard
        Keyboard.dismiss();
        let valid = true;

        login()

        //////////////////////////////////////////////////////////////////////////////

        //if empty
        if (!inputList.email) {
            handleErrorMessage("Please input email", "email")
            valid = false;
        }
        else if (!inputList.email.match(/\S+@\S+\.\S+/)) {
            handleErrorMessage("Please input valid email", "email")
            valid = false;
        }

        if (!inputList.password) {
            handleErrorMessage("Please enter password", "password")
            valid = false;
        }
        else if (inputList.password.length < 5 || !inputList.password.match(/[A-Z]+[a-z]+[0-9]+\W+/)) {
            handleErrorMessage("Your password length must be greater than 5 and must have atleast 1 capital,smaller alphabets and a digit ", "password")
            valid = false;
        }
        // if (valid){
        //     login();
        // }
    };

    const [loader, setLoader] = useState(false)
    const [found, setFound] = useState(true)

    //Methoda sets the state change in inputList
    const handleOnTextChange = (newText, inputType) => {
        setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
        console.log("InputList: ", inputList)
    };

    const login = async () => {
        // setLoader(true);
        // signIn(inputList.email, inputList.password)
        //     .then(() => {
        //         setTimeout(()=>{
        //             setLoader(false);
        //             navigation.navigate("TabNav");
        //         },3000)  
        //     })
        //     .catch((err) => { 
        //         setLoader(false);
        //         alert(err)
        //        // Alert.alert("Error", "Something went wrong")
        //     })
        navigation.navigate("Home");
    }



    const handleErrorMessage = (newerrorMessage, inputType) => {
        setErrorMessages(prevState => ({ ...prevState, [inputType]: newerrorMessage }));
        console.log("ErrorMessage: ", errorMessages)
    }



    return (<SafeAreaView style={styles.container}>
        <Loader visible={loader} />
        <ScrollView style={styles.scrollViewContainer}>
            {/* <MainHeading heading="login"  style={{width:"100%"}}/> */}
            <Image style={styles.headImage} resizeMode={"contain"} source={require("../../../assets/Images/login.png")} />
            <Text style={styles.heading}>Login</Text>
            <View style={{ marginHorizontal: "10%", flex: 1 }}>
                <Input
                    label="Email"
                    iconName="email-outline"
                    placeholder="Enter your email"
                    onChangeText={text => handleOnTextChange(text, "email")}
                    errorMessage={errorMessages.email}
                    value={inputList.email}
                    onFocus={() => { handleErrorMessage(null, "email") }}
                />

                <Input
                    label="password"
                    iconName="lock-outline"
                    placeholder="Enter your Password"
                    password
                    onChangeText={text => handleOnTextChange(text, "password")}
                    errorMessage={errorMessages.password}
                    value={inputList.password}
                    onFocus={() => { handleErrorMessage(null, "password") }}
                />
                <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword") }}>
                    <Text >Forgot password?</Text>
                </TouchableOpacity>
                <MyButton title="Login" onPress={validation} />

                <TouchableOpacity onPress={() => { navigation.navigate("Registration") }}>
                    <Text style={styles.forgetPasswordText}  >Don't have an account? Register!</Text>
                </TouchableOpacity>
            </View>

            {(!found) ? (<View>
                <Text>USER NOT FOUND</Text>
            </View>) : null}
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
        alignSelf: "center"
    },
    heading: {
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        marginBottom: 15
    },


});

