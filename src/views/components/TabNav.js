import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllergicReactionMain from "../screens/AllergicReactionMain";
import MedicationMain from "../screens/AddNewPrescription";
import TrackerScreen from "../screens/TrackerScreen";
import DietFirstMain from "../screens/DietFirstMain";
import StackNav from "./StackNav";
import ViewBloodPressure from "../screens/ViewBloodPressure";
import ViewBloodSugar from "../screens/ViewBloodSugar";
import ViewCholesterol from "../screens/ViewCholesterol";
import AddBloodPressure from "../screens/AddBloodPressure";
import AddBloodSugar from "../screens/AddBloodSugar";
import AddCholesterol from "../screens/AddCholesterol";
import Chatbot from "../screens/chatbot";
// import DietChartMain from "../screens/DietChartMain";



export default function TabNav() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator  screenOptions={({ route }) => ({
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
        tabBarActiveTintColor: '#6A6DB0',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      
      })}>
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Tracker" component={TrackerScreen} />
        <Tab.Screen name="Chatbot" component={Chatbot}  options={{headerTitle: 'Chatbot', tabBarLabel: 'Community', }}/>
        <Tab.Screen name="Profile" component={Profile} />
        {/* <Tab.Screen name="Chatbot" component={Chatbot} options={{ tabBarItemStyle: { display: 'none' }}} /> */}
        
      </Tab.Navigator>
    );
  }

