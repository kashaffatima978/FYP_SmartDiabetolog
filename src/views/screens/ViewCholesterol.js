import React from "react";
import {View,StyleSheet, SafeAreaView,Text,FlatList,TouchableOpacity, ImageBackground} from "react-native";

export default function ViewCholesterol({navigation}){
    const data=[{ldl:123,hdl:125},{ldl:23,hdl:129},{ldl:223,hdl:15},{ldl:173,hdl:40},{ldl:145,hdl:165},{ldl:123,hdl:111}];
    return(
        <SafeAreaView style={styles.container}>

              <View style={styles.textView}>
                <Text style={styles.text}>
                    Cholesterol
                </Text>
            </View>

            <FlatList style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item})=>{
                return(
                   
                    <TouchableOpacity style={styles.flatlistItemContainer}>
                        <View style={styles.hdlContainer}>
                            <ImageBackground source={require("../../files/Images/Cholesterol.png")} resizeMode="cover"
                            style={{opacity:0.4}}>
                            <Text style={styles.hdlText}>{item.hdl}</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.ldlContainer}>
                            <Text style={styles.ldlText}>{item.ldl}</Text>
                        </View>
                    </TouchableOpacity>
                                 
                    )
            }}
            >
            </FlatList>

        <TouchableOpacity style={styles.addButton}
        onPress={()=>{
            navigation.navigate("AddCholesterol");
        }}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>


        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#CB997E",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#FFE8D6",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        color:"#4A3C31",
        fontWeight:"bold"
    },
    flatlist:{
        flex:0.9,
        backgroundColor:"white"
    },
    flatlistItemContainer:{
        flexDirection:"column",
        alignItems:"flex-start",
        backgroundColor:"#FFE8D6",
        margin:"7%",
        height:160
    },
    hdlContainer:{
        width:"60%",
        height:"60%",
        backgroundColor:"#DDBEA9",
        marginTop:"5%"
    },
    ldlContainer:{
        width:"40%",
        height:"40%",
        backgroundColor:"#DDBEA9",
        alignSelf:"flex-end",
        opacity:0.7
    },
    hdlText:{
        width:"100%",
        height:"100%",
        color:"black",
        fontSize:50,
        textAlignVertical:"center",
        textAlign:"center",
        fontWeight:"bold"
 
    },
    ldlText:{
        width:"100%",
        height:"100%",
        color:"#4A3C31",
        fontSize:25,
        fontWeight:"bold",
        textAlignVertical:"center",
        textAlign:"center"
    },    
    addButton:{
        position:"absolute",  
        bottom:"5%",
        right:"4%",
        borderRadius:100,
        backgroundColor:"#CB997E",
        width:"20%",
        height:"10%",
        justifyContent:"center",
        alignItems:"center",
    },
    addButtonText:{
        fontSize:40,
        fontWeight:"bold",
        color:"#212529"
    }

});