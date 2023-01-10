import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllergicReactionMain from "../screens/AllergicReactionMain";
import MedicationMain from "../screens/MedicationMain";
import TrackerScreen from "../screens/TrackerScreen";
import DietFirstMain from "../screens/DietFirstMain";
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
          else if (route.name === 'Diet') {
            iconName = focused ? 'pizza' : 'pizza-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#86C0DD',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      
      })}>
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Tracker" component={TrackerScreen} />
        <Tab.Screen name="Diet" component={DietFirstMain} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

