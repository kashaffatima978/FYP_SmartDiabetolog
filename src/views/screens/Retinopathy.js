import React,{useState} from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity, Button} from "react-native";
import Card from "../components/cards";
import colors from "../../files/Colors";
import { ImagePicker } from "react-native-image-picker";
import {ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { Heading } from "../components/Heading";
import { set } from "react-native-reanimated";
import axios from "axios";
import RNFetchBlob from 'rn-fetch-blob';
import {IP} from "../../files/information"

export default function Retinopathy({navigation}){
    const [photo, setPhoto] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const ip = `http://${IP}`


    openLibrary= ()=> {
        const options:ImageLibraryOptions= {
            mediaType: 'photo',
            quality: 1
        };
   
        launchImageLibrary(options, async(response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                const formData = new FormData();
                setPhoto(response.assets[0].uri)
                formData.append('file', { uri: response.assets[0].uri, name: response.assets[0].fileName, type: response.assets[0].type });
                axios.post(ip+':8000/predictRetinopathy', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    })
                    .then((response) => {
                        if(response.data.class =="No_DR"){
                            setResult("Healthy")
                        }
                        else if(response.data.class =="Mild"){
                            setResult("Mild Retinopathy")
                        }
                        else if(response.data.class =="Moderate"){
                            setResult("Moderate Retinopathy")
                        }
                        else if(response.data.class =="Proliferate_DR"){
                            setResult("Proliferate Retinopathy")
                        }
                        else if(response.data.class =="Severe"){
                            setResult("Severe Retinopathy")
                        }
                        
                        setConfidence(response.data.confidence)
                    })
                    .catch((error) => {
                        // setError('Not a Fundus image')
                        console.error(error);
                    }
                );

            }
        })
    }

    return(
        <View style={styles.container}>
            <Heading name="Retinopathy Detection"/>
            <Image style={styles.medImg}source={require("../../../assets/Images/retinopathy.jpg")} resizeMode={'contain'}/>
            
            <TouchableOpacity style={styles.button} onPress={openLibrary}>
                <Text style= {styles.buttonText}>Upload Fundus Image</Text>
            </TouchableOpacity>
            {(error!=null)?<Text>Error: {Error}</Text>:null}
            {(result!=null)?<View style={styles.Result}>
                <Text style={[styles.ResultText,{fontWeight: "bold"}]}>{result}</Text>
                <Text style={styles.ResultText}>Confidence: {(confidence*100).toFixed(0)}% </Text>
            </View>: null}
            {(photo!=null)?<Image source={{uri: photo}} style={{width: 200, height: 200, alignSelf: "center", borderRadius: 20}}/>:null}
            
            
           
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
       flex:1,
        backgroundColor: "white",
    },
    heading:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: 'white',
        height:"10%",
        display:"flex",
        marginBottom: 30,
        backgroundColor: "#6A6DB0",
        textAlignVertical: "center"
    },
    medImg:{
        width: "100%",
        height: 150,
        alignSelf:"center"
    },

    button:{
        borderColor:"#d6d8f5",
        borderWidth:2,
        height:60,
        width:"90%",
        // marginTop:30,
        marginBottom:10,
        alignSelf: "center",
        borderRadius: 15

    },
    buttonText:{
        fontWeight:"bold",
        fontSize:15,
        color:'black',
        textAlign:"center",
        textAlign: "center",
        marginVertical: 15

    },
    Result:{
        backgroundColor:'#d6d8f5',
        marginTop:10,
        marginBottom:20,
        width:"90%",
        height: 90,
        alignSelf: "center",    
    },

    ResultText:{
        fontSize: 25,
        color:'black',
        textAlign: "center",
        marginTop: 10
    }

});