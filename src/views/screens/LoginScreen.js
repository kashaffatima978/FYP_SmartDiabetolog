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
import { getProfileInformation } from "../connectionToDB/profile"
import { storeStateInAsync, getStateFromAsync } from "../connectionToDB/AsyncStorage"
import { updateInitialState } from "../../redux/reduxActions";
import { store } from "../../redux/reduxActions";
import { useDispatch } from "react-redux/es/exports";
import { setAuthentication, setNeck, setArms, setLegs, setWaist, setCardio, setChest, setBack, setShoulders, setExerciseRecord, setExerciseToday, setBreakfastToday, setLunchToday, setSnackOneToday, setSnackTwoToday, setDinnerToday } from "../../redux/reduxActions";
import { set } from "react-native-reanimated";





export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch()
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
        setLoader(true);
        signIn(inputList.email, inputList.password)
            .then(() => {
                setTimeout(() => {
                    setLoader(false);
                    //state loading from database
                    //first get profile info from database
                    getProfileInformation()
                        .then(async (res) => {
                            console.log("state got is ", res.userDetails.state)
                            //storing whole state and record state in AsycStorage
                            await storeStateInAsync(res.userDetails.state)



                            //now state storing
                            //initialstate = {record:[],authenticated: false, mode: "Light", neck:false 
                            //,back:false,arms:false,shoulders:false,waist:false,legs:false,chest:false,
                            //cardio:false,todayExerciseDone:false }

                            // set states 
                            dispatch(setAuthentication())
                            console.log("Before update after login the state is, ", store.getState())
                            if (res.userDetails.state.neck && !store.getState().neck) dispatch(setNeck())
                            if (res.userDetails.state.arms && !store.getState().arms) dispatch(setArms())
                            if (res.userDetails.state.legs && !store.getState().legs) dispatch(setLegs())
                            if (res.userDetails.state.shoulders && !store.getState().shoulders) dispatch(setShoulders())
                            if (res.userDetails.state.chest && !store.getState().chest) dispatch(setChest())
                            if (res.userDetails.state.cardio && !store.getState().cardio) dispatch(setCardio())
                            if (res.userDetails.state.back && !store.getState().back) dispatch(setBack())
                            if (res.userDetails.state.waist && !store.getState().waist) dispatch(setWaist())

                            //state setting for diet
                            if (res.userDetails.state.todayBreakfastDone && !store.getState().todayBreakfastDone) dispatch(setBreakfastToday())
                            if (res.userDetails.state.todayLunchDone && !store.getState().todayLunchDone) dispatch(setLunchToday())
                            if (res.userDetails.state.todaySnackOneDone && !store.getState().todaySnackOneDone) dispatch(setSnackOneToday())
                            if (res.userDetails.state.todaySnackTwoDone && !store.getState().todaySnackTwoDone) dispatch(setSnackTwoToday())
                            if (res.userDetails.state.todayDinnerDone && !store.getState().todayDinnerDone) dispatch(setDinnerToday())


                            //todayExerciseDone is initially false already
                            //now set record
                            //date = (new Date()).getDate()

                            // for (i = 0; i < res.userDetails.state.record.length; i++) {
                            //     //if an instance for record is true
                            //     if (res.userDetails.state.record[i]) {
                            //         dispatch(setExerciseToday())
                            //         dispatch(setExerciseRecord())
                            //         dispatch(setExerciseToday())
                            //     }
                            //     else {
                            //         dispatch(setExerciseRecord())
                            //     }
                            // }

                            //if today exercise is true then update the state todayExerciseDone
                            if (res.userDetails.state.todayExerciseDone && !store.getState().todayExerciseDone) {
                                dispatch(setExerciseToday())
                            }





                            console.log("After update after login the state is, ", store.getState())
                            navigation.navigate("Home")

                        })
                        .catch(err => { console.log("Error in loading state in login screen", err) })

                }, 3000)
            })
            .catch((err) => {
                setLoader(false);
                alert(err)
                // Alert.alert("Error", "Something went wrong")
            })

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
                    iconName="envelope"
                    placeholder="Enter your email"
                    onChangeText={text => handleOnTextChange(text, "email")}
                    errorMessage={errorMessages.email}
                    value={inputList.email}
                    onFocus={() => { handleErrorMessage(null, "email") }}
                />

                <Input
                    label="password"
                    iconName="lock"
                    placeholder="Enter your Password"
                    password
                    onChangeText={text => handleOnTextChange(text, "password")}
                    errorMessage={errorMessages.password}
                    value={inputList.password}
                    onFocus={() => { handleErrorMessage(null, "password") }}
                />
                <TouchableOpacity onPress={() => { navigation.navigate("ForgetPasswordEnterCode") }}>
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

