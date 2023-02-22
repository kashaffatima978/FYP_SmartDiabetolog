import {React, useState, useEffect} from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView, TouchableOpacity, Image, Animated, Easing  } from "react-native";
import { Input } from "../components/input";
import NewDropDown from "../components/NewDropDown"
import NewPicker from "../components/NewPicker";
import * as Progress from 'react-native-progress';
import { CircularProgress } from 'react-native-circular-progress';
import DailyInputs from "../components/DailyInputs";
import { FlatList } from "react-native-gesture-handler";




export default function HomeScreen({navigation, prop}){
    const [name, setName] = useState('Fatima');
    const [bloodSugar, setBloodSugar]= useState(250);
    const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
    const [bloodPressure, setBloodPressure]= useState(60);
    const animatedProgress = new Animated.Value((bloodSugar/500)*100);

    useEffect(() => {
        Animated.timing(animatedProgress, {
        toValue: animatedProgress,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.linear,
        }).start();
    }, [animatedProgress]);
    return(
        <SafeAreaView style={styles.container}>
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
                <DailyInputs colorbg="#fad2e1" dataUnit={'mg/dl'} dataType="Systolic BP" data={bloodSugar} icon={require('../../../assets/Images/bloodpressure-icon.png')} dataColor="#e56866"/>
                <DailyInputs colorbg="#dee2ff" dataUnit={'mg/dl'} dataType="Diasystolic BP" data={bloodSugar} icon={require('../../../assets/Images/bloodpressure-icon.png')} dataColor="#8e9aaf"/>
                <DailyInputs colorbg="#c8e7ff" dataUnit={'mg/dl'} dataType="LDL chlolestrol" data={bloodSugar} icon={require('../../../assets/Images/ldl-icon.png')} dataColor="#618985"/>
                <DailyInputs colorbg="#c9e4de" dataUnit={'mg/dl'} dataType="HDL chlolestrol" data={bloodSugar} icon={require('../../../assets/Images/hdl-icon.png')} dataColor="#09814a"/>
                
            
            </ScrollView>
        </View>




            
        </SafeAreaView>
    )
};

const styles=StyleSheet.create({
    con: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',mar
        marginTop: 20
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