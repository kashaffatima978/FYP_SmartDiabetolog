import React from "react";
import {View,Text,StyleSheet, SafeAreaView, Image,TouchableOpacity,   useColorScheme,} from "react-native";
// import LinearGradient from 'react-native-linear-gradient'
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FirstScreen({navigation}){
    const isDarkMode = useColorScheme() === 'dark';
    const isLightMode = useColorScheme()==='light';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const LoginOpen= ()=>{
        navigation.navigate('Login');
    }
    const RegisterOpen= ()=>{
        navigation.navigate('Registration');
    }

    return(
        <SafeAreaView style={styles.container}>
          <Image style={styles.image} source={require("../../../assets/Images/firstPic.png")}/>
        
          <Text style={styles.heading}>Smart Diabetolog</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={RegisterOpen}><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={LoginOpen}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
          </View>
          <Text style={styles.smallText}>Let's fight diabetes together!</Text>
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    container:{
        flex: 1,
    },
    icon:{
        alignSelf: "center",
        fontSize: 30,
    
    },
    image:{
        flex:0.3,
        width: "70%",
        height:"25%",
        alignSelf: "center",
        marginTop: 40
    },
    heading:{
        flex: 0.1,
        fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        color: 'black',
    },

    button:{
        flex:0.2,
        backgroundColor: "#86C0DD",
        width: 350,
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
        alignSelf: "center"
    },
    buttonText:{
        fontSize: 20,
        color: "white",
        textAlign:"center",
        textAlignVertical: "center",
    },
    buttonView:{
        flex:0.4,
        flexDirection: "column",
        justifyContent: 'flex-end',
        marginTop: 100
    },
    smallText:{
        flex: 0.2,
        fontStyle: "italic",
        justifyContent: "center",
        bottom: 15,
        position:'absolute',
        textAlign: "center",
        width:'100%',
        fontSize: 20
    },
    // linearGradient: {
    //     flex:1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 5,
    //     height: 200,
    //     width: '100%',
    //   },
    
});