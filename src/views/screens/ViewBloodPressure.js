import React,{useEffect,useState} from "react";
import {View,StyleSheet,Text,Image, SafeAreaView, ScrollView,Button, TextInput, FlatList, TouchableOpacity, ImageBackground} from "react-native";
import {viewBloodPressureRecord} from "../connectionToDB/tracker"

export default ViewBloodPressure= function ({navigation}){
    const [mount,setMount]=useState(0)
    const [data,setData]=useState([]);//[{s:120,d:80},{s:133,d:90},{s:100,d:70},{s:120,d:99},{s:170,d:100}];

    const loadDataOnlyOnce = async() => {
       // alert("loadDataOnlyOnce");
         const d= await viewBloodPressureRecord();
        console.log(d)
        console.log(d[0])
        setData(d);
        
      };
      
          useEffect(() => {
            if(mount===0){
              loadDataOnlyOnce(); 
              setMount((oldVal)=>oldVal++);
            }
          },[mount]);
    

    return(
        <SafeAreaView style={styles.container1}>
           <View style={styles.textView}>
                <Text style={styles.text}>
                    Blood Pressure
                </Text>
            </View>
           
            <FlatList style={styles.scroll}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item})=>{
                return(
                   
                    <TouchableOpacity style={styles.instanceContainer}
                    onPress={()=>{navigation.navigate("AddBloodPressure",{"id":item._id})}}>
                         <ImageBackground source={require("../../files/Images/bp.jpg")} style={styles.instanceImage}>
                        
     
                            <View style={styles.readingsContainer}>
                                <Text style={styles.sText}>{item.systolic}</Text>
                                <Text style={styles.dText}>{item.disystolic}</Text>
                            </View>

                            </ImageBackground>  
                    </TouchableOpacity>
                                 
                    )
            }}
            >

            </FlatList>

           
        <TouchableOpacity style={styles.addButton}
        onPress={()=>{
            navigation.navigate("AddBloodPressure");
        }}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
            
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    container1:{
        flex:1,
        
        backgroundColor:"#343A40",
        flexDirection:"column"
    },
    textView:{     
        flex:0.1,
        backgroundColor:"#C3C5BD",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        color:"#212529",
        fontWeight:"bold"
    },
    scroll:{
        flex:0.9,
        backgroundColor:"white"
    },
    instanceContainer:{
        margin:"7%",
        height:200
    },
    instanceImage:{
        width:"100%",
        height:"100%",
        opacity:0.4,
        backgroundColor:"#A1A497",
        backgroundColor:'rgba(0,0,0,0.6)',
        overflow:"hidden"
    }, 
    readingsContainer:
    {
        width:"100%",
        height:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
       
      
    },
    sText:{
        flex:1,
        //height:"100%",
        backgroundColor:"#A1A497",
        height:"80%",
        margin:"2%",
        textAlignVertical:"center",
        textAlign:"center",
        borderWidth:4,
        borderRadius:50,
        fontSize:40,
        fontWeight:"bold",
        color:"black"
        
      
    },
    dText:{flex:1,
        backgroundColor:"#A1A497",
        height:"50%",
        margin:"2%",
        textAlignVertical:"center",
        textAlign:"center",
        borderWidth:4,
        borderRadius:25,
        fontSize:20,
        fontWeight:"bold",
        opacity:1,
        color:"black"
        },
        addButton:{
            position:"absolute",  
            bottom:"5%",
            right:"4%",
            borderRadius:100,
            backgroundColor:"#6B705C",
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
        
    })
    

