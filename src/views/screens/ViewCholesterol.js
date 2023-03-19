import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { viewCholesterolRecord } from "../connectionToDB/trackerCholestrol"
import Loader from '../components/loader';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Heading } from "../components/Heading";
import Fab from '../components/Fab';


export default function ViewCholesterol({ navigation }) {
    const [cholesterolRecord, setCholesterolRecord] = useState([])
    const [mount, setMount] = useState(0)
    const [loader, setLoader] = useState(false)
    const loadDataOnlyOnce = async () => {
        // alert("loadDataOnlyOnce");
        viewCholesterolRecord()
            .then((res) => {
                console.log(res)
                setTimeout(() => { setLoader(false) }, 1000)
                setCholesterolRecord(res)

                console.log(cholesterolRecord)
            })
            .catch(err => { console.log("Error in loadDataOnlyOnce in viewCholesterol ", err) })


    };
    useEffect(() => {
        if (mount === 0) {
            setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);


    const data = [{ ldl: 123, hdl: 125 }, { ldl: 23, hdl: 129 }, { ldl: 223, hdl: 15 }, { ldl: 173, hdl: 40 }, { ldl: 145, hdl: 165 }, { ldl: 123, hdl: 111 }];
    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader}></Loader>
            <Heading name="Cholestrol"/>

            <FlatList style={styles.flatlist}
                showsVerticalScrollIndicator={false}
                data={cholesterolRecord}
                renderItem={({ item }) => {
                    return (

                        <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.replace("AddCholesterol", { "id": item._id }) }}>
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10}}>
                                <View style={{backgroundColor:'#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between'}}>
                                    <Text style={styles.titleText}>Date: {(item.createdAt).slice(0,10)}</Text>
                                    {/* <Text style={styles.titleText}>Time: {item.creationTime}</Text> */}
                                </View>
                             

                                <View style={{margin: 10}}>
                                        <Card.Content>
                                            {/* <Paragraph style={[styles.para,{fontWeight: "bold"}]}>Measured:</Paragraph> */}
                                            <Paragraph style={styles.para}>LDL:{'\t'}{item.ldl} mmHg </Paragraph>
                                            <Paragraph style={styles.para}>HDL:{'\t'}{item.hdl} mmHg</Paragraph>
                                            <Paragraph style={styles.para}>Triglycerides:{'\t'}{item.triglycerides} mmHg</Paragraph>
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
                navigation.replace("AddCholesterol");
            }}/>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    textView: {
        flex: 0.1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold"
    },
    flatlist: {
        flex: 0.9,
        backgroundColor: "white"
    },
    flatlistItemContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "white",
        margin: "7%",
        height: 160
    },
    hdlContainer: {
        width: "60%",
        height: "60%",
        backgroundColor: "white",
        marginTop: "5%"
    },
    ldlContainer: {
        width: "40%",
        height: "40%",
        backgroundColor: "#DDBEA9",
        alignSelf: "flex-end",
        opacity: 0.7
    },
    hdlText: {
        width: "100%",
        height: "100%",
        color: "black",
        fontSize: 50,
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: "bold"

    },
    ldlText: {
        width: "100%",
        height: "100%",
        color: "#4A3C31",
        fontSize: 25,
        fontWeight: "bold",
        textAlignVertical: "center",
        textAlign: "center"
    },
    addButton: {
        position: "absolute",
        bottom: "5%",
        right: "4%",
        borderRadius: 100,
        backgroundColor: "#CB997E",
        width: "20%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#212529"
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