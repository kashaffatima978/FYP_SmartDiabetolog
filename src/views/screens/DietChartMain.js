import React, { useState, useEffect } from 'react';
import colors from "../../files/Colors";
import { CircularProgress } from 'react-native-circular-progress';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Pressable, Text, useColorScheme, Image, View, Touchable, Modal, TouchableOpacity, Animated } from 'react-native';
import { storeUserState } from "../connectionToDB/authentication"
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { getProfileInformation } from "../connectionToDB/profile"

import PageHeading from "../components/PageHeading"
import { Heading } from '../components/Heading';
import axios from 'axios';
// import PageScroll from '../components/PageScroll';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealCard from '../components/MealDishCard';
import Fab from '../components/Fab';
import Loader from '../components/loader';
import { IP } from "../../files/information"
import { Button } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { setAuthentication, store } from "../../redux/reduxActions";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setBreakfastToday, setLunchToday, setDinnerToday, setSnackOneToday, setSnackTwoToday } from "../../redux/reduxActions";
import getCalories from '../Counters/PerDay';
import {
  storeAllergiesInAsync, getAllergiesFromAsync,storeStateInAsync,getRecordStateFromAsync
} from "../connectionToDB/AsyncStorage"
import AsyncStorage from '@react-native-async-storage/async-storage';


// import { Button } from 'react-native-paper';
// import { FAB } from 'react-native-paper';
// import { store } from "../../redux/reduxActions";
// import { useDispatch, useSelector } from "react-redux/es/exports";
// import { setBreakfastToday, setLunchToday, setDinnerToday, setSnackOneToday, setSnackTwoToday } from "../../redux/reduxActions";

// import { IP } from "../../files/information"



