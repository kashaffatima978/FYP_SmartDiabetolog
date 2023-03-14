import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Breakfast from "./../screens/BreakfastPage"
import Lunch from "./../screens/LunchPage"
import Snack from "./../screens/SnacksPage"


const Tab = createMaterialTopTabNavigator();

export default function PageScroll() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Breakfast" component={Breakfast} />
      <Tab.Screen name="Lunch" component={Lunch} />
    </Tab.Navigator>
  );
}
