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

const Drawer = createDrawerNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerStyle: {
      backgroundColor: '#ADD8E6', 
},}}>
        <Drawer.Screen name="Home" component={StackNav} />
        <Drawer.Screen name="Allergic Reaction" component={AllergicReactionMain} />
        <Drawer.Screen name="Medicine" component={MedicationMain} />
        <Drawer.Screen name="Retinopathy" component={Retinopathy} />
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