export default DietChartMain = function ({ navigation }) {
  const dispatch = useDispatch()
  const Tab = createMaterialTopTabNavigator();
  const [consumedCalories, setCosumedCalories] = useState(0)
  const [totalCalories, setTotalCalories] = useState(1200)
  const [breakfast, setBreakfast] = useState([])
  const [snack1, setSnack1] = useState([])
  const [lunch, setLunch] = useState([])
  const [snack2, setSnack2] = useState([])
  const [dinner, setDinner] = useState([])
  const [gotDiet, setGotDiet] = useState(false)
  const [loader, setLoader] = useState(true)
  const [isBreakfastEnabled, setIsBreakfastEnabled] = useState((!store.getState()) ? false : store.getState().todayBreakfastDone);
  const [isLunchEnabled, setIsLunchEnabled] = useState((!store.getState()) ? false : store.getState().todayLunchDone);
  const [isSnackOneEnabled, setIsSnackOneEnabled] = useState((!store.getState()) ? false : store.getState().todaySnackOneDone);
  const [isSnackTwoEnabled, setIsSnackTwoEnabled] = useState((!store.getState()) ? false : store.getState().todaySnackTwoDone);
  const [isDinnerEnabled, setIsDinnerEnabled] = useState((!store.getState()) ? false : store.getState().todayDinnerDone);
  const [inputList, setInputList] = useState({
    "weight": "",
    "heightFeet": "",
    "heightInches": "",
    "activityLevel": "",
    "gender": "",
    "age": ""
  });
  const ip = `http://${IP}`
  const AnimatedCircularProgress = Animated.createAnimatedComponent(CircularProgress);
  const animatedProgress = new Animated.Value((consumedCalories / totalCalories) * 100);
  const [breakfastFromAddMeal, setBreakfastFromAddMeal] = useState()
  const [lunchFromAddMeal, setLunchFromAddMeal] = useState()
  const [snack1FromAddMeal, setSnack1FromAddMeal] = useState()
  const [snack2FromAddMeal, setSnack2FromAddMeal] = useState()
  const [dinnerFromAddMeal, setDinnerFromAddMeal] = useState()

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,

    }).start();
  }, [animatedProgress, consumedCalories]);


  useEffect(()=>{
    async function call() {
    if (gotDiet == false) {
      // getAllergiesFromAsync("food")
      //   .then(allergies => {
      //     array=allergies.map(val=>val.name)
      //     console.log("********", array, "********")
      //     axios.post(ip + ':8000/dietPlan', { 'calories': totalCalories, 'alergies': array })
      //       .then((response) => {
      //         setBreakfast(response.data.breakfast)
      //         setSnack1(response.data.snack1)
      //         setLunch(response.data.lunch)
      //         setSnack2(response.data.snack2)
      //         setDinner(response.data.dinner)
      //         setGotDiet(true)
      //         setLoader(false)

      //       })
      //       .catch((err) => {
      //         console.log(err, " in useEffect in dietChartMain for getting recipes catch 1")
      //       })
      //   })
      //   .catch(err => {
      //     console.log(err, " in useEffect in dietChartMain for getting recipes catch 2")
      //   })

      //get Diet Chart From Async
      const storedDate = await AsyncStorage.getItem(`@dietChart`)
      const parsed = JSON.parse(storedDate)
      console.log(parsed)
      setBreakfast(parsed.breakfast)
      setSnack1(parsed.snack1)
      setLunch(parsed.lunch)
      setSnack2(parsed.snack2)
      setDinner(parsed.dinner)
      setGotDiet(true)

      //setting the taken calories without add meal
        dispatch(setAuthentication())
        if ((store.getState().todayBreakfastDone)) {
          console.log(parsed.breakfast)
            setCosumedCalories(old => ((parseInt(old) + parseInt(((parsed.breakfast)[1])))))
            //alert(consumedCalories)
            console.log("Cosumed calories are", consumedCalories)
        }
        if ((store.getState().todayLunchDone)) {
          console.log(parsed.lunch)
            setCosumedCalories(old => ((parseInt(old) + parseInt(((parsed.lunch)[1])))))
            //alert(consumedCalories)
            console.log("Cosumed calories are", consumedCalories)
        }
        if ((store.getState().todayDinnerDone)) {
          console.log(parsed.dinner)
            setCosumedCalories(old => ((parseInt(old) + parseInt(((parsed.dinner)[1])))))
            //alert(consumedCalories)
            console.log("Cosumed calories are", consumedCalories)
        }
        if ((store.getState().todaySnackOneDone)) {
          console.log(parsed.snack1)
            setCosumedCalories(old => ((parseInt(old) + parseInt(((parsed.snack1)[1])))))
            //alert(consumedCalories)
            console.log("Cosumed calories are", consumedCalories)
        }
        if ((store.getState().todaySnackTwoDone)) {
          console.log(parsed.snack2)
            setCosumedCalories(old => ((parseInt(old) + parseInt(((parsed.snack2)[1])))))
            //alert(consumedCalories)
            console.log("Cosumed calories are", consumedCalories)
        }


      setLoader(false)
    }
  }
  call()
  }
  , [])

  const [oldCal, setOldCal] = useState(0)

  const [mount, setMount] = useState(0)

  const loadDataOnlyOnce = async () => {
    await getProfileInformation()
      .then((res) => {
        console.log("here", res)
        console.log("state", res.userDetails.state)
        cal = getCalories(res.userDetails.weight, false, res.userDetails.gender, res.userDetails.heightFeet, res.userDetails.heighInches, res.userDetails.age, res.userDetails.acitivitLevel);
        setTotalCalories(cal)
      })
      .catch(err => { console.log("Error in Diet screen", err) })

    // //get add meal data from Async
    //for breakfast
    const b = await AsyncStorage.getItem(`@Breakfast`)
    const parsed = JSON.parse(b)
    console.log(parsed)
    setBreakfastFromAddMeal(parsed)
    //for lunch
    const l = await AsyncStorage.getItem(`@Lunch`)
    const parsed2 = JSON.parse(l)
    console.log(parsed2)
    setLunchFromAddMeal(parsed2)
    //for snack1
    const s1 = await AsyncStorage.getItem(`@Snack1`)
    const parsed3 = JSON.parse(s1)
    console.log(parsed3)
    setSnack1FromAddMeal(parsed3)
    //for snack2
    const s2 = await AsyncStorage.getItem(`@Snack2`)
    const parsed4 = JSON.parse(s2)
    console.log(parsed4)
    setSnack2FromAddMeal(parsed4)
    //for dinner
    const d = await AsyncStorage.getItem(`@Dinner`)
    const parsed5 = JSON.parse(d)
    console.log(parsed5)
    setDinnerFromAddMeal(parsed5)



  };

  useEffect(() => {
    loadDataOnlyOnce();


  }, []);


  useEffect(() => {
    //store the  user state

    function updateState() {
      
      getRecordStateFromAsync()
        .then(async (record) => {
          state = store.getState()
          console.log("record got from  ASYNC is ", record)
          state.record = record
          await storeStateInAsync(state)

          const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
          axios.patch(`${ip}:3000/`,
            { "state": state },
            { headers: { "Authorization": "Bearer " + token } })
            .then(async (res) => {

              if (res.data.status !== undefined) {
                console.log("changes successfully updated in user state");
                console.log(res.data)
              }
            })
            .catch((err) => {
              console.log("Error: update state in DietChart= ", err)
            })

        })
        .catch(err => { console.log("Error in update state in dietchartmain catchA", err) })



    }
    updateState()
  }, [isBreakfastEnabled, isLunchEnabled, isSnackOneEnabled, isSnackTwoEnabled, isDinnerEnabled])

  store.subscribe(() => {
    setIsBreakfastEnabled((old) => { return (store.getState().todayBreakfastDone) })
    setIsLunchEnabled((old) => { return (store.getState().todayLunchDone) })
    setIsSnackOneEnabled((old) => { return (store.getState().todaySnackOneDone) })
    setIsSnackTwoEnabled((old) => { return (store.getState().todaySnackTwoDone) })
    setIsDinnerEnabled((old) => { return (store.getState().todayDinnerDone) })
  })

  const addMeal = () => {
    navigation.navigate('AddMeal')
  }

  const BreakfastComponent = () => {

    return (
      <Pressable style={{ backgroundColor: '#E2E4FF', flex: 1, paddingTop: 25 }} onPress={() => {
        navigation.navigate("Recipe", {
          name: breakfast[0],
          img: breakfast[5]
        })
      }}>
        <FAB
          disabled={isBreakfastEnabled ? true : false}
          onPress={() => { dispatch(setBreakfastToday()); console.log(store.getState()) }}
          style={[{ position: 'absolute', margin: 16, right: 0, backgroundColor: '#6A6DB0', zIndex: 10 },
          { backgroundColor: isBreakfastEnabled ? "gray" : "#6A6DB0" }]}
          small icon="check" color='white' />
        
        {
          (!breakfastFromAddMeal) ?
            <MealCard title={breakfast[0]} image={breakfast[5]} calories={breakfast[1]} carbs={breakfast[2]} sugar={breakfast[3]} time={breakfast[4]} />
            :
            <Card style={{ height: 330, width: '90%', alignSelf: 'center', margin: 5 }}>
              <Card.Cover backgroundColor="white" source={{ uri: "https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png" }} resizeMode={'contain'} style={{ width: '100%', height: 150, borderRadius: 0 }} />
              <Card.Content>
                <Title>{breakfastFromAddMeal.name}</Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, backgroundColor: "#e9ecef" }}>
                  <Text style={styles.smallText}>Calories: {breakfastFromAddMeal.calories} kcl</Text>
                </View>
              </Card.Content>
            </Card>
        }

      </Pressable>
    )
  }

  const LunchComponent = () => {
    return (
      <Pressable style={{ backgroundColor: '#E2E4FF', flex: 1, paddingTop: 25 }} onPress={() => {
        navigation.navigate("Recipe", {
          name: lunch[0],
          img: lunch[5]
        })
      }}>
        {
          (!lunchFromAddMeal) ?
            <MealCard title={lunch[0]} image={lunch[5]} calories={lunch[1]} carbs={lunch[2]} sugar={lunch[3]} time={lunch[4]} />
            :
            <Card style={{ height: 330, width: '90%', alignSelf: 'center', margin: 5 }}>
              <Card.Cover backgroundColor="white" source={{ uri: "https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png" }} resizeMode={'contain'} style={{ width: '100%', height: 150, borderRadius: 0 }} />
              <Card.Content>
                <Title>{lunchFromAddMeal.name}</Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 , backgroundColor: "#e9ecef" }}>
                  <Text style={styles.smallText}>Calories: {lunchFromAddMeal.calories} kcl</Text>
                </View>
              </Card.Content>
            </Card>
        }

        <FAB
          disabled={isLunchEnabled ? true : false}
          onPress={() => { dispatch(setLunchToday()); console.log(store.getState()) }}
          style={[{ position: 'absolute', margin: 16, right: 0, backgroundColor: '#6A6DB0', zIndex: 10 },
          { backgroundColor: isLunchEnabled ? "gray" : "#6A6DB0" }]}
          small icon="check" color='white' />
      </Pressable>
    )
  }

  const DinnerComponent = () => {
    return (
      <Pressable style={{ backgroundColor: '#E2E4FF', flex: 1, paddingTop: 25 }} onPress={() => {
        navigation.navigate("Recipe", {
          name: dinner[0],
          img: dinner[5]
        })
      }}>
        {
          (!dinnerFromAddMeal) ?
            <MealCard title={dinner[0]} image={dinner[5]} calories={dinner[1]} carbs={dinner[2]} sugar={dinner[3]} time={dinner[4]} />
            :
            <Card style={{ height: 330, width: '90%', alignSelf: 'center', margin: 5 }}>
              <Card.Cover backgroundColor="white" source={{ uri: "https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png" }} resizeMode={'contain'} style={{ width: '100%', height: 150, borderRadius: 0 }} />
              <Card.Content>
                <Title>{dinnerFromAddMeal.name}</Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 , backgroundColor: "#e9ecef" }}>
                  <Text style={styles.smallText}>Calories: {dinnerFromAddMeal.calories} kcl</Text>
                </View>
              </Card.Content>
            </Card>
        }
         <FAB disabled={isDinnerEnabled ? true : false}
          onPress={() => {
            dispatch(setDinnerToday()); console.log("state after changing setDinnerToday ",
              store.getState());
          }}
          style={[{ position: 'absolute', margin: 16, right: 0, backgroundColor: '#6A6DB0', zIndex: 10 },
          { backgroundColor: isDinnerEnabled ? "gray" : "#6A6DB0" }]}
          small icon="check" color='white' />
      </Pressable>
    )
  }

  const SnackComponent = () => {
    return (
      <ScrollView style={{ backgroundColor: '#E2E4FF', flex: 1, paddingTop: 25 }}>
        <Pressable onPress={() => {
          navigation.navigate("Recipe", {
            name: snack1[0],
            img: snack1[5]
          })
        }}>

{
          (!snack1FromAddMeal) ?
            <MealCard title={snack1[0]} image={snack1[5]} calories={snack1[1]} carbs={snack1[2]} sugar={snack1[3]} time={snack1[4]} />
            :
            <Card style={{ height: 330, width: '90%', alignSelf: 'center', margin: 5 }}>
              <Card.Cover backgroundColor="white" source={{ uri: "https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png" }} resizeMode={'contain'} style={{ width: '100%', height: 150, borderRadius: 0 }} />
              <Card.Content>
                <Title>{snack1FromAddMeal.name}</Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 , backgroundColor: "#e9ecef" }}>
                  <Text style={styles.smallText}>Calories: {snack1FromAddMeal.calories} kcl</Text>
                </View>
              </Card.Content>
            </Card>
        }

           </Pressable>
        <Pressable style={{ paddingTop: 25 }} onPress={() => {
          navigation.navigate("Recipe", {
            name: snack2[0],
            img: snack2[5]
          })
        }}>
          {
          (!snack2FromAddMeal) ?
            <MealCard title={snack2[0]} image={snack2[5]} calories={snack2[1]} carbs={snack2[2]} sugar={snack2[3]} time={snack2[4]} />
            :
            <Card style={{ height: 330, width: '90%', alignSelf: 'center', margin: 5 }}>
              <Card.Cover backgroundColor="white" source={{ uri: "https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png" }} resizeMode={'contain'} style={{ width: '100%', height: 150, borderRadius: 0 }} />
              <Card.Content>
                <Title>{snack2FromAddMeal.name}</Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, backgroundColor: "#e9ecef"  }}>
                  <Text style={styles.smallText}>Calories: {snack2FromAddMeal.calories} kcl</Text>
                </View>
              </Card.Content>
            </Card>
        }
          </Pressable>
        <FAB
          disabled={isSnackOneEnabled ? true : false}
          onPress={() => { dispatch(setSnackOneToday()); console.log(store.getState()); }}
          style={[{ position: 'absolute', margin: 16, right: 0, backgroundColor: '#6A6DB0', zIndex: 10 },
          { backgroundColor: isSnackOneEnabled ? "gray" : "#6A6DB0" }]} small icon="check" color='white' />
        <FAB
          disabled={isSnackTwoEnabled ? true : false}
          onPress={() => { dispatch(setSnackTwoToday()); console.log(store.getState()); }}
          style={[{ position: 'absolute', margin: 16, right: 0, bottom: "37%", backgroundColor: '#6A6DB0', zIndex: 10 },
          { backgroundColor: isSnackTwoEnabled ? "gray" : "#6A6DB0" }]} small icon="check" color='white' />
      </ScrollView>
    )
  }



  return (
    <SafeAreaView style={styles.safeAreaCont}>
      <Loader visible={loader}></Loader>
      <Heading name="Diet Plan" />

      <View style={styles.con}>
        <AnimatedCircularProgress
          size={150}
          width={8}
          fill={animatedProgress}
          tintColor="#6A6DB0"
          backgroundColor="#E2E4FF"
          rotation={0}
          lineCap="round"
        >
          {() => (

            <Image
              style={[styles.image, { width: 100, height: 100 }]}
              source={require('../../../assets/Images/breakfast.jpg')}
              resizeMode="center"

            />
          )}
        </AnimatedCircularProgress>
        <Text style={styles.text}>Calories: {consumedCalories} kcl / {totalCalories} kcl</Text>

      </View>


      <TouchableOpacity
        style={{ backgroundColor: "#6A6DB0", width: "30%", height: "5%", margin: 10, justifyContent: 'center', alignItems: 'center', marginLeft: "65%", borderRadius: 10 }}
        onPress={() => {
          navigation.navigate("AddMeal")
        }}>
        <Text style={{ fontSize: 16, color: 'white' }}>add meal </Text>
      </TouchableOpacity>


      <Tab.Navigator>
        <Tab.Screen name="breakfast" component={BreakfastComponent} />

        <Tab.Screen name="lunch" component={LunchComponent} />

        <Tab.Screen name="snacks" component={SnackComponent} />

        <Tab.Screen name="dinner" component={DinnerComponent} />
      </Tab.Navigator >
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  safeAreaCont: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: "center",
    // marginTop: 15,
    fontWeight: 'bold',
    color: "gray",
    fontSize: 15

  },
  con: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',mar
    marginBottom: 15,
    marginTop: 10
  },

  scrollContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dietInfo: {
    borderWidth: 1,
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
    borderWidth: 1
  },
  Foodtext: {
    fontSize: 20,
    textAlign: 'center',
  },
  headImage: {
    width: "90%",
    height: 100,
    alignSelf: "center",
    marginTop: 10
  },
  heading: {
    fontSize: 30,
    fontStyle: "italic",
    textAlign: "center",

    color: 'black',
    margin: 10
  }
});
