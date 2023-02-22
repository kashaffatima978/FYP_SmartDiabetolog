import {React, useState, useEffect} from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView, TouchableOpacity, Image, Animated, Easing, TouchableWithoutFeedback  } from "react-native";
import { Input } from "../components/input";
import NewDropDown from "../components/NewDropDown"
import NewPicker from "../components/NewPicker";
import * as Progress from 'react-native-progress';
import { CircularProgress } from 'react-native-circular-progress';
import DailyInputs from "../components/DailyInputs";
import NavBar from "../components/NavBar";
import SpinListButton from "../components/SpinListButton";
import { Modal} from 'react-native-paper';




export default function HomeScreen({navigation, prop}){
    const [visible, setVisible] =useState(false);
    const [name, setName] = useState('Fatima');
    const [bloodSugar, setBloodSugar]= useState(100);
    const [ldl, setldl]= useState(60);
    const [hdl, sethdl]= useState(70);
    const [sbp, setsbp]= useState(80);
    const [dbp, setdbp]= useState(120);
    const [profile, setprofile]= useState(''); 

    const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
    const animatedProgress = new Animated.Value((bloodSugar/500)*100);


    ///for modal
    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    useEffect(() => {
        Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,

        }).start();
    }, [animatedProgress]);

    
    return(
        <SafeAreaView style={styles.container}>

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
            <TouchableWithoutFeedback onPress={showModal}>
                <NavBar name ={name} profile={profile} />
            </TouchableWithoutFeedback>
            
            <View style={styles.con}>
                <AnimatedCircularProgress
                    size={200}
                    width={8}
                    fill={animatedProgress}
                    tintColor="#6A6DB0"
                    backgroundColor="#E2E4FF"
                    rotation={0}
                    lineCap="round"
                >
                    {() => (
                    <Image
                        style={styles.image}
                        source={require('../../../assets/Images/circularbarImage.jpg')}
                        resizeMode="center"
                        style={{width: 120, height:120}}
                    />
                    )}
                </AnimatedCircularProgress>
                <Text style={styles.text}>Blood sugar: {bloodSugar} mg/dl</Text> 
            </View>
            <View style={{marginTop: 16, padding: 20}}>
                <Text style={[styles.text], {alignSelf: "flex-start", fontSize: 16}}>Daily Inputs</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DailyInputs colorbg="#FCE0D7" dataUnit={'mg/dl'} dataType="Blood Sugar" data={bloodSugar} icon={require('../../../assets/Images/bloodsugar_icon.png')} dataColor="#9d8189"/>
                <DailyInputs colorbg="#fad2e1" dataUnit={'mg/dl'} dataType="Systolic BP" data={sbp} icon={require('../../../assets/Images/bloodpressure-icon.png')} dataColor="#e56866"/>
                <DailyInputs colorbg="#dee2ff" dataUnit={'mg/dl'} dataType="Diasystolic BP" data={dbp} icon={require('../../../assets/Images/bloodpressure-icon.png')} dataColor="#8e9aaf"/>
                <DailyInputs colorbg="#c8e7ff" dataUnit={'mg/dl'} dataType="LDL chlolestrol" data={ldl} icon={require('../../../assets/Images/ldl-icon.png')} dataColor="#618985"/>
                <DailyInputs colorbg="#c9e4de" dataUnit={'mg/dl'} dataType="HDL chlolestrol" data={hdl} icon={require('../../../assets/Images/hdl-icon.png')} dataColor="#09814a"/>
            </ScrollView>
        </View>

        <SpinListButton />
        </SafeAreaView>
    )
};

const styles=StyleSheet.create({
    con: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',mar
        marginTop: 30
      },
      
    container:{
        width:"100%",
        height: "100%",
        backgroundColor: 'white'
    },
   
    text:{
       textAlign: "center",
       marginTop: 15,
       fontWeight: 'bold',
    
    },
    smallText:{
        color: 'red',
        // alignSelf: "center",
        marginTop: 5,
        fontSize: 16

    }

})