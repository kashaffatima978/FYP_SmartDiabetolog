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
                            {/* <View style={styles.box1}>
                                <Text style={styles.concentration}>{item.concentration} </Text>

                            </View>
                            <View style={styles.box2}>
                                <Text style={styles.time}>{item.creationTime}</Text>
                                <Text style={styles.event}>{item.event}</Text>
                            </View> */}
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10}}>

                                <Card.Content>
                                <Title>Blood sugar level: {item.concentration}</Title>
                                {/* <Card.Title subtitle={item.event} /> */}
                                <Paragraph>Event: {item.event}</Paragraph>
                                <Paragraph>Description: {item.description}</Paragraph>
                                </Card.Content>
                                </Card>
                        </TouchableOpacity>
                    );
                }}>
            </FlatList>

            <Fab onPress={()=>{
                navigation.replace("AddBloodSugar");
            }}/>

            {/* <Button title="colors" onPress={()=>{navigation.navigate("ColorPalette")}}></Button> */}
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
    }

});