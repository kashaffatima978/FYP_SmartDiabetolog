import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{ useEffect, useState } from "react";


import AddBloodPressure from "../screens/AddBloodPressure";
import AddBloodSugar from "../screens/AddBloodSugar";
import AddCholesterol from "../screens/AddCholesterol";
import AddFoodAllergicReactions from "../screens/AddFoodAllergicReactions";
import AddInsulinMedicine from "../screens/AddInsulinMed";
import AddMeal from "../screens/AddMeal";
import AddMedicineAllergicReactions from "../screens/AddMedicineAllergicReactions";
import AddOralMedicine from "../screens/AddOralMedicine";
import AllergicReactionMain from "../screens/AllergicReactionMain";
import BreakfastPage from "../screens/BreakfastPage";
import DietChartMain from "../screens/DietChartMain";
import DietFirstMain from "../screens/DietFirstMain";
import DinnerPage from "../screens/DinnerPage";
import EnterCode from "../screens/EnterCode";
import FirstScreen from "../screens/FirstScreen";
import FoodAllergicReactions from "../screens/FoodAllergicReaction";
import ForgetPassword from "../screens/ForgetPassword";
// import Home from "../screens/Home";
import InsulinMed from "../screens/InsulinMed";
import Loading from "../screens/Loading";
import LoginScreen from "../screens/LoginScreen";
import LunchPage from "../screens/LunchPage";
import MedicationMain from "../screens/MedicationMain";
import MedicineAllergicReactions from "../screens/MedicineAllergicReactions";
import OralMed from "../screens/OralMed";
import Profile from "../screens/Profile";
import { Registeration } from "../screens/RegistrationScreen";
import SnacksPage from "../screens/SnacksPage";
import TrackerScreen from "../screens/TrackerScreen";
import ViewBloodPressure from "../screens/ViewBloodPressure";
import ViewBloodSugar from "../screens/ViewBloodSugar";
import ViewCholesterol from "../screens/ViewCholesterol";
import Retinopathy from "../screens/Retinopathy";
import TabNav from "./TabNav";



export default function StackNav(){
  const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator  initialRouteName={'Home'} screenOptions={ {headerShown: false}}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Registration" component={Registeration} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Loading" component={Loading}/>
        <Stack.Screen name="Home" component={TabNav} />
        {/* <Stack.Screen name="Tracker" component={TrackerScreen} /> */}
        <Stack.Screen name="ViewBloodSugar" component={ViewBloodSugar} />
        <Stack.Screen name="AddBloodSugar" component={AddBloodSugar} />
        <Stack.Screen name="ViewBloodPressure" component={ViewBloodPressure} />
        <Stack.Screen name="AddBloodPressure" component={AddBloodPressure} />
        <Stack.Screen name="ViewCholesterol" component={ViewCholesterol} />
        <Stack.Screen name="AddCholesterol" component={AddCholesterol} />
        <Stack.Screen name="Diet" component={DietChartMain} />
        <Stack.Screen name="Snacks" component={SnacksPage} />
        <Stack.Screen name="Lunch" component={LunchPage} />
        <Stack.Screen name="Dinner" component={DinnerPage} />
        <Stack.Screen name="Breakfast" component={BreakfastPage} />
        <Stack.Screen name="AddMeal" component={AddMeal} />
        <Stack.Screen name="MedicationMain" component={MedicationMain}/>
        <Stack.Screen name="OralMed" component={OralMed}/>
        <Stack.Screen name="AddOralMedicine" component={AddOralMedicine}/>
        <Stack.Screen name="InsulinMed" component={InsulinMed}/>
        <Stack.Screen name="AddInsulinMedicine" component={AddInsulinMedicine}/>
        <Stack.Screen name="AllergicReactionMain" component={AllergicReactionMain}/>
        {/* <Stack.Screen name="DietFirstMain" component={DietFirstMain}/> */}
        <Stack.Screen name="AddMedicineAllergicReactions" component={AddMedicineAllergicReactions}/>
        <Stack.Screen name="MedicineAllergicReactions" component={MedicineAllergicReactions}/>
        <Stack.Screen name="AddFoodAllergicReactions" component={AddFoodAllergicReactions}/>
        <Stack.Screen name="FoodAllergicReactions" component={FoodAllergicReactions}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
        <Stack.Screen name="EnterCode" component={EnterCode}/>
        <Stack.Screen name="Retinopathy" component={Retinopathy}/>
        {/* <Stack.Screen name="Profile" component={Profile}/> */}
      </Stack.Navigator>
    )
}