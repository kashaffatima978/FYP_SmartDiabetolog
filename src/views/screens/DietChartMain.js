import React, { useState, useEffect } from 'react';
import colors from "../../files/Colors";
import { CircularProgress } from 'react-native-circular-progress';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  Touchable,
  Modal,
  TouchableOpacity,
  Animated
} from 'react-native';

import PageHeading from "../components/PageHeading"
import { Heading } from '../components/Heading';
import axios from 'axios';
// import PageScroll from '../components/PageScroll';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealCard from '../components/MealDishCard';
import Fab from '../components/Fab';




export default DietChartMain = function ({navigation}) {
  const Tab = createMaterialTopTabNavigator();
  const[consumedCalories, setCosumedCalories]= useState(500)
  const[totalCalories, setTotalCalories]= useState(1200)
  const[breakfast, setBreakfast]= useState([])
  const[snack1, setSnack1]= useState([])
  const[lunch, setLunch]= useState([])
  const[snack2, setSnack2]= useState([])
  const[dinner, setDinner]= useState([])
  const[gotDiet, setGotDiet]= useState(false)
   
  const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
  const animatedProgress = new Animated.Value((consumedCalories/totalCalories)*100);

    useEffect(() => {
        Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,

        }).start();
    }, [animatedProgress, consumedCalories]);

    
    useEffect(()=>{
      if(gotDiet==false){
        axios.post('http://192.168.1.10:8000/dietPlan', totalCalories)
        .then((response)=>{
          setBreakfast(response.data.breakfast)
          setSnack1(response.data.snack1)
          setLunch(response.data.lunch)
          setSnack2(response.data.snack2)
          setDinner(response.data.dinner)
          setGotDiet(true)
      })
      .catch((err)=>{
        console.log(err)
      })
      }
    },[])

    const addMeal = ()=>{
      navigation.navigate('AddMeal')
    }

  return (
    <SafeAreaView style={styles.safeAreaCont}>
      <Heading name="Diet Plan"/>

      <View style={styles.con}>
                <AnimatedCircularProgress
                    size={200}
                    width={8}
                    fill={animatedProgress}
                    tintColor="#6A6DB0"
                    backgroundColor="#E2E4FF"
                    rotation={0}
                    lineCap="round"
                >
                    {() => (
                    
                        <Image
                            style={styles.image}
                            source={require('../../../assets/Images/breakfast.jpg')}
                            resizeMode="center"
                            style={{width: 150, height:150}}
                        />
                    )}
                </AnimatedCircularProgress>
                <Text style={styles.text}>Calories: {consumedCalories} kcl / {totalCalories} kcl</Text> 
               
            </View>
            
            <Tab.Navigator >
              <Tab.Screen name="breakfast" component={()=>{
                return(
                  <View style={{backgroundColor: '#E2E4FF', flex:1}}>
                    <MealCard title ={breakfast[0]} image={breakfast[5]} calories={breakfast[1]} carbs={breakfast[2]} sugar={breakfast[3]} time={breakfast[4]}/>
                  </View>
                )  
              }} />

            <Tab.Screen name="lunch" component={()=>{
                return(
                  <View style={{backgroundColor: '#E2E4FF', flex:1}}>
                    <MealCard title ={lunch[0]}  image={lunch[5]} calories={lunch[1]} carbs={lunch[2]} sugar={lunch[3]} time={lunch[4]}/>
                  </View>
                )  
              }} />

            <Tab.Screen name="snacks" component={()=>{
                return(
                  <ScrollView style={{backgroundColor: '#E2E4FF', flex:1}}>
                    <MealCard title ={snack1[0]} image={snack1[5]} calories={snack1[1]} carbs={snack1[2]} sugar={snack1[3]} time={snack1[4]}/>
                    <MealCard title ={snack2[0]} image={snack2[5]} calories={snack2[1]} carbs={snack2[2]} sugar={snack2[3]} time={snack2[4]}/>
                  </ScrollView>
                )  
              }} />

            <Tab.Screen name="dinner" component={()=>{
                return(
                  <View style={{backgroundColor: '#E2E4FF', flex:1}}>
                    <MealCard title ={dinner[0]} image={dinner[5]} calories={dinner[1]} carbs={dinner[2]} sugar={dinner[3]} time={dinner[4]}/>
                  </View>
                )  
              }} />
            </Tab.Navigator >
    
            <Fab onPress={addMeal}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaCont: {
    flex: 1,
    backgroundColor: 'white',
  },
  text:{
    textAlign: "center",
    // marginTop: 15,
    fontWeight: 'bold',
    fontSize: 15
 
 },
  con: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',mar
    // marginTop: 10
  },
  
  scrollContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dietInfo: {
    borderWidth:1,
    flex: 0.5,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 25,
    // paddingTop: 20,
    margin: 10,
    width: 370,
    fontSize: 15
  },
  caloriesNumber: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  calories: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
  },
  smallCon: {
    backgroundColor: 'white',
    height: 70,
    flex: 0.5,
    marginLeft: 10,
    borderRadius: 20,
    paddingTop: 5,
  },
  mainSmal: {
    flexDirection: 'row',
    marginTop: 15,
    height: 80,
    height: 120,
    paddingTop: 5,
  },
  smallConTag: {
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  caloriesInfo: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  mealCategory: {
    flex: 1,
    flexDirection: 'column',
  },
  rowMealCategory: {
    flex: 1,
    flexDirection: 'row',
  },
  foodButton: {
    backgroundColor: 'white',
    width: 170,
    height: 150,
    margin: 8,
    borderRadius: 25,
    padding: 5,
    borderWidth:1
  },
  Foodtext: {
    fontSize: 20,
    textAlign: 'center',
  },
  headImage:{
    width:"90%",
    height: 100,
    alignSelf:"center",
    marginTop: 10
  },
  heading:{
    fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
      
        color: 'black',
        margin: 10
  }
});
