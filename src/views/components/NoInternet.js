import React from "react";
import {View,Text,Image} from "react-native";
import colors from "../../files/Colors";

const NoInternet=()=>{
    return (

        <>
            <Image source={require('../../../assets/Images/noInternet.jpg')} style={{width: '60%', height:'30%', marginHorizontal: '20%', marginVertical: '20%'}}/>
            <Text style={{textAlign: "center", fontSize: 30, color: '#6A6DB0', fontWeight: "bold"}}>No internet connection</Text>
        </>
    )
}
export default NoInternet;