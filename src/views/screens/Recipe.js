import React, { useEffect, useState } from "react";
import {View,StyleSheet,Text, Image, FlatList, } from "react-native";
import { IP } from "../../files/information";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { block } from "react-native-reanimated";
import Loader from "../components/loader";


export const Recipe=({navigation, route})=>{
    const[name, setName]=useState(0)
    const[imgURL, setImg]=useState(0)
    const[ingredient, setIngredient]=useState([])
    const[method, setMethod]=useState([])
    const[prepTime, setPrepTime]=useState(0)
    const[cookTime, setCookTime]=useState(0)
    const [mount, setMount] = useState(0)
    const [loader, setLoader] = useState(false)

    
    const ip=`http://${IP}`
    
    useEffect(() => {
        setLoader(true)
        if(mount==0){
            axios.post(ip+':8000/getRecipe', {'name': route.params.name}).
            then((res)=>{
                setImg(route.params.img)
                console.log(res.data)
                setName(res.data.name)
                setPrepTime(res.data.preptime)
                setCookTime(res.data.cooktime)
                setMethod(res.data.method)
                setIngredient(res.data.ingredient )
            })
            .catch((err)=>console.log(err))
            setMount(1)
        }
        setLoader(false)
    }, [mount]);

    

    
    return (
            <ScrollView style={styles.container}>
                <Loader visible={loader}></Loader>
            {prepTime!=0?
            <>
                <Image source ={{uri: imgURL}} style={styles.image}/>
                <View style={{flexDirection: "row", margin: 5, alignSelf: "flex-end"}}>
                    <TouchableOpacity><Avatar.Icon icon="heart" size={45}  backgroundColor="#6A6DB0"/></TouchableOpacity>
                </View>
                <Text style={styles.title}>{name}</Text>
                <View style={{ margin: 15, justifyContent: "flex-end"}}>
                    <Text style={styles.serve}>{prepTime}</Text>
                    <Text style={styles.serve}>{cookTime}</Text>
                </View>
                <View style={{padding: 10, backgroundColor:'white', marginLeft: 10, marginRight: 10, marginBottom: 25}} >
                    <Text style={styles.title}>Ingredients</Text>
                    {ingredient.map((element, index)=>{
                        return(
                            <View style={{width: '90%', height: 50, borderBottomWidth: 1, borderColor:'lightgrey'}}>
                                <Text style={styles.ingre}>{element}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{padding: 10, backgroundColor:'white', marginLeft: 10, marginRight: 10, marginBottom: 10}} >
                    <Text style={styles.title}>Method</Text>
                    {method.map((element, index)=>{
                        return(
                            <View style={{width: '90%', borderBottomWidth: 1, borderColor:'lightgrey'}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Step {index+1}</Text>
                                <Text style={styles.method}>{element}</Text>
                            </View>
                        )
                    })}
                </View>
            </>
            :null

            }
            </ScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        backgroundColor: 'lavender'
        
    },
    image:{
        width: '100%',
        height: 250
    },
    title:{
        fontSize: 30,
        textAlign: "center",
        color: 'black',
    },
    serve:{
        color: 'black',
        fontSize: 17
    },
    ingre:{
        fontSize: 15,
        justifyContent: "center"
    },
    method:{
        padding: 5,
        fontSize:15
    }
});