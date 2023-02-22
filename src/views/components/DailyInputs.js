import React, { useState } from "react"
import {View,Text,StyleSheet,Image} from "react-native"

const DailyInputs=({colorbg, icon, data, dataType, dataColor, dataUnit  })=>{
    return(
        <View style={{
            backgroundColor: colorbg,
            width: 150, 
            height:190, 
            borderRadius: 20, 
            marginTop: 20, 
            padding: 10,
            marginRight: 15
        }}>
                    <Image source={icon} style={styles.icon}/>
                    <Text style={[styles.smallText,{color:dataColor}]}>{dataType}</Text>
                    <Text style={{fontSize: 25, marginTop: 15 }}>{data} </Text>
                    <Text style={{marginTop: 25}}>{dataUnit}</Text>
        </View> 
    )
};

const styles=StyleSheet.create({
    // container:,
    text:{
        textAlign: "center",
        marginTop: 15,
        fontWeight: 'bold',
     
     },
     smallText:{
         // alignSelf: "center",
         marginTop: 5,
         fontSize: 16
 
     },
     icon:{
        width: 30,
        height: 30
      }

});


export default DailyInputs;