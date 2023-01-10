import {React, useState} from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView, TouchableOpacity, Image} from "react-native";
import { Input } from "../components/input";
import NewDropDown from "../components/NewDropDown"
import NewPicker from "../components/NewPicker";
import * as Progress from 'react-native-progress';


export default function HomeScreen({navigation, prop}){
    const [name, setName] = useState('Fatima');
    const [bloodSugar, setBloodSugar]= useState(10);
    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.circleCon}>
            
                <Progress.Circle 
                endAngle={0.2}
                indeterminateAnimationDuration={0.1}
                size={250} 
                showsText={true} 
                progress={10} 
                thickness={8} 
                formatText={()=> `${bloodSugar}mg/dl`} 
                style={styles.circle} 
                textStyle={{color: 'white' }}
                allowFontScaling={true}
                borderWidth={0}
                color={'white'}
    />
                <Text style={styles.text}>Blood Sugar</Text>
            </View>

            <View style={styles.smallMain}>
                <View style={styles.small}>
                    <Text>Calories Consumed</Text>
                
                </View>
                <View style={styles.small}>
                
                </View>
            </View>

            <View style={styles.smallMain}>
                <View style={styles.small}>
                    
                </View>
                <View style={styles.small}>
                
                </View>
            </View>
            
            
        </SafeAreaView>
    )
};

const styles=StyleSheet.create({
    container:{
        width:"100%",
        height: "100%",
        backgroundColor: 'white'
        // backgroundColor: 'green'
    },
    circleCon:{
        alignSelf: "center",
        backgroundColor: '#ADD8E6',
        width: '100%',
        height: 320,
        borderBottomLeftRadius: 38,
        borderBottomRightRadius: 38,
        justifyContent: "center",
        elevation:15,
    },
    circle:{
        alignSelf: "center",
    },

    text:{
       textAlign: "center",
       marginTop: 15,
       fontWeight: 'bold',
    },

    smallMain:{width: '100%',
    marginTop: 20, 

    height: 150, 
    flexDirection: "row", 
    justifyContent: "space-evenly"},

    small:{
        backgroundColor: '#ADD8E6', 
        width: 180, 
        margin: 5, 
        borderRadius: 15
    }
})