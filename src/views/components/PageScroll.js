import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Breakfast from "./../screens/BreakfastPage"
import Lunch from "./../screens/LunchPage"
import Snack from "./../screens/SnacksPage"
import DinnerPage from "./../screens/DinnerPage"


const Tab = createMaterialTopTabNavigator();

export default function PageScroll() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Breakfast" component={Breakfast} />
      <Tab.Screen name="Lunch" component={Lunch} />
      <Tab.Screen name="Snack" component={Snack} />
      <Tab.Screen name="Dinner" component={DinnerPage} />
      {/* <Tab.Screen name="Snack" component={Snack} /> */}
    </Tab.Navigator>
  );
}
