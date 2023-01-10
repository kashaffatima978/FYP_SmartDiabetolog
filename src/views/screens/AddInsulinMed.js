import React from "react";
import {View,StyleSheet,SafeAreaView,Text,ScrollView, TouchableOpacity} from "react-native";
import { Input } from "../components/input";
import NewDropDown from "../components/NewDropDown"
import NewPicker from "../components/NewPicker";

export default function AddInsulinMedicine({navigation}){
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
            <Text style={styles.text}>Add Insulin Medicine</Text>
        </View>

        <ScrollView style={styles.container2}
        showsVerticalScrollIndicator={false}>
           <View style={styles.inputContainer}>
           <NewDropDown  dropdownlist={["long acting insulin","fast acting insulin"]} defaultValue="select insulin type"
               title="Type" />
               </View>

            <View style={styles.inputContainer}>
                <Input label="Name"
                placeholder="Enter insulin Name"
                inputBackground="white"
                textColor="black"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Senstivity"
                placeholder="Enter insulin senstivity"
                inputBackground="white"
                textColor="black"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Dosage"
                placeholder="Enter carb ratio"
                inputBackground="white"
                textColor="black"/>
            </View>

            <TouchableOpacity style={styles.saveButtonContainer}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

        

        </ScrollView>

    </SafeAreaView>
    )
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#DDBEA9",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        color:"black",
        fontWeight:"bold"
    },
    container2:{
        flex:0.9,
        backgroundColor:"white"
    },
    inputContainer:{
        backgroundColor:"#DDBEA9",
        marginVertical:"3%",
        marginHorizontal:"3%",
        padding:"2%"
    },
    saveButtonContainer:{
        marginVertical:"3%",
        marginHorizontal:"3%",
        backgroundColor:"#DDBEA9",
        width:"30%",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end", 
        borderRadius:30,
    },
    saveButtonText:{
        color:"black",
        fontWeight:"bold",
        fontSize:16
    }

})