import React from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity, Button} from "react-native";
import Card from "../components/cards";
import colors from "../../files/Colors";
import { ImagePicker } from "react-native-image-picker";
import { launchImageLibrary } from "react-native-image-picker";

export default function Retinopathy({navigation}){
    const [photo, setPhoto] = React.useState(null);
    
    const handleChoosePhoto = () => {
      launchImageLibrary({ noData: true }, (response) => {
        console.log(response);
        if (response) {
          setPhoto(response);
        }
      });
    };
    return(
        <View style={styles.container}>
            <Image style={styles.medImg}source={require("../../../assets/Images/retinopathy.jpg")} resizeMode={'contain'}/>
            <Text style={styles.heading} >Detect Retinopathy</Text>
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
                <Text style= {styles.buttonText}>Upload Fundus Image</Text>
            </TouchableOpacity>

            <View style={styles.Result}>
                <Text style={styles.ResultText}>Result: </Text>
            </View>
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
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        // margin: 15
    },
    medImg:{
        width: "100%",
        height: 200,
        alignSelf:"center"
    },

    button:{
        borderColor:"#d6d8f5",
        borderWidth:2,
        height:60,
        width:"90%",
        marginTop:30,
        marginBottom:10,
        alignSelf: "center",
        borderRadius: 15
        // elevation: 6,
        // shadowColor: '#DDBEA9',
    },
    buttonText:{
        fontWeight:"bold",
        fontSize:15,
        color:'black',
        textAlign:"center",
        textAlign: "center",
        marginVertical: 15
        // height:"20%",
        // width:"100%",
        // marginTop: 15

    },
    Result:{
        backgroundColor:'#d6d8f5',
        marginTop:30,
        marginBottom:10,
        width:"90%",
        height: 90,
        alignSelf: "center",    },
    ResultText:{
        fontSize: 20,
        color:'black',
        textAlign: "center",
        marginVertical: 25
    }

});