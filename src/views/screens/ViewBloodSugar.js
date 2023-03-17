import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import generalStyles from "../../files/generalStyle";
import { MainHeading } from "../components/mainHeading";
import colors from "../../files/Colors";
import { viewBloodSugarRecord } from "../connectionToDB/trackerBloodSugar"
import Loader from '../components/loader';
import {Heading} from '../components/Heading'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Fab from '../components/Fab';


export default ViewBloodSugar = ({ navigation }) => {
    const [mount, setMount] = useState(0)
    const [loader, setLoader] = useState(false)
    const [sugarData, setSugarData] = useState([]);//[{s:120,d:80},{s:133,d:90},{s:100,d:70},{s:120,d:99},{s:170,d:100}];

    const loadDataOnlyOnce = async () => {
        // alert("loadDataOnlyOnce");
        viewBloodSugarRecord()
            .then((res) => {
                console.log(res)
                console.log(res[0])
                setSugarData(res);
                setTimeout(() => { setLoader(false) }, 1000)
                console.log(sugarData)
            })
            .catch(err => { console.log("Error in loadDataOnlyOnce in viewBloodSugar ", err) })


    };
    useEffect(() => {
        if (mount === 0) {
            setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);


    return (
        <SafeAreaView style={{flex:1}}>
            <Loader visible={loader}></Loader>
            <Heading name="Blood Sugar"/>
            
            <FlatList
                style={[generalStyles.spacing, styles.flatlist]}
                data={sugarData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: "15%" }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.flatlistView} onPress={() => { navigation.replace("AddBloodSugar", { "id": item._id }) }}>
    
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10}}>
                                <View style={{backgroundColor:'#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between'}}>
                                    <Text style={styles.titleText}>Date: {item.creationDate}</Text>
                                    <Text style={styles.titleText}>Time: {item.creationTime}</Text>
                                </View>
                             

                                <View style={{margin: 10}}>
                                    <Card.Content style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Paragraph style={[styles.para,{fontWeight: "bold"}]}>Measured:</Paragraph>
                                        <Paragraph style={styles.para}>{item.event} </Paragraph>
                                        <Paragraph style={styles.para}>{item.concentration} {item.unit}</Paragraph>
                                        {/* <Paragraph style={styles.para}></Paragraph> */}
                                    </Card.Content>
                                    <Card.Content style={{flexDirection: "row"}}>
                                        <Paragraph style={[styles.para, {fontWeight: "bold"}]}>Notes: </Paragraph>
                                        <Paragraph>{item.description}</Paragraph>
                                        
                                    
                                    </Card.Content>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    );
                }}>
            </FlatList>

            <Fab onPress={()=>{
                navigation.replace("AddBloodSugar");
            }}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        flex: 0.9,
        marginBottom: "2%",
    },
    flatlistView: {
        // borderWidth: 2,
        // flexDirection: "row",
        // margin: "1%",
        // height: 150,
        // borderColor: '#86C0DD'

    },
    box1: {
        backgroundColor: colors.blue3,
        flex: 1,
        borderColor: colors.blue5,
        borderWidth: 4,
        height: "90%",
        marginRight: "2%",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5
    },
    box2: {
        flex: 1,
        backgroundColor: colors.blue2,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    concentration: {
        fontSize: 50,
        fontWeight: "bold",
        color: colors.darkGreyBlue

    },
    event: {
        fontSize: 14,
        textTransform: "capitalize",
        color: colors.darkGreyBlue,
        fontWeight: "bold"
    },
    time: {
        fontSize: 20,
        color: colors.darkGreyBlue,
        fontWeight: "bold"

    },
    addButton: {
        position: "absolute",
        bottom: "5%",
        right: "4%",
        borderRadius: 100,
        backgroundColor: colors.headingBlue,
        width: "20%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.darkGreyBlue
    },
    titleText:{
        color: 'white',
        fontSize: 15
    },
    para:{
        fontSize: 16,
        // fontWeight: "bold"
    }

});