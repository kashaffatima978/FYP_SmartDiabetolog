import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, Keyboard, Alert, TouchableOpacity, Image } from "react-native";
import Colors from "../../files/Colors";
import { MyButton } from "../components/button";
import { Input } from "../components/input";
import { MainHeading } from "../components/mainHeading";
import Loader from "../components/loader";
import generalStyles from "../../files/generalStyle";
import colors from "../../files/Colors";
import { registeration, sendOTP } from "../connectionToDB/authentication"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../redux/reduxActions";
import { useDispatch } from "react-redux/es/exports";
import { setNeck, setArms, setLegs, setWaist, setCardio, setChest, setBack, setShoulders,setExerciseRecord } from "../../redux/reduxActions";





export const Registeration = function ({ navigation }) {
    const dispatch = useDispatch();


    // this state input keeps track of the data written inside the input
    const [inputList, setInputList] = React.useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    //to set and get error message
    const [errorMessages, setErrorMessages] = useState({})

    //Validation Function called whenever register button is clicked
    const validation = () => {
        //register needs to remove from here
        register();
        //first close the keyboard
        Keyboard.dismiss();
        let valid = true;

        //if empty
        if (!inputList.email) {
            handleErrorMessage("Please input email", "email")
            valid = false;
        }
        else if (!inputList.email.match(/\S+@\S+\.\S+/)) {
            handleErrorMessage("Please input valid email", "email")
            valid = false;
        }

        if (!inputList.name) {
            handleErrorMessage("Please enter name", "name")
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

        if (!inputList.cpassword) {
            handleErrorMessage("Please enter confirmed password", "cpassword")
            valid = false;
        }
        else if (inputList.cpassword !== inputList.password) {
            handleErrorMessage("Confirm password does not match the password", "cpassword")
            valid = false;
        }

        if (valid) {
            register();
        }
    };

    const [loader, setLoader] = useState(false)

    const register = async () => {
        registeration(inputList.name, inputList.email, inputList.password)
            .then((token) => {
                console.log("returned token in register screen is ", token)
                sendOTP(token)
                    .then(() => {
                        setLoader(true);
                        setTimeout(() => {
                            setLoader(false);
                            try {
                                // set states 
                                dispatch(setNeck())
                                dispatch(setArms())
                                dispatch(setLegs())
                                dispatch(setShoulders())
                                dispatch(setChest())
                                dispatch(setCardio())
                                dispatch(setBack())
                                dispatch(setWaist())

                                //todayExerciseDone is initially false already
                                //now set record
                                date=(new Date()).getDate()
                               
                                for(i=1; i<date;i++){
                                    dispatch(setExerciseRecord())
                                }
                               
                                console.log("state after the registeration is ", store.getState())
                                navigation.navigate("EnterCode");
                            }
                            catch (error) {
                                Alert.alert("Error", "Something went wrong")
                            }
                        }
                            , 4000)
                    })
                    .catch((err) => {
                        console.log("Error in register screen")
                        console.log(err)
                        alert("Network Error,Try Again")
                    }

                    )
            }).catch((err) => {
                console.log("Eerror in register screen")
                console.log(err)
            })



    }

    //Methoda sets the state change in inputList
    const handleOnTextChange = (newText, inputType) => {
        setInputList(prevInputListState => ({ ...prevInputListState, [inputType]: newText }));
        console.log(inputList)
    };

    const handleErrorMessage = (newerrorMessage, inputType) => {
        setErrorMessages(prevState => ({ ...prevState, [inputType]: newerrorMessage }));
        console.log(errorMessages)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#6A6DB0" barStyle="light-content"></StatusBar>
            <Loader visible={loader} />
            <ScrollView style={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                {/* <MainHeading heading="registration" style={{width:"100%"}}/> */}
                <Image style={styles.headImage} resizeMode={"contain"} source={require("../../../assets/Images/register.png")} />
                <Text style={styles.heading}>Register</Text>
                <View style={{ marginHorizontal: "10%", flex: 1 }}>
                    <Input
                        label="Name"
                        onChangeText={text => handleOnTextChange(text, "name")}
                        iconName="account-o"
                        placeholder="Enter your full name"
                        errorMessage={errorMessages.name}
                        onFocus={() => { handleErrorMessage(null, "name") }}

                    />
                    <Input
                        label="Email"
                        iconName="email-outline"
                        placeholder="Enter your email"
                        onChangeText={text => handleOnTextChange(text, "email")}
                        errorMessage={errorMessages.email}
                        onFocus={() => { handleErrorMessage(null, "email") }}
                    />
                    <Input
                        label="password"
                        iconName="lock-outline"
                        placeholder="Enter your Password"
                        password
                        onChangeText={text => handleOnTextChange(text, "password")}
                        errorMessage={errorMessages.password}
                        onFocus={() => { handleErrorMessage(null, "password") }}
                    />
                    <Input
                        label="confirm password"
                        iconName="lock-outline"
                        placeholder="Enter your Password"
                        onChangeText={text => handleOnTextChange(text, "cpassword")}
                        password
                        errorMessage={errorMessages.cpassword}
                        onFocus={() => { handleErrorMessage(null, "cpassword") }}
                    />
                    <MyButton title="Register" onPress={validation} />
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginText}  >Already have an account? Login</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    loginText: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.darkGreyBlue,
        marginTop: 4

    },
    headImage: {
        width: "100%",
        alignSelf: "center",
        height: 200,
        margin: 15
    },
    heading: {
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        marginBottom: 15,
        marginTop: 10
    }

})