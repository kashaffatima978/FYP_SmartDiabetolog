import React from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity, SafeAreaView, FlatList, ImageBackground} from "react-native";
import colors from "../../files/Colors";
import { MainHeading } from "../components/mainHeading";

export default function FoodAllergicReactions({navigation}){
    const diabetes=[{name: "panadol", unit: 250, dosagePerDay: "2", time: ["10:45"], }, {name: "carpol", unit: 250, dosagePerDay: "2", time: ["10:45", "17:45"], }];
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Food Allergic Reaction</Text>


            <FlatList style={styles.scroll}
            showsVerticalScrollIndicator={false}
            data={diabetes}
            renderItem={({item})=>{
                return(
                   
                    <TouchableOpacity style={styles.instanceContainer}>
                            <View style={styles.readingsContainer}>
                                <Text style={styles.infoText}>Name: {item.name}</Text>
                                <Text style={styles.infoText}>Unit: {item.unit}</Text>
                                <Text style={styles.infoText}>Dosage: {item.dosagePerDay}</Text>
                                <Text style={styles.infoText}>Time: {item.time}</Text>
                            </View>
                    </TouchableOpacity>
                                 
                    )
            }}
            >

            </FlatList>
            <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate("AddFoodAllergicReactions");}}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        </SafeAreaView>
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
        margin: 15
    },
    text:{
        fontSize:25,
        color:"black",
        fontWeight:"bold",
        backgroundColor:"#b2e7ed",
        height:70,
        textAlign: "center",
        textAlignVertical: "center"
    },
    
    container1:{
        flex:1,
        
        backgroundColor:"#343A40",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#C3C5BD",
        justifyContent:"center",
        alignItems:"center",
        fontSize: 15,
        
    },
    scroll:{
        flex:0.9,
        backgroundColor:"white"
    },
    instanceContainer:{
        height:150,
        marginTop: 10,
        borderWidth:2,
        borderColor: "#4A3C31",
        // backgroundColor:"#f4d6c1"
    },
    readingsContainer:
    {
        width:"100%",
        height:"100%",
        flexDirection:"column",
        backgroundColor: "#f4d6c1"
    },
    infoText:{
        height: 30,
        fontSize: 15,
        textAlign: "left",
        textAlign: "center",
        textAlignVertical: "center"
    },
        addButton:{
            position:"absolute",  
            bottom:"5%",
            right:"4%",
            borderRadius:100,
            backgroundColor:"#b2e7ed",
            width:"20%",
            height:"10%",
            justifyContent:"center",
            alignItems:"center",
        },
        addButtonText:{
            fontSize:40,
            fontWeight:"bold",
            color:"black"
        },        

});