import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllergicReactionMain from "../screens/AllergicReactionMain";
import MedicationMain from "../screens/MedicationMain";
import TrackerScreen from "../screens/TrackerScreen";
import DietFirstMain from "../screens/DietFirstMain";
import StackNav from "./StackNav";
import ViewBloodPressure from "../screens/ViewBloodPressure";
import ViewBloodSugar from "../screens/ViewBloodSugar";
import ViewCholesterol from "../screens/ViewCholesterol";
import AddBloodPressure from "../screens/AddBloodPressure";
import AddBloodSugar from "../screens/AddBloodSugar";
import AddCholesterol from "../screens/AddCholesterol";
// import DietChartMain from "../screens/DietChartMain";



export default function TabNav() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } 
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          else if (route.name === 'Tracker') {
            iconName = focused ? 'pulse' : 'pulse-outline';
          }
          else if (route.name === 'DietMain') {
            iconName = focused ? 'pizza' : 'pizza-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#86C0DD',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,

      
      })}>
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Tracker" component={TrackerScreen} />
        {/* <Tab.Screen name='StackNav' component={StackNav} options={{ headerTitle:'Home', tabBarItemStyle: { display: 'none' }}}/> */}
        <Tab.Screen name="DietMain" component={DietFirstMain}  options={{headerTitle: 'Diet', tabBarLabel: 'Diet', }}/>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Diet" component={DietChartMain} options={{ tabBarItemStyle: { display: 'none' }}} />
        {/* <Tab.Screen name="Snacks" component={SnacksPage} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="Lunch" component={LunchPage} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}} />
        <Tab.Screen name="Dinner" component={DinnerPage} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="Breakfast" component={BreakfastPage} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="AddMeal" component={AddMeal}options={{headerShown: false,tabBarItemStyle: { display: 'none', }}} />

        <Tab.Screen name="ViewBloodSugar" component={ViewBloodSugar} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="AddBloodSugar" component={AddBloodSugar} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="ViewBloodPressure" component={ViewBloodPressure} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="AddBloodPressure" component={AddBloodPressure} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>
        <Tab.Screen name="ViewCholesterol" component={ViewCholesterol} options={{headerShown: false, tabBarItemStyle: { display: 'none', }}}/>       */}
      </Tab.Navigator>
    );
  }

