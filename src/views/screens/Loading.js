import React from "react";
import {View,Text, Button} from "react-native"
import PageHeading from "../components/PageHeading";

export default function Loading({navigation}){
    return(
        <View>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Loading Screen Here</Text>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Hello there</Text>
            <PageHeading title="Hello beauty"/>
            <Text style={{color:"black"}}>Hey</Text>
            
        </View>
    )
}