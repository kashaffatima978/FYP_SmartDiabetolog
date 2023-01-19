import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/views/screens/HomeScreen';
import AllergicReactionMain from './src/views/screens/AllergicReactionMain';
import MedicationMain from './src/views/screens/MedicationMain';
import Retinopathy from './src/views/screens/Retinopathy';
import StackNav from './src/views/components/StackNav';
import FirstScreen from './src/views/screens/FirstScreen';
import { Registeration } from './src/views/screens/RegistrationScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import EnterCode from './src/views/screens/EnterCode';
import TabNav from './src/views/components/TabNav';
import FoodAllergicReactions from './src/views/screens/FoodAllergicReaction';
import AddFoodAllergicReactions from './src/views/screens/AddFoodAllergicReactions';
import MedicineAllergicReactions from './src/views/screens/MedicineAllergicReactions';
import AddMedicineAllergicReactions from './src/views/screens/AddMedicineAllergicReactions';
import InsulinMed from './src/views/screens/InsulinMed';
import OralMed from './src/views/screens/OralMed';
import AddInsulinMedicine from './src/views/screens/AddInsulinMed';
import AddOralMedicine from './src/views/screens/AddOralMedicine';
import ViewBloodPressure from './src/views/screens/ViewBloodPressure';
import ViewBloodSugar from './src/views/screens/ViewBloodSugar';
import ViewCholesterol from './src/views/screens/ViewCholesterol';
import AddBloodPressure from './src/views/screens/AddBloodPressure';
import AddBloodSugar from './src/views/screens/AddBloodSugar';
import AddCholesterol from './src/views/screens/AddCholesterol';


LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="FirstScreen" screenOptions={{ headerStyle: {
      backgroundColor: '#ADD8E6', 
      elevation: 5
},}}>

        <Drawer.Screen name="FirstScreen" component={FirstScreen} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="Registration" component={Registeration} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="Login" component={LoginScreen} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="EnterCode" component={EnterCode} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="Home" component={TabNav}/>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        {/* <Drawer.Screen name="StackNav" component={StackNav} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/> */}
        <Drawer.Screen name="Allergic Reaction" component={AllergicReactionMain}  options={{ headerShown:false}}/>
        <Drawer.Screen name="Medicine" component={MedicationMain}  options={{headerShown:false}}/>
        <Drawer.Screen name="Retinopathy" component={Retinopathy}  options={{headerShown:false}}/>
        <Drawer.Screen name="AddMedicineAllergicReactions" component={AddMedicineAllergicReactions} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="MedicineAllergicReactions" component={MedicineAllergicReactions} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="AddFoodAllergicReactions" component={AddFoodAllergicReactions} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="FoodAllergicReactions" component={FoodAllergicReactions} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="OralMed" component={OralMed} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="AddOralMedicine" component={AddOralMedicine} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="InsulinMed" component={InsulinMed} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="AddInsulinMedicine" component={AddInsulinMedicine} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>      
        
        <Drawer.Screen name="ViewBloodSugar" component={ViewBloodSugar} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="AddBloodSugar" component={AddBloodSugar}  options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="ViewBloodPressure" component={ViewBloodPressure}  options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="AddBloodPressure" component={AddBloodPressure}  options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="ViewCholesterol" component={ViewCholesterol}  options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>
        <Drawer.Screen name="AddCholesterol" component={AddCholesterol} options={{ drawerItemStyle: { height: 0 }, headerShown:false}}/>      
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
