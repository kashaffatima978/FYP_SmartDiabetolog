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


export default DietChartMain = function ({navigation}) {
  const BreakfastOpen = () => {
    navigation.navigate('Breakfast');
  };
  const lunchOpen = () => {
    navigation.navigate('Lunch');
  };
  const snacksOpen = () => {
    navigation.navigate('Snacks');
  };
  const dinnerOpen = () => {
    navigation.navigate('Dinner');
  };
  const[consumedCalories, setCosumedCalories]= useState(500)
  const[totalCalories, setTotalCalories]= useState(1200)
   
  const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
  const animatedProgress = new Animated.Value((consumedCalories/totalCalories)*100);

    useEffect(() => {
        Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,

        }).start();
    }, [animatedProgress, consumedCalories]);



  return (
    <SafeAreaView style={styles.safeAreaCont}>
      <Heading name="Diet Plan"/>
      {/* <Image style={styles.headImage} resizeMode={"contain"} source={require('../../../assets/head3.jpg')}/> */}
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

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mealCategory}>
          <View style={styles.rowMealCategory}>
            {/* BREAKFASR BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={BreakfastOpen}>
              <Image
                style={{
                  height: 100,
                  width: 130,
                  justifyContent: 'center',
                  marginTop: 13,
                  marginLeft: 15,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/breakfast.jpg')}
              />
              <Text style={styles.Foodtext}>breakfast</Text>
            </TouchableOpacity>
            {/* LUNCH BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={lunchOpen}>
              <Image
                style={{
                  height: 90,
                  width: 120,
                  justifyContent: 'center',
                  marginTop: 13,
                  marginLeft: 15,
                  marginBottom: 10,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/luchF.jpg.png')}
              />
              <Text style={styles.Foodtext}>Lunch</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowMealCategory}>
            {/* SNACKS BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={snacksOpen}>
              <Image
                style={{
                  height: 100,
                  width: 130,
                  justifyContent: 'center',
                  marginTop: 13,
                  marginLeft: 15,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/snacks.jpg')}
              />
              <Text style={styles.Foodtext}>Snacks</Text>
            </TouchableOpacity>
            {/* DINNER BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={dinnerOpen}>
              <Image
                style={{
                  height: 100,
                  width: 130,
                  justifyContent: 'center',
                  marginTop: 13,
                  marginLeft: 15,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/dinner.jpg.png')}
              />
              <Text style={styles.Foodtext}>Dinner</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 15,
    fontWeight: 'bold',
 
 },
  con: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',mar
    marginTop: 30
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
