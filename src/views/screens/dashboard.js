import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import Loader from '../components/loader';
import { Avatar, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { Heading } from "../components/Heading";
import Fab from '../components/Fab';
import { addPrescription, viewPrescriptions } from "../connectionToDB/prescription"
import {
    viewAllQuestions
} from "../connectionToDB/dashboard"
import { MyButton } from "../components/button";
import { setShoulders } from "../../redux/reduxActions";



export default function Dashboard({ navigation }) {
    const [title, setTitle] = useState("Prescription1")
    const [prescriptions, setPrescriptions] = useState([])
    const [id, setID] = useState("")
    const [mount, setMount] = useState(0)
    const [loader, setLoader] = useState(false)
    const[questions,setQuestions]=useState([])
    const[allQuestions,setAllQuestions]=useState([])
    const [search,setSearch]=useState("")

    const loadDataOnlyOnce = async () => {
        viewAllQuestions()
            .then((res) => {
                console.log(res)
               setLoader(false)
                setQuestions(res)
                setAllQuestions(res)
                
            })
            .catch(err => { console.log("Error in viewAllQuestions in Dashboard ", err) })
    };
    useEffect(() => {
        if (mount === 0) {
            setLoader(true)
            loadDataOnlyOnce();
            setMount((oldVal) => oldVal++);
        }
    }, [mount]);

    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loader}></Loader>
            <View style={{ marginHorizontal: "5%", marginVertical: "2%" }}>
                <TextInput placeholder="search" value={search} onChangeText={text=>{
                    setSearch(text);
                    console.log("search=",text)
                    
                        newArray=(allQuestions.filter(val=>( ((val.title).toLowerCase()).includes((text.toLowerCase())))))
                        console.log(newArray)
                        setQuestions(newArray)
                 
                }
                    }></TextInput>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ color: "black", fontSize: 20 }}>Search Results</Text>
                        <Text style={{ color: "black" }}>{!questions?0:questions.length} results</Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("AskQuestion") }}
                        activeOpacity={0.5} style={styles.touchOpacity}>
                        <Text style={styles.text}>Ask Question</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <FlatList style={styles.flatlist}
                showsVerticalScrollIndicator={false}
                data={questions}
                renderItem={({ item }) => {
                    return (

                        <TouchableOpacity style={styles.flatlistItemContainer} onPress={() => { navigation.navigate("ViewQuestionDetails",{"id":item._id}) }}>
                            <Card style={{ backgroundColor: '#E2E4FF', width: '100%', marginBottom: 10,height:"100%",marginVertical:"3%" }}>
                                <View style={{ backgroundColor: '#6A6DB0', flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                                    {/* <Text style={styles.titleText}>Date: {(item.createdAt).slice(0, 10)}</Text> */}
                                    {/* <Text style={styles.titleText}>Time: {item.creationTime}</Text> */}
                                </View>


                                <View style={{ margin: 10 }}>
                                    <Card.Content style={{ flexDirection: "row",justifyContent:"center",alignItems:"center",padding:"1%", }}>
                                        <Paragraph style={[styles.para, { fontWeight: "bold" }]}>Title: </Paragraph>
                                        <Paragraph style={{textAlign:"justify"}}>{item.title}</Paragraph>
                                    </Card.Content>
                                </View>
                            </Card>
                        </TouchableOpacity>

                    )
                }}
            >
            </FlatList>
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
        marginHorizontal: "5%",
        height: 200
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
    titleText: {
        color: 'white',
        fontSize: 15
    },
    para: {
        fontSize: 16,
        // fontWeight: "bold"
    }, touchOpacity: {
        backgroundColor: "#6A6DB0",
        width: "40%",
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
        alignSelf: "center"

    },
    text: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 1,
        // fontWeight: "bold"

    }


});