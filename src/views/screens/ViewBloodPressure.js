import React,{useEffect,useState} from "react";
import {View,StyleSheet,Text,Image, SafeAreaView, ScrollView,Button, TextInput, FlatList, TouchableOpacity, ImageBackground} from "react-native";
import {viewBloodPressureRecord} from "../connectionToDB/trackerBloodPressure"
import Loader from '../components/loader';
import { Heading } from "../components/Heading";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Fab from '../components/Fab';


export default ViewBloodPressure= function ({navigation}){
    const [mount,setMount]=useState(0)
    const [data,setData]=useState([]);//[{s:120,d:80},{s:133,d:90},{s:100,d:70},{s:120,d:99},{s:170,d:100}];

    const [loader,setLoader]=useState(false)
    const loadDataOnlyOnce = async() => {
       // alert("loadDataOnlyOnce"); 
       const d= await viewBloodPressureRecord();
       setTimeout(()=>{setLoader(false)},1000)   
        console.log(d)
        console.log(d[0])
        setData(d);
        
        
      };
      
          useEffect(() => {
          
            if(mount===0){
                setLoader(true)
              loadDataOnlyOnce(); 
              setMount((oldVal)=>oldVal++);
            }
          },[mount]);
          

    return(
        <SafeAreaView style={styles.container1}>
            <Loader visible={loader}></Loader>
            <Heading name="Blood Pressure"/>
           
            <FlatList style={styles.scroll}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item})=>{
                return(
                   
                    <TouchableOpacity style={styles.instanceContainer}
                    onPress={()=>{navigation.replace("AddBloodPressure",{"id":item._id})}}>
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10}}>
                                <View style={{backgroundColor:'#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between'}}>
                                    <Text style={styles.titleText}>Date: {(item.createdAt).slice(0,10)}</Text>
                                    {/* <Text style={styles.titleText}>Time: {item.creationTime}</Text> */}
                                </View>
                             

                                <View style={{margin: 10}}>
                                        <Card.Content>
                                            {/* <Paragraph style={[styles.para,{fontWeight: "bold"}]}>Measured:</Paragraph> */}
                                            <Paragraph style={styles.para}>Systolic BP:       {item.systolic} mmHg </Paragraph>
                                            <Paragraph style={styles.para}>Diasystolic BP:  {item.disystolic} mmHg</Paragraph>
                                            {/* <Paragraph style={styles.para}></Paragraph> */}
                                        </Card.Content>
                                        <Card.Content style={{flexDirection: "row"}}>
                                            <Paragraph style={[styles.para, {fontWeight: "bold"}]}>Notes: </Paragraph>
                                            <Paragraph>{item.description}</Paragraph>
                                            
                                        
                                        </Card.Content>
                                    </View>
                            </Card>
                    </TouchableOpacity>
                                 
                    )
            }}
            >

            </FlatList>

           
        <Fab onPress={()=>{
            navigation.replace("AddBloodPressure");
        }}/>
            
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    container1:{
        flex:1,
        
        backgroundColor:"white",
        // flexDirection:"column"
    },
    textView:{     
        // flex:0.1,
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
        // margin:"7%",
        // height:200
        margin: 10
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
        ,titleText:{
            color: 'white',
            fontSize: 15
        },
        para:{
            fontSize: 16,
            // fontWeight: "bold"
        }
        
    })
    
