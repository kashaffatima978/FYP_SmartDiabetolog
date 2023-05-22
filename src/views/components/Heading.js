import React, { useEffect, useState } from "react";
import {View,StyleSheet,Text} from "react-native";
import colors from "../../files/Colors";
import { Appbar, Avatar , Modal} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Heading=(props)=>{
    // const [mount, setMount]= useState(0)
    const [name, setName]= useState('')
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@UsersName');
            if (value !== null) {
              console.log(value);
              setName(value)
            }
          } catch (error) {
            setName('User')
             console.log('error in retriving data on line 17 in heading component', error)
          }
      };
    
    useEffect(()=>{
        // if(mount==0){
            retrieveData();
            // setMount(1);
        // }

    },[])
    return (
        // <View style={styles.titleContainer}>
        //         <Text style={styles.titleHeading}>{props.name}</Text>
        // </View>
        <Appbar.Header style={{height: 80 , backgroundColor:"#6A6DB0" , elevation: 5, paddingRight: 10, width: '100%'}} >
       <Appbar.Content color='white' title={props.name}/>
       <Avatar.Text backgroundColor='#bdb2ff' size={50} label={name[0]} />      
        
    </Appbar.Header>
    );
}

const styles=StyleSheet.create({
    titleContainer:{height: 80 , backgroundColor:"#6A6DB0" , elevation: 5, paddingRight: 10, width: '100%'},

    titleHeading:{

        fontSize: 30,
            // textAlign: "center",
            color: 'white',
            margin: 15

    },
    
})