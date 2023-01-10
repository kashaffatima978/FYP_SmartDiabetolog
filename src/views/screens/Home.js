import React from "react";
import {View,Text, Button,SafeAreaView,StatusBar,ScrollView,StyleSheet, TouchableOpacity} from "react-native"
import colors from "../../files/Colors";
import generalStyles from "../../files/generalStyle";

export default function Home({navigation}){
    return(
        <SafeAreaView style={generalStyles.container}>
            <StatusBar backgroundColor="#495057" barStyle="light-content"></StatusBar>
            <ScrollView style={styles.scroll}>
                <View style={styles.greetingView}>
                    <Text style={styles.greetingText}></Text>
                </View>

                {/* view for containing info about sugar exercise and carbs*/}
                <View style={styles.infoView}>
                    <View style={styles.infoInstance}>
                        <Text style={{fontWeight:"bold", color:"#212529"}}>Carbs Taken</Text>
                        <Text style={{color:"#212529"}}>130</Text>
                        </View>
                    <View style={styles.infoInstance}>
                        <Text style={{fontWeight:"bold", color:"#212529"}}>Average Glucose</Text>
                        <Text style={{color:"#212529"}}>200</Text>
                    </View>
                    <View style={styles.infoInstance}>
                        <Text style={{fontWeight:"bold", color:"#212529"}}>Carbs Burnt</Text>
                        <Text style={{color:"#212529"}}>100</Text>
                    </View>

                </View>

                <View style={styles.container1}>
                    <TouchableOpacity style={[styles.container1box,{backgroundColor:"#DDBEA9"}]}
                    onPress={()=>{navigation.navigate("DietFirstMain")}}>
                    <View >
                        <Text style={styles.container1text}>diet</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container1box,{backgroundColor:"#FFE8D6"}]}>
                    <View >
                        <Text style={styles.container1text}>exercise</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.container2]}>
                    <TouchableOpacity style={[styles.container2box,{backgroundColor:colors.l4blue}]}
                    onPress={()=>{navigation.navigate("Tracker")}}>
                    <View >
                        <Text style={[styles.container1text,{fontSize:40}]}>tracker</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container3}>
                    <TouchableOpacity style={[styles.container3box,{backgroundColor:"#A1A497"}]}
                    onPress={()=>{navigation.navigate("MedicationMain")}}>
                    <View>
                        <Text style={styles.container3text}>medication</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container3box,{backgroundColor:"#898D7D"}]}
                    onPress={()=>{navigation.navigate('HomeScreen')}}>
                    <View>
                        <Text style={styles.container3text}>retinopethy</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container3box,{backgroundColor:"#A5A58D"}]}
                    onPress={()=>{navigation.navigate('AllergicReactionMain')}}>
                    <View>
                        <Text style={styles.container3text}>allergic reaction </Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container4}>
                    <TouchableOpacity style={[styles.container4box,{backgroundColor:"#DDBEA9"}]}>
                    <View>
                        <Text style={styles.container4text}>diabetic Information</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container4box,{backgroundColor:"#FFE8D6"}]}
                    onPress={()=>{navigation.navigate("Loading")}}>
                    <View>
                        <Text style={styles.container4text}>chatbox</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                


            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    scroll:{
        borderWidth:0
    },
    greetingView:{
        backgroundColor:"#898D7D"
    },
    greetingText:{},
    infoView:{
        flexDirection:"row",
        backgroundColor:"#DEE2E6",
        height:110,
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    infoInstance:{
        width:"23%",
        height:"75%",
        borderColor:"#6C757D",
        borderWidth:2,
        borderRadius:100,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#ADB5BD"
    },
    container1:{
        height:130,
        flexDirection:"row",
        
    },
    container1box:{
        flex:1,
        borderWidth:5,
        borderColor:"#CB997E",
        margin:"3%",
        alignItems:"center",
        justifyContent:"center"
    },
    container1text:{
        fontSize:25,
        textTransform:"capitalize",
        color:"#212529",
        fontWeight:"bold",
        textAlign:"center",
    },
    container2:{
        height:150,
        flexDirection:"row"
    },
    container2box:{
        flex:1,
        borderWidth:5,
        margin:"3%",
        alignItems:"center",
        justifyContent:"center",
        borderColor:colors.l7blue
    },
    container3:{
        height:120,
        flexDirection:"row"
    },
    container3box:{
        flex:1,
        borderWidth:5,
        margin:"3%",
        alignItems:"center",
        justifyContent:"center",
        borderColor:"#6B705C"
    },
    container3text:{
        fontSize:15,
        textTransform:"capitalize",
        color:"#212529",
        fontWeight:"bold",
        textAlign:"center",
    },
    container4:{
        height:150,
        flexDirection:"row"
    },
    container4box:{
        flex:1,
        borderWidth:5,
        margin:"3%",
        borderColor:"#CB997E",
        alignItems:"center",
        justifyContent:"center",
    },
    container4text:{
        fontSize:20,
        textTransform:"capitalize",
        color:"#212529",
        fontWeight:"bold",
        textAlign:"center",
    },
    

})